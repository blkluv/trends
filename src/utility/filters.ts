import { Trend } from '../interfaces/trend';
import { Comment } from '../interfaces/comment';

export const filterTrendsByCategory = (category: string, trends?: Trend[]) => {
	if (!trends) return [];

	return trends?.filter((trend) => trend.category === category);
};

export const filterTrendsById = (id: number, trends?: Trend[]) => {
	if (!trends) return [];

	return trends?.filter((trend) => trend.id === id);
};

export const filterTrendsByKeyValue = (
	key: keyof Trend,
	value: any,
	trends?: Trend[]
) => {
	if (!trends) return [];

	return trends?.filter((trend) => trend[key] === value);
};

export const totalTrendComments = (trendId: number, comments?: Comment[]) => {
	if (!comments || comments.length === 0) return 0;

	return comments?.filter((comment) => comment.trend_id === trendId).length;
};
