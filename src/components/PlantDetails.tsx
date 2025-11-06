import { Plant } from "@/data/plantsData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Leaf, BookOpen, Beaker, Pill, AlertCircle } from "lucide-react";

interface PlantDetailsProps {
  plant: Plant;
}

export const PlantDetails = ({ plant }: PlantDetailsProps) => {
  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-6 p-6">
        {/* Plant Image */}
        {plant.imageUrl && (
          <div className="w-full h-64 rounded-lg overflow-hidden">
            <img
              src={plant.imageUrl}
              alt={plant.sanskritName}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-primary">
                {plant.sanskritName}
              </h1>
              <p className="text-xl italic text-muted-foreground">
                {plant.botanicalName}
              </p>
              <p className="text-lg">{plant.vernacularName}</p>
            </div>
            <Leaf className="h-12 w-12 text-accent" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-sm">
              {plant.family}
            </Badge>
            <Badge variant="secondary" className="text-sm">
              {plant.usefulPart.join(", ")}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Synonyms */}
        {plant.synonyms.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Sanskrit Synonyms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {plant.synonyms.map((syn, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-medium">{syn.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {syn.meaning}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Vernacular Names */}
        <Card>
          <CardHeader>
            <CardTitle>Regional Names</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(plant.vernacularNames).map(([lang, name]) => (
                <div key={lang}>
                  <span className="text-sm font-medium capitalize">{lang}:</span>{" "}
                  <span className="text-sm">{name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs for detailed information */}
        <Tabs defaultValue="properties" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="morphology">Morphology</TabsTrigger>
            <TabsTrigger value="therapeutic">Therapeutic</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="space-y-4 mt-4">
            {/* Rasapanchaka */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  Rasapanchaka (Ayurvedic Properties)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="font-medium">Rasa (Taste):</span>{" "}
                  {plant.rasapanchaka.rasa.join(", ")}
                </div>
                <div>
                  <span className="font-medium">Guna (Qualities):</span>{" "}
                  {plant.rasapanchaka.guna.join(", ")}
                </div>
                <div>
                  <span className="font-medium">Virya (Potency):</span>{" "}
                  {plant.rasapanchaka.virya}
                </div>
                <div>
                  <span className="font-medium">Vipaka (Post-digestive effect):</span>{" "}
                  {plant.rasapanchaka.vipaka}
                </div>
                {plant.rasapanchaka.prabhava && (
                  <div>
                    <span className="font-medium">Prabhava (Specific action):</span>{" "}
                    {plant.rasapanchaka.prabhava}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Dosha Karma */}
            <Card>
              <CardHeader>
                <CardTitle>Dosha Karma (Effect on Doshas)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {plant.doshaKarma.vata && (
                  <div className="flex items-center gap-2">
                    <Badge>Vata</Badge>
                    <span>{plant.doshaKarma.vata}</span>
                  </div>
                )}
                {plant.doshaKarma.pitta && (
                  <div className="flex items-center gap-2">
                    <Badge>Pitta</Badge>
                    <span>{plant.doshaKarma.pitta}</span>
                  </div>
                )}
                {plant.doshaKarma.kapha && (
                  <div className="flex items-center gap-2">
                    <Badge>Kapha</Badge>
                    <span>{plant.doshaKarma.kapha}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Classification */}
            <Card>
              <CardHeader>
                <CardTitle>Classification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {plant.classification.charaka && (
                  <div>
                    <span className="font-medium">Charaka:</span>{" "}
                    {plant.classification.charaka.join(", ")}
                  </div>
                )}
                {plant.classification.sushruta && (
                  <div>
                    <span className="font-medium">Sushruta:</span>{" "}
                    {plant.classification.sushruta.join(", ")}
                  </div>
                )}
                <div>
                  <span className="font-medium">Modern:</span>{" "}
                  {plant.classification.modernGenus} {plant.classification.modernSpecies}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="morphology" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Plant Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="font-medium">Habit:</span> {plant.morphology.habit}
                </div>
                <div>
                  <span className="font-medium">Habitat:</span> {plant.morphology.habitat}
                </div>
                {plant.morphology.root && (
                  <div>
                    <span className="font-medium">Root:</span> {plant.morphology.root}
                  </div>
                )}
                {plant.morphology.stem && (
                  <div>
                    <span className="font-medium">Stem:</span> {plant.morphology.stem}
                  </div>
                )}
                {plant.morphology.leaf && (
                  <div>
                    <span className="font-medium">Leaf:</span> {plant.morphology.leaf}
                  </div>
                )}
                {plant.morphology.flower && (
                  <div>
                    <span className="font-medium">Flower:</span> {plant.morphology.flower}
                  </div>
                )}
                {plant.morphology.fruit && (
                  <div>
                    <span className="font-medium">Fruit:</span> {plant.morphology.fruit}
                  </div>
                )}
                {plant.morphology.seeds && (
                  <div>
                    <span className="font-medium">Seeds:</span> {plant.morphology.seeds}
                  </div>
                )}
              </CardContent>
            </Card>

            {plant.types && (
              <Card>
                <CardHeader>
                  <CardTitle>Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1">
                    {plant.types.map((type, idx) => (
                      <li key={idx}>{type}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="therapeutic" className="space-y-4 mt-4">
            {/* Karma */}
            <Card>
              <CardHeader>
                <CardTitle>Karma (Actions)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {plant.karma.map((k, idx) => (
                    <Badge key={idx} variant="secondary">
                      {k}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Indications */}
            <Card>
              <CardHeader>
                <CardTitle>Indications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {plant.indications.map((ind, idx) => (
                    <Badge key={idx} variant="outline">
                      {ind}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Therapeutic Uses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5" />
                  Therapeutic Uses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {plant.internalUses && (
                  <div>
                    <h4 className="font-medium mb-2">Internal Uses:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {plant.internalUses.map((use, idx) => (
                        <li key={idx} className="text-sm">{use}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {plant.externalUses && (
                  <div>
                    <h4 className="font-medium mb-2">External Uses:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {plant.externalUses.map((use, idx) => (
                        <li key={idx} className="text-sm">{use}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Dosage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Dosage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{plant.dosage}</p>
              </CardContent>
            </Card>

            {/* Formulations */}
            <Card>
              <CardHeader>
                <CardTitle>Common Formulations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1">
                  {plant.formulations.map((form, idx) => (
                    <li key={idx}>{form}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="research" className="space-y-4 mt-4">
            {/* Chemical Constituents */}
            <Card>
              <CardHeader>
              <CardTitle className="flex items-center gap-2">
                  <Beaker className="h-5 w-5" />
                  Chemical Constituents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {plant.chemicalConstituents.map((chem, idx) => (
                    <Badge key={idx} variant="secondary">
                      {chem}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Phytoconstituents */}
            {plant.phytoConstituents && (
              <Card>
                <CardHeader>
                  <CardTitle>Key Phytoconstituents</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1">
                    {plant.phytoConstituents.map((phyto, idx) => (
                      <li key={idx} className="text-sm">{phyto}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Modern Pharmacology */}
            {plant.modernPharmacology && (
              <Card>
                <CardHeader>
                  <CardTitle>Modern Pharmacology</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1">
                    {plant.modernPharmacology.map((pharm, idx) => (
                      <li key={idx} className="text-sm">{pharm}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Research Updates */}
            {plant.researchUpdates && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Research</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {plant.researchUpdates.map((research, idx) => (
                      <li key={idx} className="text-sm">{research}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* References */}
            <Card>
              <CardHeader>
                <CardTitle>Classical References</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1">
                  {plant.references.map((ref, idx) => (
                    <li key={idx} className="text-sm italic">{ref}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Adulterants */}
            {plant.adulterants && plant.adulterants.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    Adulterants
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    {plant.adulterants.map((adultarent, idx) => (
                      <li key={idx} className="text-sm text-destructive">
                        {adultarent}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
};
