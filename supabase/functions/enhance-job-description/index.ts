import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { title, description, requirements } = await req.json()

        const apiKey = Deno.env.get('GEMINI_API_KEY');
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is not set in environment variables.");
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

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
        `

        const result = await model.generateContent(prompt)
        const responseText = result.response.text()

        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const jsonStr = jsonMatch ? jsonMatch[0] : responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        let aiResult;
        try {
            aiResult = JSON.parse(jsonStr);

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
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error: any) {
        console.error("Error in enhance-job-description:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }
})
