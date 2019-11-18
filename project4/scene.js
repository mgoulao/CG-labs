import * as THREE from "../node_modules/three/build/three.module.js";
import Ball from "./ball.js";
import LightManager from "./lightManager.js";
import Dice from "./dice.js";
import Chessboard from "./chessboard.js";
import Stop from "./stop.js";

export default class Scene extends THREE.Scene {
	constructor() {
		super();

		// FLAGS

		this.PERSPECTIVE_CAMERA = false;

		this.STOP_ANIMATIONS = false;
		this.IN_MOTION = false;
		this.POINTLIGHT = true;
		this.AMBIENT_LIGHT = true;
		this.TOGGLE_LIGHT_CALC = false;
		this.RESET = false;
		this.LIGHT_CALC = true;
		this.UPDATE_WIREFRAME = false;

		// RENDERER

		this.screenAspectRatio = window.innerHeight / window.innerWidth;
		this.originalWidth = window.innerWidth;

		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
		});
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);

		// ELEMENTS

		this.dice = null;
		this.ball = null;
		this.chessboard = null;
		this.stop = null;

		this.createElements();

		// ILUMINATION

		this.lightManager = new LightManager(this);

		// CAMERAS

		this.ALL_VIEW = [-110, 110, 110];

		this.currentCamera = null;
		this.cameraAll = null;

		this.createCameras();
	}

	createCameras() {
		this.cameraAll = new THREE.PerspectiveCamera(
			45,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		this.cameraAll.position.set(...this.ALL_VIEW);
		this.cameraAll.lookAt(this.position);

		this.currentCamera = this.cameraAll;
	}

	createElements() {
		this.ball = new Ball(this);
		this.chessboard = new Chessboard(this);
		this.dice = new Dice(this);
		this.stop = new Stop(this);

		this.add(this.ball);
		this.add(this.chessboard);
		this.add(this.dice);
		this.add(this.stop);
	}

	updateOrtographicCameraAspect(camera) {
		camera.left = this.PAINT_POSITION[0] - this.paintCameraSize[0] / 2;
		camera.right = this.PAINT_POSITION[0] + this.paintCameraSize[0] / 2;
		camera.top = this.PAINT_POSITION[1] + this.paintCameraSize[1] / 2;
		camera.bottom = this.PAINT_POSITION[1] - this.paintCameraSize[1] / 2;
		camera.updateProjectionMatrix();
	}

	updatePerspectiveCameraAspect(camera) {
		const zoom = window.innerWidth / this.originalWidth;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.zoom = zoom > 1 ? 1 : zoom;
		camera.updateProjectionMatrix();
	}

	resetScene() {
		if (!this.LIGHT_CALC) this.toggleLightCalc();
		this.STOP_ANIMATIONS = false;
		this.IN_MOTION = false;
		this.POINTLIGHT = true;
		this.AMBIENT_LIGHT = true;
		this.stop.reset();
		this.ball.reset();
		this.lightManager.reset();
		this.dice.reset();
	}

	toggleLightCalc() {
		this.LIGHT_CALC = !this.LIGHT_CALC;
		this.stop.toggleLightCalc();
		this.ball.toggleLightCalc();
		this.chessboard.toggleLightCalc();
		this.dice.toggleLightCalc();
	}

	update() {
		if (this.PERSPECTIVE_CAMERA) this.currentCamera = this.cameraAll;
		if (this.RESET && this.STOP_ANIMATIONS) this.resetScene();
		if (this.TOGGLE_LIGHT_CALC) this.toggleLightCalc();
		this.stop.update();
		this.ball.update();
		this.dice.update();
		this.chessboard.update();
		this.lightManager.update();

		this.TOGGLE_LIGHT_CALC = false;
		this.RESET = false;
	}

	resize() {
		this.screenAspectRatio = window.innerHeight / window.innerWidth;
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.updatePerspectiveCameraAspect(this.cameraAll);
	}

	render() {
		this.renderer.render(this, this.currentCamera);
	}
}
