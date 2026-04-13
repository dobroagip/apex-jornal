export interface Article {
  id: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  date: string;
  author: string;
  fullTitle?: string;
  subtitle?: string;
  heroImage?: string;
  stats?: { label: string; value: string; icon: 'power' | 'speed' | 'wind' }[];
  content?: {
    intro: string;
    sections: { title: string; text: string; image?: string }[];
    quote?: string;
  };
}

export interface Race {
  id: string;
  name: string;
  location: string;
  date: string;
  status: 'upcoming' | 'live' | 'finished';
  circuit: string;
}
