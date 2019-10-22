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

		this.rotationStep = Math.PI / 30;
		this.MAX_ROTATION = Math.PI / 4;
		this.MIN_ROTATION = -Math.PI / 4;
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
		this.createCannon1(
			this.cannon1Material,
			this.wallOffset,
			groundOffset,
			-30
		);
		this.createCannon2(this.cannon2Material, this.wallOffset, groundOffset, 0);
		this.createCannon3(this.cannon3Material, this.wallOffset, groundOffset, 30);
	}

	createCannon1(material, x, y, z, q1, q2, q3) {
		const cannonCylinderGeometry = new THREE.CylinderGeometry(
			...this.cannonMainSize
		);
		const cannonCylinder = new THREE.Mesh(cannonCylinderGeometry, material);
		cannonCylinder.rotateZ(Math.PI / 2);
		cannonCylinder.add(new THREE.AxesHelper(15));
		this.cannon1.add(cannonCylinder);

		const xTire = this.cannonMainSize[1] / 2;
		const zTire = this.cannonMainSize[1];
		const cannonTire1Geometry = new THREE.TorusGeometry(...this.cannonTireSize);
		const cannonTire1 = new THREE.Mesh(cannonTire1Geometry, this.torusMaterial);
		cannonTire1.position.set(xTire, 0, zTire);
		this.cannon1.add(cannonTire1);

		const cannonTire2Geometry = new THREE.TorusGeometry(...this.cannonTireSize);
		const cannonTire2 = new THREE.Mesh(cannonTire2Geometry, this.torusMaterial);
		cannonTire2.position.set(xTire, 0, -zTire);
		this.cannon1.add(cannonTire2);
		this.cannon1.position.set(x, y, z);

		this.add(this.cannon1);
	}

	createCannon2(material, x, y, z, q1, q2, q3) {
		const cannonCylinderGeometry = new THREE.CylinderGeometry(
			...this.cannonMainSize
		);
		const cannonCylinder = new THREE.Mesh(cannonCylinderGeometry, material);
		cannonCylinder.rotateZ(Math.PI / 2);
		cannonCylinder.add(new THREE.AxesHelper(15));
		this.cannon2.add(cannonCylinder);

		const xTire = this.cannonMainSize[1] / 2;
		const zTire = this.cannonMainSize[1];
		const cannonTire1Geometry = new THREE.TorusGeometry(...this.cannonTireSize);
		const cannonTire1 = new THREE.Mesh(cannonTire1Geometry, this.torusMaterial);
		cannonTire1.position.set(xTire, 0, zTire);
		this.cannon2.add(cannonTire1);

		const cannonTire2Geometry = new THREE.TorusGeometry(...this.cannonTireSize);
		const cannonTire2 = new THREE.Mesh(cannonTire2Geometry, this.torusMaterial);
		cannonTire2.position.set(xTire, 0, -zTire);
		this.cannon2.add(cannonTire2);
		this.cannon2.position.set(x, y, z);

		this.add(this.cannon2);
	}

	createCannon3(material, x, y, z, q1, q2, q3) {
		const cannonCylinderGeometry = new THREE.CylinderGeometry(
			...this.cannonMainSize
		);
		const cannonCylinder = new THREE.Mesh(cannonCylinderGeometry, material);
		cannonCylinder.rotateZ(Math.PI / 2);
		cannonCylinder.add(new THREE.AxesHelper(15));
		this.cannon3.add(cannonCylinder);

		const xTire = this.cannonMainSize[1] / 2;
		const zTire = this.cannonMainSize[1];
		const cannonTire1Geometry = new THREE.TorusGeometry(...this.cannonTireSize);
		const cannonTire1 = new THREE.Mesh(cannonTire1Geometry, this.torusMaterial);
		cannonTire1.position.set(xTire, 0, zTire);
		this.cannon3.add(cannonTire1);

		const cannonTire2Geometry = new THREE.TorusGeometry(...this.cannonTireSize);
		const cannonTire2 = new THREE.Mesh(cannonTire2Geometry, this.torusMaterial);
		cannonTire2.position.set(xTire, 0, -zTire);
		this.cannon3.add(cannonTire2);
		this.cannon3.position.set(x, y, z);

		this.add(this.cannon3);
	}

	createBall(ex, ez, posX, posZ) {
		this.scene.fireCannon(ex, ez, posX, posZ);
	}

	rotateAroundWorldAxis(object, axis, radians) {
		let vecAxis = null;
		if (axis === "x") vecAxis = new THREE.Vector3(1, 0, 0);
		else if (axis === "z") vecAxis = new THREE.Vector3(0, 0, 1);
		else vecAxis = new THREE.Vector3(0, 1, 0);
		const rotWorldMatrix = new THREE.Matrix4();
		rotWorldMatrix.makeRotationAxis(vecAxis.normalize(), radians);
		rotWorldMatrix.multiply(object.matrix);
		object.matrix = rotWorldMatrix;
		object.rotation.setFromRotationMatrix(object.matrix);
	}

	update() {
		if (this.scene.CANNON_ONE) {
			this.cannon1Material.color.setHex(this.SELECTED_COLOR);
			this.cannon2Material.color.setHex(this.UNSELECTED_COLOR);
			this.cannon3Material.color.setHex(this.UNSELECTED_COLOR);
			if (this.scene.activeBall == null || this.scene.OLD_CANNON != 1) {
				this.scene.cameraBall.position.set(-20, 50, -30);
				this.scene.cameraBall.lookAt(this.cannon1.position);
				this.scene.OLD_CANNON = 1;
				console.log("Olha para o canhao 1");
				
			}			
		}
		if (this.scene.CANNON_TWO) {
			this.cannon1Material.color.setHex(this.UNSELECTED_COLOR);
			this.cannon2Material.color.setHex(this.SELECTED_COLOR);
			this.cannon3Material.color.setHex(this.UNSELECTED_COLOR);
			console.log(this.scene.activeBall);
			if (this.scene.activeBall == null || this.scene.OLD_CANNON != 2) {
				this.scene.cameraBall.position.set(-20, 50, 0);
				this.scene.cameraBall.lookAt(this.cannon2.position);
				this.scene.OLD_CANNON = 2;
				console.log("Olha para o canhao 2");
			}
		}
		if (this.scene.CANNON_THREE) {
			this.cannon1Material.color.setHex(this.UNSELECTED_COLOR);
			this.cannon2Material.color.setHex(this.UNSELECTED_COLOR);
			this.cannon3Material.color.setHex(this.SELECTED_COLOR);
			console.log(this.scene.activeBall);
			
			if (this.scene.activeBall == null || this.scene.OLD_CANNON != 3) {
				this.scene.cameraBall.position.set(-20, 50, 30);
				this.scene.cameraBall.lookAt(this.cannon3.position);
				this.scene.OLD_CANNON = 3;
				console.log("Olha para o canhao 3");
			}
		}
		if (this.scene.FIRE_ANGLE_DIRECT) {
			// rmatrix.set(cos, 0, sen, 0, 0, 1, 0, 0, -sen, 0, cos, 0, 0, 0, 0, 1);
			if (this.scene.CANNON_ONE && (this.cannon1.rotation.y > this.MIN_ROTATION)) {
				this.rotateAroundWorldAxis(this.cannon1, "y", -this.rotationStep);
			}
			if (this.scene.CANNON_TWO && (this.cannon2.rotation.y > this.MIN_ROTATION)) {
				this.rotateAroundWorldAxis(this.cannon2, "y", -this.rotationStep);
			}
			if (this.scene.CANNON_THREE && (this.cannon3.rotation.y > this.MIN_ROTATION)) {
				this.rotateAroundWorldAxis(this.cannon3, "y", -this.rotationStep);
			}
			this.scene.FIRE_ANGLE_DIRECT = false;
		}
		if (this.scene.FIRE_ANGLE_INDIRECT) {
			const angle = Math.PI / 10;
			// rmatrix.set(cos, 0, sen, 0, 0, 1, 0, 0, -sen, 0, cos, 0, 0, 0, 0, 1);
			if (this.scene.CANNON_ONE && (this.cannon1.rotation.y < this.MAX_ROTATION)) {
				console.log(this.cannon1.rotation.y);
				this.rotateAroundWorldAxis(this.cannon1, "y", this.rotationStep);
			}
			if (this.scene.CANNON_TWO && (this.cannon2.rotation.y < this.MAX_ROTATION)) {
				this.rotateAroundWorldAxis(this.cannon2, "y", this.rotationStep);
			}
			if (this.scene.CANNON_THREE && (this.cannon3.rotation.y < this.MAX_ROTATION)) {
				this.rotateAroundWorldAxis(this.cannon3, "y", this.rotationStep);
			}
			this.scene.FIRE_ANGLE_INDIRECT = false;
		}

		if (this.scene.FIRE_CANNON) {
			if (this.scene.CANNON_ONE) {
				this.createBall(
					Math.cos(Math.PI - this.cannon1.rotation.y),
					Math.sin(Math.PI - this.cannon1.rotation.y),
					this.cannon1.position.x,
					this.cannon1.position.z
				);
			}
			if (this.scene.CANNON_TWO) {
				this.createBall(
					Math.cos(Math.PI - this.cannon2.rotation.y),
					Math.sin(Math.PI - this.cannon2.rotation.y),
					this.cannon2.position.x,
					this.cannon2.position.z
				);
			}
			if (this.scene.CANNON_THREE) {
				this.createBall(
					Math.cos(Math.PI - this.cannon3.rotation.y),
					Math.sin(Math.PI - this.cannon3.rotation.y),
					this.cannon3.position.x,
					this.cannon3.position.z
				);
			}
		}
		this.scene.FIRE_CANNON = false;
	}
}
