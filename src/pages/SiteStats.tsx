import styled from "styled-components";
import { useTrendingStore } from "../store";
import { total, totalVotes } from "../utility/reducers";
import { mostAuthoredTrend } from "../utility/helpers";

const SiteStats = () => {
  const [comments, trends] = useTrendingStore(store => [store.comments, store.trends]);
  return (<SiteStatsStyles>
    <h1>Site Statistics</h1>
    <div className='details'>
      <div><span className="bold">Comments</span>: {comments.length}</div>
      <div><span className="bold">Trends</span>: {trends.length}</div>
      <div><span className="bold">Likes</span>: {total(trends, 'likes')}</div>
      <div><span className="bold">Dislikes</span>: {total(trends, 'dislikes')}</div>
      <div><span className="bold">Votes</span>: {totalVotes(trends)}</div>
      <div><span className="bold">Views</span>: {total(trends, 'views')}</div>
      <div><span className="bold">Most Trends Created</span>: {mostAuthoredTrend(trends)}</div>
    </div>

  </SiteStatsStyles>  );
}
 
export default SiteStats;

// CSS Components
const SiteStatsStyles = styled.div`
  padding: 0.5rem;
	margin-bottom: 0.5rem;
	border-radius: 0.1rem;
	font-size: 0.9rem;
	text-align: center;
	gap: 0.2rem;
	border-radius: 0.2rem;
  background-color: white;

	.details {
		background-color: var(--color-grey-50);
		margin: auto;
		border-radius: 0.15rem 0.15rem 0 0;
		text-align: left;
		box-shadow: 0.1px 0.1px 1px 0.1px var(--color-grey-100);
		padding: 0.2rem;

		.button-container {
			display: flex;
			justify-content: space-around;
			flex-direction: row;
		}
	}

	.bold {
		font-weight: 600;
	}

	.author {
		background-color: var(--color-grey-100);
		color: var(--color-white-100);
		font-size: 0.4rem;
		text-align: left;
		padding: 0 0.15rem;
		display: flex;
		justify-content: space-between;
		border-radius: 0 0 0.15rem 0.15rem;
	}
`