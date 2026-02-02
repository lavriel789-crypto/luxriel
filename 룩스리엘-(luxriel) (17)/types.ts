
export interface StylingConfig {
  fontSize: string;
  color: string;
  fontFamily: 'serif' | 'sans' | 'futuristic' | 'luxury-serif';
  fontWeight: string;
  letterSpacing: string;
}

export interface PageSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  imageUrl?: string;
  styling: StylingConfig;
}

// Added missing ServiceItem interface to satisfy constants.tsx import
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: string;
}

// Added missing Project interface to satisfy constants.tsx import
export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  pricePerPyung: number;
  totalCost: string;
  location?: string;
  area?: string;
  period?: string;
  concept?: string;
  description?: string;
  gallery?: string[];
  features?: string[];
}

// Added missing Review interface to satisfy constants.tsx import
export interface Review {
  id: string;
  author: string;
  content: string;
  date: string;
  source: string;
  rating: number;
}

export interface SiteConfig {
  brandName: string;
  brandSubName: string;
  accentColor: string;
  home: {
    hero: PageSection;
    manifesto: PageSection;
    material: PageSection;
    engine: PageSection;
    metrics: PageSection[];
  };
  services: {
    header: PageSection;
    items: { id: string; title: string; desc: string; icon: string }[];
  };
  portfolio: {
    header: PageSection;
    archive: PageSection;
  };
  pricing: {
    header: PageSection;
    packages: { id: string; name: string; market: string; lab: string; desc: string }[];
  };
  community: {
    header: PageSection;
    scanner: PageSection;
  };
  contact: {
    header: PageSection;
    info: { phone: string; address: string; operation: string };
  };
}
