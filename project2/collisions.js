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

	static processBallToBallCollision(ballOne, ballTwo) {
		const offset = 0.001;

		let diffX = Math.abs(ballOne.position.x - ballTwo.position.x);
		let diffZ = Math.abs(ballOne.position.z - ballTwo.position.z);
		const overlap =
			2 * ballOne.getRadius() -
			Math.sqrt(
				(ballOne.position.x - ballTwo.position.x) ** 2 +
					(ballOne.position.z - ballTwo.position.z) ** 2
			);

		const theta = Math.atan(diffZ / diffX);

		const overlapX = overlap * Math.sin(theta);
		const overlapZ = overlap * Math.cos(theta);

		diffX = overlapX / 2 + offset;
		diffZ = overlapZ / 2 + offset;

		if (ballOne.position.x > ballTwo.position.x) {
			ballOne.position.x += diffX;
			ballTwo.position.x -= diffX;
		} else {
			ballOne.position.x -= diffX;
			ballTwo.position.x += diffX;
		}

		if (ballOne.position.z > ballTwo.position.z) {
			ballOne.position.z += diffZ;
			ballTwo.position.z -= diffZ;
		} else {
			ballOne.position.z -= diffZ;
			ballTwo.position.z += diffZ;
		}

		const ballOneVel = ballOne.getCurrentVelocity();
		const ballTwoVel = ballTwo.getCurrentVelocity();
		ballOne.collision(ballTwoVel);
		ballTwo.collision(ballOneVel);
	}
}
