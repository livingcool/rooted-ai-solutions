export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
export type JobLocation = 'Remote' | 'Hybrid' | 'On-site';

export interface Job {
    id: string;
    title: string;
    description: string;
    requirements: string[];
    type: JobType;
    location: JobLocation;
    salary_range?: string;
    department?: string;
    is_active: boolean;
    created_at: string;
}

export interface Interview {
    id: string;
    application_id: string;
    question: string;
    audio_url: string;
    transcription?: string;
    ai_score?: number;
    ai_feedback?: string;
    created_at: string;
    audio_signed_url?: string; // For frontend display
}

export interface JobApplication {
    id: string;
    job_id: string;
    full_name: string;
    email: string;
    phone?: string;
    resume_url: string;
    cover_letter?: string;
    portfolio_url?: string;
    status: 'Applied' | 'AI Assessed' | 'Communication Round' | 'Communication Round Completed' | 'Technical Round' | 'Technical Round Completed' | 'Final Interview' | 'Offer Sent' | 'Hired' | 'Rejected';
    ai_score?: number;
    ai_feedback?: string;
    created_at: string;
    interviews?: Interview[];
    technical_assessments?: TechnicalAssessment[];
    final_interviews?: FinalInterview[]; // Added
    jobs?: { title: string }; // Joined property
}

export interface FinalInterview {
    id: string;
    application_id: string;
    interview_token: string;
    scheduled_at?: string;
    status: 'Scheduled' | 'Completed' | 'Analyzed' | 'Offer' | 'Rejected';
    ai_confidence_score?: number;
    ai_role_fit_score?: number;
    ai_feedback?: string;
    ai_recommendation?: 'Strong Hire' | 'Hire' | 'No Hire';
    transcript?: string;
    created_at: string;
}

export interface TechnicalAssessment {
    id: string;
    application_id: string;
    project_description: string;
    deadline: string;
    video_url?: string;
    github_url?: string;
    deployed_url?: string;
    loom_video_url?: string;
    issues_faced?: string;
    tech_stack?: string;
    process_flow?: string;
    cost_analysis?: string;
    improvement_suggestions?: string;
    ai_score?: number;
    ai_feedback?: string;
    status: string;
    created_at: string;
    submitted_at?: string;
    updated_at: string;
}
