-- Create an enum for user roles if it doesn't exist
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create update_updated_at_column function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create user_roles table to manage who has admin access
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create a security definer function to check if a user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create RLS policies for user_roles table

-- Only admins can view all roles
DROP POLICY IF EXISTS "Admins can view all user roles" ON public.user_roles;
CREATE POLICY "Admins can view all user roles" 
ON public.user_roles 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

-- Users can view their own roles
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Only admins can assign roles
DROP POLICY IF EXISTS "Admins can insert user roles" ON public.user_roles;
CREATE POLICY "Admins can insert user roles" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update roles
DROP POLICY IF EXISTS "Admins can update user roles" ON public.user_roles;
CREATE POLICY "Admins can update user roles" 
ON public.user_roles 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete roles
DROP POLICY IF EXISTS "Admins can delete user roles" ON public.user_roles;
CREATE POLICY "Admins can delete user roles" 
ON public.user_roles 
FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for user_roles updated_at
DROP TRIGGER IF EXISTS update_user_roles_updated_at ON public.user_roles;
CREATE TRIGGER update_user_roles_updated_at
    BEFORE UPDATE ON public.user_roles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
