import * as THREE from "../node_modules/three/build/three.module.js";

export default class Ball extends THREE.Object3D {
	constructor(scene, eX, eZ, posX, posZ, velocity) {
		super();
		this.scene = scene;
		this.acceleration = -5;
		this.launchVelocity = velocity;

		this.startVelocityX = this.launchVelocity * eX;
		this.startVelocityZ = this.launchVelocity * eZ;
		this.startTime = 0;
		this.rotationTime = 0;
		this.ball = new THREE.Object3D();

		this.ballSize = [3, 20, 20];

		this.startPosition = [posX, this.ballSize[0], posZ];

		this.axesHelper = new THREE.AxesHelper(5);
		this.axesHelper.visible = false;
		this.material = new THREE.MeshBasicMaterial({ color: 0xffff00 });

		this.createObject();
	}

	createObject() {
		const geometry = new THREE.SphereGeometry(...this.ballSize);
		const sphere = new THREE.Mesh(geometry, this.material);
		this.add(sphere);
		this.position.set(...this.startPosition);

		this.add(this.axesHelper);
	}

	getRadius() {
		return this.ballSize[0];
	}

	updateValuesAfterCollision(pos, vel) {
		this.startTime = Date.now();
		this.rotationTime = 0;
		this.position.x = pos[0];
		this.position.z = pos[2];
		this.startPosition = [this.position.x, this.position.y, this.position.z];
		this.startVelocityX = vel[0];
		this.startVelocityZ = vel[2];
	}

	getFriction(vel, delta) {
		if (vel === 0) return 0;
		return (1 / 2) * this.acceleration * delta ** 2;
	}

	getCurrentVelocity() {
		const delta = (Date.now() - this.startTime) / 1000;
		return [
			this.getCurrentVelocityOnAxis("x", delta),
			0,
			this.getCurrentVelocityOnAxis("z", delta),
		];
	}

	getCurrentVelocityOnAxis(axis, delta) {
		const vel = axis === "x" ? this.startVelocityX : this.startVelocityZ;
		const currVel = vel + Math.sign(vel) * this.acceleration * delta;
		return vel * currVel < 0 ? 0 : currVel;
	}

	rotateAroundWorldAxis(axis, radians) {
		let vecAxis = null;
		if (axis === "x") vecAxis = new THREE.Vector3(1, 0, 0);
		else if (axis === "z") vecAxis = new THREE.Vector3(0, 0, 1);
		const rotWorldMatrix = new THREE.Matrix4();
		rotWorldMatrix.makeRotationAxis(vecAxis.normalize(), radians);
		rotWorldMatrix.multiply(this.matrix);
		this.matrix = rotWorldMatrix;
		this.rotation.setFromRotationMatrix(this.matrix);
	}

	updatePosition(delta) {
		const frictionX = this.getFriction(this.startVelocityX, delta);
		const frictionZ = this.getFriction(this.startVelocityZ, delta);

		const newX =
			this.startPosition[0] +
			this.startVelocityX * delta +
			Math.sign(this.startVelocityX) * frictionX;
		const newZ =
			this.startPosition[2] +
			this.startVelocityZ * delta +
			Math.sign(this.startVelocityZ) * frictionZ;

		if (this.getCurrentVelocityOnAxis("x", delta) === 0) {
			this.startVelocityX = 0;
			this.startPosition[0] = newX;
		}
		if (this.getCurrentVelocityOnAxis("z", delta) === 0) {
			this.startVelocityZ = 0;
			this.startPosition[2] = newZ;
		}

		this.position.set(newX, this.position.y, newZ);
	}

	updateRotation(delta) {
		if (this.rotationTime === 0) this.rotationTime = Date.now();
		const deltaRotation = (Date.now() - this.rotationTime) / 1000;
		const angularSpeedX =
			this.getCurrentVelocityOnAxis("x", delta) / this.ballSize[0];
		const angularSpeedZ =
			this.getCurrentVelocityOnAxis("z", delta) / this.ballSize[0];

		this.rotateAroundWorldAxis("x", angularSpeedZ * deltaRotation);
		this.rotateAroundWorldAxis("z", -angularSpeedX * deltaRotation);
		this.rotationTime = Date.now();
	}

	update() {
		if (!this.startTime) this.startTime = Date.now();
		const delta = (Date.now() - this.startTime) / 1000;
		this.updatePosition(delta);
		this.updateRotation(delta);

		if (this.scene.TOGGLE_AXES)
			this.axesHelper.visible = !this.axesHelper.visible;
	}
}
