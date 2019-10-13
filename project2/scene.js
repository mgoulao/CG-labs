import * as THREE from "../node_modules/three/build/three.module.js";

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
		this.ALL_VIEW = [1, 0, 1];
		this.BALL_VIEW = [1, 0, 0];

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
		this.createElements();
		this.add(new THREE.AxesHelper(10));
		this.render();
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
		this.cameraBall.position.set(...this.TOP_VIEW);
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

	createElements() {}

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

		this.render();
	}

	render() {
		this.renderer.render(this, this.currentCamera);
	}
}
