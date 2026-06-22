import { Metadata } from "next";
import { supabase } from "@/integrations/supabase/client";
import BlogClient from "./BlogClient";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { data: post } = await (supabase
        .from('blog_posts' as any)
        .select('*')
        .eq('slug', params.slug)
        .single() as any);

    if (!post) return { title: "Post Not Found" };

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.cover_image ? [{ url: post.cover_image }] : [],
            type: "article",
            publishedTime: post.published_at,
            authors: [post.author || "RootedAI Team"],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: post.cover_image ? [post.cover_image] : [],
        },
    };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const { data: post } = await (supabase
        .from('blog_posts' as any)
        .select('*')
        .eq('slug', params.slug)
        .single() as any);

    if (!post) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.cover_image,
        "url": `https://www.rootedai.co.in/blog/${post.slug}`,
        "datePublished": post.created_at,
        "dateModified": post.updated_at || post.created_at,
        "author": {
            "@type": "Organization",
            "name": "RootedAI Solutions",
            "url": "https://www.rootedai.co.in"
        },
        "publisher": {
            "@type": "Organization",
            "name": "RootedAI Solutions",
            "url": "https://www.rootedai.co.in"
        }
    };

    return (
        <div className="min-h-screen relative bg-white dark:bg-black">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BlogClient post={post} />
        </div>
    );
}
