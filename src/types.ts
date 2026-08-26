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
