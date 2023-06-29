import { Trend } from "../interfaces/trend";
import { totalTrendComments } from "./filters";
import { Comment } from '../interfaces/comment';
import { SortTrendsBy } from "../types/sortTrendsBy";

// ! Simplify this into an object or call dynamically with sortType to reduce if statements
export const sortTrendsBy = (
	sortType: SortTrendsBy,
	trends: Trend[], comments?: Comment[]
) => {
  console.log('sortType : ', sortType);
	let sorterFn;
	if (sortType === 'likes')
		sorterFn = (trend1: Trend, trend2: Trend) => trend2.likes - trend1.likes;
	if (sortType === 'dislikes')
		sorterFn = (trend1: Trend, trend2: Trend) => trend2.dislikes - trend1.dislikes;
	if (sortType === 'views')
		sorterFn = (trend1: Trend, trend2: Trend) => trend2.views - trend1.views;
	if (sortType === 'comments' && comments)
		sorterFn = (trend1: Trend, trend2: Trend) => (totalTrendComments(trend2.id, comments) - totalTrendComments(trend1.id, comments));

  if(sortType === 'likesToDislikesRatio')
    return sortTrends(trends); // trends are currently(June 29th, 2023) sorted this way by default, so do nothing.
  
	return trends.sort(sorterFn);
};

// sorts by best ratio of likes to dislikes. (Eg 5-likes - 3-dislikes --> receives a score of 2)
export const sortTrends = (trends: Trend[]): Trend[] => {
	const compareFn = (
		x: Trend,
		y: Trend,
	) => ( (y.likes - y.dislikes) - (x.likes - x.dislikes));
	return trends.sort(compareFn);
};