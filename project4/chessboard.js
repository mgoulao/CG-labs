import * as THREE from "../node_modules/three/build/three.module.js";

export default class Chessboard extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;
		this.board = null;

		this.material = [
			new THREE.MeshStandardMaterial({ color: 0xf4f5f0 }),
			new THREE.MeshStandardMaterial({ color: 0xf4f5f0 }),
			new THREE.MeshStandardMaterial({ color: 0xf4f5f0 }),
			new THREE.MeshStandardMaterial({ color: 0xf4f5f0 }),
			new THREE.MeshStandardMaterial({ color: 0xf4f5f0 }),
			new THREE.MeshStandardMaterial({ color: 0xf4f5f0 }),
		];
		this.createBumpMapTexture();
		this.createTopTexture();
		this.createElements();
	}

	createTopTexture() {
		const texture = new THREE.TextureLoader().load("textures/chessboard.png");
		texture.wrapS = THREE.ClampToEdgeWrapping;
		texture.wrapT = THREE.ClampToEdgeWrapping;
		this.material[2].map = texture;
	}

	createBumpMapTexture() {
		const texture = new THREE.TextureLoader().load(
			"textures/wood-bump-map.jpg"
		);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(20, 20);
		for (let i = 0; i < this.material.length; i++) {
			this.material[i].bumpMap = texture;
		}
	}

	createElements() {
		const geometry = new THREE.BoxGeometry(100, 5, 100);
		this.board = new THREE.Mesh(geometry, this.material);
		this.add(this.board);
	}
}
