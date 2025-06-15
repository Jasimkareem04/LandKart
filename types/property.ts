export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'residential' | 'commercial' | 'land';
  status: 'for_sale' | 'sold' | 'pending';
  images: string[];
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  features: {
    bedrooms?: number;
    bathrooms?: number;
    sqft?: number;
    lotSize?: number;
    yearBuilt?: number;
    parking?: number;
  };
  amenities: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
  };
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  type?: 'residential' | 'commercial' | 'land' | 'all';
  minPrice?: number;
  maxPrice?: number;
  minSqft?: number;
  maxSqft?: number;
  bedrooms?: number;
  bathrooms?: number;
  location?: string;
}