import { Trend, TrendData } from '../interfaces/trend';
import supabase from './supabase';

// sorts by best ratio of likes to dislikes. (Eg 5-likes - 3-dislikes --> receives a score of 2)
const sortTrends = (trends: Trend[]): Trend[] => {
	const compareFn = (
		x: Trend,
		y: Trend,
	) => ( (y.likes - y.dislikes) - (x.likes - x.dislikes));
	return trends.sort(compareFn);
};

export const getTrends = async () => {
	const { data: trends, error } = await supabase
		.from('trends')
		.select('*')
		.order('likes', { ascending: false });

	if (error) {
		console.log(error);
		throw error;
	}

 
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
  
  console.log('getTrend() in trendsApi: ', trends[0]);
  return trends[0];
}

export const createTrend = async (trend: TrendData) => {
	const { data, error } = await supabase.from('trends').insert([trend]);

	if (error) {
		console.log(error);
		throw error;
	}

	return data;
};

export const updateLikesOrDislikes = async (info: {id: number, value: number, type: 'likes' | 'dislikes'}) => {
  const {id, value, type} = info;
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