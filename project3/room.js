import * as THREE from "../node_modules/three/build/three.module.js";
import ShadedMesh from "./shadedMesh.js";

export default class Room extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;

		this.GOURAUD = "gouraud";
		this.PHONG = "phong";
		this.BASIC = "basic";

		this.currentShading = this.BASIC;

		// Elements

		this.floor = null;
		this.wall = null;

		this.floorSize = [400, 3, 200];
		this.wallSize = [400, 100, 3];

		this.floorPos = [0, 0, this.floorSize[2] / 2];
		this.wallPos = [0, this.wallSize[1] / 2, 0];

		// Materials

		this.wallColor = 0xdaffd4;
		this.floorColor = 0x6f6f6f;

		this.createElements();
	}

	createElements() {
		const floorGeometry = new THREE.BoxGeometry(...this.floorSize);
		this.floor = new ShadedMesh(floorGeometry, this.floorColor);
		this.floor.position.set(...this.floorPos);
		this.add(this.floor);

		const wallGeometry = new THREE.BoxGeometry(...this.wallSize);
		this.wall = new ShadedMesh(wallGeometry, this.wallColor);
		this.wall.position.set(...this.wallPos);
		this.add(this.wall);
	}

	updateShading() {
		this.wall.updateShading(this.scene.currentShading);
		this.floor.updateShading(this.scene.currentShading);
	}

	update() {}
}
