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

export interface JobApplication {
    id: string;
    job_id: string;
    full_name: string;
    email: string;
    phone?: string;
    resume_url: string;
    cover_letter?: string;
    portfolio_url?: string;
    status: 'Applied' | 'AI Assessed' | 'Communication Round' | 'Communication Round Completed' | 'Technical Round' | 'Hired' | 'Rejected';
    ai_score?: number;
    ai_feedback?: string;
    created_at: string;
}
