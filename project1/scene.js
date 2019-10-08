import * as THREE from "../node_modules/three/build/three.module.js";
import Robot from "./robot.js";
import Target from "./target.js";

export default class Scene extends THREE.Scene {
	constructor() {
		super();

		this.UP_DOWN = false;
		this.DOWN_DOWN = false;
		this.LEFT_DOWN = false;
		this.RIGHT_DOWN = false;

		this.THETA1_DIRECT = false;
		this.THETA1_INDIRECT = false;
		this.THETA2_DIRECT = false;
		this.THETA2_INDIRECT = false;
		this.THETA3_DIRECT = false;
		this.THETA3_INDIRECT = false;

		this.UPDATE_WIREFRAME = false;

		this.TOP_VIEW = [0, 1, 0];
		this.FRONT_VIEW = [0, 0, 1];
		this.SIDE_VIEW = [1, 0, 0];

		this.currentCamera = null;
		this.cameraFront = null;
		this.cameraTop = null;
		this.cameraSide = null;

		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
		});
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);

		this.createCameras();
		this.createElements();
		this.add(new THREE.AxesHelper(10));
		this.render();
	}

	createCameras() {
		this.cameraFront = new THREE.OrthographicCamera(
			window.innerWidth / -15,
			window.innerWidth / 15,
			window.innerHeight / 15,
			window.innerHeight / -15,
			-1000,
			1000
		);
		this.cameraFront.position.set(...this.FRONT_VIEW);
		this.cameraFront.lookAt(this.position);

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

		this.cameraSide = new THREE.OrthographicCamera(
			window.innerWidth / -15,
			window.innerWidth / 15,
			window.innerHeight / 15,
			window.innerHeight / -15,
			-1000,
			1000
		);
		this.cameraSide.position.set(...this.SIDE_VIEW);
		this.cameraSide.lookAt(this.position);

		this.currentCamera = this.cameraFront;
	}

	changeToCameraFront() {
		this.currentCamera = this.cameraFront;
	}

	changeToCameraTop() {
		this.currentCamera = this.cameraTop;
	}

	changeToCameraSide() {
		this.currentCamera = this.cameraSide;
	}

	createElements() {
		this.robot = new Robot(this);
		this.target = new Target(this);

		this.add(this.robot);
		this.add(this.target);
	}

	// resetFlags() {
	// 	this.UP_DOWN = false;
	// 	this.DOWN_DOWN = false;
	// 	this.LEFT_DOWN = false;
	// 	this.RIGHT_DOWN = false;

	// 	this.THETA1_DIRECT = false;
	// 	this.THETA1_INDIRECT = false;
	// 	this.THETA2_DIRECT = false;
	// 	this.THETA2_INDIRECT = false;
	// 	this.THETA3_DIRECT = false;
	// 	this.THETA3_INDIRECT = false;
	// }

	update() {
		this.target.update();
		this.robot.update();
	}

	updateCameraAspect(camera) {
		const widthFrustum = window.innerWidth / 15;
		const heightFrustum = window.innerHeight / 15;
		camera.left = -widthFrustum;
		camera.right = widthFrustum;
		camera.top = heightFrustum;
		camera.bottom = -heightFrustum;
		camera.updateProjectionMatrix();
	}

	resize() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.updateCameraAspect(this.cameraFront);
		this.updateCameraAspect(this.cameraTop);
		this.updateCameraAspect(this.cameraSide);
		if (window.innerHeight > 0 && window.innerWidth > 0) {
			// Width frustum
		}
		this.render();
	}

	render() {
		this.renderer.render(this, this.currentCamera);
	}
}
