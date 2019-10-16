import * as THREE from "../node_modules/three/build/three.module.js";
import Wall from "./wall.js";
import Cannon from "./cannon.js";
import Ball from "./ball.js";

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

		this.UPDATE_WIREFRAME = false;

		// END FLAGS
		// CAMERAS

		this.TOP_VIEW = [0, 61, 0];
		this.ALL_VIEW = [100, 100, 100];
		this.BALL_VIEW = [150, 0, 0];

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
		this.cannons = [];
		this.balls = [];

		this.createElements();
	}

	createCameras() {
		this.cameraTop = new THREE.OrthographicCamera(
			window.innerWidth / -15,
			window.innerWidth / 15,
			window.innerHeight / 15,
			window.innerHeight / -15,
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
		// Placeholder
		/*const ball = new THREE.SphereGeometry(4, 10, 10);
		const mesh = new THREE.Mesh(
			ball,
			new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
		);
		this.add(mesh);*/

		this.add(new THREE.AxesHelper(10));

		this.wall = new Wall(this);
		this.cannons[0] = new Cannon(this);
		this.add(this.wall);
		this.add(this.cannons[0]);
	}

	createBall() {
		const ball = new Ball(this, -1, 0, 10, 0); // Temp values
		this.balls.push(ball);
		this.add(ball);
	}

	update() {
		this.UPDATE_WIREFRAME = false;

		this.balls.forEach((ball) => {
			ball.update();
		});

		// TEMP
		if (this.FIRE_CANNON) this.createBall();
		this.FIRE_CANNON = false;

		this.wall.update();
		this.cannons[0].update();
	}

	updateOrtographicCameraAspect(camera) {
		const widthFrustum = window.innerWidth / 15;
		const heightFrustum = window.innerHeight / 15;
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
