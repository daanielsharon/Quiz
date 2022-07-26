import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Quiz from './Quiz';
import RankList from './RankList';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/quiz" element={<Quiz />} />
				<Route path="/result" element={<RankList />} />
				<Route path="/" element={<Navigate to="/quiz" />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
