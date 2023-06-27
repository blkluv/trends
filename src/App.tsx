import { useTrendingStore } from './store';
import { getComments } from './services/apiComments';
import { getTrends } from './services/apiTrends';
import Router from './Router';

function App() {
  // ! initialize most data here and then only use custom hooks in components that need speedy updates upon data changes.
  // ! Add search bar to search for trends or titles etc.
  // ! Add a dropdown menu for something, maybe the settings??
  // ! Add clientside validation for user input in forms
  // ! Add a default picture icon
  // ! Make site faster with responsive images https://www.youtube.com/watch?v=fp9eVtkQ4EA
  // ! Adjust some pages so that they cover 100% of the screen.
  // ! Add a top viewed and top commented filter

	// initialize comments in TrendingStore
	const setComments = useTrendingStore((store) => store.setComments);
	getComments().then((comments: any) => setComments(comments));
  // initialize trends in TrendingStore
  const setTrends = useTrendingStore( store => store.setTrends);
  getTrends().then(trends => setTrends(trends));

	return (<Router/>); // Everything to be rendered comes through router.
}

export default App;
