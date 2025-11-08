import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PlantData {
  plant_id: string;
  sanskrit_name: string;
  sanskrit_synonyms?: Array<{ name: string; meaning: string }>;
  botanical_name: string;
  botanical_synonyms?: string[];
  family: string;
  vernacular_names?: Record<string, string>;
  common_name: string;
  classification?: Record<string, any>;
  morphology?: Record<string, any>;
  rasapanchaka?: Record<string, any>;
  dosha_karma?: Record<string, any>;
  karma?: string[];
  indications?: string[];
  chemical_constituents?: string[];
  useful_parts?: string[];
  dosage?: string;
  therapeutic_uses?: string[];
  formulations?: string[];
  source_references?: string[];
  modern_pharmacology?: string[];
  image_url?: string;
  data_source?: string;
}

interface ValidationError {
  row: number;
  field: string;
  error: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: fileData } = await req.json();
    
    if (!fileData || !fileData.content || !fileData.fileName) {
      return new Response(
        JSON.stringify({ error: 'File content and fileName are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Processing import:', fileData.fileName);

    let plants: PlantData[] = [];
    const fileType = fileData.fileName.endsWith('.json') ? 'json' : 'csv';

    // Parse file content
    if (fileType === 'json') {
      try {
        plants = JSON.parse(fileData.content);
        if (!Array.isArray(plants)) {
          throw new Error('JSON content must be an array of plant objects');
        }
      } catch (error) {
        return new Response(
          JSON.stringify({ error: 'Invalid JSON format', details: error.message }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    } else {
      // Simple CSV parsing
      const lines = fileData.content.split('\n').filter((line: string) => line.trim());
      if (lines.length < 2) {
        return new Response(
          JSON.stringify({ error: 'CSV file must have headers and at least one data row' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const headers = lines[0].split(',').map((h: string) => h.trim());
      plants = lines.slice(1).map((line: string) => {
        const values = line.split(',').map((v: string) => v.trim());
        const plant: any = {};
        headers.forEach((header: string, index: number) => {
          plant[header] = values[index] || '';
        });
        return plant;
      });
    }

    // Validate and process plants
    const validationErrors: ValidationError[] = [];
    const successfulImports: PlantData[] = [];
    const failedImports: number[] = [];

    for (let i = 0; i < plants.length; i++) {
      const plant = plants[i];
      const rowNum = i + 1;

      // Required field validation
      if (!plant.plant_id) {
        validationErrors.push({ row: rowNum, field: 'plant_id', error: 'Plant ID is required' });
        failedImports.push(rowNum);
        continue;
      }
      if (!plant.sanskrit_name) {
        validationErrors.push({ row: rowNum, field: 'sanskrit_name', error: 'Sanskrit name is required' });
        failedImports.push(rowNum);
        continue;
      }
      if (!plant.botanical_name) {
        validationErrors.push({ row: rowNum, field: 'botanical_name', error: 'Botanical name is required' });
        failedImports.push(rowNum);
        continue;
      }
      if (!plant.family) {
        validationErrors.push({ row: rowNum, field: 'family', error: 'Family is required' });
        failedImports.push(rowNum);
        continue;
      }
      if (!plant.common_name) {
        validationErrors.push({ row: rowNum, field: 'common_name', error: 'Common name is required' });
        failedImports.push(rowNum);
        continue;
      }

      // Data type validation and formatting
      const formattedPlant: PlantData = {
        plant_id: plant.plant_id,
        sanskrit_name: plant.sanskrit_name,
        botanical_name: plant.botanical_name,
        family: plant.family,
        common_name: plant.common_name,
        sanskrit_synonyms: Array.isArray(plant.sanskrit_synonyms) ? plant.sanskrit_synonyms : [],
        botanical_synonyms: Array.isArray(plant.botanical_synonyms) ? plant.botanical_synonyms : [],
        vernacular_names: typeof plant.vernacular_names === 'object' ? plant.vernacular_names : {},
        classification: typeof plant.classification === 'object' ? plant.classification : {},
        morphology: typeof plant.morphology === 'object' ? plant.morphology : {},
        rasapanchaka: typeof plant.rasapanchaka === 'object' ? plant.rasapanchaka : {},
        dosha_karma: typeof plant.dosha_karma === 'object' ? plant.dosha_karma : {},
        karma: Array.isArray(plant.karma) ? plant.karma : [],
        indications: Array.isArray(plant.indications) ? plant.indications : [],
        chemical_constituents: Array.isArray(plant.chemical_constituents) ? plant.chemical_constituents : [],
        useful_parts: Array.isArray(plant.useful_parts) ? plant.useful_parts : [],
        therapeutic_uses: Array.isArray(plant.therapeutic_uses) ? plant.therapeutic_uses : [],
        formulations: Array.isArray(plant.formulations) ? plant.formulations : [],
        source_references: Array.isArray(plant.source_references) ? plant.source_references : [],
        modern_pharmacology: Array.isArray(plant.modern_pharmacology) ? plant.modern_pharmacology : [],
        dosage: plant.dosage || '',
        image_url: plant.image_url || null,
        data_source: plant.data_source || fileData.fileName,
      };

      successfulImports.push(formattedPlant);
    }

    // Insert successful imports into database
    let insertedCount = 0;
    if (successfulImports.length > 0) {
      const { data, error: insertError } = await supabase
        .from('verified_plants')
        .upsert(successfulImports, { onConflict: 'plant_id' });

      if (insertError) {
        console.error('Database insert error:', insertError);
        return new Response(
          JSON.stringify({ 
            error: 'Failed to insert plants into database', 
            details: insertError.message 
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      insertedCount = successfulImports.length;
    }

    // Create import log
    const { data: userData, error: userError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
    
    if (!userError && userData.user) {
      await supabase
        .from('plant_import_logs')
        .insert({
          user_id: userData.user.id,
          file_name: fileData.fileName,
          file_type: fileType,
          total_records: plants.length,
          successful_imports: insertedCount,
          failed_imports: failedImports.length,
          validation_errors: validationErrors,
          import_status: failedImports.length === 0 ? 'completed' : 'partial'
        });
    }

    return new Response(
      JSON.stringify({
        success: true,
        total: plants.length,
        successful: insertedCount,
        failed: failedImports.length,
        validationErrors: validationErrors.length > 0 ? validationErrors : undefined,
        message: `Successfully imported ${insertedCount} out of ${plants.length} plants`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in process-plant-import:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
