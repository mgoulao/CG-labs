import * as THREE from "../node_modules/three/build/three.module.js";

export default class Collisions {
	/**
	 * @param {Ball} ball
	 * @param {THREE.Mesh} wall
	 * @return {boolean}
	 */
	static hasCollisionBallToWall(ball, wall) {
		const ballMinX = ball.position.x - ball.getRadius();
		const ballMinY = ball.position.y - ball.getRadius();
		const ballMinZ = ball.position.z - ball.getRadius();
		const ballMaxX = ball.position.x + ball.getRadius();
		const ballMaxY = ball.position.y + ball.getRadius();
		const ballMaxZ = ball.position.z + ball.getRadius();

		const wallMinX = wall.position.x + wall.geometry.boundingBox.min.x;
		const wallMinY = wall.position.y + wall.geometry.boundingBox.min.y;
		const wallMinZ = wall.position.z + wall.geometry.boundingBox.min.z;
		const wallMaxX = wall.position.x + wall.geometry.boundingBox.max.x;
		const wallMaxY = wall.position.y + wall.geometry.boundingBox.max.y;
		const wallMaxZ = wall.position.z + wall.geometry.boundingBox.max.z;

		return (
			ballMinX <= wallMaxX &&
			ballMaxX >= wallMinX &&
			(ballMinY <= wallMaxY && ballMaxY >= wallMinY) &&
			(ballMinZ <= wallMaxZ && ballMaxZ >= wallMinZ)
		);
	}

	/**
	 * @param {Ball} ball
	 * @param {THREE.Mesh} wall
	 * @return {boolean}
	 */
	static findIntersectionBallToWall(ball, wall) {
		let time = 0;
		let timeX = 0;
		let timeZ = 0;
		let axis = "";
		const offset = 0.005;

		const ballPos = ball.position;
		const ballVel = ball.getCurrentVelocity();
		const ballMinX =
			Math.sign(ball.position.x) *
			(Math.abs(ball.position.x) - ball.getRadius());
		const ballMinZ =
			Math.sign(ball.position.z) *
			(Math.abs(ball.position.z) - ball.getRadius());
		const ballMaxX =
			Math.sign(ball.position.x) *
			(Math.abs(ball.position.x) + ball.getRadius());
		const ballMaxZ =
			Math.sign(ball.position.z) *
			(Math.abs(ball.position.z) + ball.getRadius());

		const wallMinX =
			Math.sign(wall.position.x) *
			(Math.abs(wall.position.x) + wall.geometry.boundingBox.min.x);
		const wallMinZ =
			Math.sign(wall.position.z) *
			(Math.abs(wall.position.z) + wall.geometry.boundingBox.min.z);
		const wallMaxX =
			Math.sign(wall.position.x) *
			(Math.abs(wall.position.x) + wall.geometry.boundingBox.max.x);
		const wallMaxZ =
			Math.sign(wall.position.z) *
			(Math.abs(wall.position.z) + wall.geometry.boundingBox.max.z);

		timeX =
			ballVel[0] !== 0
				? Math.max(0, Math.abs((wallMaxX - ballMinX) / ballVel[0]))
				: Number.MAX_SAFE_INTEGER;
		timeX =
			ballVel[0] !== 0
				? Math.max(0, Math.abs((wallMinX - ballMaxX) / ballVel[0]))
				: Number.MAX_SAFE_INTEGER;

		timeZ =
			ballVel[2] !== 0
				? Math.max(0, Math.abs((wallMaxZ - ballMinZ) / ballVel[2]))
				: Number.MAX_SAFE_INTEGER;
		timeZ =
			ballVel[2] !== 0
				? Math.max(0, Math.abs((wallMinZ - ballMaxZ) / ballVel[2]))
				: Number.MAX_SAFE_INTEGER;

		if (timeX < timeZ) {
			time = timeX + offset;
			axis = "x";
		} else {
			time = timeZ + offset;
			axis = "z";
		}
		return {
			collisionPos: [
				ballPos.x - ballVel[0] * time,
				ballPos.y,
				ballPos.z - ballVel[2] * time,
			],
			axis: axis,
		};
	}

