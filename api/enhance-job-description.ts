export const config = {
    runtime: 'edge',
};

export default async function handler(req: Request) {
    if (req.method === 'OPTIONS') {
        return new Response('ok', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
            },
        });
    }

    try {
        const { title, description, requirements } = await req.json();

        const prompt = `
        You are an expert HR Specialist and Tech Recruiter at "RootedAI". Enhance the following job description to be professional, engaging, and clear.

        **CRITICAL RULES:**
        1. **NO MARKDOWN**: Do not use bold (**), italics (*), headers (#), or any other markdown formatting. Use plain text only.
        2. **NO HASHTAGS**: Do not use hashtags (#) anywhere.
        3. **STRUCTURE**: Organize the description into clear sections using plain text labels like "About RootedAI:", "About the Role:", "Key Responsibilities:", and "What We Offer:".
        4. **SKILLS ONLY**: Provide exactly 5 to 8 key requirements. Each requirement must be a specific technical skill or core competency (e.g., "React", "Node.js", "Project Management"). Do NOT use full sentences. Max 3-5 words per item.

        Job Title: ${title}
        Current Description: ${description}
        Current Requirements: ${requirements}
        
        Also, suggest a list of relevant tech stacks and software that would be needed for this role if not already mentioned.
        
        Provide a JSON output with:
        - enhanced_description: string (The improved job description in plain text, structured with labels)
        - recommended_requirements: string[] (Array of 5-8 concise requirement strings)
        - tech_stack: string[] (List of specific technologies/software relevant to the role)
        `;

        console.log("Request received");
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            console.error("GROQ_API_KEY missing");
            return new Response(
                JSON.stringify({ error: "GROQ_API_KEY is not set in environment variables." }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        console.log("Generating content with Groq...");
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant that outputs JSON.' },
                    { role: 'user', content: prompt }
                ],
                response_format: { type: 'json_object' }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Groq API Error:", errorText);
            throw new Error(`Groq API Error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        console.log("Groq Response:", content);

        let aiResult;
        try {
            aiResult = JSON.parse(content);

            // Ensure requirements are a string for the frontend
            if (Array.isArray(aiResult.recommended_requirements)) {
                aiResult.recommended_requirements = aiResult.recommended_requirements.join(', ');
            }
        } catch (e) {
            console.error("JSON Parse Error:", e);
            aiResult = {
                enhanced_description: description,
                recommended_requirements: requirements,
                tech_stack: []
            };
        }

        return new Response(
            JSON.stringify(aiResult),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }
        );

    } catch (error: any) {
        console.error("Error in enhance-job-description:", error);
        const errorMessage = error.message || "Unknown error";
        const errorDetails = JSON.stringify(error, Object.getOwnPropertyNames(error));

        return new Response(
            JSON.stringify({ error: errorMessage, details: errorDetails }),
            {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }
        );
    }
}
