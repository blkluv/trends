import TrendsList from '../../components/TrendsList';

const ClothingTrends = () => {
	return <TrendsList trendType='clothing' />;
};

export default ClothingTrends;

// Without reactQuery
// const [trends, setTrends] = useState<Trend[]>([]);

// useEffect(() => {
// 	getTrends().then((trendsData) => {
// 		return setTrends(trendsData);
// 	});
// }, []);
