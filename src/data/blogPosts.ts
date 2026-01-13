import { Share2, Clock, Calendar, User, ArrowRight } from "lucide-react";

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    date: string;
    readTime: string;
    author: string;
    category: string;
    content: string; // HTML or Markdown content
}

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        slug: "scaling-is-bankrupting-you",
        title: "Scaling Your Team is Bankrupting You: Why AI Agents Are the Only Way Forward",
        excerpt: "You think hiring more staff is a sign of growth. In 2026, it's actually a symptom of inefficiency. Discover why the old playbook of 'throwing bodies at the problem' is dead.",
        coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        date: "Jan 12, 2026",
        readTime: "5 min read",
        author: "Ganesh K",
        category: "Business Strategy",
        content: `
            <div class="blog-content space-y-8">
                <p class="text-xl font-medium leading-relaxed text-foreground/80">
                    You think hiring more staff is a sign of growth. In the modern economy, it's often a symptom of inefficiency.
                </p>

                <p class="leading-relaxed text-muted-foreground">
                    For decades, the standard playbook for business growth was simple: get more customers, hire more people to serve them. Line goes up, headcount goes up. It was a linear equation. But we have entered an era of exponential leverage, where this old equation isn't just outdated—it's dangerous.
                </p>

                <div class="my-12 p-8 bg-zinc-50 dark:bg-zinc-900 border-l-4 border-black dark:border-white rounded-r-xl">
                    <h3 class="text-2xl font-bold mb-4">The Bottleneck</h3>
                    <p class="italic text-lg">
                        "The most expensive resource in your company isn't your server cost—it's the friction of human coordination."
                    </p>
                </div>

                <h2 class="text-3xl font-bold mt-12 mb-6">The Trap of Headcount Vanity</h2>
                <p class="leading-relaxed text-muted-foreground mb-6">
                    We've been conditioned to celebrate "headcount growth" as a proxy for success. "We just scaled to 50 employees!" sounds impressive on LinkedIn. But what does it really mean? It means your overhead has exploded. It means your coordination costs have skyrocketed. It means you are now slower, not faster.
                </p>
                
                <h3 class="text-2xl font-bold mt-8 mb-4">Linear Costs vs. Exponential Output</h3>
                <p class="leading-relaxed text-muted-foreground mb-6">
                    Humans scale linearly. To double your manual output, you typically need to double your team (and double your costs). AI Agents scale exponentially. Once you build an agent to handle a workflow—whether it's customer support, data entry, or lead qualification—it costs nearly zero to run it 100 times or 10,000 times.
                </p>
                <ul class="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
                    <li><strong>Humans:</strong> 8 hours/day, sick days, training periods, context switching.</li>
                    <li><strong>AI Agents:</strong> 24/7 uptime, instant scaling, zero memory loss.</li>
                </ul>

                <h2 class="text-3xl font-bold mt-12 mb-6">Real World Math: The Ops Nightmare</h2>
                <p class="leading-relaxed text-muted-foreground mb-6">
                    Let's look at a typical scenario. You have a customer support backlog.
                </p>
                <p class="leading-relaxed text-muted-foreground mb-6">
                    <strong>Option A (Traditional):</strong> Hire 3 junior support reps. 
                    <br/>Cost: $150k/year (Salaries + Benefits + Equipment). 
                    <br/>Result: Backlog clears during business hours. Quality varies.
                </p>
                <p class="leading-relaxed text-muted-foreground mb-6">
                    <strong>Option B (The New Way):</strong> Deploy a fine-tuned RAG (Retrieval-Augmented Generation) Agent.
                    <br/>Cost: ~$20k setup + minimal monthly API fees.
                    <br/>Result: Backlog clears instantly, 24/7. Consistent answers.
                </p>
                
                <p class="leading-relaxed text-muted-foreground">
                    This isn't about replacing people—it's about replacing <em>drudgery</em>. Your best employees shouldn't be copy-pasting data; they should be solving strategic problems.
                </p>

                <h2 class="text-3xl font-bold mt-12 mb-6">The Engagement Trap</h2>
                <p class="leading-relaxed text-muted-foreground mb-6">
                    Companies that fail to adopt this shift won't just be less profitable; they will be structurally uncompetitive. While you are managing shift schedules, your competitor is deploying agents that wake up and work before you've had your coffee.
                </p>

                <div class="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                    <h3 class="text-2xl font-bold mb-4">Conclusion</h3>
                    <p class="leading-relaxed text-muted-foreground mb-6">
                        Stop measuring your company's size by the number of chairs in the office. Start measuring it by the leverage of your systems. The future belongs to lean teams with massive output.
                    </p>
                    <p class="font-medium text-lg text-foreground">
                        Be honest: How many hours of manual, repetitive work is your team drowning in right now?
                    </p>
                </div>
            </div>
        `
    },
    {
        id: "2",
        slug: "future-of-outsourcing-is-autonomous",
        title: "The Future of Outsourcing is Autonomous",
        excerpt: "Why traditional BPO models are collapsing and how autonomous agents are redefining what it means to 'outsource' work.",
        coverImage: "https://images.unsplash.com/photo-1488229297570-58520851e868?q=80&w=2669&auto=format&fit=crop",
        date: "Jan 08, 2026",
        readTime: "4 min read",
        author: "RootedAI Research",
        category: "Outsourcing",
        content: "<p>Content coming soon...</p>"
    },
    {
        id: "3",
        slug: "predictive-analytics-retail-revolution",
        title: "How Predictive Analytics is Saving Retailers Billions",
        excerpt: "Stop guessing what your customers want. Learn how AI-driven demand forecasting is eliminating stockouts and dead inventory.",
        coverImage: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2670&auto=format&fit=crop",
        date: "Jan 03, 2026",
        readTime: "6 min read",
        author: "RootedAI Tech Team",
        category: "Data Science",
        content: "<p>Content coming soon...</p>"
    }
];
