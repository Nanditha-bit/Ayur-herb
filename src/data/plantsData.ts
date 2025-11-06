// Ayurvedic plant database
// WARNING: Plants beyond the first 3 are AI-GENERATED PLACEHOLDERS for testing only
// DO NOT USE for actual medical/botanical purposes without verification

import ashwagandhaImg from "@/assets/plants/ashwagandha.jpg";
import tulsiImg from "@/assets/plants/tulsi.jpg";
import neemImg from "@/assets/plants/neem.jpg";

export interface Plant {
  id: string;
  imageUrl?: string;
  sanskritName: string;
  synonyms: { name: string; meaning: string }[];
  botanicalName: string;
  botanicalSynonyms?: string[];
  family: string;
  vernacularNames: {
    hindi?: string;
    kannada?: string;
    tamil?: string;
    telugu?: string;
    malayalam?: string;
    bengali?: string;
    marathi?: string;
    gujarati?: string;
  };
  vernacularName: string; // Primary common name
  classification: {
    charaka?: string[];
    sushruta?: string[];
    modernGenus: string;
    modernSpecies: string;
  };
  types?: string[];
  morphology: {
    habit: string;
    habitat: string;
    leaf?: string;
    stem?: string;
    flower?: string;
    fruit?: string;
    inflorescence?: string;
    seeds?: string;
    root?: string;
  };
  rasapanchaka: {
    rasa: string[];
    guna: string[];
    virya: string;
    vipaka: string;
    prabhava?: string;
  };
  doshaKarma: {
    vata?: string;
    pitta?: string;
    kapha?: string;
  };
  karma: string[];
  indications: string[];
  chemicalConstituents: string[];
  usefulPart: string[];
  dosage: string;
  therapeuticUses: string[];
  externalUses?: string[];
  internalUses?: string[];
  shodana?: string;
  formulations: string[];
  phytoConstituents?: string[];
  references: string[];
  adulterants?: string[];
  modernPharmacology?: string[];
  researchUpdates?: string[];
}