	/**
	 * @param {Ball} ball
	 * @param {Wall} wall
	 * @param {Object} collision
	 */
	static processBallToWallCollision(ball, wall, collision) {
		const { collisionPos, axis } = collision;
		const newVelocity = ball.getCurrentVelocity();

		if (axis === "x") {
			newVelocity[0] = -newVelocity[0];
		} else {
			newVelocity[2] = -newVelocity[2];
		}
		ball.updateValuesAfterCollision(collisionPos, newVelocity);
	}

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

	/**
	 * @param {Ball} ballOne
	 * @param {Ball} ballTwo
	 * @return {boolean}
	 */
	static findIntersectionBallToBall(ballOne, ballTwo) {
		const offset = 0.05;
		const ballOneNewPos = [0, 0, 0];
		const ballTwoNewPos = [0, 0, 0];
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
			ballOneNewPos[0] = ballOne.position.x + diffX;
			ballTwoNewPos[0] = ballTwo.position.x - diffX;
		} else {
			ballOneNewPos[0] = ballOne.position.x - diffX;
			ballTwoNewPos[0] = ballTwo.position.x + diffX;
		}

		if (ballOne.position.z > ballTwo.position.z) {
			ballOneNewPos[2] = ballOne.position.z + diffZ;
			ballTwoNewPos[2] = ballTwo.position.z - diffZ;
		} else {
			ballOneNewPos[2] = ballOne.position.z - diffZ;
			ballTwoNewPos[2] = ballTwo.position.z + diffZ;
		}
		return { ballOnePos: ballOneNewPos, ballTwoPos: ballTwoNewPos };
	}

	/**
	 * @param {Ball} ballOne
	 * @param {Ball} ballTwo
	 * @param {Object} newPositions
	 */
	static processBallToBallCollision(ballOne, ballTwo, newPositions) {
		const { ballOnePos, ballTwoPos } = newPositions;
		const collisionAngle = Math.atan2(
			ballTwo.position.z - ballOne.position.z,
			ballTwo.position.x - ballOne.position.x
		);
		const translation1Matrix = new THREE.Matrix4();
		translation1Matrix.makeTranslation(
			-ballOne.position.x,
			-ballOne.position.y,
			-ballOne.position.z
		);

		const rotation1Matrix = new THREE.Matrix4().makeRotationY(collisionAngle);
		const rotation2Matrix = new THREE.Matrix4().makeRotationY(-collisionAngle);
		const ballOneVelocityVec = new THREE.Vector4(
			...ballOne.getCurrentVelocity(),
			1
		);
		const ballTwoVelocityVec = new THREE.Vector4(
			...ballTwo.getCurrentVelocity(),
			1
		);

		const ballOneVelOnCollisionAxis = ballOneVelocityVec.applyMatrix4(
			rotation1Matrix
		);
		const ballTwoVelOnCollisionAxis = ballTwoVelocityVec.applyMatrix4(
			rotation1Matrix
		);

		const ballOneNewVel = new THREE.Vector4(
			ballTwoVelOnCollisionAxis.x,
			ballOneVelOnCollisionAxis.y,
			ballOneVelOnCollisionAxis.z,
			1
		).applyMatrix4(rotation2Matrix);
		const ballTwoNewVel = new THREE.Vector4(
			ballOneVelOnCollisionAxis.x,
			ballTwoVelOnCollisionAxis.y,
			ballTwoVelOnCollisionAxis.z,
			1
		).applyMatrix4(rotation2Matrix);

		ballOne.updateValuesAfterCollision(ballOnePos, ballOneNewVel.toArray());
		ballTwo.updateValuesAfterCollision(ballTwoPos, ballTwoNewVel.toArray());
	}
}
