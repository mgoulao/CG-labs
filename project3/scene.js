import * as THREE from "../node_modules/three/build/three.module.js";
import Icosahedron from "./icosahedron.js";
import Paint from "./paint.js";
import LightManager from "./lightManager.js";
import Room from "./room.js";
import ShadedMesh from "./shadedMesh.js";

export default class Scene extends THREE.Scene {
	constructor() {
		super();

		this.PAINT_POSITION = [-100, 60, 2];

		this.currentShading = ShadedMesh.BASIC;

		// FLAGS

		this.TOGGLE_SHADING = false;
		this.TOGGLE_LIGHT = false;
		this.TOGGLE_LIGHT1 = false;
		this.TOGGLE_LIGHT2 = false;
		this.TOGGLE_LIGHT3 = false;
		this.TOGGLE_LIGHT4 = false;
		this.LIGHT_CALC = false;

		this.PAINT_CAMERA = false;
		this.PERSPECTIVE_CAMERA = false;

		// RENDERER

		this.screenAspectRatio = window.innerHeight / window.innerWidth;
		this.originalWidth = window.innerWidth;

		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
		});
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);

		// ELEMENTS

		this.room = null;
		this.icosahedron = null;
		this.paint = null;

		this.floor = null;
		this.wall = null;

		this.floorSize = [400, 3, 200];
		this.wallSize = [400, 100, 3];

		this.floorPos = [0, 0, this.floorSize[2] / 2];
		this.wallPos = [0, this.wallSize[1] / 2, 0];

		this.createElements();

		// ILUMINATION

		this.lightManager = new LightManager(this);

		// CAMERAS

		this.PAINT_VIEW = [0, 0, 1];
		this.ALL_VIEW = [-210, 210, 210];
		// this.ALL_VIEW = [170, 60, 170]; //ICOSAHEDRON DEBUG

		this.currentCamera = null;
		this.cameraPaint = null;
		this.cameraAll = null;

		if (this.paint.width * this.screenAspectRatio > this.paint.height) {
			this.paintCameraSize = [
				this.paint.width,
				this.paint.width * this.screenAspectRatio,
			];
		} else {
			this.paintCameraSize = [
				this.paint.height / this.screenAspectRatio,
				this.paint.height,
			];
		}

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

		this.currentCamera = this.cameraAll;
	}

	createElements() {
		this.room = new Room(this);
		this.add(new THREE.AxesHelper(15));
		this.icosahedron = new Icosahedron(this);
		this.paint = new Paint(this, this.PAINT_POSITION);

		this.add(this.icosahedron);
		this.add(this.room);
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
		const zoom = window.innerWidth / this.originalWidth;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.zoom = zoom > 1 ? 1 : zoom;
		camera.updateProjectionMatrix();
	}

	updateShading() {
		if (!this.LIGHT_CALC) {
			if (this.currentShading !== ShadedMesh.BASIC) {
				this.currentShading = ShadedMesh.BASIC;
				this.room.updateShading();
				this.paint.updateShading();
				this.icosahedron.updateShading();
				this.lightManager.updateLightsShading();
			}
		} else {
			if (this.currentShading === ShadedMesh.BASIC) {
				this.currentShading = ShadedMesh.PHONG;
				this.TOGGLE_SHADING = true;
			}
			if (this.TOGGLE_SHADING) {
				if (this.currentShading === ShadedMesh.GOURAUD) {
					this.currentShading = ShadedMesh.PHONG;
				} else if (this.currentShading === ShadedMesh.PHONG) {
					this.currentShading = ShadedMesh.GOURAUD;
				}
				this.room.updateShading();
				this.paint.updateShading();
				this.icosahedron.updateShading();
				this.lightManager.updateLightsShading();
			}
		}
	}

	update() {
		this.updateShading();
		this.room.update();
		this.icosahedron.update();
		this.paint.update();
		this.lightManager.update();

		if (this.PAINT_CAMERA) this.currentCamera = this.cameraPaint;
		if (this.PERSPECTIVE_CAMERA) this.currentCamera = this.cameraAll;

		this.TOGGLE_SHADING = false;
	}

	resize() {
		this.screenAspectRatio = window.innerHeight / window.innerWidth;
		console.log(window.innerHeight / window.innerWidth);
		if (this.paint.width * this.screenAspectRatio > this.paint.height) {
			this.paintCameraSize = [
				this.paint.width,
				this.paint.width * this.screenAspectRatio,
			];
		} else {
			this.paintCameraSize = [
				this.paint.height / this.screenAspectRatio,
				this.paint.height,
			];
		}
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.updateOrtographicCameraAspect(this.cameraPaint);
		this.updatePerspectiveCameraAspect(this.cameraAll);
	}

	render() {
		this.renderer.render(this, this.currentCamera);
	}
}