export const plantsDatabase: Plant[] = [
  {
    id: "ashwagandha",
    imageUrl: ashwagandhaImg,
    sanskritName: "अश्वगन्धा (Ashwagandha)",
    synonyms: [
      { name: "Varaha Karni", meaning: "Leaves resembling horse's ear" },
      { name: "Vajigandha", meaning: "Smell like a horse" },
      { name: "Balya", meaning: "Gives strength" },
    ],
    botanicalName: "Withania somnifera",
    botanicalSynonyms: ["Physalis somnifera"],
    family: "Solanaceae",
    vernacularNames: {
      hindi: "अश्वगंधा (Ashwagandha)",
      kannada: "ಅಶ್ವಗಂಧಾ (Ashvagandha)",
      tamil: "அமுக்கரா (Amukkara)",
      telugu: "అశ్వగంధ (Ashvagandha)",
      malayalam: "അശ്വഗന്ധ (Ashwagandha)",
      bengali: "অশ্বগন্ধা (Ashwagandha)",
      marathi: "आसंध (Asandh)",
      gujarati: "અસગંધ (Asagandh)",
    },
    vernacularName: "Indian Ginseng, Winter Cherry",
    classification: {
      charaka: ["Balya (Strength promoting)", "Brimhaniya (Nourishing)"],
      sushruta: ["Vatasamshaman"],
      modernGenus: "Withania",
      modernSpecies: "somnifera",
    },
    types: ["Two types based on habitat: Wild and Cultivated"],
    morphology: {
      habit: "Erect, evergreen, tomentose shrub, 30-75 cm tall",
      habitat: "Grows wild in dry parts of India, particularly in Gujarat, Madhya Pradesh, Rajasthan",
      leaf: "Simple, ovate, opposite, 5-10 cm long, entire margin",
      stem: "Cylindrical, branched, woody at base, covered with stellate hairs",
      flower: "Small, greenish-yellow, in axillary umbellate cymes",
      fruit: "Berry, globose, orange-red when ripe, enclosed in persistent calyx",
      seeds: "Numerous, small, reniform, yellow",
      root: "Long, tuberous, fleshy, whitish-brown externally",
    },
    rasapanchaka: {
      rasa: ["Tikta (Bitter)", "Kashaya (Astringent)", "Madhura (Sweet)"],
      guna: ["Laghu (Light)", "Snigdha (Unctuous)"],
      virya: "Ushna (Hot)",
      vipaka: "Madhura (Sweet)",
      prabhava: "Balya (Strength promoting), Vajikarana (Aphrodisiac)",
    },
    doshaKarma: {
      vata: "Pacifies",
      pitta: "May increase in excess",
      kapha: "Pacifies",
    },
    karma: [
      "Balya (Strengthening)",
      "Vajikarana (Aphrodisiac)",
      "Rasayana (Rejuvenative)",
      "Nidrajanana (Sleep inducing)",
      "Shothahara (Anti-inflammatory)",
      "Vedanasthapana (Analgesic)",
    ],
    indications: [
      "Shwasa (Asthma)",
      "Kasa (Cough)",
      "Shotha (Inflammation)",
      "Kshaya (Emaciation)",
      "Daurbalya (General debility)",
      "Shukra Kshaya (Oligospermia)",
      "Anidra (Insomnia)",
      "Unmada (Psychosis)",
    ],
    chemicalConstituents: [
      "Withanolides (Withaferin A, Withanolide D)",
      "Alkaloids (Somniferine, Withanine)",
      "Steroidal lactones",
      "Saponins",
      "Iron",
    ],
    usefulPart: ["Root", "Leaves (less common)"],
    dosage: "3-6 grams of powder; 50-100 ml of decoction",
    therapeuticUses: [
      "Stress & Anxiety",
      "Insomnia",
      "General Debility",
      "Arthritis",
      "Immune Support",
    ],
    externalUses: [
      "Paste applied on swellings",
      "Oil used for massage in Vata disorders",
    ],
    internalUses: [
      "Powder with milk for strength",
      "Decoction for respiratory conditions",
      "Ghrita preparations for mental health",
    ],
    formulations: [
      "Ashwagandhadi Churna",
      "Ashwagandharishta",
      "Ashwagandhadi Lehya",
      "Bala Ashwagandha Lakshadi Taila",
    ],
    phytoConstituents: [
      "Withaferin A (cytotoxic steroid)",
      "12-Deoxywithastromonolide",
      "Withanone",
      "Withanolide A-Y",
    ],
    references: [
      "Charaka Samhita, Sutrasthana 25/40",
      "Sushruta Samhita, Sutrasthana 38/68",
      "Bhavaprakasha Nighantu, Guduchyadi Varga",
    ],
    adulterants: ["Roots of Physalis minima"],
    modernPharmacology: [
      "Adaptogenic activity",
      "Anti-stress effects",
      "Immunomodulatory properties",
      "Neuroprotective effects",
      "Anti-inflammatory activity",
      "Antioxidant properties",
    ],
    researchUpdates: [
      "Clinical trials show effectiveness in reducing stress and anxiety",
      "Studies demonstrate improvement in sleep quality",
      "Research indicates potential in managing hypothyroidism",
      "Evidence for muscle strength and recovery enhancement",
    ],
  },
  {
    id: "tulsi",
    imageUrl: tulsiImg,
    sanskritName: "तुलसी (Tulsi)",
    synonyms: [
      { name: "Surasa", meaning: "Very juicy" },
      { name: "Devdundubhi", meaning: "Sacred to Lord Vishnu" },
      { name: "Vishnu Priya", meaning: "Beloved of Lord Vishnu" },
    ],
    botanicalName: "Ocimum sanctum",
    botanicalSynonyms: ["Ocimum tenuiflorum"],
    family: "Lamiaceae",
    vernacularNames: {
      hindi: "तुलसी (Tulsi)",
      kannada: "ತುಳಸಿ (Tulasi)",
      tamil: "துளசி (Tulasi)",
      telugu: "తులసి (Tulasi)",
      malayalam: "തുളസി (Tulasi)",
      bengali: "তুলসী (Tulsi)",
      marathi: "तुळस (Tulas)",
      gujarati: "તુલસી (Tulsi)",
    },
    vernacularName: "Holy Basil, Sacred Basil",
    classification: {
      charaka: ["Shwasahara (Anti-asthmatic)"],
      sushruta: ["Surasadi Gana"],
      modernGenus: "Ocimum",
      modernSpecies: "sanctum",
    },
    types: ["Rama Tulsi (Green)", "Krishna Tulsi (Purple)", "Vana Tulsi (Wild)"],
    morphology: {
      habit: "Erect, branched, aromatic herb, 30-60 cm tall",
      habitat: "Cultivated throughout India, particularly in home gardens",
      leaf: "Simple, opposite, ovate, 2.5-5 cm long, aromatic, serrated margin",
      stem: "Quadrangular, hairy, greenish-purple",
      flower: "Small, purplish or reddish, in whorls on elongated racemes",
      fruit: "Nutlets, small, brown, enclosed in persistent calyx",
      seeds: "Tiny, brown, mucilaginous when wet",
      root: "Tap root system with many lateral roots",
    },
    rasapanchaka: {
      rasa: ["Katu (Pungent)", "Tikta (Bitter)"],
      guna: ["Laghu (Light)", "Ruksha (Dry)", "Tikshna (Sharp)"],
      virya: "Ushna (Hot)",
      vipaka: "Katu (Pungent)",
      prabhava: "Krimighna (Antimicrobial), Deepana (Appetizer)",
    },
    doshaKarma: {
      vata: "Pacifies",
      pitta: "May increase",
      kapha: "Strongly pacifies",
    },
    karma: [
      "Deepana (Appetizer)",
      "Pachana (Digestive)",
      "Krimighna (Antimicrobial)",
      "Jwaraghna (Antipyretic)",
      "Kasahara (Antitussive)",
      "Shwasahara (Anti-asthmatic)",
    ],
    indications: [
      "Jwara (Fever)",
      "Kasa (Cough)",
      "Shwasa (Asthma)",
      "Krimi (Worm infestation)",
      "Aruchi (Anorexia)",
      "Hikka (Hiccups)",
      "Chhardi (Vomiting)",
    ],
    chemicalConstituents: [
      "Eugenol",
      "Methyl eugenol",
      "Carvacrol",
      "Linalool",
      "β-caryophyllene",
      "Ursolic acid",
    ],
    usefulPart: ["Leaves", "Seeds", "Whole plant"],
    dosage: "5-10 ml of fresh leaf juice; 1-3 grams of dried leaf powder",
    therapeuticUses: [
      "Fever",
      "Cold & Cough",
      "Respiratory Issues",
      "Stress Relief",
      "Immunity Booster",
    ],
    externalUses: [
      "Leaf paste for skin infections",
      "Essential oil for aromatherapy",
    ],
    internalUses: [
      "Fresh leaves chewed for immunity",
      "Decoction for fever and cough",
      "Juice with honey for respiratory issues",
    ],
    formulations: [
      "Tulsi Churna",
      "Tulsi Ghana Vati",
      "Chyawanprash (contains Tulsi)",
      "Various herbal teas",
    ],
    phytoConstituents: [
      "Eugenol (70-85% of essential oil)",
      "Ursolic acid (triterpene)",
      "Rosmarinic acid",
      "Apigenin",
      "Luteolin",
    ],
    references: [
      "Charaka Samhita, Chikitsasthana 8/100",
      "Bhavaprakasha Nighantu, Haritakyadi Varga",
      "Dhanvantari Nighantu",
    ],
    modernPharmacology: [
      "Adaptogenic properties",
      "Antimicrobial activity",
      "Antioxidant effects",
      "Immunomodulatory action",
      "Anti-inflammatory properties",
      "Hepatoprotective effects",
    ],
    researchUpdates: [
      "Studies show significant stress-reducing effects",
      "Research demonstrates broad-spectrum antimicrobial activity",
      "Clinical trials indicate metabolic benefits",
      "Evidence for cognitive enhancement properties",
    ],
  },
  {
    id: "neem",
    imageUrl: neemImg,
    sanskritName: "निम्ब (Nimba)",
    synonyms: [
      { name: "Arishta", meaning: "Reliever of disease" },
      { name: "Sarva Roga Nivarini", meaning: "Curer of all ailments" },
      { name: "Pichumanda", meaning: "Bitter and cooling" },
    ],
    botanicalName: "Azadirachta indica",
    botanicalSynonyms: ["Melia azadirachta"],
    family: "Meliaceae",
    vernacularNames: {
      hindi: "नीम (Neem)",
      kannada: "ಬೇವು (Bevu)",
      tamil: "வேப்பம் (Veppam)",
      telugu: "వేప (Vepa)",
      malayalam: "ആര്യവേപ്പ് (Aryaveppu)",
      bengali: "নিম (Nim)",
      marathi: "कडुलिंब (Kadulimb)",
      gujarati: "લીંબડો (Limbdo)",
    },
    vernacularName: "Neem, Indian Lilac, Margosa",
    classification: {
      charaka: ["Tiktaskandha (Bitter group)"],
      sushruta: ["Nimba Gana", "Aragvadhadi Gana"],
      modernGenus: "Azadirachta",
      modernSpecies: "indica",
    },
    morphology: {
      habit: "Large evergreen tree, 12-18 m tall",
      habitat: "Native to Indian subcontinent, grows in tropical and subtropical regions",
      leaf: "Compound, pinnate, 20-40 cm long, leaflets 7-17, serrated margin",
      stem: "Straight, cylindrical, bark grey-brown, fissured",
      flower: "Small, white, fragrant, in axillary panicles",
      fruit: "Drupe, olive-like, greenish-yellow when ripe",
      seeds: "One seed per fruit, brown, with bitter white kernel",
      root: "Deep tap root system",
    },
    rasapanchaka: {
      rasa: ["Tikta (Bitter)", "Kashaya (Astringent)"],
      guna: ["Laghu (Light)", "Ruksha (Dry)"],
      virya: "Sheeta (Cold)",
      vipaka: "Katu (Pungent)",
      prabhava: "Krimighna (Antimicrobial), Kushthaghna (Antileprotic)",
    },
    doshaKarma: {
      vata: "May increase in excess",
      pitta: "Strongly pacifies",
      kapha: "Pacifies",
    },
    karma: [
      "Krimighna (Antimicrobial)",
      "Kushthaghna (Antileprotic)",
      "Jwaraghna (Antipyretic)",
      "Kandughna (Antipruritic)",
      "Vranaropana (Wound healing)",
      "Shothahara (Anti-inflammatory)",
    ],
    indications: [
      "Kushtha (Skin diseases)",
      "Krimi (Worm infestation)",
      "Jwara (Fever)",
      "Daha (Burning sensation)",
      "Vrana (Wounds)",
      "Prameha (Diabetes)",
      "Netra Roga (Eye diseases)",
    ],
    chemicalConstituents: [
      "Azadirachtin",
      "Nimbin",
      "Nimbidin",
      "Nimbolide",
      "Quercetin",
      "β-Sitosterol",
    ],
    usefulPart: ["Leaves", "Bark", "Seeds", "Flowers", "Fruits", "Oil"],
    dosage: "20-30 ml leaf juice; 40-80 ml bark decoction; 2-4 ml seed oil externally",
    therapeuticUses: [
      "Skin Diseases",
      "Diabetes",
      "Fever",
      "Parasitic Infections",
      "Dental Care",
    ],
    externalUses: [
      "Leaf paste for skin conditions",
      "Oil for wounds and ulcers",
      "Decoction for bathing in skin diseases",
      "Twig as toothbrush",
    ],
    internalUses: [
      "Leaf juice for fever and diabetes",
      "Bark decoction for fever",
      "Flower juice for bilious disorders",
    ],
    formulations: [
      "Nimbadi Churna",
      "Nimba Taila",
      "Pancha Nimba Churna",
      "Neem Capsules/Tablets",
    ],
    phytoConstituents: [
      "Azadirachtin A (limonoid)",
      "Salannin",
      "Meliantriol",
      "Gedunin",
    ],
    references: [
      "Charaka Samhita, Sutrasthana 4/8",
      "Sushruta Samhita, Sutrasthana 38/22",
      "Bhavaprakasha Nighantu, Vatadi Varga",
    ],
    modernPharmacology: [
      "Antibacterial and antifungal activity",
      "Antidiabetic effects",
      "Immunomodulatory properties",
      "Anti-inflammatory action",
      "Antioxidant effects",
      "Hepatoprotective properties",
    ],
    researchUpdates: [
      "Clinical studies demonstrate effectiveness in diabetes management",
      "Research shows significant antimicrobial activity against multiple pathogens",
      "Studies indicate immunomodulatory benefits",
      "Evidence for wound healing and skin health benefits",
    ],
  },
];

// Import generated test data
import { generatedPlants } from "./generatePlants";

// Combine verified plants with generated test data
// First 3 plants are verified, rest are AI-generated for testing
export const allPlantsDatabase: Plant[] = [...plantsDatabase, ...generatedPlants];

// Function to search plants
export const searchPlants = (query: string): Plant[] => {
  const lowerQuery = query.toLowerCase();
  return allPlantsDatabase.filter(
    (plant) =>
      plant.sanskritName.toLowerCase().includes(lowerQuery) ||
      plant.botanicalName.toLowerCase().includes(lowerQuery) ||
      plant.vernacularName.toLowerCase().includes(lowerQuery) ||
      plant.therapeuticUses.some((use) => use.toLowerCase().includes(lowerQuery))
  );
};

// Function to get plant by ID
export const getPlantById = (id: string): Plant | undefined => {
  return allPlantsDatabase.find((plant) => plant.id === id);
};

// Get total count
export const getTotalPlantCount = () => allPlantsDatabase.length;
export const getVerifiedPlantCount = () => plantsDatabase.length;
