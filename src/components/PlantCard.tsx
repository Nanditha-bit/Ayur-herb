import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Maximize2 } from "lucide-react";
import { ImageLightbox } from "./ImageLightbox";
import { useState } from "react";

interface PlantCardProps {
  plant: {
    id: string;
    imageUrl?: string;
    sanskritName: string;
    botanicalName: string;
    vernacularName: string;
    family: string;
    therapeuticUses: string[];
  };
  onClick: () => void;
}

export const PlantCard = ({ plant, onClick }: PlantCardProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxOpen(true);
  };

  return (
    <>
      <Card
        className="cursor-pointer hover:shadow-medium transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        onClick={onClick}
      >
        {plant.imageUrl && (
          <div 
            className="w-full h-48 overflow-hidden relative group"
            onClick={handleImageClick}
          >
            <img
              src={plant.imageUrl}
              alt={plant.sanskritName}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Maximize2 className="h-8 w-8 text-white" />
            </div>
          </div>
        )}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-primary mb-1">
              {plant.sanskritName}
            </CardTitle>
            <p className="text-sm text-muted-foreground italic">
              {plant.botanicalName}
            </p>
          </div>
          <Leaf className="h-5 w-5 text-accent" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-medium text-foreground">
            {plant.vernacularName}
          </p>
          <p className="text-xs text-muted-foreground">Family: {plant.family}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {plant.therapeuticUses.slice(0, 3).map((use, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {use}
            </Badge>
          ))}
          {plant.therapeuticUses.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{plant.therapeuticUses.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>

    {plant.imageUrl && (
      <ImageLightbox
        imageUrl={plant.imageUrl}
        alt={plant.sanskritName}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    )}
    </>
  );
};
