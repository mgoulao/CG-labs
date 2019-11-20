import * as THREE from "../node_modules/three/build/three.module.js";

export default class Stop extends THREE.Group {
	constructor(scene) {
		super();
		this.positionUpdated = false;
		this.scene = scene;
		this.board = null;

		this.basicMaterial = new THREE.MeshBasicMaterial({ color: 0xf4f5f0 });
		this.standardMaterial = new THREE.MeshStandardMaterial({ color: 0xf4f5f0 });
		this.currentMaterial = this.basicMaterial;

		this.stopSignSize = [250, 125, 2];

		this.createTexture();
		this.createElements();
		this.visible = true;
	}

	createTexture() {
		const texture = new THREE.TextureLoader().load("textures/stop.jpg");
		texture.wrapS = THREE.ClampToEdgeWrapping;
		texture.wrapT = THREE.ClampToEdgeWrapping;
		this.basicMaterial.map = texture;
		this.standardMaterial.map = texture;
	}

	createElements() {
		const geometry = new THREE.BoxGeometry(...this.stopSignSize);
		this.board = new THREE.Mesh(geometry, this.currentMaterial);
		// this.position.set(0, 50, 0);
		this.add(this.board);
	}

	updatePosition() {
		this.lookAt(this.scene.cameraAll.position);
		this.position.set(
			this.scene.currentCamera.position.x -
				Math.sign(this.scene.currentCamera.position.x) * 20,
			this.scene.currentCamera.position.y -
				Math.sign(this.scene.currentCamera.position.y) * 20,
			this.scene.currentCamera.position.z -
				Math.sign(this.scene.currentCamera.position.z) * 20
		);
		this.positionUpdated = true;
	}

	reset() {}

	toggleLightCalc() {
		if (this.currentMaterial === this.basicMaterial) {
			this.currentMaterial = this.standardMaterial;
		} else {
			this.currentMaterial = this.basicMaterial;
		}
		this.board.material = this.currentMaterial;
	}

	update() {
		// if (!this.positionUpdated) this.updatePosition();
		this.visible = this.scene.STOP_ANIMATIONS;
	}
}
