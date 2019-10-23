import * as THREE from "../node_modules/three/build/three.module.js";

export default class Paint extends THREE.Group {
	constructor(scene, pos) {
		super();
		this.scene = scene;
	
		this.FIXED_POSITION = pos;

		// Materials

		this.backgroundBasicMaterial = new THREE.MeshBasicMaterial({
			color: 0x929292,
		});
		this.backgroundLambertMaterial = new THREE.MeshLambertMaterial({
			color: 0x929292,
		});
		this.backgroundPhongMaterial = new THREE.MeshPhongMaterial({
			color: 0x929292,
		});

		this.width = 62;
		this.height = 44;
		this.depth = 2;

		this.background = null;
		this.balls = [];
		this.squares = [];

		this.createElements();
	}

	createBackground() {
		const geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
		this.background = new THREE.Mesh(geometry, this.backgroundBasicMaterial);
		this.background.position.set(...this.FIXED_POSITION);
		this.add(this.background);
	}

	createSquares() {}

	createBalls() {}

	createElements() {
		this.createBackground();
		this.createSquares();
		this.createBalls();
	}

	update() {}
}
