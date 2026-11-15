export interface MicroSpec {
  label: string;
  val: string;
}

export interface CinematicSceneData {
  id: string;
  stepNum: string;
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  videoSrc: string;
  fallbackSrc?: string;
  posterSrc: string;
  specs: MicroSpec[];
  alignment?: "left" | "center" | "right";
  ambientColor?: string;
}

export const CINEMATIC_SCENES: CinematicSceneData[] = [
  {
    id: "scene-01-sear",
    stepNum: "01",
    badge: "Open-Fire Sear",
    title: "BINCHOTAN CHARCOAL",
    titleHighlight: "SEAR.",
    subtitle: "650°C Kishu White Oak • Sizzling A5 Japanese Wagyu",
    description:
      "Hand-ground A5 BMS 11 Wagyu patty kisses red-hot cast iron over glowing Kishu binchotan coals, rendering dense intramuscular marbling into pure savory nectar.",
    videoSrc: "/videos/step-1.mp4",
    fallbackSrc:
      "/videos/add%20video%20combination%20in%20the%20scrolling%20this%20sequence/video%20number%201%20add.mp4",
    posterSrc: "/thumbnails/step_1.jpg",
    specs: [
      { label: "Binchotan Heat", val: "650°C White Oak" },
      { label: "Wagyu Cut", val: "A5 BMS 11 Chuck" },
      { label: "Sear Time", val: "90 Seconds Flat" },
    ],
    alignment: "left",
    ambientColor: "#ff5722",
  },
  {
    id: "scene-02-flame",
    stepNum: "02",
    badge: "Caramelization",
    title: "THE ROARING",
    titleHighlight: "FLAME.",
    subtitle: "Rendered Marbling • Deep Mahogany Crust Forming",
    description:
      "Intense open flame ignites rendering wagyu fat, creating the quintessential Maillard reaction and locking juiciness within a glass-crisp mahogany bark.",
    videoSrc: "/videos/step-2.mp4",
    fallbackSrc:
      "/videos/add%20video%20combination%20in%20the%20scrolling%20this%20sequence/video%20number%202%20add.mp4",
    posterSrc: "/thumbnails/step_2.jpg",
    specs: [
      { label: "Maillard Temp", val: "180°C Caramel" },
      { label: "Bark Contrast", val: "Deep Mahogany" },
      { label: "Internal Core", val: "54°C Medium-Rare" },
    ],
    alignment: "right",
    ambientColor: "#ff7700",
  },
  {
    id: "scene-03-drizzle",
    stepNum: "03",
    badge: "Haute Drizzle",
    title: "PÉRIGORD BLACK",
    titleHighlight: "TRUFFLE JUS.",
    subtitle: "Black Winter Truffle • Roasted Bone Marrow Reduction",
    description:
      "A silver culinary spoon releases an 18-hour reduction of black winter diamonds, roasted marrow jus, and 12-year Modena balsamic in a velvety spiral drizzle.",
    videoSrc: "/videos/step-3.mp4",
    fallbackSrc:
      "/videos/add%20video%20combination%20in%20the%20scrolling%20this%20sequence/video%20number%203%20add.mp4",
    posterSrc: "/thumbnails/step_3.jpg",
    specs: [
      { label: "Truffle Origin", val: "Périgord, France" },
      { label: "Reduction", val: "18-Hour Simmer" },
      { label: "Viscosity", val: "Silk Velvet Glaze" },
    ],
    alignment: "left",
    ambientColor: "#e5a93c",
  },
  {
    id: "scene-04-melt",
    stepNum: "04",
    badge: "Alpine Dairy Craft",
    title: "MOLTEN CAVE-AGED",
    titleHighlight: "GRUYÈRE.",
    subtitle: "24-Month Cave Reserve • Torch-Blistered Velvety Fondue",
    description:
      "Thick cuts of raw-milk Swiss Gruyère cascade luxuriously over the seared patty, blistering into amber bubbles under open flame to release toasted-nut umami.",
    videoSrc: "/videos/step-4.mp4",
    fallbackSrc:
      "/videos/add%20video%20combination%20in%20the%20scrolling%20this%20sequence/video%20number%204%20add.mp4",
    posterSrc: "/thumbnails/step_4.jpg",
    specs: [
      { label: "Aged Period", val: "24-Month Cave" },
      { label: "Melt Point", val: "72°C Molten" },
      { label: "Canton Origin", val: "Fribourg, Swiss" },
    ],
    alignment: "right",
    ambientColor: "#f3b134",
  },
  {
    id: "scene-05-anatomy",
    stepNum: "05",
    badge: "Zero-Gravity View",
    title: "EXPLODED ZERO-GRAVITY",
    titleHighlight: "ARCHITECTURE.",
    subtitle: "All 7 Artisanal Layers Suspended in Mid-Air Equilibrium",
    description:
      "Every single ingredient suspends in mid-air with millimeter precision: toasted cushion, wagyu patty, molten Gruyère, smoked tomato, frisée, truffle jus, and brioche crown.",
    videoSrc: "/videos/step-5.mp4",
    fallbackSrc:
      "/videos/add%20video%20combination%20in%20the%20scrolling%20this%20sequence/video%20number%205%20add.mp4",
    posterSrc: "/thumbnails/step_5.jpg",
    specs: [
      { label: "Layer Count", val: "7 Separated Tiers" },
      { label: "Perspective", val: "True 3D Exploded" },
      { label: "Equilibrium", val: "Zero-Gravity Hold" },
    ],
    alignment: "left",
    ambientColor: "#4a7c26",
  },
  {
    id: "scene-06-icon",
    stepNum: "06",
    badge: "The Royal Crown",
    title: "THE WAGYU ICON &",
    titleHighlight: "BRIOCHE CROWN.",
    subtitle: "Gold-Leaf Glazed Brioche • Chiaroscuro Studio Radiance",
    description:
      "The golden Hokkaido milk brioche crown descends gracefully, double-toasted with clarified wagyu tallow and kissed by edible 24K gold leaf.",
    videoSrc: "/videos/step-6.mp4",
    fallbackSrc:
      "/videos/add%20video%20combination%20in%20the%20scrolling%20this%20sequence/video%20number%206%20add.mp4",
    posterSrc: "/thumbnails/step_6.jpg",
    specs: [
      { label: "Brioche Rise", val: "36-Hour Sourdough" },
      { label: "Glaze Finish", val: "24K Edible Gold" },
      { label: "Weight", val: "380g Completed" },
    ],
    alignment: "center",
    ambientColor: "#f5c46b",
  },
  {
    id: "scene-07-reassembly",
    stepNum: "07",
    badge: "Harmonic Lock",
    title: "THE REASSEMBLY",
    titleHighlight: "LOCK.",
    subtitle: "All 7 Culinary Elements Harmonize into One Unified Masterpiece",
    description:
      "Fluid magnetic culinary physics: all floating layers compress and lock together with a succulent, juicy bounce, sending a micro-puff of aromatic steam outward.",
    videoSrc: "/videos/step-7.mp4",
    fallbackSrc:
      "/videos/add%20video%20combination%20in%20the%20scrolling%20this%20sequence/video%20number%207%20add.mp4",
    posterSrc: "/thumbnails/step_7.jpg",
    specs: [
      { label: "Structure", val: "Seamless Fusion" },
      { label: "Sealing Layer", val: "Marrow Cushion" },
      { label: "Mouthfeel", val: "Crisp & Melt Texture" },
    ],
    alignment: "right",
    ambientColor: "#e5a93c",
  },
  {
    id: "scene-08-packaging",
    stepNum: "08",
    badge: "Delivery Prestige",
    title: "OCTAGONAL PACKAGING",
    titleHighlight: "SEALED.",
    subtitle: "Matte Black Vault • Thermal Gold Velvet • Ready to Serve",
    description:
      "The assembled burger docks into our bespoke matte black octagonal presentation vault. The magnetic lid softly closes with gold-foil seals, locking core warmth at 65°C.",
    videoSrc: "/videos/step-8.mp4",
    fallbackSrc:
      "/videos/add%20video%20combination%20in%20the%20scrolling%20this%20sequence/video%20number%208%20add.mp4",
    posterSrc: "/thumbnails/step_8.jpg",
    specs: [
      { label: "Case Vault", val: "Matte Octagonal" },
      { label: "Cradle", val: "Thermal Gold Velvet" },
      { label: "Heat Retention", val: "45 Mins at 60°C" },
    ],
    alignment: "center",
    ambientColor: "#e5a93c",
  },
];

