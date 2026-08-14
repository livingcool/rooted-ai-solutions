-- Enable Row Level Security on newsletter_subscribers table
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public users to subscribe (insert only)
CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.newsletter_subscribers 
FOR INSERT 
WITH CHECK (true);

-- Allow authenticated admins to view/manage all newsletter subscribers
CREATE POLICY "Admins can manage newsletter subscribers" 
ON public.newsletter_subscribers 
FOR ALL 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'));

-- Enable Row Level Security on ai_usage_alerts table
ALTER TABLE public.ai_usage_alerts ENABLE ROW LEVEL SECURITY;

-- Allow authenticated admins to view/manage all AI usage alerts
CREATE POLICY "Admins can manage ai_usage_alerts" 
ON public.ai_usage_alerts 
FOR ALL 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'));
