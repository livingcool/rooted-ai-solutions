ALTER TABLE jobs ADD COLUMN IF NOT EXISTS department TEXT DEFAULT 'Engineering';
ALTER TABLE jobs ADD CONSTRAINT jobs_department_check CHECK (department IN ('Engineering', 'Marketing', 'Sales', 'Product', 'Design', 'Operations'));
