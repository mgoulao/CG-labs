import * as THREE from "../node_modules/three/build/three.module.js";

export default class Cannon extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;

		this.cannonMainSize = [5, 5, 20, 32];
		this.cannonTireSize = [3, 2, 10, 16]; // Inner Radius [0]-[1]

		this.UNSELECTED_COLOR = 0xffec7d;
		this.SELECTED_COLOR = 0xffffff;

		const wallOffset = 50;
		const groundOffset = this.cannonMainSize[1] / 2;

		this.cannon1Mainposition = [wallOffset, groundOffset, -30];
		this.cannon2Mainposition = [wallOffset, groundOffset, 0];
		this.cannon3Mainposition = [wallOffset, groundOffset, 30];

		this.cannon1Material = new THREE.MeshBasicMaterial({
			color: this.UNSELECTED_COLOR,
			wireframe: false,
		});

		this.cannon2Material = new THREE.MeshBasicMaterial({
			color: this.UNSELECTED_COLOR,
			wireframe: false,
		});

		this.cannon3Material = new THREE.MeshBasicMaterial({
			color: this.UNSELECTED_COLOR,
			wireframe: false,
		});

		this.torusMaterial = new THREE.MeshBasicMaterial({
			color: 0x434371,
			wireframe: false,
		});
		this.createCannon(this.cannon1Material, ...this.cannon1Mainposition);
		this.createCannon(this.cannon2Material, ...this.cannon2Mainposition);
		this.createCannon(this.cannon3Material, ...this.cannon3Mainposition);
	}

	createCannon(material, x, y, z) {
		const cannonCylinderGeometry = new THREE.CylinderGeometry(
			...this.cannonMainSize
		);
		const cannonCylinder = new THREE.Mesh(cannonCylinderGeometry, material);
		cannonCylinder.position.set(x, y, z);
		cannonCylinder.rotateZ(Math.PI / 2);
		cannonCylinder.add(new THREE.AxesHelper(15));
		this.add(cannonCylinder);

		const xTire = this.cannonMainSize[1] / 2;
		const zTire = this.cannonMainSize[1];
		const cannonTire1Geometry = new THREE.TorusGeometry(...this.cannonTireSize);
		const cannonTire1 = new THREE.Mesh(cannonTire1Geometry, this.torusMaterial);
		cannonTire1.position.set(x + xTire, y, z + zTire);
		this.add(cannonTire1);

		const cannonTire2Geometry = new THREE.TorusGeometry(...this.cannonTireSize);
		const cannonTire2 = new THREE.Mesh(cannonTire2Geometry, this.torusMaterial);
		cannonTire2.position.set(x + xTire, y, z - zTire);
		this.add(cannonTire2);
	}

	fireCannon() {}

	update() {
		if (this.scene.CANNON_ONE) {
			this.cannon1Material.color.setHex(this.SELECTED_COLOR);
			this.cannon2Material.color.setHex(this.UNSELECTED_COLOR);
			this.cannon3Material.color.setHex(this.UNSELECTED_COLOR);
		}
		if (this.scene.CANNON_TWO) {
			this.cannon1Material.color.setHex(this.UNSELECTED_COLOR);
			this.cannon2Material.color.setHex(this.SELECTED_COLOR);
			this.cannon3Material.color.setHex(this.UNSELECTED_COLOR);
		}
		if (this.scene.CANNON_THREE) {
			this.cannon1Material.color.setHex(this.UNSELECTED_COLOR);
			this.cannon2Material.color.setHex(this.UNSELECTED_COLOR);
			this.cannon3Material.color.setHex(this.SELECTED_COLOR);
		}
	}
}
