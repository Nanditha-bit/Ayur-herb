import { useState } from "react";
import { CameraScanner } from "@/components/CameraScanner";
import { PlantCard } from "@/components/PlantCard";
import { PlantDetails } from "@/components/PlantDetails";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { allPlantsDatabase, searchPlants, Plant, getTotalPlantCount, getVerifiedPlantCount } from "@/data/plantsData";
import { Leaf, Search, BookOpen, Info } from "lucide-react";
import heroImage from "@/assets/hero-botanical.jpg";
import { toast } from "sonner";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const filteredPlants = searchQuery
    ? searchPlants(searchQuery)
    : allPlantsDatabase;
  
  const totalPlants = getTotalPlantCount();
  const verifiedPlants = getVerifiedPlantCount();

  const handleImageCapture = async (imageData: string) => {
    try {
      toast.info("Analyzing plant with AI...");
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/identify-plant`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ imageData }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to identify plant');
      }

      const { identification } = await response.json();
      
      // Search for matching plant in database
      const matchingPlant = allPlantsDatabase.find(plant => 
        plant.sanskritName.toLowerCase().includes(identification.sanskritName.toLowerCase()) ||
        plant.botanicalName.toLowerCase().includes(identification.botanicalName.toLowerCase())
      );

      if (matchingPlant) {
        setSelectedPlant(matchingPlant);
        toast.success(`Plant identified: ${matchingPlant.sanskritName}`);
      } else {
        // Show AI identification result even if not in database
        toast.success(`Identified as: ${identification.sanskritName} (${identification.botanicalName})`);
        toast.info(`Confidence: ${identification.confidence}. This plant is not in our database yet.`);
      }
      
      setShowScanner(false);
      setShowDetails(true);
    } catch (error) {
      console.error('Plant identification error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to identify plant. Please try again.');
    }
  };

  const handlePlantClick = (plant: Plant) => {
    setSelectedPlant(plant);
    setShowDetails(true);
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/40" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 text-primary-foreground">
          <Leaf className="h-16 w-16 mb-4 animate-fade-in" />
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            Ayurvedic Plant Database
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl animate-fade-in">
            Discover the healing power of nature through ancient Ayurvedic wisdom
          </p>
          <div className="flex gap-4 animate-fade-in">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setShowScanner(true)}
              className="shadow-medium"
            >
              <Search className="mr-2 h-5 w-5" />
              Scan Plant
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20"
              onClick={() => {
                document.getElementById("database")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Browse Database
            </Button>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg shadow-soft text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Scan & Identify</h3>
            <p className="text-muted-foreground">
              Use your camera to instantly identify medicinal plants
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-soft text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Comprehensive Info</h3>
            <p className="text-muted-foreground">
              Detailed Ayurvedic properties, uses, and modern research
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-soft text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Works Offline</h3>
            <p className="text-muted-foreground">
              Access the entire database without internet connection
            </p>
          </div>
        </div>
      </section>

      {/* Database Section */}
      <section id="database" className="py-12 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-primary">Plant Database</h2>
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">{totalPlants}</span> plants total
              <span className="mx-2">•</span>
              <span className="font-semibold text-accent">{verifiedPlants}</span> verified
              <span className="mx-2">•</span>
              <span className="font-semibold text-muted-foreground">{totalPlants - verifiedPlants}</span> test data
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by Sanskrit name, botanical name, or therapeutic use..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 text-lg shadow-soft"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onClick={() => handlePlantClick(plant)}
            />
          ))}
        </div>

        {filteredPlants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No plants found matching your search.
            </p>
          </div>
        )}
      </section>

      {/* Scanner Dialog */}
      <Dialog open={showScanner} onOpenChange={setShowScanner}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Scan Plant</DialogTitle>
          </DialogHeader>
          <CameraScanner onImageCapture={handleImageCapture} />
        </DialogContent>
      </Dialog>

      {/* Plant Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Plant Details</DialogTitle>
          </DialogHeader>
          {selectedPlant && <PlantDetails plant={selectedPlant} />}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="bg-destructive/20 border border-destructive/50 rounded-lg p-4 max-w-3xl mx-auto">
            <p className="text-sm font-semibold mb-2">⚠️ IMPORTANT DISCLAIMER</p>
            <p className="text-xs">
              This database contains {verifiedPlants} verified Ayurvedic plants and {totalPlants - verifiedPlants} AI-generated 
              placeholder entries for testing purposes only. Plants beyond the first 3 have NOT been medically verified.
              DO NOT use this information for medical treatment without consulting a qualified Ayurvedic practitioner.
            </p>
          </div>
          <p className="text-sm">
            This app provides information for educational purposes only. Always consult
            with a qualified Ayurvedic practitioner before using any medicinal plants.
          </p>
          <p className="text-xs opacity-80">
            © 2025 Ayurvedic Plant Database. Built with ancient wisdom and modern technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
