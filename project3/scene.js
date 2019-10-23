import * as THREE from "../node_modules/three/build/three.module.js";

export default class Scene extends THREE.Scene {
	constructor() {
		super();

		// FLAGS

		// END FLAGS
		// CAMERAS

		this.TOP_VIEW = [0, 61, 0];
		this.ALL_VIEW = [-110, 110, 110];
		this.BALL_VIEW = [0, 300, 0];

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

	createElements() {}

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

	update() {}

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
