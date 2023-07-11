import supabase from "./supabase"

export const createMessage = async(message: MessageData) => {
  console.log('createMessage()...');
  const { data, error } = await supabase
  .from('messages')
  .insert([message])
  .select();

  if (error) {
		console.log(error);
		throw error;
	}

	return data[0]; // returns message in an array
}
