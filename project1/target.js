import * as THREE from "../node_modules/three/build/three.module.js";

export default class Target extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;

		this.targetBottomSize = [3, 3, 20, 32];
		this.targetBottomPos = [50, 10, 0];

		this.targetTopSize = [2, 0.8, 10, 16]; // Inner Radius [0]-[1]
		this.targetTopPos = [
			50,
			this.targetBottomSize[2] + this.targetTopSize[0] + this.targetTopSize[1],
			0,
		];

		this.material = new THREE.MeshBasicMaterial({
			color: 0xc5c5c5,
			wireframe: true,
		});

		this.torusMaterial = new THREE.MeshBasicMaterial({
			color: 0x434371,
			wireframe: true,
		});
		this.createTarget();
	}

	createTarget() {
		const targetCylinderGeometry = new THREE.CylinderGeometry(
			...this.targetBottomSize
		);
		const targetCylinder = new THREE.Mesh(
			targetCylinderGeometry,
			this.material
		);
		targetCylinder.position.set(...this.targetBottomPos);
		this.add(targetCylinder);

		const targetTopGeometry = new THREE.TorusGeometry(...this.targetTopSize);
		const targetTop = new THREE.Mesh(targetTopGeometry, this.torusMaterial);
		targetTop.position.set(...this.targetTopPos);
		this.add(targetTop);
	}

	update() {
		if (this.scene.UPDATE_WIREFRAME) {
			this.material.wireframe = !this.material.wireframe;
			this.torusMaterial.wireframe = !this.torusMaterial.wireframe;
		}
	}
}
