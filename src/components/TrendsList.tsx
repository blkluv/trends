import toast from 'react-hot-toast';
import Trend from './Trend';
import styled from 'styled-components';
import { useTrendingStore } from '../store';
import { useTrends } from '../hooks/useTrends.ts';
import { filterTrendsByCategory } from '../utility/helpers.ts';
import { IStyledProps } from '../interfaces/cssComponentStyles.ts';

interface Props {
	trendType: string;
}
const TrendsList = ({ trendType }: Props) => {
	const theme = useTrendingStore((store) => store.theme);
	const { data: trends, isLoading, isError, error } = useTrends();
	const filteredTrends = filterTrendsByCategory(trendType, trends);
	const heading = (
		<HeadingStyles setting={theme}>
			{trendType === 'all' ? '' : trendType + ' Trends'}
		</HeadingStyles>
	);

	if (isLoading) return <p>'Loading...'</p>;

	if (isError) {
		toast.error(error.message);
		return <p>'Something went wrong...'</p>;
	}

	if (trendType === 'all')
		return (
			<TrendsListStyles>
				{heading}
				<div className='main-content'>
					{trends?.map((trend) => (
						<ul key={trend.image}>{<Trend {...trend} />}</ul>
					))}
				</div>
			</TrendsListStyles>
		);

	if (filteredTrends?.length === 0)
		return <p>No trends for {trendType} yet. How about you make one?</p>;

	return (
		<TrendsListStyles>
			{heading}
			<div className='main-content'>
				{filteredTrends?.map((trend) => (
					<ul key={trend.image}>{<Trend {...trend} />}</ul>
				))}
			</div>
		</TrendsListStyles>
	);
};

export default TrendsList;

// CSS Components
const TrendsListStyles = styled.div`
	.main-content {
		display: flex;
		flex-wrap: wrap;
		grid-gap: 1.5rem;
		justify-content: center;
	}
`;
const HeadingStyles = styled.h1<IStyledProps>`
	text-transform: capitalize;
	font-size: 1.7rem;
	color: var(--color-black-500);
	text-shadow: 0.1px 1px 1px var(--color-blue-500);
	text-align: center;
	${(props) =>
		props.setting === 'light'
			? 'text-shadow: 1px 1px 5px var(--color-pink-50)'
			: 'text-shadow: 1px 1px 5px var(--color-white-100)'};
`;
