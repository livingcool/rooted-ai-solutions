#!/usr/bin/env node

/**
 * Antigravity Ledger Sync Validator
 * Runs as a pre-commit hook to verify that any staged source code changes
 * are documented in `.antigravity/memory/changelog.jsonl`.
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get root directory relative to this script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Paths to ignore for ledger tracking
const ignorePatterns = [
    /^\.antigravity\//,
    /^\.agents\//,
    /^\.git\//,
    /^\.next\//,
    /^node_modules\//,
    /^\.gitignore/,
    /^\.env/,
    /\.md$/,
    /^package-lock\.json$/,
    /^tsconfig\.tsbuildinfo$/
];

function isTrackedSourceFile(filePath) {
    // Normalize path to use forward slashes
    const normalized = filePath.replace(/\\/g, "/");
    return !ignorePatterns.some(pattern => pattern.test(normalized));
}

try {
    // 1. Get list of staged files
    const stdout = execSync("git diff --cached --name-only", { cwd: rootDir, encoding: "utf8" });
    const stagedFiles = stdout.split("\n").map(f => f.trim()).filter(Boolean);

    const stagedSourceFiles = stagedFiles.filter(isTrackedSourceFile);

    if (stagedSourceFiles.length === 0) {
        console.log("✓ No tracked source code files staged. Skipping ledger validation.");
        process.exit(0);
    }

    console.log(`Analyzing staged source files:\n${stagedSourceFiles.map(f => `  - ${f}`).join("\n")}`);

    // 2. Check if changelog.jsonl is staged
    const isChangelogStaged = stagedFiles.includes(".antigravity/memory/changelog.jsonl");

    if (!isChangelogStaged) {
        console.error("\n❌ ERROR: Antigravity Ledger Compliance Failure!");
        console.error("You are committing changes to source files but have not staged updates to the changelog.");
        console.error("Please add a record of your changes to '.antigravity/memory/changelog.jsonl' and stage it ('git add .antigravity/memory/changelog.jsonl') before committing.");
        process.exit(1);
    }

    // 3. Verify that the staged source files have matching entries in changelog.jsonl
    const changelogPath = path.join(rootDir, ".antigravity", "memory", "changelog.jsonl");
    if (!fs.existsSync(changelogPath)) {
        console.error("\n❌ ERROR: Changelog file not found at '.antigravity/memory/changelog.jsonl'.");
        process.exit(1);
    }

    const changelogLines = fs.readFileSync(changelogPath, "utf8").trim().split("\n").filter(Boolean);
    const changelogEntries = changelogLines.map((line, idx) => {
        try {
            return JSON.parse(line);
        } catch (e) {
            console.error(`\n❌ ERROR: Malformed JSON at line ${idx + 1} of '.antigravity/memory/changelog.jsonl'.`);
            process.exit(1);
        }
    });

    const missingFiles = [];
    for (const sourceFile of stagedSourceFiles) {
        // Find if there is an entry matching the source file path
        const matchesFile = changelogEntries.some(entry => entry.target_file === sourceFile);
        if (!matchesFile) {
            missingFiles.push(sourceFile);
        }
    }

    if (missingFiles.length > 0) {
        console.error("\n❌ ERROR: Antigravity Ledger Compliance Failure!");
        console.error("The following staged files do not have matching entries in '.antigravity/memory/changelog.jsonl':");
        console.error(missingFiles.map(f => `  - ${f}`).join("\n"));
        console.error("\nPlease append JSON objects for these files in the changelog and stage the ledger before committing.");
        process.exit(1);
    }

    console.log("✓ Antigravity Ledger validation passed successfully!");
    process.exit(0);
} catch (error) {
    if (error.status) {
        // execSync error (e.g. not in git repo)
        console.error("❌ Failed to execute git command. Ensure you are inside a Git repository.");
    } else {
        console.error("❌ Unexpected validation script error:", error.message);
    }
    process.exit(1);
}
