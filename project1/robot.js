import * as THREE from "three/build/three.module";

export default class Robot extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;

		this.baseGroup = new THREE.Group();
		this.completeArmGroup = new THREE.Group();
		this.armGroup = new THREE.Group();
		this.topArmGroup = new THREE.Group();

		this.speed = 0.2;
		this.angularStep = 0.01;

		this.theta1 = 0;
		this.theta2 = 0;
		this.theta3 = 0;
		this.theta2Max = Math.PI / 4;
		this.theta2Min = -Math.PI / 4;

		// Base

		this.baseRect = null;

		this.wheelsSize = [2, 10, 10]; // r, w, h
		this.baseSize = [20, 2, 20]; // w, h, d
		this.basePos = [
			this.position.x,
			this.position.y + 2 * this.wheelsSize[0],
			this.position.z,
		];

		const wheelOffset = this.baseSize[0] / 2;
		const wheelPadding = 3;
		this.wheel1Top = [
			this.position.x + wheelPadding - wheelOffset,
			this.position.y + this.wheelsSize[0],
			this.position.z + wheelPadding - wheelOffset,
		];
		this.wheel2Top = [
			this.position.x + wheelPadding - wheelOffset,
			this.position.y + this.wheelsSize[0],
			this.baseSize[2] - wheelPadding - wheelOffset,
		];
		this.wheel3Top = [
			this.baseSize[0] - wheelPadding - wheelOffset,
			this.position.y + this.wheelsSize[0],
			this.position.z + wheelPadding - wheelOffset,
		];
		this.wheel4Top = [
			this.baseSize[0] - wheelPadding - wheelOffset,
			this.position.y + this.wheelsSize[0],
			this.baseSize[2] - wheelPadding - wheelOffset,
		];

		// Arm

		this.baseArticulation = null;
		this.lowArm = null;
		this.armArticulation = null;
		this.topArm = null;

		this.baseArticulationSize = [4, 10, 10]; // r, w, h
		this.lowArmSize = [3, 15, 3];
		this.armArticulationSize = [2, 10, 10];
		this.topArmSize = [12, 3, 3];

		this.baseArticulationPos = [
			this.position.x,
			this.basePos[1] + this.baseSize[1] / 2,
			this.position.z,
		];
		this.lowArmPos = [this.basePos[0], this.lowArmSize[1] / 2, this.basePos[2]];
		this.armArticulationPos = [
			this.lowArmPos[0],
			this.lowArmPos[1] + this.lowArmSize[1] / 2,
			this.lowArmPos[2],
		];
		this.topArmGroupPos = this.armArticulationPos;
		this.topArmPos = [
			this.armArticulationPos[0] + this.topArmSize[0] / 2,
			0,
			this.armArticulationPos[2],
		];

		// Hand

		this.handSphere = null;
		this.handCylinder = null;

		this.handSphereSize = this.armArticulationSize;
		this.handCylinderSize = [3.5, 3.5, 1, 20, 1];
		this.fingerSize = [3, 1, 1];

		this.handSpherePos = [this.topArmPos[0] + this.topArmSize[0] / 2, 0, 0];
		this.handCylinderPos = [
			this.handSpherePos[0] +
				this.handSphereSize[0] +
				this.handCylinderSize[2] / 2,
			0,
			0,
		];
		this.topFingerPos = [
			this.handCylinderPos[0] +
				this.handCylinderSize[2] / 2 +
				this.fingerSize[0] / 2,
			-2,
			0,
		];
		this.botFingerPos = [
			this.handCylinderPos[0] +
				this.handCylinderSize[2] / 2 +
				this.fingerSize[0] / 2,
			2,
			0,
		];

		// Materials

		this.material = new THREE.MeshBasicMaterial({
			color: 0xb5f44a,
			wireframe: true,
		});
		this.wheelsMaterial = new THREE.MeshBasicMaterial({
			color: 0x70ee9c,
			wireframe: true,
		});
		this.articulationsMaterial = new THREE.MeshBasicMaterial({
			color: 0x79aea3,
			wireframe: true,
		});
		this.handBaseMaterial = new THREE.MeshBasicMaterial({
			color: 0x484041,
			wireframe: true,
		});
		this.fingersMaterial = new THREE.MeshBasicMaterial({
			color: 0x665a5c,
			wireframe: true,
		});

		this.createRobot();
	}

	createRobot() {
		this.createBase();
		this.createArm();
	}

	createArm() {
		this.armGroup.position.set(...this.baseArticulationPos);
		this.createBaseArticulation();
		this.createLowArm();
		this.createArmArticulation();
		this.createTopArm();
		this.completeArmGroup.add(this.armGroup);
		this.showHelpers();
		this.add(this.completeArmGroup);
	}

	showHelpers() {
		const armAxes = new THREE.AxesHelper(5);
		const completeArmAxes = new THREE.AxesHelper(5);
		const topArmAxes = new THREE.AxesHelper(5);
		this.armGroup.add(armAxes);
		this.completeArmGroup.add(completeArmAxes);
		this.topArmGroup.add(topArmAxes);
	}

	createBaseArticulation() {
		const geometry = new THREE.SphereGeometry(
			...this.baseArticulationSize,
			0,
			2 * Math.PI,
			0,
			Math.PI / 2
		);
		this.baseArticulation = new THREE.Mesh(
			geometry,
			this.articulationsMaterial
		);
		this.baseArticulation.position.set(...this.baseArticulationPos);
		this.completeArmGroup.add(this.baseArticulation);
	}

	createLowArm() {
		const geometry = new THREE.CubeGeometry(...this.lowArmSize);
		this.lowArm = new THREE.Mesh(geometry, this.material);
		this.lowArm.position.set(...this.lowArmPos);
		this.armGroup.add(this.lowArm);
	}

	createArmArticulation() {
		const geometry = new THREE.SphereGeometry(...this.armArticulationSize);
		this.armArticulation = new THREE.Mesh(geometry, this.articulationsMaterial);
		this.armArticulation.position.set(...this.armArticulationPos);
		this.armGroup.add(this.armArticulation);
	}

	createTopArm() {
		this.topArmGroup.position.set(...this.topArmGroupPos);
		const geometry = new THREE.CubeGeometry(...this.topArmSize);
		this.topArm = new THREE.Mesh(geometry, this.material);
		this.topArm.position.set(...this.topArmPos);
		this.topArmGroup.add(this.topArm);

		this.createHand();

		this.armGroup.add(this.topArmGroup);
	}

	createHand() {
		const handSphereGeommetry = new THREE.SphereGeometry(
			...this.handSphereSize
		);
		this.handSphere = new THREE.Mesh(
			handSphereGeommetry,
			this.articulationsMaterial
		);
		this.handSphere.position.set(...this.handSpherePos);
		this.topArmGroup.add(this.handSphere);

		const handCylinderGeommetry = new THREE.CylinderGeometry(
			...this.handCylinderSize
		);
		this.handCylinder = new THREE.Mesh(
			handCylinderGeommetry,
			this.handBaseMaterial
		);
		this.handCylinder.position.set(...this.handCylinderPos);
		this.handCylinder.rotateZ(Math.PI / 2);
		this.topArmGroup.add(this.handCylinder);

		this.createHandFinger(this.topFingerPos);
		this.createHandFinger(this.botFingerPos);
	}

	createHandFinger(pos) {
		const geometry = new THREE.CubeGeometry(...this.fingerSize);
		const finger = new THREE.Mesh(geometry, this.fingersMaterial);
		finger.position.set(...pos);
		this.topArmGroup.add(finger);
	}

	createBase() {
		this.createBaseRect();
		this.createWheel(...this.wheel1Top);
		this.createWheel(...this.wheel2Top);
		this.createWheel(...this.wheel3Top);
		this.createWheel(...this.wheel4Top);
		this.add(this.baseGroup);
	}

	createBaseRect() {
		const geometry = new THREE.CubeGeometry(...this.baseSize);
		this.baseRect = new THREE.Mesh(geometry, this.material);
		this.baseRect.position.set(...this.basePos);
		this.baseGroup.add(this.baseRect);
	}

	createWheel(x, y, z) {
		const ball = new THREE.Object3D();
		const geometry = new THREE.SphereGeometry(...this.wheelsSize);
		const mesh = new THREE.Mesh(geometry, this.wheelsMaterial);

		ball.add(mesh);
		ball.position.set(x, y, z);

		this.baseGroup.add(ball);
	}

	rotateTheta1(angle) {
		this.theta1 += angle;
		this.completeArmGroup.rotateY(angle);
	}

	rotateTheta2(angle) {
		const newAngle = this.theta2 + angle;
		if (newAngle < this.theta2Max && newAngle > this.theta2Min) {
			this.theta2 = newAngle;
			this.armGroup.rotation.z = newAngle;
		}
	}

	rotateTheta3(angle) {}

	translateRobot(x, y, z) {
		this.translateOnAxis(new THREE.Vector3(x, y, z), this.speed);
	}

	update() {
		// Robot Translations
		const moveVector = [0, 0, 0];
		if (this.scene.UP_DOWN) moveVector[2]--;
		if (this.scene.DOWN_DOWN) moveVector[2]++;
		if (this.scene.LEFT_DOWN) moveVector[0]--;
		if (this.scene.RIGHT_DOWN) moveVector[0]++;
		this.translateRobot(...moveVector);

		// Arm rotations
		if (this.scene.THETA1_DIRECT) this.rotateTheta1(this.angularStep);
		if (this.scene.THETA1_INDIRECT) this.rotateTheta1(-this.angularStep);
		if (this.scene.THETA2_DIRECT) this.rotateTheta2(this.angularStep);
		if (this.scene.THETA2_INDIRECT) this.rotateTheta2(-this.angularStep);
		if (this.scene.THETA3_DIRECT) this.rotateTheta3(this.angularStep);
		if (this.scene.THETA3_INDIRECT) this.rotateTheta3(-this.angularStep);

		// Update Wireframe
		if (this.scene.UPDATE_WIREFRAME) {
			this.material.wireframe = !this.material.wireframe;
			this.wheelsMaterial.wireframe = !this.wheelsMaterial.wireframe;
			this.articulationsMaterial.wireframe = !this.articulationsMaterial
				.wireframe;
			this.handBaseMaterial.wireframe = !this.handBaseMaterial.wireframe;
			this.fingersMaterial.wireframe = !this.fingersMaterial.wireframe;
		}
	}
}
