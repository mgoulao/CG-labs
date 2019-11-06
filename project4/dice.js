import * as THREE from "../node_modules/three/build/three.module.js";

export default class Dice extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;
		this.cube = null;

		this.material = new THREE.MeshPhongMaterial({ color: 0xfbfbfb });

		this.createElements();
	}

	createElements() {
		const geometry = new THREE.BoxGeometry(10, 10, 10);
		this.cube = new THREE.Mesh(geometry, this.material);
		this.cube.position.set(0, 20, 0);
		this.add(this.cube);
	}
}
