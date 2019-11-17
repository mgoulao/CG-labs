import * as THREE from "../node_modules/three/build/three.module.js";

export default class Dice extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;
		this.cube = null;

		this.basicMaterial = new THREE.MeshBasicMaterial({ color: 0xfbfbfb });
		this.standardMaterial = new THREE.MeshStandardMaterial({ color: 0xfbfbfb });
		this.currentMaterial = this.standardMaterial;
		this.createElements();
	}

	createElements() {
		const geometry = new THREE.BoxGeometry(10, 10, 10);
		this.cube = new THREE.Mesh(geometry, this.currentMaterial);
		this.cube.position.set(0, 20, 0);
		this.add(this.cube);
	}

	animations() {}


	toggleLightCalc() {
		if (this.currentMaterial === this.basicMaterial) {
			this.currentMaterial = this.standardMaterial;
		} else {
			this.currentMaterial = this.basicMaterial;
		}
		this.cube.material = this.currentMaterial;
	}

	update() {
		if (!this.scene.STOP_ANIMATIONS) this.animations();
	}
}
