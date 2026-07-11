export interface BlobColor {
  id: string;
  name: string;
  color1: string; // Tailwind gradient color
  color2: string; // Tailwind gradient color
  color3: string; // Tailwind gradient color
}

export interface Booking {
  id: string;
  customerName: string;
  mobileNumber: string;
  serviceType: string;
  area: string;
  preferredDate: string;
  preferredTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  notes?: string;
  email?: string;
}

export interface PCService {
  id: string;
  title: string;
  description: string;
  iconName: string;
  priceEstimate: string;
  duration: string;
  features: string[];
}

export interface TrustCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
}
