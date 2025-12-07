-- Add transcription column to technical_assessments table
ALTER TABLE "public"."technical_assessments" 
ADD COLUMN IF NOT EXISTS "transcription" text;
