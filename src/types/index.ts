export interface Visitor {
  id: string;
  name: string;
  visitCount: number;
  lastVisit: Date;
  firstVisit: Date;
  animeCode: string;
}

export interface ExternalLink {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
}