import React, { useEffect, useState } from 'react';
import './style/Quiz.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const randomNumber = (max) => {
	return Math.floor(Math.random() * max);
};

const randomNumberMinMax = (min = 120, max = 301) => {
	const difference = max - min;
	let result = randomNumber(difference);
	result = result + min;
	return result;
};

const difficulty = () => {
	const type = ['easy', 'medium', 'hard'];
	return type[randomNumber(3)];
};

const Quiz = () => {
	const [timer, setTimer] = useState(randomNumberMinMax());
	const [kategori, setKategori] = useState('.');
	const [fetch, setFetch] = useState(true);
	const [score, setScore] = useState(0);
	const [questions, setQuestions] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const navigateTo = useNavigate();

	console.log(typeof kategori);
	console.log(kategori);
	console.log(questions);

	const getData = async () => {
		try {
			const { data } = await axios.get(`https://opentdb.com/api.php?amount=10&category=${kategori}&difficulty=${difficulty()}&type=multiple`);

			const questions = data.results.map((question) => {
				const length = question.incorrect_answers.length;
				const startFrom = randomNumberMinMax(0, length);
				question.incorrect_answers.splice(startFrom, 0, question.correct_answer);
				return { ...question, answers: question.incorrect_answers };
			});
			setQuestions(questions);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (kategori.length > 2 || typeof kategori === 'number') {
			timer === 0
				? navigateTo('/result', {
						state: { score },
				  })
				: timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
			const fetchData = () => {
				getData();
				setFetch(false);
			};
			if (fetch === true) {
				fetchData();
			}
		}
	}, [timer, kategori]);

	const submit = (e) => {
		if (e.target.value === questions[currentQuestion].correct_answer) setScore(score + 1);
		const next = currentQuestion + 1;
		if (next < questions.length) {
			setCurrentQuestion(next);
		} else {
			navigateTo('/result', {
				state: { score },
			});
		}
	};

	const submitCategory = (e) => {
		setKategori(parseInt(e.target.value));
	};

	return (
		<div className="page">
			<div className="wholeContainer">
				<div className="container info">
					{kategori.length > 0 ? (
						<div className="kategori">
							<div className="select">
								<label className="label" for="kategori">
									Choose Category{' '}
								</label>
								<select className="kategori" onChange={submitCategory} id="kategori">
									<option selected="true" disabled="disabled" d></option>
									<option value="20">Mythology</option>
									<option value="22">Geography</option>
									<option value="23">History</option>
									<option value="21">Sports</option>
								</select>
							</div>
							<div className="select">
								<label className="label" for="type">
									Type{' '}
								</label>
								<select className="kategori" id="type" onChange={submitCategory} defaultValue="Multiple Choice" disabled>
									<option>Multiple Choice</option>
								</select>
							</div>
						</div>
					) : (
						<>
							<div className="time ">{timer}</div>
							<div className="point">{score} points</div>
							<div class="difficulty">{questions.length > 0 ? questions[currentQuestion].difficulty.toUpperCase() : <AiOutlineLoading3Quarters className="loading-difficulty" />}</div>
						</>
					)}
				</div>
				<div className="container">
					{questions.length > 0 ? (
						<>
							{timer <= 10 ? <p className="alert">Time is almost over!</p> : ''}

							<div className="heading">{currentQuestion + 1}.</div>
							<div className="questions">{questions[currentQuestion].question}</div>
							<div className="opsiContainer">
								{questions[currentQuestion].answers.map((answer, index) => (
									<button key={index} className="opsi" onClick={submit} value={answer}>
										{answer}
									</button>
								))}
							</div>
						</>
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
							<p>Waiting...</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Quiz;
