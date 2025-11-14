// Velvi - Constants and Mock Data

import { Product, MembershipPlan, SkinConcern } from './types';

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly Premium',
    price: 7.99,
    interval: 'monthly',
    features: [
      'Full AI skin analysis',
      'Daily journal entries',
      'Unlimited product scanning',
      'Deep ingredient breakdowns',
      'Multiple routines',
      'Climate-based coaching',
      'AI insights & progress tracking',
      'Ad-free experience'
    ]
  },
  {
    id: 'yearly',
    name: 'Yearly Premium',
    price: 59.99,
    interval: 'yearly',
    features: [
      'All monthly features',
      'Save 37% compared to monthly',
      'Priority support',
      'Early access to new features'
    ]
  }
];

export const FREE_TIER_LIMITS = {
  scansPerMonth: 3,
  journalEntriesPerWeek: 1,
  productScansPerDay: 5,
  routines: 1
};

export const PREMIUM_TIER_LIMITS = {
  scansPerMonth: Infinity,
  journalEntriesPerWeek: Infinity,
  productScansPerDay: Infinity,
  routines: Infinity
};

export const SKIN_CONCERNS: { value: SkinConcern; label: string; emoji: string }[] = [
  { value: 'acne', label: 'Acne & Breakouts', emoji: '🔴' },
  { value: 'texture', label: 'Rough Texture', emoji: '🌊' },
  { value: 'redness', label: 'Redness', emoji: '🌹' },
  { value: 'pigmentation', label: 'Dark Spots', emoji: '☀️' },
  { value: 'pores', label: 'Large Pores', emoji: '🔍' },
  { value: 'dryness', label: 'Dryness', emoji: '💧' },
  { value: 'oiliness', label: 'Oiliness', emoji: '✨' },
  { value: 'fine_lines', label: 'Fine Lines', emoji: '⏰' }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Gentle Hydrating Cleanser',
    brand: 'CeraVe',
    category: 'cleanser',
    price: 14.99,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    ingredients: ['Ceramides', 'Hyaluronic Acid', 'Glycerin'],
    concerns: ['dryness', 'texture'],
    affiliateLink: 'https://example.com/cerave-cleanser',
    isSensitiveSkin: true
  },
  {
    id: '2',
    name: 'Niacinamide 10% + Zinc 1%',
    brand: 'The Ordinary',
    category: 'serum',
    price: 5.99,
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
    ingredients: ['Niacinamide', 'Zinc PCA'],
    concerns: ['acne', 'pores', 'oiliness', 'redness'],
    isBudget: true
  },
  {
    id: '3',
    name: 'Retinol 0.5% in Squalane',
    brand: 'The Ordinary',
    category: 'treatment',
    price: 7.99,
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
    ingredients: ['Retinol', 'Squalane'],
    concerns: ['fine_lines', 'texture', 'pigmentation'],
    isBudget: true
  },
  {
    id: '4',
    name: 'Vitamin C Suspension 23%',
    brand: 'The Ordinary',
    category: 'serum',
    price: 6.99,
    rating: 4.3,
    imageUrl: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop',
    ingredients: ['L-Ascorbic Acid', 'Vitamin C'],
    concerns: ['pigmentation', 'dryness', 'fine_lines']
  },
  {
    id: '5',
    name: 'Moisturizing Cream',
    brand: 'CeraVe',
    category: 'moisturizer',
    price: 16.99,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop',
    ingredients: ['Ceramides', 'Hyaluronic Acid', 'Petrolatum'],
    concerns: ['dryness', 'texture'],
    affiliateLink: 'https://example.com/cerave-moisturizer',
    isSensitiveSkin: true
  },
  {
    id: '6',
    name: 'Mineral Sunscreen SPF 50',
    brand: 'La Roche-Posay',
    category: 'sunscreen',
    price: 33.99,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1556228852-80a5e2c53b0f?w=400&h=400&fit=crop',
    ingredients: ['Zinc Oxide', 'Titanium Dioxide'],
    concerns: ['pigmentation', 'redness'],
    isPremium: true,
    isSensitiveSkin: true
  },
  {
    id: '7',
    name: 'Salicylic Acid 2% Solution',
    brand: 'The Ordinary',
    category: 'treatment',
    price: 5.49,
    rating: 4.4,
    imageUrl: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop',
    ingredients: ['Salicylic Acid', 'Witch Hazel'],
    concerns: ['acne', 'pores', 'oiliness'],
    isBudget: true
  },
  {
    id: '8',
    name: 'Hyaluronic Acid 2% + B5',
    brand: 'The Ordinary',
    category: 'serum',
    price: 6.99,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1620916297397-a4a5f7c0b8f9?w=400&h=400&fit=crop',
    ingredients: ['Hyaluronic Acid', 'Vitamin B5'],
    concerns: ['dryness', 'fine_lines'],
    isBudget: true,
    isSensitiveSkin: true
  }
];

export const ROUTINE_ORDER = {
  AM: ['cleanser', 'toner', 'serum', 'eye_cream', 'moisturizer', 'sunscreen'],
  PM: ['cleanser', 'toner', 'treatment', 'serum', 'eye_cream', 'moisturizer', 'mask']
};

export const INGREDIENT_CONFLICTS = {
  'Retinol': ['Vitamin C', 'AHA', 'BHA', 'Benzoyl Peroxide'],
  'Vitamin C': ['Retinol', 'Niacinamide', 'AHA', 'BHA'],
  'Niacinamide': ['Vitamin C'],
  'AHA': ['Retinol', 'Vitamin C', 'BHA'],
  'BHA': ['Retinol', 'Vitamin C', 'AHA'],
  'Benzoyl Peroxide': ['Retinol', 'Vitamin C']
};
