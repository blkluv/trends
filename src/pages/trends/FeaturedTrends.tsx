import styled from 'styled-components';
import TrendsList from '../../components/TrendsList';
import { useTrendingStore } from '../../store';
import { IStyledProps } from '../../interfaces/cssComponentStyles';
import { useEffect } from 'react';

// Trends for homepage that are popular, new and interesting, or gaining many likes
const FeaturedTrends = () => {
	const theme = useTrendingStore((store) => store.theme);
  const setSortTrendsBy = useTrendingStore(store => store.setSortTrendsBy);
  useEffect(() => setSortTrendsBy('likesToDislikesRatio'),[]);

	return (
		<FeaturedTrendsContainer setting={theme}>
			<h1 className='featured-header'>Top Rated</h1>
			<TrendsList trendType='all' />
		</FeaturedTrendsContainer>
	);
};

export default FeaturedTrends;

// Styled Components
const FeaturedTrendsContainer = styled.div<IStyledProps>`
	max-height: 100%;
	text-align: center;
	.featured-header {
		font-size: 1.7rem;
		color: var(--color-black-500);
		text-shadow: 0.1px 1px 4px var(--color-white-100);
		${(props) =>
			props.setting === 'light'
				? 'text-shadow: 1px 1px 5px var(--color-pink-50)'
				: 'text-shadow: 1px 1px 5px var(--color-white-100)'};
	}

	
`;
