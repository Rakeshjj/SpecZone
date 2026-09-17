export interface Brand {
  id: number;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export interface Solution {
  id: number;
  title: string;
  tagline: string;
  image: string;
  description: string;
}

export interface Location {
  id: number;
  name: string;
  city: string;
  image: string;
  address: string;
  phone: string;
  hours: string;
}

export interface ClinicalSection {
  definition: string;
  causes: string[];
  symptoms: string[];
  treatments: string[];
  note?: string;
  example?: string;
}

export interface Article {
  id: number;
  title: string;
  subtitle?: string;
  category: string;
  readTime: string;
  date: string;
  thumbnail: string;
  summary: string;
  content: string[];
  clinicalDetails?: ClinicalSection;
}
