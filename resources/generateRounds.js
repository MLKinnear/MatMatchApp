// Generates round-robin pairings for added members.
// If odd number of players, adds a 'BYE' to ensure everyone gets a match.
export function generateRounds(members) {
	let players = [...members];
	if (players.length % 2 !== 0) {
		players.push('BYE');
	}

	const n = players.length;
	const rounds = [];

	for (let round = 0; round < n - 1; round++) {
		const pairs = [];
		for (let i = 0; i < n / 2; i++) {
			const p1 = players[i];
			const p2 = players[n - 1 - i];
			if (p1 !== 'BYE' && p2 !== 'BYE') {
				pairs.push([p1, p2]);
			}
		}
		rounds.push(pairs);

		// Rotate players for next round
		const newPlayers = [...players];
		const last = newPlayers.pop();
		newPlayers.splice(1, 0, last);
		players = newPlayers;
	}

	return rounds;
}