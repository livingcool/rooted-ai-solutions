# MCP Learning Guide: Build AI Website Access

## What is MCP?

**Model Context Protocol (MCP)** is a standard that lets AI assistants (like Claude, ChatGPT, etc.) connect to external tools and services. Think of it like giving AI the ability to:
- Access websites and APIs
- Read and write files
- Control applications
- Query databases
- And much more!

### How MCP Works

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│             │         │             │         │             │
│  AI Client  │◄──────► │ MCP Server  │◄──────► │  External   │
│  (Claude)   │   MCP   │ (Your Code) │   HTTP  │  Services   │
│             │ Protocol│             │         │  (Websites) │
└─────────────┘         └─────────────┘         └─────────────┘
```

1. **AI Client** (Claude, ChatGPT, etc.) asks for something
2. **MCP Server** (your code) receives the request and calls the external service
3. **External Service** (website, API) returns data
4. **MCP Server** formats the response
5. **AI Client** receives and uses the data

---

## Project: Build a Website Access MCP Server

Let's build an MCP server that gives AI the ability to:
1. Fetch and read any website
2. Search the web
3. Extract specific information from pages

This is similar to ChatGPT's browsing feature!

---

## Step 1: Choose Your Language

I recommend **TypeScript** (JavaScript) because:
- Best MCP SDK support
- Works in many environments
- AI models are great at TypeScript
- Easy to deploy

But **Python** also works well if you prefer it.

---

## Step 2: Project Setup (TypeScript)

### 2.1 Initialize the Project

```bash
# Create project directory
mkdir website-access-mcp
cd website-access-mcp

# Initialize Node.js project
npm init -y

# Install dependencies
npm install @modelcontextprotocol/sdk zod
npm install --save-dev @types/node tsx typescript

# Install HTTP client
npm install node-fetch cheerio
```

### 2.2 Configure TypeScript

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### 2.3 Update package.json

```json
{
  "name": "website-access-mcp",
  "version": "1.0.0",
  "type": "module",
  "description": "MCP server for website access and web search",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsx src/index.ts"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "cheerio": "^1.0.0",
    "node-fetch": "^3.3.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.3.0"
  }
}
```

---

## Step 3: Build the MCP Server

### 3.1 Create the Main Server File

Create `src/index.ts`:

```typescript
#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { z } from "zod";

