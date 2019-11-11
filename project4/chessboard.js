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
		this.setMaterialsProperties();
		this.createBumpMapTexture();
		this.createTopTexture();
		this.createElements();
	}

	setMaterialsProperties() {
		for (let i = 0; i < this.material.length; i++) {
			this.material[i].metalness = 0.2;
		}
	}

	createTopTexture() {
		const topTexture = new THREE.TextureLoader().load(
			"textures/chessboard.png"
		);
		topTexture.wrapS = THREE.ClampToEdgeWrapping;
		topTexture.wrapT = THREE.ClampToEdgeWrapping;
		const sideTexture = new THREE.TextureLoader().load("textures/wood.jpg");
		sideTexture.wrapS = THREE.ClampToEdgeWrapping;
		sideTexture.wrapT = THREE.ClampToEdgeWrapping;

		this.material[2].map = topTexture;
		for (let i = 0; i < this.material.length; i++) {
			if (i !== 2) this.material[i].map = sideTexture;
		}
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
