import * as THREE from "../node_modules/three/build/three.module.js";
import ShadedMesh from "./shadedMesh.js";

export default class Paint extends THREE.Group {
	constructor(scene, pos) {
		super();
		this.scene = scene;

		// Paint

		this.FIXED_POSITION = pos;
		this.SPACES_BETWEEN = 1.4;

		this.width = 80;
		this.height = 53;
		this.depth = 2;

		this.background = null;
		this.balls = [];
		this.squares = [];

		// Squares

		this.squaresWidth = 4;
		this.squaresHeight = 4;
		this.squaresZ = this.FIXED_POSITION[2] + 1;

		// Balls

		this.ballsRadius = 1;
		this.ballsHeight = 1;
		this.ballsZ = this.FIXED_POSITION[2] + 1;

		// Materials

		this.backgroundColor = 0x929292;
		this.squareColor = 0x000000;
		this.ballColor = 0xffffff;

		this.createElements();
	}

	createBackground() {
		const geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
		this.background = new ShadedMesh(geometry, this.backgroundColor);
		this.background.position.set(...this.FIXED_POSITION);
		this.add(this.background);
	}

	createSingleSquare(x, y) {
		const geometry = new THREE.BoxGeometry(
			this.squaresWidth,
			this.squaresHeight,
			this.depth
		);
		const square = new ShadedMesh(geometry, this.squareColor);
		square.position.set(x, y, this.squaresZ);
		return square;
	}

	createSquares() {
		const startPosX =
			this.FIXED_POSITION[0] - this.width / 2 + this.squaresWidth / 2;
		const startPosY =
			this.FIXED_POSITION[1] - this.height / 2 + this.squaresHeight / 2;
		let posX = startPosX;
		let posY = startPosY;
		const limitX =
			this.FIXED_POSITION[0] + this.width / 2 - this.squaresWidth / 2;
		const limitY =
			this.FIXED_POSITION[1] + this.height / 2 - this.squaresHeight / 2;
		while (posX <= limitX) {
			while (posY <= limitY) {
				const square = this.createSingleSquare(posX, posY);
				this.squares.push(square);
				this.add(square);
				posY += this.squaresHeight + this.SPACES_BETWEEN;
			}
			posX += this.squaresWidth + this.SPACES_BETWEEN;
			posY = startPosY;
		}
	}

	createSingleBall(x, y) {
		const geometry = new THREE.CylinderGeometry(
			this.ballsRadius,
			this.ballsRadius,
			this.ballsHeight,
			20
		);
		const ball = new ShadedMesh(geometry, this.ballColor);
		ball.position.set(x, y, this.ballsZ);
		ball.rotateX(Math.PI / 2);
		return ball;
	}

	createBalls() {
		const startPosX =
			this.FIXED_POSITION[0] -
			this.width / 2 +
			this.squaresWidth +
			this.SPACES_BETWEEN / 2;
		const startPosY =
			this.FIXED_POSITION[1] -
			this.height / 2 +
			this.squaresHeight +
			this.SPACES_BETWEEN / 2;
		let posX = startPosX;
		let posY = startPosY;
		const limitX =
			this.FIXED_POSITION[0] + this.width / 2 - this.SPACES_BETWEEN / 2;
		const limitZ =
			this.FIXED_POSITION[1] + this.height / 2 - this.SPACES_BETWEEN / 2;
		while (posX < limitX) {
			while (posY < limitZ) {
				const ball = this.createSingleBall(posX, posY);
				this.balls.push(ball);
				this.add(ball);
				posY += this.squaresHeight + this.SPACES_BETWEEN;
			}
			posX += this.squaresWidth + this.SPACES_BETWEEN;
			posY = startPosY;
		}
	}

	createElements() {
		this.createBackground();
		this.createSquares();
		this.createBalls();
	}

	toggleBallsMaterials() {
		this.balls.forEach((ball) => {
			ball.updateShading(this.scene.currentShading);
		});
	}

	toggleSquaresMaterials() {
		this.squares.forEach((square) => {
			square.updateShading(this.scene.currentShading);
		});
	}

	toggleBackgroundMaterial() {
		this.background.updateShading(this.scene.currentShading);
	}

	updateShading() {
		this.toggleBallsMaterials();
		this.toggleSquaresMaterials();
		this.toggleBackgroundMaterial();
	}

	update() {}
}
