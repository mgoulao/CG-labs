import * as THREE from "../node_modules/three/build/three.module.js";
import Wall from "./wall.js";
import Cannon from "./cannon.js";
import Ball from "./ball.js";
import Collisions from "./collisions.js";

export default class Scene extends THREE.Scene {
	constructor() {
		super();

		// FLAGS

		this.CANNON_ONE = false;
		this.CANNON_TWO = false;
		this.CANNON_THREE = false;

		this.FIRE_CANNON = false;
		this.FIRE_ANGLE_DIRECT = false;
		this.FIRE_ANGLE_INDIRECT = false;

		this.TOGGLE_AXES = false;
		this.AXES = false;

		// END FLAGS
		// CAMERAS

		this.TOP_VIEW = [0, 61, 0];
		this.ALL_VIEW = [-110, 110, 110];
		this.BALL_VIEW = [0, 300, 0];

		this.CANNON_OLD = 1;

		this.currentCamera = null;
		this.cameraTop = null;
		this.cameraAll = null;
		this.cameraBall = null;

		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
		});
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);

		this.createCameras();

		// END CAMERAS
		// ELEMENTS
		this.N_BALLS = 10;
		this.cannons = null;
		this.activeBall = null;
		this.temp = new THREE.Vector3();

		this.createElements();
	}

	createCameras() {
		this.cameraTop = new THREE.OrthographicCamera(
			window.innerWidth / -9,
			window.innerWidth / 9,
			window.innerHeight / 9,
			window.innerHeight / -9,
			-1000,
			1000
		);
		this.cameraTop.position.set(...this.TOP_VIEW);
		this.cameraTop.lookAt(this.position);

		this.cameraAll = new THREE.PerspectiveCamera(
			45,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		this.cameraAll.position.set(...this.ALL_VIEW);
		this.cameraAll.lookAt(this.position);

		this.cameraBall = new THREE.PerspectiveCamera(
			45,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		this.cameraBall.position.set(...this.BALL_VIEW);
		this.cameraBall.lookAt(this.position);

		this.currentCamera = this.cameraTop;
	}

	changeToCameraTop() {
		this.currentCamera = this.cameraTop;
	}

	changeToCameraAll() {
		this.currentCamera = this.cameraAll;
	}

	changeToCameraBall() {
		this.currentCamera = this.cameraBall;
	}

	createElements() {
		this.wall = new Wall(this);
		this.cannons = new Cannon(this);
		this.add(this.wall);
		this.add(this.cannons);
		this.createNBalls();
	}

	createNBalls() {
		let i = 0;
		const arenaOffset = 10;
		const arenaStart = -(this.wall.DEPTH / 2 - arenaOffset);
		const arenaDepth = this.wall.DEPTH - arenaOffset * 3;
		while (i < this.N_BALLS) {
			const randomX = Math.floor(Math.random() * arenaDepth) + arenaStart;
			const randomZ = Math.floor(Math.random() * arenaDepth) + arenaStart;
			const newBall = this.createBall(0, 0, randomX, randomZ);
			this.add(newBall);
			i++;
		}
	}

	createBall(ex, ez, posX, posZ) {
		const randomVelocity = Math.floor(Math.random() * 100) + 40;
		const ball = new Ball(this, ex, ez, posX, posZ, randomVelocity);
		return ball;
	}

	fireCannon(ex, ez, posX, posZ) {
		const ball = this.createBall(ex, ez, posX, posZ);
		this.activeBall = ball;
		this.add(ball);
	}

	detectCollisions() {
		// Ball -> Ball
		for (let i = 0; i < this.children.length; i++) {
			if (this.children[i].constructor.name !== "Ball") continue;
			const firstBall = this.children[i];
			for (let j = i + 1; j < this.children.length; j++) {
				if (this.children[j].constructor.name !== "Ball") continue;
				const secondBall = this.children[j];
				if (Collisions.hasCollisionBallToBall(firstBall, secondBall)) {
					const newPositions = Collisions.findIntersectionBallToBall(
						firstBall,
						secondBall
					);
					Collisions.processBallToBallCollision(
						firstBall,
						secondBall,
						newPositions
					);
				}
			}
		}

		// Ball -> Wall
		for (let i = 0; i < this.children.length; i++) {
			if (this.children[i].constructor.name !== "Ball") continue;
			const ball = this.children[i];
			for (let j = 0; j < this.wall.children.length; j++) {
				const wall = this.wall.children[j];
				if (Collisions.hasCollisionBallToWall(ball, wall)) {
					console.log("Wall collision");
					const coll = Collisions.findIntersectionBallToWall(ball, wall);
					Collisions.processBallToWallCollision(ball, wall, coll);
				}
			}
		}
	}

	ballOutOfBounds(ball) {
		const canonPosX = this.cannons.wallOffset + 10;
		const ballPosX = ball.position.x;
		return ballPosX > canonPosX;
	}

	update() {
		if (this.activeBall != null) {
			this.temp.setFromMatrixPosition(this.activeBall.matrixWorld);
			this.temp.y = 40;
			this.cameraBall.position.lerp(this.temp, 0.2);
			this.cameraBall.lookAt(this.activeBall.position);
		}

		for (let i = 0; i < this.children.length; i++) {
			const obj = this.children[i];
			if (obj.constructor.name !== "Ball") continue;

			if (this.ballOutOfBounds(obj)) {
				if (this.activeBall == obj) this.activeBall = null;
				this.remove(obj);
			} else obj.update();
		}

		this.detectCollisions();

		this.wall.update();
		this.cannons.update();
		if (this.TOGGLE_AXES) this.AXES = !this.AXES;
		this.TOGGLE_AXES = false;
	}

	updateOrtographicCameraAspect(camera) {
		const widthFrustum = window.innerWidth / 9;
		const heightFrustum = window.innerHeight / 9;
		camera.left = -widthFrustum;
		camera.right = widthFrustum;
		camera.top = heightFrustum;
		camera.bottom = -heightFrustum;
		camera.updateProjectionMatrix();
	}

	updatePerspectiveCameraAspect(camera) {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	}

	resize() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.updateOrtographicCameraAspect(this.cameraTop);
		this.updatePerspectiveCameraAspect(this.cameraBall);
		this.updatePerspectiveCameraAspect(this.cameraAll);
	}

	render() {
		this.renderer.render(this, this.currentCamera);
	}
}
