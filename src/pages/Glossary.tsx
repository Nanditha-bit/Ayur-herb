import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Glossary = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-earth py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Database
        </Button>

        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold">Ayurvedic Glossary</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Understanding the fundamental concepts of Ayurveda for plant medicine
          </p>
        </div>

        <Tabs defaultValue="rasapanchaka" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rasapanchaka">Rasapanchaka</TabsTrigger>
            <TabsTrigger value="dosha">Dosha</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
          </TabsList>

          <TabsContent value="rasapanchaka" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Rasapanchaka - The Five Fundamental Properties</CardTitle>
                <CardDescription>
                  The five essential attributes that define every medicinal substance in Ayurveda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">1. Rasa (Taste)</h3>
                  <p className="text-muted-foreground mb-3">
                    The immediate taste experienced by the tongue. There are six primary tastes:
                  </p>
                  <div className="grid gap-3 ml-4">
                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-medium">Madhura (Sweet)</p>
                      <p className="text-sm text-muted-foreground">Building, nourishing, soothing. Examples: honey, milk, rice</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-medium">Amla (Sour)</p>
                      <p className="text-sm text-muted-foreground">Stimulating, digestive, appetizing. Examples: lemon, tamarind</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-medium">Lavana (Salty)</p>
                      <p className="text-sm text-muted-foreground">Digestive, cleansing, laxative. Example: rock salt</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-medium">Katu (Pungent)</p>
                      <p className="text-sm text-muted-foreground">Heating, stimulating, clearing. Examples: ginger, black pepper</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-medium">Tikta (Bitter)</p>
                      <p className="text-sm text-muted-foreground">Cooling, detoxifying, anti-inflammatory. Examples: neem, turmeric</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-medium">Kashaya (Astringent)</p>
                      <p className="text-sm text-muted-foreground">Binding, drying, healing. Examples: pomegranate, myrobalan</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">2. Guna (Qualities)</h3>
                  <p className="text-muted-foreground mb-3">
                    The physical and energetic properties of a substance. There are 20 gunas organized in 10 pairs of opposites:
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 ml-4">
                    <div className="border-l-4 border-accent pl-4">
                      <p className="font-medium">Guru (Heavy) ↔ Laghu (Light)</p>
                      <p className="text-sm text-muted-foreground">Weight and digestibility</p>
                    </div>
                    <div className="border-l-4 border-accent pl-4">
                      <p className="font-medium">Sheeta (Cold) ↔ Ushna (Hot)</p>
                      <p className="text-sm text-muted-foreground">Thermal property</p>
                    </div>
                    <div className="border-l-4 border-accent pl-4">
                      <p className="font-medium">Snigdha (Unctuous) ↔ Ruksha (Dry)</p>
                      <p className="text-sm text-muted-foreground">Moisture content</p>
                    </div>
                    <div className="border-l-4 border-accent pl-4">
                      <p className="font-medium">Manda (Dull) ↔ Tikshna (Sharp)</p>
                      <p className="text-sm text-muted-foreground">Penetrating ability</p>
                    </div>
                    <div className="border-l-4 border-accent pl-4">
                      <p className="font-medium">Sthira (Static) ↔ Sara (Mobile)</p>
                      <p className="text-sm text-muted-foreground">Movement tendency</p>
                    </div>
                    <div className="border-l-4 border-accent pl-4">
                      <p className="font-medium">Mridu (Soft) ↔ Kathina (Hard)</p>
                      <p className="text-sm text-muted-foreground">Consistency</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">3. Virya (Potency)</h3>
                  <p className="text-muted-foreground mb-3">
                    The energetic potency or thermal effect of a substance. Simplified into two main categories:
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 ml-4">
                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-medium">Ushna Virya (Hot Potency)</p>
                      <p className="text-sm text-muted-foreground">Increases digestive fire, circulation, metabolism. Pacifies Vata and Kapha, increases Pitta.</p>
                    </div>
                    <div className="border-l-4 border-accent pl-4">
                      <p className="font-medium">Sheeta Virya (Cold Potency)</p>
                      <p className="text-sm text-muted-foreground">Cooling, soothing, calming. Pacifies Pitta, may increase Vata and Kapha.</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">4. Vipaka (Post-digestive Effect)</h3>
                  <p className="text-muted-foreground mb-3">
                    The taste that emerges after complete digestion. There are three main vipakas:
                  </p>
                  <div className="grid gap-3 ml-4">
                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-medium">Madhura Vipaka (Sweet)</p>
                      <p className="text-sm text-muted-foreground">Building, nourishing, increases Kapha</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-medium">Amla Vipaka (Sour)</p>
                      <p className="text-sm text-muted-foreground">Heating, increases Pitta</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-medium">Katu Vipaka (Pungent)</p>
                      <p className="text-sm text-muted-foreground">Drying, lightening, increases Vata</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">5. Prabhava (Special Action)</h3>
                  <p className="text-muted-foreground">
                    The unique, inexplicable action of a substance that cannot be explained by its rasa, guna, virya, or vipaka. 
                    This is the special therapeutic effect that makes certain herbs particularly effective for specific conditions.
                    For example, Ashwagandha's adaptogenic properties or Tulsi's immunomodulatory effects.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dosha" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Tridosha - The Three Biological Energies</CardTitle>
                <CardDescription>
                  Understanding the three fundamental forces that govern all physiological and psychological functions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-primary">Vata Dosha</h3>
                  <p className="text-muted-foreground mb-3">
                    <span className="font-medium">Elements:</span> Air + Ether (Space)
                  </p>
                  <p className="text-muted-foreground mb-3">
                    <span className="font-medium">Qualities:</span> Dry, light, cold, rough, subtle, mobile, clear
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-medium mb-2">Governs:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
                      <li>All movement in the body (breathing, circulation, nerve impulses)</li>
                      <li>Communication and creativity</li>
                      <li>Elimination processes</li>
                      <li>Sensory perception</li>
                    </ul>
                  </div>
                  <div className="mt-3 bg-muted/50 p-4 rounded-lg">
                    <p className="font-medium mb-2">When Imbalanced:</p>
                    <p className="text-sm text-muted-foreground">
                      Anxiety, insomnia, dry skin, constipation, irregular appetite, restlessness, pain
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-primary">Pitta Dosha</h3>
                  <p className="text-muted-foreground mb-3">
                    <span className="font-medium">Elements:</span> Fire + Water
                  </p>
                  <p className="text-muted-foreground mb-3">
                    <span className="font-medium">Qualities:</span> Hot, sharp, light, liquid, spreading, oily
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-medium mb-2">Governs:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
                      <li>Digestion and metabolism</li>
                      <li>Body temperature regulation</li>
                      <li>Intelligence and understanding</li>
                      <li>Courage and ambition</li>
                      <li>Visual perception</li>
                    </ul>
                  </div>
                  <div className="mt-3 bg-muted/50 p-4 rounded-lg">
                    <p className="font-medium mb-2">When Imbalanced:</p>
                    <p className="text-sm text-muted-foreground">
                      Inflammation, fever, acid reflux, skin rashes, anger, irritability, excessive hunger
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-primary">Kapha Dosha</h3>
                  <p className="text-muted-foreground mb-3">
                    <span className="font-medium">Elements:</span> Water + Earth
                  </p>
                  <p className="text-muted-foreground mb-3">
                    <span className="font-medium">Qualities:</span> Heavy, slow, cool, oily, smooth, soft, stable
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-medium mb-2">Governs:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
                      <li>Structure and lubrication of the body</li>
                      <li>Immunity and protection</li>
                      <li>Emotional stability and calmness</li>
                      <li>Memory retention</li>
                      <li>Strength and endurance</li>
                    </ul>
                  </div>
                  <div className="mt-3 bg-muted/50 p-4 rounded-lg">
                    <p className="font-medium mb-2">When Imbalanced:</p>
                    <p className="text-sm text-muted-foreground">
                      Congestion, excess mucus, weight gain, sluggishness, depression, attachment, greed
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="bg-primary/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Dosha Karma (Effect on Doshas)</h4>
                  <p className="text-sm text-muted-foreground">
                    Each herb affects the three doshas differently. Understanding these effects helps in:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2 mt-2">
                    <li><span className="font-medium">Shamana:</span> Pacifying an aggravated dosha</li>
                    <li><span className="font-medium">Kopana:</span> Aggravating a dosha</li>
                    <li><span className="font-medium">Samana:</span> Maintaining balance</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="properties" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Additional Ayurvedic Concepts</CardTitle>
                <CardDescription>
                  Other important terms used in Ayurvedic plant medicine
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Karma (Actions)</h3>
                  <p className="text-muted-foreground mb-3">
                    The specific therapeutic actions or effects of herbs. Common karmas include:
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-medium">Deepana</p>
                      <p className="text-sm text-muted-foreground">Appetizer, kindle digestive fire</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-medium">Pachana</p>
                      <p className="text-sm text-muted-foreground">Digestive, helps digest food</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-medium">Rasayana</p>
                      <p className="text-sm text-muted-foreground">Rejuvenative, promotes longevity</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-medium">Balya</p>
                      <p className="text-sm text-muted-foreground">Strengthening, builds tissues</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-medium">Jwaraghna</p>
                      <p className="text-sm text-muted-foreground">Antipyretic, reduces fever</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-medium">Shothahara</p>
                      <p className="text-sm text-muted-foreground">Anti-inflammatory</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-medium">Vedanasthapana</p>
                      <p className="text-sm text-muted-foreground">Analgesic, relieves pain</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <p className="font-medium">Vranaropana</p>
                      <p className="text-sm text-muted-foreground">Wound healing</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Agni (Digestive Fire)</h3>
                  <p className="text-muted-foreground">
                    The metabolic fire responsible for digestion, absorption, and transformation of food into tissues. 
                    Strong Agni is essential for health and proper assimilation of herbal medicines. Many herbs are classified 
                    by their effect on Agni - some kindle it (Deepana), some help digest food (Pachana), while others may dampen it.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Dhatu (Tissues)</h3>
                  <p className="text-muted-foreground mb-3">
                    The seven body tissues that are nourished in sequence:
                  </p>
                  <div className="grid md:grid-cols-2 gap-2 ml-4">
                    <p className="text-sm">1. Rasa (Plasma)</p>
                    <p className="text-sm">2. Rakta (Blood)</p>
                    <p className="text-sm">3. Mamsa (Muscle)</p>
                    <p className="text-sm">4. Meda (Fat)</p>
                    <p className="text-sm">5. Asthi (Bone)</p>
                    <p className="text-sm">6. Majja (Marrow/Nerve)</p>
                    <p className="text-sm">7. Shukra (Reproductive)</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Srotas (Channels)</h3>
                  <p className="text-muted-foreground">
                    The bodily channels through which nutrients, waste, and energy flow. Herbs can open blocked channels, 
                    nourish depleted channels, or regulate excessive flow. Understanding srotas helps target herbs to specific 
                    body systems.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Classical Categorization</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium mb-2">Charaka Ganas</p>
                      <p className="text-sm text-muted-foreground">
                        Groups of herbs classified by Charaka Samhita based on therapeutic actions (e.g., Jeevaniya for vitality, 
                        Brimhaniya for nourishment, Shwasahara for respiratory disorders)
                      </p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Sushruta Ganas</p>
                      <p className="text-sm text-muted-foreground">
                        Classifications by Sushruta Samhita often based on anatomical targets and dosha effects 
                        (e.g., Aragvadhadi Gana, Guduchyadi Gana)
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5">
              <CardHeader>
                <CardTitle>Important Note</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This glossary provides foundational understanding of Ayurvedic concepts. However, the practice of 
                  Ayurvedic medicine requires years of study and should be learned under proper guidance. Always consult 
                  qualified Ayurvedic practitioners before using herbs therapeutically. These terms help in understanding 
                  plant properties but do not replace professional medical advice.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Glossary;
