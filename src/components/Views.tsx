import styled from 'styled-components';
import { FaChartBar } from 'react-icons/fa';
import { useEffect } from 'react';
import { updateViewCount } from '../services/apiTrends';
import { useTrendingStore } from '../store';
import { findTrendById } from '../utility/filters';
import { Trend } from '../interfaces/trend';

interface Props {
	increaseViewsCount?: boolean;
	trendId: number;
}

const Views = ({ increaseViewsCount, trendId }: Props) => {
	const trends = useTrendingStore<Trend[]>((store) => store.trends);
	const trend = findTrendById(trendId, trends);
	// const { data: trend } = useTrend(trendId); // Unpredictable behavior here with React Query.

	useEffect(() => {
		if (increaseViewsCount && trend && trend.views) {
			updateViewCount(trend.views + 1, trendId);
		}
	}, [trend]);

	return (
		<ViewsStyles>
			<FaChartBar title='views' className='bar-chart-icon' />
			{trend?.views || 0}
		</ViewsStyles>
	);
};

export default Views;

// CSS-Components
const ViewsStyles = styled.div`
	display: inline-block;
	color: var(--color-green-100);
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;
