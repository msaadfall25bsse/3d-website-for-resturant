import { MenuItem, BurgerIngredient, VideoAssetInfo } from "@/types";

export const BRAND_NAME = "NOIR & EMBER";
export const BRAND_TAGLINE = "Artisanal Haute-Burger Studio";

export const BURGER_INGREDIENTS: BurgerIngredient[] = [
  {
    id: "top-bun",
    name: "Golden Brioche Crown",
    subtitle: "French Butter & Sesame Glaze",
    description: "Slow-fermented for 36 hours using Normandy cultured butter, brush-finished with organic egg wash and toasted ivory sesame seeds.",
    color: "#C68239",
    yOffset: 2.8,
    layerIndex: 0,
    specs: {
      origin: "Brittany, France",
      prep: "Double-baked in stone hearth",
      temperature: "Served at 48°C warmth"
    }
  },
  {
    id: "sauce",
    name: "Black Truffle Emulsion",
    subtitle: "Aged Balsamic & Smoked Marrow",
    description: "Silky reduction of Perigord winter truffles, roasted bone marrow jus, and 12-year Modena balsamic drizzle.",
    color: "#6B3514",
    yOffset: 2.0,
    layerIndex: 1,
    specs: {
      origin: "Perigord, France",
      prep: "Slow-simmered for 18 hours",
      temperature: "Emulsified at 55°C"
    }
  },
  {
    id: "greens",
    name: "Hydroponic Frisée & Rúcula",
    subtitle: "Flash-Chilled Crisp Leaves",
    description: "Organic micro-greens harvested at daybreak, tossed in cold-pressed Sicilian olive oil and sea salt flakes.",
    color: "#4A7C26",
    yOffset: 1.2,
    layerIndex: 2,
    specs: {
      origin: "Local Alpine Greenhouse",
      prep: "Ice-water washed & spun",
      temperature: "Stored at 4°C"
    }
  },
  {
    id: "tomato",
    name: "Charred Heirloom Crimson",
    subtitle: "Vine-Ripened & Wood-Smoked",
    description: "Thick-cut volcanic heirloom tomatoes, flame-kissed over Japanese binchotan charcoal with cracked Tellicherry peppercorn.",
    color: "#B22222",
    yOffset: 0.4,
    layerIndex: 3,
    specs: {
      origin: "San Marzano Valley",
      prep: "Flame-seared for 45 seconds",
      temperature: "Resting at 35°C"
    }
  },
  {
    id: "cheese",
    name: "Molten 24-Month Gruyère",
    subtitle: "Cave-Aged Swiss Reserve",
    description: "Rich, nutty fondue melt cascading gently over the prime patty, torch-blistered to a delicate bubbling caramel crust.",
    color: "#F3B134",
    yOffset: -0.4,
    layerIndex: 4,
    specs: {
      origin: "Fribourg, Switzerland",
      prep: "Cave-aged & torch-melted",
      temperature: "Molten at 72°C"
    }
  },
  {
    id: "patty",
    name: "A5 Miyazaki Wagyu Patty",
    subtitle: "Double-Grind Chuck & Short Rib",
    description: "220g master cut marbled with pure oleic acid fat, seared over screaming 650°C white oak grates for a glass-crisp exterior and succulent pink core.",
    color: "#422115",
    yOffset: -1.4,
    layerIndex: 5,
    specs: {
      origin: "Miyazaki Prefecture, Japan",
      prep: "Dry-aged 45 days, coarse ground",
      temperature: "Sear crust 650°C / Medium-rare core 54°C"
    }
  },
  {
    id: "bottom-bun",
    name: "Toasted Brioche Base",
    subtitle: "Bone Marrow Seared Cushion",
    description: "Sturdy yet airy foundation toasted on a cast-iron griddle in smoked marrow fat to seal every drop of savory jus.",
    color: "#B3702B",
    yOffset: -2.4,
    layerIndex: 6,
    specs: {
      origin: "Artisanal Hearth Bake",
      prep: "Skillet-toasted in marrow butter",
      temperature: "Warm crust finish"
    }
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "noir-reserve-wagyu",
    name: "The Noir Reserve Wagyu",
    tagline: "Our definitive culinary masterpiece",
    category: "signature",
    price: 38,
    rating: 4.95,
    calories: "920 kcal",
    image: "/images/burger-noir-reserve.webp",
    description: "220g A5 Miyazaki Wagyu, molten 24-month Gruyère, Perigord black truffle emulsion, charred San Marzano tomato, and micro-frisée on a hand-glazed brioche crown.",
    ingredients: ["A5 Miyazaki Wagyu", "24-mo Gruyère", "Black Truffle Emulsion", "Brioche Crown", "Charred Tomato"],
    badges: ["Chef's Signature", "A5 Wagyu", "Truffle Infused"],
    popular: true
  },
  {
    id: "ember-smoked-smash",
    name: "Ember Smoked Double Smash",
    tagline: "Screaming hot cast-iron lace crust",
    category: "signature",
    price: 32,
    rating: 4.9,
    calories: "850 kcal",
    image: "/images/burger-ember-smash.webp",
    description: "Dual 110g prime dry-aged Angus patties smashed paper-thin on 350°C steel, triple smoked cheddar, fermented jalapeño jam, and bone marrow aioli.",
    ingredients: ["Dual Dry-Aged Angus", "Triple Smoked Cheddar", "Jalapeño Jam", "Bone Marrow Aioli"],
    badges: ["Best Seller", "Lace Crust"],
    popular: true
  },
  {
    id: "truffle-forest-burger",
    name: "The Truffle Forager",
    tagline: "Earthy, decadent & deeply aromatic",
    category: "signature",
    price: 36,
    rating: 4.88,
    calories: "890 kcal",
    image: "/images/burger-truffle-forest.webp",
    description: "Prime beef patty infused with Porcini mushroom butter, fontina cheese, sautéed chanterelles, and whipped black garlic cream.",
    ingredients: ["Prime Chuck & Brisket", "Fontina Cheese", "Chanterelles", "Black Garlic Cream"],
    badges: ["Seasonal Reserve", "Wild Mushrooms"]
  },
  {
    id: "classic-gold-cheeseburger",
    name: "The Heritage Gold Standard",
    tagline: "Simplicity elevated to absolute fine art",
    category: "classic",
    price: 26,
    rating: 4.82,
    calories: "780 kcal",
    image: "/images/burger-heritage-classic.webp",
    description: "Heritage Angus beef patty, dual-layer sharp Vermont cheddar, homemade dill pickle ribbons, charred shallot relish, and house Dijon emulsion.",
    ingredients: ["Heritage Angus", "Sharp Vermont Cheddar", "Dill Relish", "House Dijon Sauce"],
    badges: ["Timeless Classic", "Organic Pickles"]
  },
  {
    id: "crispy-buttermilk-poulet",
    name: "Kyoto Hot Honey Poulet",
    tagline: "Ultra-crisp Japanese double-fried chicken",
    category: "chicken",
    price: 28,
    rating: 4.92,
    calories: "810 kcal",
    image: "/images/burger-kyoto-chicken.webp",
    description: "Organic chicken thigh brined for 24 hours in citrus buttermilk, crusted in spiced panko, glazed with Yuzu hot honey, and topped with pickled daikon slaw.",
    ingredients: ["Citrus-Brined Chicken", "Panko Shards", "Yuzu Hot Honey", "Pickled Daikon"],
    badges: ["Staff Favorite", "24hr Brined"]
  },
  {
    id: "black-truffle-parmesan-frites",
    name: "Triple-Cooked Truffle Frites",
    tagline: "Crisp exterior with fluffy cloud interior",
    category: "fries",
    price: 14,
    rating: 4.96,
    calories: "450 kcal",
    image: "/images/fries-truffle.webp",
    description: "Hand-cut Agria potatoes simmered, steamed, and double-fried in wagyu tallow, dusted with 36-month Reggiano cheese, fresh winter truffle, and thyme salt.",
    ingredients: ["Agria Potatoes", "Wagyu Tallow", "36-mo Reggiano", "Fresh Winter Truffle"],
    badges: ["Wagyu Fried", "Truffle Shavings"],
    popular: true
  },
  {
    id: "smoked-paprika-sweet-fries",
    name: "Smoked Paprika Sweet Potato",
    tagline: "Caramelized sweetness with Spanish pimentón",
    category: "fries",
    price: 12,
    rating: 4.79,
    calories: "410 kcal",
    image: "/images/fries-sweet-potato.webp",
    description: "Crispy sweet potato batons dusted in oak-smoked Spanish paprika and rosemary salt, paired with maple chipotle crema.",
    ingredients: ["Organic Sweet Potatoes", "Smoked Paprika", "Rosemary Salt", "Maple Chipotle"],
    badges: ["Vegetarian", "Smoked Spice"]
  },
  {
    id: "sommelier-combo-experience",
    name: "The Sommelier Feast for Two",
    tagline: "Two signature burgers, truffle fries & wine pairing",
    category: "combos",
    price: 88,
    rating: 4.98,
    calories: "2200 kcal",
    image: "/images/combo-sommelier.webp",
    description: "Choose any two signature burgers, served alongside a double portion of Triple-Cooked Truffle Frites and two glasses of cellar-selected Bordeaux or artisan mocktails.",
    ingredients: ["2 Signature Burgers", "Double Truffle Frites", "2 Cellar Pairings"],
    badges: ["Luxury Duo", "Wine Included"]
  },
  {
    id: "smoked-bourbon-cola",
    name: "Artisan Smoked Vanilla Cola",
    tagline: "Small-batch botanicals with oak essence",
    category: "drinks",
    price: 9,
    rating: 4.85,
    calories: "140 kcal",
    image: "/images/drink-smoked-cola.webp",
    description: "Hand-brewed cola nut infusion aged in charred oak barrels with Madagascar vanilla bean and sparkling mountain spring water.",
    ingredients: ["Kola Nut Extract", "Madagascar Vanilla", "Charred Oak Essence", "Pure Cane Sugar"],
    badges: ["Small Batch", "Barrel Aged"]
  },
  {
    id: "yuzu-sparkling-citrus",
    name: "Yuzu & Shiso Sparkling Tonic",
    tagline: "Crisp palate cleanser with herbal brightness",
    category: "drinks",
    price: 8,
    rating: 4.88,
    calories: "90 kcal",
    image: "/images/drink-yuzu-sparkler.webp",
    description: "Cold-pressed Japanese Yuzu juice, muddled purple shiso leaves, and craft tonic with a Himalayan pink salt rim.",
    ingredients: ["Japanese Yuzu", "Purple Shiso", "Quinine Craft Tonic"],
    badges: ["Zero Alcohol", "Palate Cleanser"]
  }
];

