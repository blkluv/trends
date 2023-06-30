import { ChangeEvent } from 'react';
import { useTrendingStore } from '../store';
import { SortTrendsBy } from '../types/sortTrendsBy';
import styled from 'styled-components';

const TrendSorter = () => {
	const setSortTrendsBy = useTrendingStore(
		(store) => store.setSortTrendsBy
	);

	const onSortTrends = (e: ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault;
		const sortValue = e.currentTarget.value as SortTrendsBy;
		setSortTrendsBy(sortValue);
	};
	return (
		<TrendSorterStyles>
			<div className='sortBy'>
				<select name='sortFilters' id='sortFilters' onChange={onSortTrends}>
					<option value='likesToDislikesRatio'>Popularity</option>
					<option value='likes'>Likes</option>
					<option value='dislikes'>Dislikes</option>
					<option value='views'>Views</option>
					<option value='comments'>Comments</option>
				</select>
			</div>
		</TrendSorterStyles>
	);
};

export default TrendSorter;

// CSS Components
const TrendSorterStyles = styled.div`
	.sortBy {
		margin-bottom: 0.5rem;
		font-size: 0.7rem;
    
		select {
			box-sizing: border-box;
			padding: 0.1rem;
			border-radius: 0.2rem;
			background-color: #ffffff;
			outline: none;
     
		}
    select:hover,option:hover{
      cursor: pointer;
      
    }
	}
`;
