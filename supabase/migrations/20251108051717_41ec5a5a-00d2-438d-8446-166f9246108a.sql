-- Create storage bucket for plant data imports
INSERT INTO storage.buckets (id, name, public)
VALUES ('plant-imports', 'plant-imports', false);

-- Create RLS policies for plant imports bucket
CREATE POLICY "Allow authenticated users to upload plant data"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'plant-imports');

CREATE POLICY "Allow authenticated users to view their uploads"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'plant-imports');

CREATE POLICY "Allow authenticated users to delete their uploads"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'plant-imports');

-- Create verified_plants table
CREATE TABLE IF NOT EXISTS public.verified_plants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plant_id TEXT UNIQUE NOT NULL,
  sanskrit_name TEXT NOT NULL,
  sanskrit_synonyms JSONB DEFAULT '[]'::jsonb,
  botanical_name TEXT NOT NULL,
  botanical_synonyms TEXT[],
  family TEXT NOT NULL,
  vernacular_names JSONB DEFAULT '{}'::jsonb,
  common_name TEXT NOT NULL,
  classification JSONB DEFAULT '{}'::jsonb,
  morphology JSONB DEFAULT '{}'::jsonb,
  rasapanchaka JSONB DEFAULT '{}'::jsonb,
  dosha_karma JSONB DEFAULT '{}'::jsonb,
  karma TEXT[],
  indications TEXT[],
  chemical_constituents TEXT[],
  useful_parts TEXT[],
  dosage TEXT,
  therapeutic_uses TEXT[],
  formulations TEXT[],
  source_references TEXT[],
  modern_pharmacology TEXT[],
  image_url TEXT,
  verified_by TEXT,
  verification_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  data_source TEXT,
  is_verified BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on verified_plants
ALTER TABLE public.verified_plants ENABLE ROW LEVEL SECURITY;

-- RLS policies for verified_plants
CREATE POLICY "Allow public read access to verified plants"
ON public.verified_plants
FOR SELECT
TO public
USING (is_verified = true);

CREATE POLICY "Allow authenticated users to insert verified plants"
ON public.verified_plants
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update verified plants"
ON public.verified_plants
FOR UPDATE
TO authenticated
USING (true);

-- Create import_logs table to track imports
CREATE TABLE IF NOT EXISTS public.plant_import_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  total_records INTEGER DEFAULT 0,
  successful_imports INTEGER DEFAULT 0,
  failed_imports INTEGER DEFAULT 0,
  validation_errors JSONB DEFAULT '[]'::jsonb,
  import_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on import_logs
ALTER TABLE public.plant_import_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies for import_logs
CREATE POLICY "Users can view their own import logs"
ON public.plant_import_logs
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own import logs"
ON public.plant_import_logs
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_verified_plants_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_verified_plants_updated_at
BEFORE UPDATE ON public.verified_plants
FOR EACH ROW
EXECUTE FUNCTION public.update_verified_plants_updated_at();