export const GOOGLE_FLOW_VIDEOS: VideoAssetInfo[] = [
  {
    id: "video-01",
    filename: "video-01-hero-floating.mp4",
    title: "Cinematic Floating Burger & Flame Embers",
    section: "Hero & Opening Stage",
    purpose: "Captivates visitors on first load with an ultra-photorealistic signature burger rotating gracefully in dark studio space as amber embers drift.",
    prompt: "Ultra-photorealistic 8k cinematic commercial shot: A luxurious gourmet artisan burger hovering weightlessly in mid-air against an obsidian pitch-black studio background. The burger features a glossy golden-brown brioche bun sprinkled with toasted white sesame seeds, dripping melted golden Gruyère cheese, a flame-grilled thick Wagyu beef patty with succulent juices, vibrant ruffled green frisée lettuce, and sliced heirloom red tomatoes. Camera slowly orbits the burger in a silky 360 turntable move. Dramatic warm amber and champagne gold rim lighting sculpts every texture. Faint ethereal wisps of hot steam and tiny glowing ember sparks float gently upward. Locked center composition, zero camera shake, hyper-detailed food advertising aesthetic.",
    cameraMovement: "360-degree slow turntable orbit, slight upward tilt, locked focal distance.",
    duration: "6 seconds",
    aspectRatio: "16:9 widescreen (1920x1080) and 9:16 mobile crop",
    fps: 30,
    firstFrame: "Front-facing burger centered in dark void with warm rim light.",
    lastFrame: "Burger rotated 360 degrees returning to front alignment seamlessly."
  },
  {
    id: "video-02",
    filename: "video-02-burger-exploded.mp4",
    title: "Explosion & Ingredient Separation in 3D Space",
    section: "Scroll Scene 2 & 3: The Anatomy",
    purpose: "Demonstrates the craftsmanship and purity of each ingredient as the burger smoothly disassembles into floating parallel layers.",
    prompt: "Cinematic slow-motion 8k food disassembly sequence: A gourmet artisan burger cleanly separates into individual floating vertical layers in zero gravity. The glossy sesame brioche top bun rises smoothly upward; a velvety dark truffle sauce layer suspends in droplets; fresh crisp frisée micro-greens lift; sliced flame-kissed heirloom tomatoes float; a sheet of bubbling melted golden Gruyère cheese separates from the charred Wagyu beef patty; and the toasted bottom bun remains anchored below. Clean symmetrical exploded product view with equal vertical spacing between layers. Dark charcoal studio background, studio key light and sharp golden rim lighting catching individual texture details. Perfect vertical separation, slow-motion speed.",
    cameraMovement: "Slow smooth vertical tracking camera pushing gently closer to the separated layers.",
    duration: "5 seconds",
    aspectRatio: "16:9 (1920x1080)",
    fps: 30,
    firstFrame: "Assembled burger front view.",
    lastFrame: "Completely separated, perfectly floating ingredients in an exploded view."
  },
  {
    id: "video-03",
    filename: "video-03-ingredient-grill-patty.mp4",
    title: "Flame Grilling the Wagyu Patty",
    section: "Craft Chapter: Open Fire Mastery",
    purpose: "Showcases the intense heat, sear crust, and culinary technique behind the beef preparation.",
    prompt: "Extreme macro 8k slow-motion food cinematography: A thick 220g A5 Wagyu beef patty sizzling violently on screaming-hot cast-iron grill grates over glowing white-hot binchotan charcoal. Blistering sear marks caramelize in real time across the marbled beef surface. Clear savory fat drips into the coals beneath, igniting brief theatrical licking tongues of golden orange flame. Dense fragrant aromatic steam billows around the patty. Rich mahogany bark contrast against molten pink marbling. Dark moody atmospheric background, shallow depth of field focusing on the bubbling meat juices. High-end Michelin culinary commercial.",
    cameraMovement: "Slow macro push-in with 45-degree angled lens, rack focus across sizzling sear marks.",
    duration: "4 seconds",
    aspectRatio: "16:9 (1920x1080)",
    fps: 30,
    firstFrame: "Patty on grill grates beginning to sizzle with smoke.",
    lastFrame: "Flames licking upward with fully caramelized deep golden-brown crust."
  },
  {
    id: "video-04",
    filename: "video-04-cheese-melt-cascade.mp4",
    title: "Molten Gruyère Cheese Melting & Bubbling",
    section: "Craft Chapter: Artisanal Dairy & Melt",
    purpose: "Sensory close-up of cheese melting over the seared patty for extreme appetite appeal.",
    prompt: "Ultra-macro 8k slow-motion shot: A thick slice of 24-month cave-aged Swiss Gruyère cheese melting luxuriously over the rugged crust of a hot Wagyu patty. The cheese softens, bubbles into delicate amber blisters, and cascades down the sides in thick, glossy, molten ribbons. Torched highlights glint with golden reflections. Deep black background, single directional warm studio spotlight highlighting the creamy texture and elasticity of the cheese. Irresistible gourmet food commercial style.",
    cameraMovement: "Slow descending macro track following the cascade of the melted cheese.",
    duration: "4 seconds",
    aspectRatio: "16:9 (1920x1080)",
    fps: 30,
    firstFrame: "Solid cheese slice on hot patty just starting to soften.",
    lastFrame: "Completely molten cheese coating the patty with caramelized edges."
  },
  {
    id: "video-05",
    filename: "video-05-sauce-pour-drizzle.mp4",
    title: "Velvety Black Truffle Sauce Drizzle",
    section: "Craft Chapter: The Signature Emulsion",
    purpose: "Highlights the rich decadence of the chef's signature truffle and bone marrow sauce.",
    prompt: "Cinematic 8k slow-motion pour: A chef's polished silver culinary spoon slowly drizzling a rich, velvety black truffle and reduced balsamic emulsion in an elegant spiral ribbon over crisp green frisée and warm toasted brioche. Tiny flecks of real black truffle glint inside the glossy dark mahogany sauce. Pristine studio environment with jet-black backdrop. Backlit warm rim lighting catching the glossy surface tension of the flowing sauce. Mesmerizing fluid dynamics, ultra-high resolution.",
    cameraMovement: "Static tight macro composition with the sauce entering from top frame.",
    duration: "4 seconds",
    aspectRatio: "16:9 (1920x1080)",
    fps: 30,
    firstFrame: "Spoon entering frame with sauce hanging in tension.",
    lastFrame: "Sauce settling in an artistic pool over the lettuce leaves."
  },
  {
    id: "video-06",
    filename: "video-06-burger-reassemble.mp4",
    title: "Burger Precision Reassembly",
    section: "Scroll Scene 4: Perfection Reassembled",
    purpose: "Seamlessly snaps all ingredients back together into the finished burger with satisfying weight.",
    prompt: "Reverse explosion 8k cinematic shot: All separated floating ingredients of the gourmet burger — golden brioche crown, truffle sauce, crisp greens, heirloom tomato, molten Gruyère, grilled Wagyu patty, and toasted bottom bun — smoothly descend and lock together into a single immaculate assembled burger. As the top bun lands, the burger gives a subtle, juicy, satisfying bounce, sending a micro-puff of fragrant steam outward. Jet-black studio environment, warm golden rim lights illuminating the assembled silhouette. Fluid, controlled, magnetic animation.",
    cameraMovement: "Slow camera pullback from tight layer view to full hero framing.",
    duration: "5 seconds",
    aspectRatio: "16:9 (1920x1080)",
    fps: 30,
    firstFrame: "Exploded layers floating in space.",
    lastFrame: "Perfect assembled burger resting centered in pristine studio light."
  },
  {
    id: "video-07",
    filename: "video-07-packaging-box-reveal.mp4",
    title: "Luxury Matte Black Packaging Experience",
    section: "Scroll Scene 5: Unboxing & Delivery Prestige",
    purpose: "Shows the luxury unboxing experience where the assembled burger slides into the custom magnetic-clasp box.",
    prompt: "High-end luxury packaging commercial in 8k: A bespoke matte black octagonal burger presentation box featuring embossed metallic gold foil branding 'NOIR & EMBER'. The box lid glides open smoothly with an engineered magnetic hinge, revealing a gold-lined velvet-textured interior stage. The freshly assembled gourmet burger floats gracefully into the cradle of the box. Warm golden light emanates from inside the packaging. Once the burger docks securely, the lid folds closed with an ultra-satisfying precision seal. Dark reflective marble floor, dramatic architectural lighting.",
    cameraMovement: "Front-to-top 45-degree diagonal camera crane move tracking the burger entry.",
    duration: "6 seconds",
    aspectRatio: "16:9 (1920x1080)",
    fps: 30,
    firstFrame: "Closed matte black box on dark reflective stage.",
    lastFrame: "Box lid softly clicking shut with gold foil logo glowing in rim light."
  },
  {
    id: "video-08",
    filename: "video-08-commercial-cinematic.mp4",
    title: "Full Restaurant Commercial Finale",
    section: "Brand Commercial & Finale",
    purpose: "A high-octane montage of fire, plating, sommelier pouring, and final dining satisfaction.",
    prompt: "Dynamic 8k fast-paced luxury restaurant brand commercial montage: Rapid cinematic cuts of high-heat flame flaring on cast iron, a chef in a minimalist black uniform using tweezers to place micro-greens, molten cheese blistering under a flame torch, a master sommelier pouring bold vintage red wine into crystal stemware, two guests in an intimate dimly lit restaurant smiling in delight, and a final sweeping beauty shot of the entire NOIR & EMBER burger collection glowing under warm ambient candlelight. Film grain, 35mm anamorphic lens flares, rich shadows, and deep golden color grading.",
    cameraMovement: "Dynamic montage cuts with cinematic handheld whip pans and macro push-ins.",
    duration: "8 seconds",
    aspectRatio: "16:9 (1920x1080)",
    fps: 30,
    firstFrame: "Flaring open-fire flame grate.",
    lastFrame: "Final hero table setting with glowing candles and brand emblem."
  }
];
