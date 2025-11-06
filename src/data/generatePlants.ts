// Script to generate placeholder Ayurvedic plant data for testing purposes
// WARNING: This data is AI-generated for UI/UX testing only and should NOT be used for medical purposes

import { Plant } from "./plantsData";
import herb1 from "@/assets/plants/herb-1.jpg";
import tree1 from "@/assets/plants/tree-1.jpg";
import shrub1 from "@/assets/plants/shrub-1.jpg";
import climber1 from "@/assets/plants/climber-1.jpg";
import rootPlant1 from "@/assets/plants/root-plant-1.jpg";
import herb2 from "@/assets/plants/herb-2.jpg";
import herb3 from "@/assets/plants/herb-3.jpg";
import tropical1 from "@/assets/plants/tropical-1.jpg";
import berryPlant1 from "@/assets/plants/berry-plant-1.jpg";
import grass1 from "@/assets/plants/grass-1.jpg";
import flower1 from "@/assets/plants/flower-1.jpg";
import succulent1 from "@/assets/plants/succulent-1.jpg";
import flower2 from "@/assets/plants/flower-2.jpg";
import shrub2 from "@/assets/plants/shrub-2.jpg";
import needleLeaf1 from "@/assets/plants/needle-leaf-1.jpg";
import flower3 from "@/assets/plants/flower-3.jpg";
import reed1 from "@/assets/plants/reed-1.jpg";
import flower4 from "@/assets/plants/flower-4.jpg";
import silveryPlant1 from "@/assets/plants/silvery-plant-1.jpg";
import bark1 from "@/assets/plants/bark-1.jpg";

const commonRasas = ["Madhura (Sweet)", "Amla (Sour)", "Lavana (Salty)", "Katu (Pungent)", "Tikta (Bitter)", "Kashaya (Astringent)"];
const commonGunas = ["Laghu (Light)", "Guru (Heavy)", "Ruksha (Dry)", "Snigdha (Unctuous)", "Sheeta (Cold)", "Ushna (Hot)", "Tikshna (Sharp)", "Manda (Mild)"];
const commonViryas = ["Ushna (Hot)", "Sheeta (Cold)"];
const commonVipakas = ["Madhura (Sweet)", "Amla (Sour)", "Katu (Pungent)"];
const commonFamilies = ["Fabaceae", "Rutaceae", "Zingiberaceae", "Apiaceae", "Lamiaceae", "Asteraceae", "Solanaceae", "Meliaceae", "Euphorbiaceae", "Cucurbitaceae"];
const commonHabits = ["Herb", "Shrub", "Tree", "Climber", "Creeper"];
const commonUsefulParts = ["Root", "Leaves", "Bark", "Seeds", "Whole plant", "Flowers", "Fruits", "Stem"];

// Array of botanical images to use for generated plants
const plantImages = [
  herb1, tree1, shrub1, climber1, rootPlant1, herb2, herb3, tropical1, 
  berryPlant1, grass1, flower1, succulent1, flower2, shrub2, needleLeaf1,
  flower3, reed1, flower4, silveryPlant1, bark1
];

const therapeuticCategories = [
  "Digestive Health", "Respiratory Issues", "Skin Diseases", "Fever", "Pain Relief",
  "Anti-inflammatory", "Immunity Booster", "Diabetes Management", "Cardiac Health",
  "Liver Protection", "Kidney Health", "Joint Pain", "Stress & Anxiety", "Insomnia",
  "Memory Enhancement", "Eye Health", "Wound Healing", "Anti-aging", "Detoxification"
];

const karmaOptions = [
  "Deepana (Appetizer)", "Pachana (Digestive)", "Anulomana (Carminative)", 
  "Grahi (Absorbent)", "Rechana (Purgative)", "Bhedana (Penetrating)",
  "Jwaraghna (Antipyretic)", "Shothahara (Anti-inflammatory)", "Vedanasthapana (Analgesic)",
  "Krimighna (Antimicrobial)", "Rasayana (Rejuvenative)", "Balya (Strengthening)",
  "Vranaropana (Wound healing)", "Kushthaghna (Antileprotic)", "Kasahara (Antitussive)"
];

const charakaGanas = [
  "Jeevaniya (Vitality promoting)", "Brimhaniya (Nourishing)", "Lekhaniya (Scraping)",
  "Shwasahara (Anti-asthmatic)", "Kasahara (Antitussive)", "Triptighna (Anti-satiety)",
  "Deepaniya (Appetizing)", "Balya (Strength promoting)", "Shukrala (Aphrodisiac)"
];

const sushrutaGanas = [
  "Vatasamshaman", "Pittasamshaman", "Kaphasamshaman", "Tridoshasamshaman",
  "Aragvadhadi Gana", "Guduchyadi Gana", "Viratarwadi Gana"
];

