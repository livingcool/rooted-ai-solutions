-- Add department column to jobs table
ALTER TABLE "public"."jobs" 
ADD COLUMN "department" text DEFAULT 'Engineering';

-- Update existing jobs to have a default department if needed (optional, handled by default)
