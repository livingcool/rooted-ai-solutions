import { Metadata } from "next";
import { supabase } from "@/integrations/supabase/client";
import JobDetailClient from "./JobDetailClient";
import { notFound } from "next/navigation";

interface Props {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slugOrId = params.slug;
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slugOrId);

    let query = supabase.from('jobs' as any).select('*');
    if (isUuid) {
        query = query.eq('id', slugOrId);
    } else {
        query = query.eq('slug', slugOrId);
    }

    const { data: job } = await (query.single() as any);

    if (!job) return { title: "Job Not Found" };

    return {
        title: `${job.title} | Careers | Rooted AI Solutions`,
        description: job.description ? `${job.description.substring(0, 150)}...` : `Join the team as a ${job.title} at Rooted AI Solutions.`,
        alternates: {
            canonical: `/careers/${job.slug || job.id}`,
        },
        openGraph: {
            title: `${job.title} | Careers | Rooted AI Solutions`,
            description: job.description ? `${job.description.substring(0, 150)}...` : `Join the team as a ${job.title} at Rooted AI Solutions.`,
            type: "website",
        },
    };
}

export default async function JobDetailPage({ params }: Props) {
    const slugOrId = params.slug;
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slugOrId);

    let query = supabase.from('jobs' as any).select('*');
    if (isUuid) {
        query = query.eq('id', slugOrId);
    } else {
        query = query.eq('slug', slugOrId);
    }

    const { data: job } = await (query.single() as any);

    if (!job) {
        notFound();
    }

    return <JobDetailClient job={job} />;
}
