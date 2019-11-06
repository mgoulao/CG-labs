import * as THREE from "../node_modules/three/build/three.module.js";

export default class Ball extends THREE.Group {
	constructor(scene) {
		super();

		this.ball = null;

		this.material = new THREE.MeshPhongMaterial({ color: 0xffff00 });

		this.createElements();
	}

	createElements() {
		const geometry = new THREE.SphereGeometry(10, 32, 32);
		this.ball = new THREE.Mesh(geometry, this.material);
		this.ball.position.set(40, 10, 0);
		this.add(this.ball);
	}
}
