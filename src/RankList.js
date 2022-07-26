import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style/RankList.css';
import UserRank from './helper/UserRank';
import { FiArrowLeft } from 'react-icons/fi';

const randomNumbers = (max) => {
	return Math.floor(Math.random() * max);
};

const randomNumbersMinMax = (min = 8, max = 15) => {
	const difference = max - min;
	let result = randomNumbers(difference);
	result = result + min;
	return result;
};

const RankList = () => {
	const [response, setResponse] = useState([]);
	const location = useLocation();
	const score = location.state;

	useEffect(() => {
		setTimeout(() => {
			const response = UserRank(randomNumbersMinMax(5, 7));
			const playerScore = {
				id: 1,
				name: 'You',
				point: score.score,
			};
			response.splice(0, 0, playerScore);
			response.sort((a, b) => b.point - a.point);
			setResponse(response);
		}, 500);
	}, []);

	return (
		<div className="page">
			<div class="wholeContainer">
				<div className="container header">
					<Link className="icon" to="/quiz">
						<FiArrowLeft size={30} />
					</Link>
					<p>Quiz Ranking List</p>
				</div>
				<div className="container">
					<div class="caption">
						{response.length > 0 ? (
							response.map((user) =>
								user.name === 'You' ? (
									<>
										<div class="rankList " key={user.id}>
											<div class=" nama you ">{user.name}</div>
											<div class="score">{user.point} Points</div>
										</div>
									</>
								) : (
									<>
										<div class="rankList" key={user.id}>
											<div class="nama">{user.name}</div>
											<div class="score">{user.point} Points</div>
										</div>
									</>
								)
							)
						) : (
							<div>
								<svg className="loading" viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
									<title>Margaret Brent</title>
									<mask id="mask__beam" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
										<rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
									</mask>
									<g mask="url(#mask__beam)">
										<rect width="36" height="36" fill="#405059"></rect>
										<rect x="0" y="0" width="36" height="36" transform="translate(6 6) rotate(356 18 18) scale(1.2)" fill="#edd75a" rx="6"></rect>
										<g transform="translate(4 1) rotate(6 18 18)">
											<path d="M13,21 a1,0.75 0 0,0 10,0" fill="#000000"></path>
											<rect x="13" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect>
											<rect x="21" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect>
										</g>
									</g>
								</svg>
								<p>Loading..</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RankList;
