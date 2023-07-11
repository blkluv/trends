interface Message{
  id: number; // created on server
  created_at: Date; // created on server

  to_user: string;
  to_user_id: string;
  from_user: string;
  user_id: string;//from_user_id, but need to keep it as user_id for auth checks.
  content: string;
}
// Before being created on server
interface MessageData{
  to_user: string;
  to_user_id: string;
  from_user: string;
  user_id: string;//from_user_id, but need to keep it as user_id for auth checks.
  content: string;
}