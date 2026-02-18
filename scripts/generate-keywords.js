import fs from 'fs';
import path from 'path';

// CONFIGURATION
const SERVICES = [
    "Agentic AI", "AI Automation", "Process Automation", "Predictive Analytics",
    "NLP Systems", "Web Solutions", "Enterprise Security", "IT Outsourcing",
    "Logistics AI", "Manufacturing AI", "Hiring Automation",
    "GenAI", "Custom AI Solution", "ML Model Development",
    "OCR Image Processing", "Pattern Recognition",
    "Computer Vision", "Recommendation Engines", "Chatbot Development",
    "Data Engineering", "Cloud AI Integration"
];

const LOCATIONS = [
    // Tier 1 (India)
    "Hosur", "Bangalore", "Bengaluru", "Coimbatore", "Chennai", "Tamil Nadu",
    // Tier 2 (India)
    "Salem", "Erode", "Tiruppur", "Madurai", "Trichy", "Mysore", "Hyderabad", "Kochi", "Pune", "Mumbai", "Delhi",
    // International
    "Singapore", "Dubai", "Abu Dhabi", "Riyadh", "Jeddah", "Doha", "London", "New York", "San Francisco", "Toronto", "Sydney", "Melbourne"
];

const INTENTS = [
    "Best", "Top", "Affordable", "Custom", "Enterprise", "Leading", "Expert"
];

const SUFFIXES = [
    "Company", "Agency", "Services", "Solutions", "Consultants", "Firm", "Provider"
];

const OUTPUT_FILE = 'public/keywords.txt';

console.log('🚀 Generating Keyword Strategy...');

const keywords = [];

// Combinatorial Generation
for (const loc of LOCATIONS) {
    for (const service of SERVICES) {
        for (const intent of INTENTS) {
            // Pattern 1: [Intent] [Service] [Suffix] [Location]
            // e.g. Best Agentic AI Company Hosur
            const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)]; // Randomize slightly or iterate
            keywords.push(`${intent} ${service} ${suffix} ${loc}`);
        }
        // Pattern 2: [Service] in [Location]
        keywords.push(`${service} in ${loc}`);
    }
}

// Add some specific long-tail
keywords.push("AI for Manufacturing in Hosur");
keywords.push("Logistics Automation for Dubai Companies");
keywords.push("Hiring Automation Agents for HR Departments");

const uniqueKeywords = [...new Set(keywords)];
const content = uniqueKeywords.join('\n');

const outputPath = path.join(process.cwd(), OUTPUT_FILE);
fs.writeFileSync(outputPath, content);

console.log(`✅ Generated ${uniqueKeywords.length} keywords.`);
console.log(`📄 Saved to ${OUTPUT_FILE}`);
