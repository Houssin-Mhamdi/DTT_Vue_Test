export interface House {
  id: number;
  image: string;
  price: number;
  rooms: {
    bedrooms: number;
    bathrooms: number;
  };
  size: number;
  description: string;
  location: {
    street: string;
    houseNumber: number;
    houseNumberAddition: string;
    city: string;
    zip: string;
  };
  createdAt: string;
  constructionYear: number;
  hasGarage: boolean;
  madeByMe: boolean;
}

export type NewHousePayload = {
  price: number;
  bedrooms: number;
  bathrooms: number;
  size: number;
  streetName: string;
  houseNumber: number;
  numberAddition: string;
  zip: string;
  city: string;
  constructionYear: number;
  hasGarage: boolean;
  description: string;
};

export interface ApiHouse {
  id: number;
  image: string;
  price: number;
  rooms: {
    bedrooms: number;
    bathrooms: number;
  };
  size: number;
  description: string;
  location: {
    street: string;
    houseNumber: number;
    houseNumberAddition: string;
    city: string;
    zip: string;
  };
  createdAt: string;
  constructionYear: number;
  hasGarage: boolean;
  madeByMe: boolean;
}

export interface ComponentHouse {
  id: number;
  image: string;
  address: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  madeByMe: boolean;
  description: string;
}

export interface HouseFormData {
  price: string;
  bedrooms: string;
  bathrooms: string;
  size: string;
  streetName: string;
  houseNumber: string;
  numberAddition: string;
  zip: string;
  city: string;
  constructionYear: string;
  hasGarage: string; 
  description: string;
  image: File | null;
}

