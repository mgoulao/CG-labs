import * as THREE from "../node_modules/three/build/three.module.js";

export default class Paint extends THREE.Group {
	constructor(scene, pos) {
		super();
		this.scene = scene;

		this.FIXED_POSITION = pos;
		this.SPACES_BETWEEN = 1.4;

		// Squares

		this.squaresWidth = 4;
		this.squaresHeight = 4;
		this.squaresZ = 1;

		// Balls

		this.ballsRadius = 1;
		this.ballsHeight = 1;
		this.ballsZ = 1;

		// Materials

		this.backgroundBasicMaterial = new THREE.MeshBasicMaterial({
			color: 0x929292,
		});
		this.backgroundLambertMaterial = new THREE.MeshLambertMaterial({
			color: 0x929292,
		});
		this.backgroundPhongMaterial = new THREE.MeshPhongMaterial({
			color: 0x929292,
		});

		this.squareBasicMaterial = new THREE.MeshBasicMaterial({
			color: 0x000000,
		});
		this.squareLambertMaterial = new THREE.MeshLambertMaterial({
			color: 0x000000,
		});
		this.squarePhongMaterial = new THREE.MeshPhongMaterial({
			color: 0x000000,
		});

		this.ballBasicMaterial = new THREE.MeshBasicMaterial({
			color: 0xffffff,
		});
		this.ballLambertMaterial = new THREE.MeshLambertMaterial({
			color: 0xffffff,
		});
		this.ballPhongMaterial = new THREE.MeshPhongMaterial({
			color: 0xffffff,
		});

		this.width = 80;
		this.height = 50;
		this.depth = 2;

		this.background = null;
		this.balls = [];
		this.squares = [];

		this.createElements();
	}

	createBackground() {
		const geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
		this.background = new THREE.Mesh(geometry, this.backgroundBasicMaterial);
		this.background.position.set(...this.FIXED_POSITION);
		this.add(this.background);
	}

	createSingleSquare(x, y) {
		const geometry = new THREE.BoxGeometry(
			this.squaresWidth,
			this.squaresHeight,
			this.depth
		);
		console.log(x, y);
		const square = new THREE.Mesh(geometry, this.squareBasicMaterial);
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
		const limitX = this.FIXED_POSITION[0] + this.width / 2;
		const limitZ = this.FIXED_POSITION[1] + this.height / 2;
		while (posX < limitX) {
			while (posY < limitZ) {
				const square = this.createSingleSquare(posX, posY);
				this.squares.push(square);
				this.add(square);
				posY += this.squaresHeight + this.SPACES_BETWEEN;
			}
			posX += this.squaresWidth + this.SPACES_BETWEEN;
			posY = startPosY;
			console.log(posX);
		}
	}

	createSingleBall(x, y) {
		const geometry = new THREE.CylinderGeometry(
			this.ballsRadius,
			this.ballsRadius,
			this.ballsHeight,
			20
		);
		const ball = new THREE.Mesh(geometry, this.ballBasicMaterial);
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
		const limitX = this.FIXED_POSITION[0] + this.width / 2;
		const limitZ = this.FIXED_POSITION[1] + this.height / 2;
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

	update() {}
}
