export interface Trend{ // Contains all data as on the server.
  id: number; // created on server
  created_at: Date; // created on server

  author: string;
  author_privacy: string;
  content: string;
  image: string;
  alt: string;
  likes: number;
  dislikes: number;
  category: string;
  views: number;
  user_id: string;
}

// Same as Trend interface but without created_at and id is optional for when creating a new trend. id and created_at are created on server
export interface TrendData{
  id?: number; // created on server

  author: string;
  content: string;
  image: string;
  alt: string;
  likes: number;
  dislikes: number;
  author_privacy: string;
  category: string;
  user_id?: string;
  }