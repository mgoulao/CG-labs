import * as THREE from "../node_modules/three/build/three.module.js";
export default class LightManager {
	constructor(scene) {
		this.scene = scene;

		this.acceleration = 0.01;
		this.initialVelocity = 0.05;
		this.maxROTATIONVelocity = 4;
		this.currentROTATIONVelocity = 0;

		this.ambientLight = new THREE.DirectionalLight(0xffffff, 1); // soft white ambientLight
		this.ambientLight.position.set(0, 50, 10);
		this.ambientLight.visible = true;
		this.scene.add(this.ambientLight);

		this.sphereGeometry = new THREE.SphereBufferGeometry(1, 16, 8);
		this.pointLightColorR = 0xff0000;
		this.pointLightColorG = 0x00ff00;
		this.pointLightColorB = 0x0000ff;

		this.pointLightR = new THREE.PointLight(this.pointLightColorR, 1, 200, 3);
		this.pointLightR.add(
			new THREE.Mesh(
				this.sphereGeometry,
				new THREE.MeshBasicMaterial({ color: this.pointLightColorR })
			)
		);
		this.pointLightR.position.set(0, 60, 0);
		this.pointLightR.visible = true;
		this.rotationPivotR = new THREE.Object3D();
		this.rotationPivotR.add(this.pointLightR);
		this.scene.add(this.rotationPivotR);

		this.pointLightG = new THREE.PointLight(this.pointLightColorG, 1, 200, 3);
		this.pointLightG.add(
			new THREE.Mesh(
				this.sphereGeometry,
				new THREE.MeshBasicMaterial({ color: this.pointLightColorG })
			)
		);
		this.pointLightG.position.set(30, 10, 0);
		this.pointLightG.visible = true;
		this.rotationPivotG = new THREE.Object3D();
		this.rotationPivotG.add(this.pointLightG);
		this.scene.add(this.rotationPivotG);

		this.pointLightB = new THREE.PointLight(this.pointLightColorB, 1, 200, 3);
		this.pointLightB.add(
			new THREE.Mesh(
				this.sphereGeometry,
				new THREE.MeshBasicMaterial({ color: this.pointLightColorB })
			)
		);
		this.pointLightB.position.set(0, 60, 0);
		this.pointLightB.visible = true;
		this.rotationPivotB = new THREE.Object3D();
		this.rotationPivotB.add(this.pointLightB);
		this.scene.add(this.rotationPivotB);


	}

	animations() {
		if (this.scene.IN_MOTION) {
			if (this.currentROTATIONVelocity == 0) {
				this.currentROTATIONVelocity = this.initialVelocity;
			}
			if (this.currentROTATIONVelocity < this.maxROTATIONVelocity) {
				this.currentROTATIONVelocity +=
					this.currentROTATIONVelocity * this.acceleration;
				if (this.currentROTATIONVelocity >= this.maxROTATIONVelocity) {
					this.currentROTATIONVelocity = this.maxROTATIONVelocity;
				}
				console.log(this.currentROTATIONVelocity);
			}
		} else {
			if (this.currentROTATIONVelocity > 0) {
				this.currentROTATIONVelocity -=
					this.currentROTATIONVelocity * this.acceleration;
				if (this.currentROTATIONVelocity < this.initialVelocity) {
					this.currentROTATIONVelocity = 0;
				}
				console.log(this.currentROTATIONVelocity);
			}
		}
		this.rotationPivotR.rotation.x -= this.currentROTATIONVelocity / 100;
		this.rotationPivotG.rotation.y -= this.currentROTATIONVelocity / 100;
		this.rotationPivotB.rotation.z -= this.currentROTATIONVelocity / 100;
		//this.ball.rotateOnAxis(this.rotationAxes, Math.PI/8);
	}
	reset() {}

	update() {
		if (!this.scene.STOP_ANIMATIONS) this.animations();
		this.pointLightR.visible = this.scene.POINTLIGHT;
		this.pointLightG.visible = this.scene.POINTLIGHT;
		this.pointLightB.visible = this.scene.POINTLIGHT;
		this.ambientLight.visible = this.scene.AMBIENT_LIGHT;
	}
}
