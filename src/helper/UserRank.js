const randomNumbers = (max) => {
	return Math.floor(Math.random() * max);
};

const randomNames = (length) => {
	let result = '';
	const characters = 'abcdefghijklmnopqrstuvwxyz123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(randomNumbers(charactersLength));
	}
	return result;
};

const UserRank = (users) => {
	let increment = 1;
	const rank = [];

	for (let i = 0; i <= users; i++) {
		let obj = {
			id: increment + 1,
			name: randomNames(10),
			point: randomNumbers(11),
		};
		increment++;
		rank.push(obj);
	}

	return rank;
};

export default UserRank;
