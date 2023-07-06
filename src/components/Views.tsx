import styled from 'styled-components';
import { FaChartBar } from 'react-icons/fa';
import { useEffect } from 'react';
import { useTrendingStore } from '../store';
import { findTrendById } from '../utility/filters';
import { useMutateViews } from '../hooks/useMutateViews';

interface Props {
	increaseViewsCount?: boolean;
	trendId: number;
}

const Views = ({ increaseViewsCount, trendId }: Props) => {
	const trends = useTrendingStore((store) => store.trends);
	const trend = findTrendById(trendId, trends);
  const { mutate } = useMutateViews(trend? trend.views + 1 : 0, trendId);
   

	useEffect(() => {
		if (increaseViewsCount && trend && trend.views)
        mutate();
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
