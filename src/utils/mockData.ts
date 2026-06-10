import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // LIFESTYLE
  {
    id: "cf-wallet-01",
    name: "Minimalist Cardholder",
    category: "Lifestyle",
    price: 4999,
    image: "https://images.unsplash.com/photo-1579014134953-1580d7f123f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGxlYXRoZXIlMjB3YWxsZXR8ZW58MXx8fHwxNzgwNjgxNDQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Aerospace-grade carbon fiber woven into a sleek, RFID-blocking silhouette. Holds up to 6 cards.",
    specs: ["Weight: 14g", "Thickness: 4mm", "Finish: Matte", "Material: 3K Twill Carbon Fiber"]
  },
  {
    id: "cf-watch-box",
    name: "Collector's Timepiece Case",
    category: "Lifestyle",
    price: 12999,
    image: "https://images.unsplash.com/photo-1616928231359-fc8b7e244c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMG1pbmltYWxpc3QlMjB3YXRjaHxlbnwxfHx8fDE3ODA2ODE0NDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Store your prized possessions in a fortress of forged carbon. Alcantara lined interior.",
    specs: ["Capacity: 3 Watches", "Interior: Black Alcantara", "Hinges: Machined Aluminum", "Material: Forged Carbon Fiber"]
  },
  {
    id: "cf-keychain-01",
    name: "Forged Carabiner Keychain",
    category: "Lifestyle",
    price: 2499,
    image: "https://images.unsplash.com/photo-1590740051939-2ceee281179a?auto=format&fit=crop&q=80&w=1000",
    description: "Ultra-lightweight EDC carabiner crafted from chopped carbon fiber tows. Unique marbled pattern.",
    specs: ["Weight: 8g", "Load Capacity: 25kg", "Finish: Gloss", "Material: Forged Carbon"]
  },
  {
    id: "cf-cigar-tube",
    name: "Executive Cigar Tube",
    category: "Lifestyle",
    price: 5999,
    image: "https://images.unsplash.com/photo-1623945415758-204127041697?auto=format&fit=crop&q=80&w=1000",
    description: "Maintain perfect humidity. Crush-proof carbon fiber construction with CNC machined titanium end caps.",
    specs: ["Length: 170mm", "Diameter: 22mm", "Seal: O-Ring", "Material: 3K Twill"]
  },
  {
    id: "cf-pen-01",
    name: "Tactical Bolt-Action Pen",
    category: "Lifestyle",
    price: 8999,
    image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&q=80&w=1000",
    description: "Smooth writing meets rugged durability. Real carbon fiber barrel wrapped around a brass inner tube.",
    specs: ["Ink: Fisher Space", "Mechanism: Bolt Action", "Weight: 22g", "Trim: Titanium"]
  },

  // ACCESSORIES
  {
    id: "cf-case-14",
    name: "iPhone 15 Pro Aramid Case",
    category: "Accessories",
    price: 3499,
    image: "https://images.unsplash.com/photo-1637004732258-4b792ce8f474?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGNhcmJvbiUyMGZpYmVyJTIwdGV4dHVyZXxlbnwxfHx8fDE3ODA2ODE0NDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Snap-on protection crafted from 100% genuine aramid fiber. Zero signal interference. MagSafe compatible.",
    specs: ["Weight: 12g", "Thickness: 0.6mm", "MagSafe: Yes", "Material: Aramid Fiber"]
  },
  {
    id: "cf-s24-case",
    name: "Galaxy S24 Ultra Forged Case",
    category: "Accessories",
    price: 3499,
    image: "https://images.unsplash.com/photo-1541411032338-715bb179e8a7?auto=format&fit=crop&q=80&w=1000",
    description: "Precision molded forged carbon case with shock-absorbing TPU bumpers.",
    specs: ["Weight: 15g", "Drop Protection: 6ft", "Wireless Charging: Yes", "Material: Forged Carbon + TPU"]
  },
  {
    id: "cf-airpods-pro",
    name: "AirPods Pro 2 Armor",
    category: "Accessories",
    price: 2999,
    image: "https://images.unsplash.com/photo-1588156979401-447551069680?auto=format&fit=crop&q=80&w=1000",
    description: "Two-piece hard shell case made from real 3K twill carbon fiber. LED visible.",
    specs: ["Thickness: 0.8mm", "Fit: Snap-on", "Lanyard Loop: Yes", "Material: 3K Twill"]
  },
  {
    id: "cf-macbook-sleeve",
    name: "MacBook Pro 14 Sleeve",
    category: "Accessories",
    price: 7499,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=1000",
    description: "Flexible carbon fiber leather alternative. Water-resistant and incredibly durable.",
    specs: ["Compatibility: 14-inch laptops", "Interior: Microfiber", "Closure: Magnetic", "Material: Carbon Fiber Leather"]
  },

  // AUTO
  {
    id: "cf-spoiler-m3",
    name: "BMW M3 G80 Rear Spoiler",
    category: "Auto",
    price: 45000,
    image: "https://images.unsplash.com/photo-1669882571612-4a9c7822cd4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBibGFjayUyMHNwb3J0cyUyMGNhciUyMGRldGFpbHN8ZW58MXx8fHwxNzgwNjgxNDQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Aggressive styling meets aerodynamic downforce. Pre-preg carbon fiber baked in an autoclave for maximum strength.",
    specs: ["Weight: 1.2kg", "Weave: 2x2 Twill", "Fitment: BMW G80/G82", "Coating: UV-Resistant Clear Coat"]
  },
  {
    id: "cf-mirror-m",
    name: "M-Style Mirror Caps",
    category: "Auto",
    price: 22000,
    image: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=1000",
    description: "Direct replacement mirror covers. Not overlays. Fully molded carbon fiber for perfect fitment.",
    specs: ["Install: Direct Replacement", "Weave: 2x2 Twill", "Fitment: BMW F30/F32", "Finish: High Gloss"]
  },
  {
    id: "cf-steering-wheel",
    name: "Custom Carbon Steering Wheel",
    category: "Auto",
    price: 85000,
    image: "https://images.unsplash.com/photo-1605514681602-de549bd9b1dc?auto=format&fit=crop&q=80&w=1000",
    description: "Reshaped core with carbon fiber top/bottom and perforated leather grips. LED shift lights available.",
    specs: ["Grips: Perforated Leather", "Shape: Flat Bottom", "Stitching: M-Tri Color", "Material: Carbon Fiber Core"]
  },
  {
    id: "cf-paddle-shifters",
    name: "Extended Paddle Shifters",
    category: "Auto",
    price: 12500,
    image: "https://images.unsplash.com/photo-1620912165080-60b6d27cb1ba?auto=format&fit=crop&q=80&w=1000",
    description: "Enhance your shifting experience with extended reach and tactile feedback.",
    specs: ["Install: Bolt-on", "Length: +40mm", "Feedback: Tactile click", "Material: Dry Carbon"]
  },
  {
    id: "cf-diffuser-c63",
    name: "AMG C63 Rear Diffuser",
    category: "Auto",
    price: 68000,
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1000",
    description: "Enhance rear airflow and downforce. Aggressive 4-fin design with perfectly aligned weave.",
    specs: ["Fins: 4", "Fitment: W205 C63", "Install: Bumper removal required", "Weave: 2x2 Twill"]
  },
  {
    id: "cf-exhaust-tips",
    name: "Akrapovic Style Exhaust Tips",
    category: "Auto",
    price: 18000,
    image: "https://images.unsplash.com/photo-1598453303642-1e96a233513d?auto=format&fit=crop&q=80&w=1000",
    description: "Stainless steel inner core with dry carbon fiber sleeve. Heat resistant.",
    specs: ["Inlet: 63mm", "Outlet: 89mm", "Core: 304 Stainless", "Sleeve: Dry Carbon"]
  }
];
