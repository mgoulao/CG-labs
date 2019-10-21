import * as THREE from "../node_modules/three/build/three.module.js";
import Ball from "./ball.js";

export default class Cannon extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;

		this.cannonMainSize = [5, 5, 20, 32];
		this.cannonTireSize = [3, 2, 10, 16]; // Inner Radius [0]-[1]

		this.UNSELECTED_COLOR = 0xffec7d;
		this.SELECTED_COLOR = 0xffffff;

		this.wallOffset = 50;
		const groundOffset = this.cannonMainSize[1] / 2;

		this.cannon1 = new THREE.Group();
		this.cannon2 = new THREE.Group();
		this.cannon3 = new THREE.Group();

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
		this.createCannon1(this.cannon1Material, this.wallOffset, groundOffset, -30);
		this.createCannon2(this.cannon2Material, this.wallOffset, groundOffset, 0);
		this.createCannon3(this.cannon3Material, this.wallOffset, groundOffset, 30);
	}

	createCannon1(material, x, y, z, q1, q2, q3) {
		const cannonCylinderGeometry = new THREE.CylinderGeometry(
			...this.cannonMainSize
		);
		const cannonCylinder = new THREE.Mesh(cannonCylinderGeometry, material);
		cannonCylinder.position.set(x, y, z);
		cannonCylinder.rotateZ(Math.PI / 2);
		cannonCylinder.add(new THREE.AxesHelper(15));
		this.cannon1.add(cannonCylinder);

		const xTire = this.cannonMainSize[1] / 2;
		const zTire = this.cannonMainSize[1];
		const cannonTire1Geometry = new THREE.TorusGeometry(...this.cannonTireSize);
		const cannonTire1 = new THREE.Mesh(cannonTire1Geometry, this.torusMaterial);
		cannonTire1.position.set(x + xTire, y, z + zTire);
		this.cannon1.add(cannonTire1);

		const cannonTire2Geometry = new THREE.TorusGeometry(...this.cannonTireSize);
		const cannonTire2 = new THREE.Mesh(cannonTire2Geometry, this.torusMaterial);
		cannonTire2.position.set(x + xTire, y, z - zTire);
		this.cannon1.add(cannonTire2);
		this.add(this.cannon1);
	}
		createCannon2(material, x, y, z, q1, q2, q3) {
		const cannonCylinderGeometry = new THREE.CylinderGeometry(
			...this.cannonMainSize
		);
		const cannonCylinder = new THREE.Mesh(cannonCylinderGeometry, material);
		cannonCylinder.position.set(x, y, z);
		cannonCylinder.rotateZ(Math.PI / 2);
		cannonCylinder.add(new THREE.AxesHelper(15));
		this.cannon2.add(cannonCylinder);

		const xTire = this.cannonMainSize[1] / 2;
		const zTire = this.cannonMainSize[1];
		const cannonTire1Geometry = new THREE.TorusGeometry(...this.cannonTireSize);
		const cannonTire1 = new THREE.Mesh(cannonTire1Geometry, this.torusMaterial);
		cannonTire1.position.set(x + xTire, y, z + zTire);
		this.cannon2.add(cannonTire1);

		const cannonTire2Geometry = new THREE.TorusGeometry(...this.cannonTireSize);
		const cannonTire2 = new THREE.Mesh(cannonTire2Geometry, this.torusMaterial);
		cannonTire2.position.set(x + xTire, y, z - zTire);
		this.cannon2.add(cannonTire2);
		this.add(this.cannon2);
	}
		createCannon3(material, x, y, z, q1, q2, q3) {
		const cannonCylinderGeometry = new THREE.CylinderGeometry(
			...this.cannonMainSize
		);
		const cannonCylinder = new THREE.Mesh(cannonCylinderGeometry, material);
		cannonCylinder.position.set(x, y, z);
		cannonCylinder.rotateZ(Math.PI / 2);
		cannonCylinder.add(new THREE.AxesHelper(15));
		this.cannon3.add(cannonCylinder);

		const xTire = this.cannonMainSize[1] / 2;
		const zTire = this.cannonMainSize[1];
		const cannonTire1Geometry = new THREE.TorusGeometry(...this.cannonTireSize);
		const cannonTire1 = new THREE.Mesh(cannonTire1Geometry, this.torusMaterial);
		cannonTire1.position.set(x + xTire, y, z + zTire);
		this.cannon3.add(cannonTire1);

		const cannonTire2Geometry = new THREE.TorusGeometry(...this.cannonTireSize);
		const cannonTire2 = new THREE.Mesh(cannonTire2Geometry, this.torusMaterial);
		cannonTire2.position.set(x + xTire, y, z - zTire);
		this.cannon3.add(cannonTire2);
		this.add(this.cannon3);
	}

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
		if (this.scene.FIRE_ANGLE_DIRECT){
			var angle = Math.PI/4;
			var cos = Math.cos(angle);
			var sen = Math.sin(angle);
			var rmatrix = new THREE.Matrix4();
			var ormatrix = new THREE.Matrix4();
			rmatrix.set (cos, 0, sen, 0,
						  0, 1, 0, 0,
						  -sen, 0, cos, 0,
						  0, 0, 0, 1 );
			if (this.scene.CANNON_ONE){
				ormatrix.multiplyMatrices(this.cannon1.matrix, rmatrix);
				this.cannon1.setRotationFromMatrix(ormatrix);
			}
			if (this.scene.CANNON_TWO){
				ormatrix.multiplyMatrices(this.cannon2.matrix, rmatrix);
				this.cannon2.setRotationFromMatrix(ormatrix);
			}
			if (this.scene.CANNON_THREE){
				ormatrix.multiplyMatrices(this.cannon3.matrix, rmatrix);
				this.cannon3.setRotationFromMatrix(ormatrix);
			}
			this.scene.FIRE_ANGLE_DIRECT = false;
		}
		if (this.scene.FIRE_ANGLE_INDIRECT){
			var angle = Math.PI/4;
			var cos = Math.cos(-angle);
			var sen = Math.sin(-angle);
			var rmatrix = new THREE.Matrix4();
			var ormatrix = new THREE.Matrix4();
			rmatrix.set (cos, 0, sen, 0,
						  0, 1, 0, 0,
						  -sen, 0, cos, 0,
						  0, 0, 0, 1 );
			if (this.scene.CANNON_ONE){
				ormatrix.multiplyMatrices(this.cannon1.matrix, rmatrix);
				this.cannon1.setRotationFromMatrix(ormatrix);
			}
			if (this.scene.CANNON_TWO){
				ormatrix.multiplyMatrices(this.cannon2.matrix, rmatrix);
				this.cannon2.setRotationFromMatrix(ormatrix);
			}
			if (this.scene.CANNON_THREE){
				ormatrix.multiplyMatrices(this.cannon3.matrix, rmatrix);
				this.cannon3.setRotationFromMatrix(ormatrix);
			}
			this.scene.FIRE_ANGLE_INDIRECT = false;
		}
	}
}
