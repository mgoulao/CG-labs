import * as THREE from "three/build/three.module";
import Robot from "./robot.js.js";
import Target from "./target.js.js";

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

	update() {
		this.target.update();
		this.robot.update();
	}

	resize() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		if (window.innerHeight > 0 && window.innerWidth > 0) {
			this.currentCamera.aspect = window.innerWidth / window.innerHeight;
			this.currentCamera.updateProjectionMatrix();
		}
		this.render();
	}

	render() {
		this.renderer.render(this, this.currentCamera);
	}
}
