import { CommentData } from "../interfaces/comment"
import supabase from "./supabase"

export const getComments = async() => {
  const { data: comments, error } = await supabase
  .from('comments')
  .select('*');

  if (error) {
		console.log(error);
		throw error;
	}

	return comments;
}

export const createComment = async(comment: CommentData) => {
  const { data, error } = await supabase
  .from('comments')
  .insert([comment]);

  if (error) {
		console.log(error);
		throw error;
	}

	return data;
}