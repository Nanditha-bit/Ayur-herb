import { useState, useRef } from "react";
import { Upload, FileJson, FileSpreadsheet, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ImportResult {
  success: boolean;
  total: number;
  successful: number;
  failed: number;
  validationErrors?: Array<{ row: number; field: string; error: string }>;
  message: string;
}

export const PlantImportTool = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileType = file.name.toLowerCase();
    if (!fileType.endsWith('.json') && !fileType.endsWith('.csv')) {
      toast.error('Invalid file type. Please upload a JSON or CSV file.');
      return;
    }

    setSelectedFile(file);
    setImportResult(null);
  };

  const handleImport = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    setIsProcessing(true);
    setImportResult(null);

    try {
      // Read file content
      const content = await selectedFile.text();

      // Call edge function to process import
      const { data, error } = await supabase.functions.invoke('process-plant-import', {
        body: {
          content,
          fileName: selectedFile.name
        }
      });

      if (error) throw error;

      setImportResult(data);
      
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error('Import completed with errors');
      }
    } catch (error) {
      console.error('Import error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to import plants');
    } finally {
      setIsProcessing(false);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setImportResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-6 w-6" />
          Import Verified Plant Data
        </CardTitle>
        <CardDescription>
          Upload CSV or JSON files containing verified Ayurvedic plant data. All data will be validated before importing.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* File Upload Section */}
        <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.csv"
            className="hidden"
            onChange={handleFileSelect}
            disabled={isProcessing}
          />
          
          {!selectedFile ? (
            <div className="space-y-4">
              <div className="flex justify-center gap-4">
                <FileJson className="h-12 w-12 text-muted-foreground" />
                <FileSpreadsheet className="h-12 w-12 text-muted-foreground" />
              </div>
              <div>
                <p className="text-lg font-medium mb-2">Choose a file to import</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Supported formats: JSON (.json) or CSV (.csv)
                </p>
                <Button onClick={() => fileInputRef.current?.click()}>
                  Select File
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                {selectedFile.name.endsWith('.json') ? (
                  <FileJson className="h-8 w-8 text-primary" />
                ) : (
                  <FileSpreadsheet className="h-8 w-8 text-primary" />
                )}
                <span className="font-medium">{selectedFile.name}</span>
              </div>
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={handleImport}
                  disabled={isProcessing}
                  className="min-w-32"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Import Data
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={clearFile} disabled={isProcessing}>
                  Clear
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Import Results */}
        {importResult && (
          <div className="space-y-4">
            <Alert className={importResult.success ? "border-green-500" : "border-yellow-500"}>
              <div className="flex items-start gap-2">
                {importResult.success ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                )}
                <div className="flex-1">
                  <AlertDescription>
                    <p className="font-medium mb-2">{importResult.message}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total records:</span>
                        <span className="font-medium">{importResult.total}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Successfully imported:</span>
                        <span className="font-medium">{importResult.successful}</span>
                      </div>
                      {importResult.failed > 0 && (
                        <div className="flex justify-between text-destructive">
                          <span>Failed:</span>
                          <span className="font-medium">{importResult.failed}</span>
                        </div>
                      )}
                      <Progress 
                        value={(importResult.successful / importResult.total) * 100} 
                        className="mt-2"
                      />
                    </div>
                  </AlertDescription>
                </div>
              </div>
            </Alert>

            {/* Validation Errors */}
            {importResult.validationErrors && importResult.validationErrors.length > 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <p className="font-medium mb-2">Validation Errors:</p>
                  <div className="max-h-40 overflow-y-auto space-y-1 text-xs">
                    {importResult.validationErrors.slice(0, 10).map((error, index) => (
                      <div key={index}>
                        Row {error.row}: {error.field} - {error.error}
                      </div>
                    ))}
                    {importResult.validationErrors.length > 10 && (
                      <div className="text-muted-foreground mt-2">
                        ... and {importResult.validationErrors.length - 10} more errors
                      </div>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Format Information */}
        <div className="bg-muted p-4 rounded-lg space-y-3">
          <h4 className="font-medium">Required Fields:</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>plant_id (unique identifier)</li>
            <li>sanskrit_name</li>
            <li>botanical_name</li>
            <li>family</li>
            <li>common_name</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-2">
            Optional fields: sanskrit_synonyms, botanical_synonyms, vernacular_names, morphology, 
            rasapanchaka, karma, therapeutic_uses, and more.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
