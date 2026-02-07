#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
    Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import express from "express";
import cors from "cors";

// Load environment variables from parent directory relative to this script
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = resolve(__dirname, '../../.env');

dotenv.config({ path: envPath });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("Error: Missing Supabase credentials in environment variables.");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Server instance
const server = new Server(
    {
        name: "rooted-recruitment-mcp",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// ============================================================================
// TOOL: Get Jobs
// ============================================================================
const GetJobsArgsSchema = z.object({
    active_only: z.boolean().default(true).describe("If true, list only active jobs"),
});

async function getJobs(args: z.infer<typeof GetJobsArgsSchema>) {
    let query = supabase.from("jobs").select("id, title, type, location, salary_range");

    if (args.active_only) {
        query = query.eq("is_active", true);
    }

    const { data, error } = await query;
    if (error) throw new Error(`Failed to fetch jobs: ${error.message}`);
    return data;
}

// ============================================================================
// TOOL: Submit Contact Form
// ============================================================================
const SubmitContactFormArgsSchema = z.object({
    name: z.string().describe("Name of the person contacting us"),
    email: z.string().email().describe("Email address of the contact"),
    message: z.string().describe("The message body"),
});

async function submitContactForm(args: z.infer<typeof SubmitContactFormArgsSchema>) {
    // 1. Insert into database
    const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([args]);

    if (dbError) throw new Error(`Failed to save contact submission: ${dbError.message}`);

    // 2. Trigger email notification (Edge Function)
    // We don't block on this error, but we log it.
    const { error: fnError } = await supabase.functions.invoke('send-contact-email', {
        body: args,
    });

    if (fnError) {
        console.error("Warning: Failed to send email notification:", fnError);
    }

    return { success: true, message: "Contact form submitted successfully." };
}

// ============================================================================
// Tool Registration & Request Handlers
// ============================================================================

const tools: Tool[] = [
    {
        name: "get_jobs",
        description: "List available job openings at RootedAI.",
        inputSchema: {
            type: "object",
            properties: {
                active_only: { type: "boolean", description: "If true, list only active jobs" },
            },
        },
    },
    {
        name: "submit_contact_form",
        description: "Submit a message to the RootedAI team via the contact form.",
        inputSchema: {
            type: "object",
            properties: {
                name: { type: "string", description: "Name of the sender" },
                email: { type: "string", description: "Email of the sender" },
                message: { type: "string", description: "Message content" },
            },
            required: ["name", "email", "message"],
        },
    },
    {
        name: "get_brand_card",
        description: "Display the interactive RootedAI Brand Card with company stats and services.",
        inputSchema: {
            type: "object",
            properties: {},
        },
    },
];

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
        switch (name) {
            case "get_jobs":
                return {
                    content: [{ type: "text", text: JSON.stringify(await getJobs(GetJobsArgsSchema.parse(args)), null, 2) }],
                };
            case "submit_contact_form":
                return {
                    content: [{ type: "text", text: JSON.stringify(await submitContactForm(SubmitContactFormArgsSchema.parse(args)), null, 2) }],
                };
            case "get_brand_card":
                return {
                    content: [{ type: "text", text: "Displaying RootedAI Brand Card..." }],
                    // This metadata triggers the widget in compatible MCP clients
                    _meta: {
                        ui: {
                            widget: "https://rooted-ai-solutions.onrender.com/widget/index.js"
                        }
                    }
                };
            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    } catch (error: any) {
        return {
            content: [{ type: "text", text: `Error: ${error.message}` }],
            isError: true,
        };
    }
});

// ============================================================================
// Express Server Setup
// ============================================================================

const app = express();
app.use(cors());
app.use(express.json()); // Enable JSON body parsing for REST API

// Serve MCP App Widget (UI)
// Resolve to rooted-mcp-server/web/dist
const widgetPath = resolve(__dirname, '../../web/dist');
// Serve under /widget
app.use('/widget', express.static(widgetPath));

// REST API Endpoints for ChatGPT
app.get("/api/jobs", async (req, res) => {
    try {
        const args = GetJobsArgsSchema.parse({
            active_only: req.query.active_only !== 'false'
        });
        const result = await getJobs(args);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/contact", async (req, res) => {
    try {
        const args = SubmitContactFormArgsSchema.parse(req.body);
        const result = await submitContactForm(args);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

app.get("/api/me", (req, res) => {
    res.json({
        content: [{ type: "text", text: "Displaying RootedAI Brand Card..." }],
        _meta: {
            ui: {
                widget: "https://rooted-ai-solutions.onrender.com/widget/index.js"
            }
        }
    });
});

let transport: SSEServerTransport;

app.get("/sse", async (req, res) => {
    transport = new SSEServerTransport("/messages", res);
    await server.connect(transport);
});

app.post("/messages", async (req, res) => {
    if (!transport) {
        res.sendStatus(400);
        return;
    }
    await transport.handlePostMessage(req, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Rooted Recruitment MCP Server running on port ${PORT}`);
});