// Server instance
const server = new Server(
  {
    name: "website-access-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// ============================================================================
// TOOL 1: Fetch Website Content
// ============================================================================

const FetchWebsiteArgsSchema = z.object({
  url: z.string().url().describe("The URL of the website to fetch"),
  extract_text: z
    .boolean()
    .optional()
    .default(true)
    .describe("If true, extract clean text content. If false, return HTML"),
});

async function fetchWebsite(args: z.infer<typeof FetchWebsiteArgsSchema>) {
  try {
    const response = await fetch(args.url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MCP-WebsiteAccess/1.0)",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();

    if (args.extract_text) {
      // Extract clean text using Cheerio
      const $ = cheerio.load(html);
      
      // Remove script and style elements
      $("script, style, nav, footer, iframe").remove();
      
      // Get title
      const title = $("title").text().trim();
      
      // Get main content
      const bodyText = $("body").text().replace(/\s+/g, " ").trim();
      
      return {
        url: args.url,
        title,
        content: bodyText.substring(0, 10000), // Limit to 10k chars
        format: "text",
      };
    } else {
      return {
        url: args.url,
        content: html.substring(0, 10000), // Limit to 10k chars
        format: "html",
      };
    }
  } catch (error: any) {
    throw new Error(`Failed to fetch website: ${error.message}`);
  }
}

// ============================================================================
// TOOL 2: Search the Web
// ============================================================================

const SearchWebArgsSchema = z.object({
  query: z.string().describe("The search query"),
  num_results: z
    .number()
    .optional()
    .default(5)
    .describe("Number of results to return (max 10)"),
});

async function searchWeb(args: z.infer<typeof SearchWebArgsSchema>) {
  try {
    // Using DuckDuckGo HTML (simple, no API key needed)
    const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(
      args.query
    )}`;

    const response = await fetch(searchUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MCP-WebsiteAccess/1.0)",
      },
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    const results: Array<{ title: string; url: string; snippet: string }> = [];
    
    $(".result").each((i, elem) => {
      if (i >= Math.min(args.num_results || 5, 10)) return;
      
      const $elem = $(elem);
      const title = $elem.find(".result__title").text().trim();
      const url = $elem.find(".result__url").attr("href") || "";
      const snippet = $elem.find(".result__snippet").text().trim();
      
      if (title && url) {
        results.push({ title, url, snippet });
      }
    });

    return {
      query: args.query,
      results,
      count: results.length,
    };
  } catch (error: any) {
    throw new Error(`Web search failed: ${error.message}`);
  }
}

// ============================================================================
// TOOL 3: Extract Specific Elements
// ============================================================================

const ExtractElementsArgsSchema = z.object({
  url: z.string().url().describe("The URL of the website"),
  selector: z
    .string()
    .describe("CSS selector to extract (e.g., 'h1', '.article-title', '#main')"),
  attribute: z
    .string()
    .optional()
    .describe("Optional attribute to extract (e.g., 'href', 'src')"),
});

async function extractElements(args: z.infer<typeof ExtractElementsArgsSchema>) {
  try {
    const response = await fetch(args.url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MCP-WebsiteAccess/1.0)",
      },
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    const elements: Array<{ text?: string; attribute?: string }> = [];

    $(args.selector).each((i, elem) => {
      if (i >= 20) return; // Limit to 20 elements

      const $elem = $(elem);
      
      if (args.attribute) {
        const attrValue = $elem.attr(args.attribute);
        if (attrValue) {
          elements.push({ attribute: attrValue });
        }
      } else {
        const text = $elem.text().trim();
        if (text) {
          elements.push({ text });
        }
      }
    });

    return {
      url: args.url,
      selector: args.selector,
      elements,
      count: elements.length,
    };
  } catch (error: any) {
    throw new Error(`Element extraction failed: ${error.message}`);
  }
}

// ============================================================================
// MCP Tool Registration
// ============================================================================

const tools: Tool[] = [
  {
    name: "fetch_website",
    description:
      "Fetch and read the content of any website. Returns either clean text or raw HTML.",
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "The URL of the website to fetch",
        },
        extract_text: {
          type: "boolean",
          description:
            "If true, extract clean text content. If false, return HTML",
          default: true,
        },
      },
      required: ["url"],
    },
  },
  {
    name: "search_web",
    description:
      "Search the web using DuckDuckGo and return a list of results with titles, URLs, and snippets.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "The search query",
        },
        num_results: {
          type: "number",
          description: "Number of results to return (max 10)",
          default: 5,
        },
      },
      required: ["query"],
    },
  },
  {
    name: "extract_elements",
    description:
      "Extract specific elements from a webpage using CSS selectors. Useful for scraping structured data.",
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "The URL of the website",
        },
        selector: {
          type: "string",
          description: "CSS selector to extract (e.g., 'h1', '.price', '#content')",
        },
        attribute: {
          type: "string",
          description: "Optional attribute to extract (e.g., 'href', 'src')",
        },
      },
      required: ["url", "selector"],
    },
  },
];

// ============================================================================
// Request Handlers
// ============================================================================

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    switch (name) {
      case "fetch_website": {
        const validatedArgs = FetchWebsiteArgsSchema.parse(args);
        const result = await fetchWebsite(validatedArgs);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "search_web": {
        const validatedArgs = SearchWebArgsSchema.parse(args);
        const result = await searchWeb(validatedArgs);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "extract_elements": {
        const validatedArgs = ExtractElementsArgsSchema.parse(args);
        const result = await extractElements(validatedArgs);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error: any) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// ============================================================================
// Start Server
// ============================================================================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Website Access MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
```

---

## Step 4: Build and Test

### 4.1 Build the Project

```bash
npm run build
```

### 4.2 Test with MCP Inspector

The MCP Inspector is a tool to test your server:

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

This will open a web interface where you can:
1. See all available tools
2. Call tools with test inputs
3. View responses

### 4.3 Test the Tools

Try these in the inspector:

**Test 1: Fetch a website**
```json
{
  "url": "https://example.com",
  "extract_text": true
}
```

**Test 2: Search the web**
```json
{
  "query": "MCP protocol",
  "num_results": 3
}
```

**Test 3: Extract elements**
```json
{
  "url": "https://example.com",
  "selector": "h1"
}
```

---

## Step 5: Use with Claude Desktop

To use your MCP server with Claude Desktop:

### 5.1 Find the Config File

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

### 5.2 Add Your Server

```json
{
  "mcpServers": {
    "website-access": {
      "command": "node",
      "args": [
        "/full/path/to/website-access-mcp/dist/index.js"
      ]
    }
  }
}
```

### 5.3 Restart Claude Desktop

Now Claude can access websites!

Try asking:
- "Fetch the content from example.com"
- "Search for MCP protocol documentation"
- "Extract all the headings from wikipedia.org"

---

## Understanding the Code

### Key Concepts

1. **Server Setup**
   ```typescript
   const server = new Server({
     name: "website-access-mcp",
     version: "1.0.0",
   }, {
     capabilities: { tools: {} }
   });
   ```

2. **Input Validation with Zod**
   ```typescript
   const FetchWebsiteArgsSchema = z.object({
     url: z.string().url(),
     extract_text: z.boolean().optional()
   });
   ```

3. **Tool Registration**
   ```typescript
   const tools: Tool[] = [{
     name: "fetch_website",
     description: "Fetch and read website content",
     inputSchema: { /* JSON Schema */ }
   }];
   ```

4. **Request Handling**
   ```typescript
   server.setRequestHandler(CallToolRequestSchema, async (request) => {
     // Handle tool calls here
   });
   ```

---

## Next Steps: Improvements

### Add More Features

1. **Screenshot capability** (using Puppeteer)
2. **PDF extraction**
3. **Form submission**
4. **Cookie/session management**
5. **Rate limiting**
6. **Caching**

### Better Error Handling

```typescript
try {
  const response = await fetch(url);
  if (!response.ok) {
    return {
      error: `HTTP ${response.status}`,
      suggestion: "Try a different URL or check if the site is accessible"
    };
  }
} catch (error) {
  return {
    error: error.message,
    suggestion: "Check your internet connection or URL format"
  };
}
```

### Add Authentication

For APIs that need keys:

```typescript
const ApiArgsSchema = z.object({
  query: z.string(),
  api_key: z.string().optional()
});
```

---

## Resources

### Documentation
- MCP Specification: https://modelcontextprotocol.io/
- TypeScript SDK: https://github.com/modelcontextprotocol/typescript-sdk
- Python SDK: https://github.com/modelcontextprotocol/python-sdk

### Examples
- Official MCP Servers: https://github.com/modelcontextprotocol/servers
- Community Servers: https://github.com/topics/mcp-server

### Tools
- MCP Inspector: `npx @modelcontextprotocol/inspector`
- Claude Desktop: Download from Anthropic

---

## Common Issues & Solutions

### Issue: "Module not found"
**Solution**: Make sure you ran `npm install` and `npm run build`

### Issue: "Server not connecting"
**Solution**: Check the config file path and restart Claude Desktop

### Issue: "CORS errors"
**Solution**: MCP servers run locally, not in browsers, so CORS doesn't apply

### Issue: "Timeout errors"
**Solution**: Add timeout handling to fetch requests:
```typescript
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000); // 5 second timeout
await fetch(url, { signal: controller.signal });
```

---

## Summary

You've learned:
1. ✅ What MCP is and how it works
2. ✅ How to set up an MCP project
3. ✅ How to create tools that fetch websites
4. ✅ How to search the web
5. ✅ How to extract data from pages
6. ✅ How to test and deploy your server

**Your MCP server now gives AI the power to access and understand websites!**

This is the same concept behind ChatGPT's browsing feature, but you built it yourself and can customize it however you want.

---

## What's Next?

1. **Add more tools** - Weather API, database access, file operations
2. **Build workflows** - Multi-step operations that combine tools
3. **Deploy remotely** - Use HTTP transport instead of stdio
4. **Publish** - Share your server with the community
5. **Integrate** - Use with different AI clients

Happy building! 🚀
