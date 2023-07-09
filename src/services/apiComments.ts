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
  .insert([comment])
  .select();

  if (error) {
		console.log(error);
		throw error;
	}

	return data[0]; // returns comment in an array
}

export const updateComment = async(comment: CommentData) => {
  const { content, id } = comment;
  const { data, error } = await supabase
  .from('comments')
  .update({ content })
  .eq('id', id)
  .select();

  if (error) {
		console.log(error);
		throw error;
	}

	return data[0]; // returns comment in an array
}