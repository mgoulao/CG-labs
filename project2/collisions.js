export default class Collisions {
	/**
	 * @param {Ball} ballOne
	 * @param {Ball} ballTwo
	 * @return {boolean}
	 */
	static hasCollisionBallToBall(ballOne, ballTwo) {
		const distance = Math.sqrt(
			(ballOne.position.x - ballTwo.position.x) ** 2 +
				(ballOne.position.z - ballTwo.position.z) ** 2
		);
		return distance <= ballOne.getRadius() + ballTwo.getRadius();
	}

	static findIntersectionBallToBall(ballOne, ballTwo) {
		return [
			(ballOne.position.x - ballTwo.position.x) / 2,
			(ballOne.position.y - ballTwo.position.y) / 2,
			(ballOne.position.z - ballTwo.position.z) / 2,
		];
	}

	static handleBallToBallCollision(ballOne, ballTwo) {
		const ballOneVel = ballOne.getCurrentVelocity();
		const ballTwoVel = ballTwo.getCurrentVelocity();
		ballOne.collision(ballTwoVel);
		ballTwo.collision(ballOneVel);
	}
}