// Function to generate random plant data
function generatePlant(index: number): Plant {
  const plantNumber = index + 4; // Starting from 4 since we have 3 existing plants
  const baseName = `Plant${plantNumber}`;
  
  // Generate varied therapeutic uses
  const numUses = 3 + Math.floor(Math.random() * 4);
  const therapeuticUses = therapeuticCategories
    .sort(() => Math.random() - 0.5)
    .slice(0, numUses);
  
  // Generate varied karma
  const numKarma = 4 + Math.floor(Math.random() * 5);
  const karma = karmaOptions
    .sort(() => Math.random() - 0.5)
    .slice(0, numKarma);
  
  // Random rasa combination (1-3)
  const numRasa = 1 + Math.floor(Math.random() * 3);
  const rasa = commonRasas
    .sort(() => Math.random() - 0.5)
    .slice(0, numRasa);
  
  // Random guna combination (2-4)
  const numGuna = 2 + Math.floor(Math.random() * 3);
  const guna = commonGunas
    .sort(() => Math.random() - 0.5)
    .slice(0, numGuna);
  
  const virya = commonViryas[Math.floor(Math.random() * commonViryas.length)];
  const vipaka = commonVipakas[Math.floor(Math.random() * commonVipakas.length)];
  const family = commonFamilies[Math.floor(Math.random() * commonFamilies.length)];
  const habit = commonHabits[Math.floor(Math.random() * commonHabits.length)];
  
  const numParts = 1 + Math.floor(Math.random() * 3);
  const usefulPart = commonUsefulParts
    .sort(() => Math.random() - 0.5)
    .slice(0, numParts);
  
  // Generate Sanskrit name (simplified)
  const sanskritPrefixes = ["Amalaki", "Haritaki", "Bibhitaki", "Shatavari", "Brahmi", "Guduchi", "Punarnava", "Bala", "Arjuna", "Kutki"];
  const sanskritSuffixes = ["valli", "patra", "mula", "pushpa", "phala", "vrksha"];
  const sanskritName = sanskritPrefixes[index % sanskritPrefixes.length] + 
                      (Math.random() > 0.7 ? sanskritSuffixes[Math.floor(Math.random() * sanskritSuffixes.length)] : "");
  
  return {
    id: `plant-${plantNumber}`,
    imageUrl: plantImages[index % plantImages.length],
    sanskritName: `${sanskritName}`,
    synonyms: [
      { name: `Synonym1-${plantNumber}`, meaning: `Descriptive meaning for plant ${plantNumber}` },
      { name: `Synonym2-${plantNumber}`, meaning: `Alternative name describing properties` },
    ],
    botanicalName: `Plantus medicinalis var. ${baseName.toLowerCase()}`,
    family: family,
    vernacularNames: {
      hindi: `हिंदी-${plantNumber}`,
      kannada: `ಕನ್ನಡ-${plantNumber}`,
      tamil: `தமிழ்-${plantNumber}`,
      telugu: `తెలుగు-${plantNumber}`,
      malayalam: `മലയാളം-${plantNumber}`,
    },
    vernacularName: `Common Name ${plantNumber}`,
    classification: {
      charaka: [charakaGanas[Math.floor(Math.random() * charakaGanas.length)]],
      sushruta: [sushrutaGanas[Math.floor(Math.random() * sushrutaGanas.length)]],
      modernGenus: "Plantus",
      modernSpecies: `medicinalis-${plantNumber}`,
    },
    morphology: {
      habit: `${habit}, reaching ${20 + Math.floor(Math.random() * 180)} cm in height`,
      habitat: `Found in ${["tropical", "subtropical", "temperate"][Math.floor(Math.random() * 3)]} regions of India`,
      leaf: "Simple or compound leaves with specific characteristics",
      stem: "Cylindrical stem with typical growth pattern",
      flower: "Characteristic flowers in specific arrangements",
      fruit: "Fruits of typical morphology",
      root: "Root system with medicinal properties",
    },
    rasapanchaka: {
      rasa: rasa,
      guna: guna,
      virya: virya,
      vipaka: vipaka,
      prabhava: karma[0],
    },
    doshaKarma: {
      vata: Math.random() > 0.5 ? "Pacifies" : "May increase",
      pitta: Math.random() > 0.5 ? "Pacifies" : "May increase",
      kapha: Math.random() > 0.5 ? "Pacifies" : "May increase",
    },
    karma: karma,
    indications: therapeuticUses.map(use => use.replace(" Management", "").replace(" Issues", "")),
    chemicalConstituents: [
      `Compound A-${plantNumber}`,
      `Alkaloid B-${plantNumber}`,
      `Glycoside C-${plantNumber}`,
      `Essential oils`,
    ],
    usefulPart: usefulPart,
    dosage: `${2 + Math.floor(Math.random() * 8)}-${6 + Math.floor(Math.random() * 8)} grams of powder`,
    therapeuticUses: therapeuticUses,
    internalUses: [
      `Powder with ${["water", "milk", "honey", "ghee"][Math.floor(Math.random() * 4)]}`,
      "Decoction form for specific conditions",
    ],
    externalUses: [
      "Paste application for topical use",
    ],
    formulations: [
      `${sanskritName} Churna`,
      `${sanskritName}rishta`,
      `${sanskritName} Taila`,
    ],
    references: [
      `Charaka Samhita, Reference ${plantNumber}`,
      `Bhavaprakasha Nighantu, Entry ${plantNumber}`,
    ],
    modernPharmacology: [
      "Preliminary pharmacological studies",
      "Traditional use documented",
    ],
  };
}

// Generate 1000 plants
export const generatedPlants: Plant[] = Array.from({ length: 1000 }, (_, i) => generatePlant(i));
