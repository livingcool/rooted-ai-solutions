import { NextResponse } from 'next/server';
import { supabase } from '@/integrations/supabase/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Basic validation for AI agents
    const { name, email, company, service_needed, message } = body;
    
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields (name, email, message)" }, { status: 400 });
    }

    const data = {
      name,
      email,
      company: company || 'AI Agent Submission',
      project_type: service_needed || 'AI Discovery',
      message: `${message} (SUBMITTED VIA AI AGENT API)`,
    };

    const { error } = await (supabase
      .from('contact_submissions')
      .insert([data]) as any);

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      message: "Lead received via AI Agent API. Our team will contact the provided email.",
      status: "Transmission Successful"
    });

  } catch (error: any) {
    console.error('AI API Error:', error);
    return NextResponse.json({ error: "Internal Server Error", detail: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: "RootedAI Agent API is active.",
    capabilities: ["Lead Submission"],
    docs: "/ai-actions.json"
  });
}
