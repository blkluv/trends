export interface CommentData{
  author: string;
  content: string;
  trend_id: number;
}

export interface Comment{
  id: number; // created on server
  created_at: Date; // created on server

  author: string;
  content: string;
  trend_id: number;
}