import * as THREE from "../node_modules/three/build/three.module.js";

export default class Stop extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;
		this.board = null;

		this.material = new THREE.MeshBasicMaterial({ color: 0xf4f5f0 });

		this.createTexture();
		this.createElements();
		this.visible = false;
	}

	createTexture() {
		const texture = new THREE.TextureLoader().load("textures/stop.jpg");
		texture.wrapS = THREE.ClampToEdgeWrapping;
		texture.wrapT = THREE.ClampToEdgeWrapping;
		this.material.map = texture;
	}

	createElements() {
		const geometry = new THREE.BoxGeometry(50, 25, 2);
		this.board = new THREE.Mesh(geometry, this.material);
		this.position.set(0, 50, 0);
		this.add(this.board);
	}

	updatePosition() {
		const diffVector = new THREE.Vector3(
			-this.scene.cameraAll.position.x,
			-this.scene.cameraAll.position.y,
			-this.scene.cameraAll.position.z
		)
			.normalize()
			.multiplyScalar(100);

		this.setRotationFromEuler(
			new THREE.Euler(
				Math.atan2(-diffVector.z, -diffVector.y),
				Math.atan2(-diffVector.z, -diffVector.x),
				Math.atan2(-diffVector.y, -diffVector.x),
				"XYZ"
			)
		);
	}

	update() {
		this.updatePosition();

		this.visible = this.scene.STOP_ANIMATIONS;
	}
}
