import moment from "moment";
import Modal from "../components/Modal";
import TrendForm from "../components/TrendForm";
import { useTrendingStore } from "../store";
import { filterTrendsByKeyValue } from "../utility/filters";
import { useState } from "react";
import { Trend } from "../interfaces/trend";
import { deleteTrend } from "../services/apiTrends";
import toast from "react-hot-toast";
import Icon from "../components/Icon";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useTrends } from "../hooks/useTrends";

const UserDashboardTrends = () => {
  const [setTrends, username, user_id ] = useTrendingStore(store => [store.setTrends, store.username, store.user_id]);
  const {data: trends} = useTrends();
  const usersTrends = filterTrendsByKeyValue('user_id', user_id, trends);
  const [showTrendForm, setShowTrendForm] = useState<number | null>(null);

  const onDeleteTrend = async (trend: Trend) => {
		if (!confirm('Are you sure you want to delete this trend?')) return;

    try{
		const result = await deleteTrend(trend.id); // delete in db
    if(!result)
      return toast.error('Something went wrong...');
    } catch(err: any){
      toast.error(err.message);
    }
    if(!trends) return;
		setTrends(
			trends?.filter((storedTrend) => storedTrend.id !== trend.id)
		); // delete in store
	};

  const closeModal = () => {
			setShowTrendForm(null);
			return showTrendForm;
	};
  
  if (usersTrends?.length === 0)
		return (
			<p className='no-trends-message'>
				It looks like you haven't made any trends yet. You can make one{' '}
				<NavLink to='/create-trend'>here</NavLink>.
			</p>
		);
    
	return (
		<UserDashboardTrendsStyles>
			<h2>{username}'s Trends</h2>
			{usersTrends.map((trend) => (
				<div className='trend-info-container'>
					<div className='trend-info'>
						<div className='title'>Title: {trend.alt}</div>
						<p className='description'>
							Content: {trend.content.slice(0, 30)}...
						</p>
						<div className='date-created'>
							Date: {moment(trend.created_at).format('MMMM Do YYYY, h:mm:ss a')}
						</div>
					</div>
					<div className='buttons'>
						<button
							className='edit'
							title='edit'
							onClick={() =>
								setShowTrendForm(showTrendForm === trend.id ? null : trend.id)
							}>
							<Icon icon='edit' />
						</button>
						<button
							className='delete'
							title='delete'
							onClick={() => onDeleteTrend(trend)}>
							<Icon icon='delete' />
						</button>
					</div>
					{showTrendForm === trend.id && (
						<Modal onCloseModal={() => closeModal()}>
							<TrendForm
								formTitle={'Edit Trend'}
								formButtonText='update'
								views={trend.views}
								initialFormFields={{
									id: trend.id,
									title: trend.alt,
									content: trend.content,
									image: trend.image,
									category: trend.category,
									author_privacy: trend.author_privacy,
								}}
							/>
						</Modal>
					)}
				</div>
			))}
		</UserDashboardTrendsStyles>
	);
};

export default UserDashboardTrends;
// CSS Components
const UserDashboardTrendsStyles = styled.div`
.date-created{
  font-size: 0.4rem;
}
	@media only screen and (max-width: 500px) {
		.title,
		.description,
		.date-created {
			font-size: 0.1rem;
		}
	}
`;