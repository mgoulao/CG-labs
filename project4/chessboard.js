import * as THREE from "../node_modules/three/build/three.module.js";

export default class Chessboard extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;
		this.board = null;

		this.material = new THREE.MeshPhongMaterial({ color: 0xffff00 });

		this.createElements();
	}

	createElements() {
		const geometry = new THREE.BoxGeometry(100, 5, 100);
		this.board = new THREE.Mesh(geometry, this.material);
		this.add(this.board);
	}
}
