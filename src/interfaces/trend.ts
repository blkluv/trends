export interface Trend{
  id: number; // created on server
  created_at: Date; // created on server

  author: string;
  content: string;
  image: string;
  alt: string;
  likes: number;
  dislikes: number;
  category: string;
  views: number;
}

// Same as Trend interface but without created_at and id, which are created on server
export interface TrendData{
  author: string;
  content: string;
  image: string;
  alt: string;
  likes: number;
  dislikes: number;
  }