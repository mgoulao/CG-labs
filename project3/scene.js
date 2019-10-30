import * as THREE from "../node_modules/three/build/three.module.js";
import Icosahedron from "./icosahedron.js";
import Paint from "./paint.js";
import LightManager from "./lightManager.js";

export default class Scene extends THREE.Scene {
	constructor() {
		super();

		this.PAINT_POSITION = [-100, 60, 2];

		// FLAGS

		this.TOGGLE_SHADING = false;
		this.LIGHT_CALC = false;

		this.PAINT_CAMERA = false;
		this.PERSPECTIVE_CAMERA = false;

		// RENDERER

		this.screenAspectRatio = window.innerHeight / window.innerWidth;

		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
		});
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);

		// ELEMENTS

		this.icosahedron = null;
		this.paint = null;

		this.floor = null;
		this.wall = null;

		this.floorSize = [400, 3, 200];
		this.wallSize = [400, 100, 3];

		this.floorPos = [0, 0, this.floorSize[2] / 2];
		this.wallPos = [0, this.wallSize[1]/2, 0];

		this.floorBasicMaterial = new THREE.MeshBasicMaterial({
			color: 0x6f6f6f,
		});
		this.floorLambertMaterial = new THREE.MeshLambertMaterial({
			color: 0x6f6f6f,
		});
		this.floorPhongMaterial = new THREE.MeshPhongMaterial({
			color: 0x6f6f6f,
		});

		this.wallBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		this.wallLambertMaterial = new THREE.MeshLambertMaterial({
			color: 0x00ff00,
		});
		this.wallPhongMaterial = new THREE.MeshPhongMaterial({
			color: 0x00ff00,
		});

		this.createElements();

		// ILUMINATION

		this.lightManager = new LightManager(this);

		// CAMERAS

		this.PAINT_VIEW = [0, 0, 1];
		this.ALL_VIEW = [-210, 210, 210];
		this.BALL_VIEW = [0, 300, 0];

		this.currentCamera = null;
		this.cameraPaint = null;
		this.cameraAll = null;
		this.cameraBall = null;

		this.paintCameraSize = [
			this.paint.width,
			this.paint.width * this.screenAspectRatio,
		];

		this.createCameras();
	}

	createCameras() {
		this.cameraPaint = new THREE.OrthographicCamera(
			this.PAINT_POSITION[0] - this.paintCameraSize[0] / 2,
			this.PAINT_POSITION[0] + this.paintCameraSize[0] / 2,
			this.PAINT_POSITION[1] + this.paintCameraSize[1] / 2,
			this.PAINT_POSITION[1] - this.paintCameraSize[1] / 2,
			-1000,
			1000
		);
		this.cameraPaint.position.set(...this.PAINT_VIEW);
		this.cameraPaint.lookAt(this.position);

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

		this.currentCamera = this.cameraPaint;
	}

	createRoom() {
		const floorGeometry = new THREE.BoxGeometry(...this.floorSize);
		this.floor = new THREE.Mesh(floorGeometry, this.floorBasicMaterial);
		this.floor.position.set(...this.floorPos);
		this.add(this.floor);

		const wallGeometry = new THREE.BoxGeometry(...this.wallSize);
		this.wall = new THREE.Mesh(wallGeometry, this.wallBasicMaterial);
		this.wall.position.set(...this.wallPos);
		this.add(this.wall);
	}

	createElements() {
		this.createRoom();
		this.add(new THREE.AxesHelper(15));
		this.icosahedron = new Icosahedron(this);
		this.paint = new Paint(this, this.PAINT_POSITION);

		this.add(this.icosahedron);
		this.add(this.paint);
	}

	updateOrtographicCameraAspect(camera) {
		camera.left = this.PAINT_POSITION[0] - this.paintCameraSize[0] / 2;
		camera.right = this.PAINT_POSITION[0] + this.paintCameraSize[0] / 2;
		camera.top = this.PAINT_POSITION[1] + this.paintCameraSize[1] / 2;
		camera.bottom = this.PAINT_POSITION[1] - this.paintCameraSize[1] / 2;
		camera.updateProjectionMatrix();
	}

	updatePerspectiveCameraAspect(camera) {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	}

	update() {
		this.icosahedron.update();
		this.paint.update();
		this.lightManager.update();

		if (this.PAINT_CAMERA) this.currentCamera = this.cameraPaint;
		if (this.PERSPECTIVE_CAMERA) this.currentCamera = this.cameraAll;

		this.TOGGLE_SHADING = false;
	}

	resize() {
		this.screenAspectRatio = window.innerHeight / window.innerWidth;
		this.paintCameraSize = [
			this.paint.width,
			this.paint.width * this.screenAspectRatio,
		];
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.updateOrtographicCameraAspect(this.cameraPaint);
		this.updatePerspectiveCameraAspect(this.cameraBall);
		this.updatePerspectiveCameraAspect(this.cameraAll);
	}

	render() {
		this.renderer.render(this, this.currentCamera);
	}
}
