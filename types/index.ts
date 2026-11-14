export interface BurgerIngredient {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  color: string;
  yOffset: number; // Disassembled y position
  layerIndex: number;
  specs: {
    origin: string;
    prep: string;
    temperature: string;
  };
}

export interface MenuItem {
  id: string;
  name: string;
  tagline: string;
  category: "signature" | "classic" | "chicken" | "combos" | "fries" | "drinks";
  price: number;
  rating: number;
  calories: string;
  image: string;
  description: string;
  ingredients: string[];
  badges: string[];
  popular?: boolean;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedVariants?: { [key: string]: string };
  specialInstructions?: string;
}

export interface VideoAssetInfo {
  id: string;
  filename: string;
  title: string;
  section: string;
  purpose: string;
  prompt: string;
  cameraMovement: string;
  duration: string;
  aspectRatio: string;
  fps: number;
  firstFrame: string;
  lastFrame: string;
}
