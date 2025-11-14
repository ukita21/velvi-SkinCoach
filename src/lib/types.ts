// Velvi - AI Skin Care Routine Types

export type UserTier = 'free' | 'premium';

export type SkinConcern = 
  | 'acne' 
  | 'texture' 
  | 'redness' 
  | 'pigmentation' 
  | 'pores' 
  | 'dryness' 
  | 'oiliness' 
  | 'fine_lines';

export type RoutineTime = 'AM' | 'PM';

export type ProductCategory = 
  | 'cleanser' 
  | 'toner' 
  | 'serum' 
  | 'moisturizer' 
  | 'sunscreen' 
  | 'treatment' 
  | 'mask' 
  | 'eye_cream';

export interface User {
  id: string;
  email: string;
  name: string;
  tier: UserTier;
  membershipExpiry?: Date;
  createdAt: Date;
  streak: number;
  totalScans: number;
}

export interface SkinAnalysis {
  id: string;
  userId: string;
  photoUrl: string;
  timestamp: Date;
  scores: {
    acne: number;
    texture: number;
    redness: number;
    pigmentation: number;
    pores: number;
    dryness: number;
    oiliness: number;
    fineLines: number;
  };
  concerns: SkinConcern[];
  summary: string;
  recommendations: string[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  rating: number;
  imageUrl: string;
  ingredients: string[];
  concerns: SkinConcern[];
  affiliateLink?: string;
  isBudget?: boolean;
  isPremium?: boolean;
  isSensitiveSkin?: boolean;
  barcode?: string;
}

export interface RoutineStep {
  id: string;
  productId: string;
  order: number;
  time: RoutineTime;
  notes?: string;
}

export interface Routine {
  id: string;
  userId: string;
  name: string;
  time: RoutineTime;
  steps: RoutineStep[];
  isActive: boolean;
  createdAt: Date;
}

export interface JournalEntry {
  id: string;
  userId: string;
  photoUrl: string;
  date: Date;
  notes?: string;
  mood?: 'great' | 'good' | 'okay' | 'bad';
  analysis?: {
    dryness: number;
    redness: number;
    texture: number;
    comparison?: string;
  };
}

export interface IngredientAnalysis {
  name: string;
  purpose: string;
  safety: 'safe' | 'caution' | 'avoid';
  conflicts?: string[];
  explanation: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
}
