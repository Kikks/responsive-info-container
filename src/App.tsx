import "./App.scss";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import CountrySearch from "./components/CountrySearch/CountrySearch2";

function App() {
	return (
		<div className='accordion-container'>
			<CountrySearch />
		</div>
	);
}

export default App;
