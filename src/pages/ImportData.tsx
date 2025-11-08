import { PlantImportTool } from "@/components/PlantImportTool";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ImportData = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-earth py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Database
        </Button>

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Import Verified Plant Data</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload verified Ayurvedic plant data from external sources. 
            All imports are validated and logged for quality assurance.
          </p>
        </div>

        <PlantImportTool />
      </div>
    </div>
  );
};

export default ImportData;
