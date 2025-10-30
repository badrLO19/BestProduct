/**
 * Types pour les offres TheBest
 * Ces types correspondent aux données retournées par le webhook n8n
 */

export interface Offer {
  id: string;
  title: string;
  price: string;
  rating?: string;
  source: string;
  url: string;
  image?: string;
  description?: string;
  reviews?: number;
  availability?: string;
  shipping?: string;
}

export interface SearchResponse {
  offers: Offer[];
  query: string;
  timestamp?: string;
  total?: number;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export type SearchStatus = 'idle' | 'loading' | 'success' | 'error';
