import { TrendData } from '../interfaces/trend';
import { sortTrends } from '../utility/sorters';
import supabase from './supabase';


// == Trends ==
export const getTrends = async () => {
	const { data, error } = await supabase
		.from('trends')
		.select('*')
		.order('likes', { ascending: false });

	if (error) {
		console.log(error);
		throw error;
	}

  const trends: any[] = data;
	return sortTrends(trends);
};

export const getTrend = async(id: number) => {
  const { data: trends, error } = await supabase
  .from('trends')
  .select("*")
  .eq('id', id);

  if (error) {
		console.log(error);
		throw error;
	}

  console.log('getTrend: ', trends[0]);
  return trends[0];
}

export const createTrend = async (trend: TrendData) => {
	const { data, error } = await supabase.from('trends').insert([trend]).select();

	if (error) {
		console.log(error);
		throw error;
	}

  console.log('createTrend data: ', data);
	return data[0];
};

export const updateTrend = async(trend: TrendData, trendId: number) => {
  const {content, image, alt, category, author, author_privacy} = trend;
  const { data, error } = await supabase
  .from('trends')
  .update({ content, image, alt, category, author, author_privacy })
  .eq('id', trendId)
  .select();

  if (error) {
		console.log(error);
		throw error;
	}

	return data;
}

export const deleteTrend = async (trendId: number) => {
  console.log('Deleting trend...', trendId);
	const { error } = await supabase
  .from('trends')
  .delete()
  .eq('id', trendId);

	if (error) {
		console.log(error);
		throw error;
	}
};


// == Views ==
export const updateViewCount = async(value: number, id: number) => {
  const { data, error } = await supabase
  .from('trends')
  .update({ views: value })
  .eq('id', id);

  if (error) {
		console.log(error);
		throw error;
	}

  return data;
}

// == Votes ==
export const getLikesAndDislikes = async(id: number) => {
  const {likes, dislikes} = await getTrend(id);
  
  return {id, likes, dislikes};
}

export const updateLikesOrDislikes = async (info: {id: number, value: number, type: 'likes' | 'dislikes'}) => {
  const {id, value, type} = info;
  console.log('Calling updateLikesOrDislikes() in apiTrends...', type);
	const { data, error } = await supabase
		.from('trends')
		.update({ [type]: value })
		.eq('id', id);


	if (error) {
		console.log(error);
		throw error;
	}
  
	return data;
};

export const updateVotedList = async(trendId: number, username: string) => {
  const alreadyVotedList: string[] = await getVotedList(trendId);
  const { data, error } = await supabase
  .from('trends')
  .update({ alreadyVotedList: [...alreadyVotedList, username] })
  .eq('id', trendId)
  .select()

  if (error) {
		console.log(error);
		throw error;
	}

  return data;
}

const getVotedList = async(trendId: number) => {
  const { data: trends, error } = await supabase
  .from('trends')
  .select('alreadyVotedList')
  .eq('id', trendId);

  if (error) {
   console.log(error);
   throw error;
  }
  
  return trends[0].alreadyVotedList;
}

export const isAlreadyInVotedList = async(trendId: number, username: string) => {
  const alreadyVotedList: string[] = await getVotedList(trendId);
  return alreadyVotedList.some(userString => userString === username );
}