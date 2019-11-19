import * as THREE from "../node_modules/three/build/three.module.js";
import Dice from "./dice.js";

export default class Ball extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;
		this.acceleration = 0.01;
		this.initialVelocity = 0.05;
		this.maxROTATIONVelocity = 4;
		this.currentROTATIONVelocity = 0;

		this.rotationPivot = null;

		this.ball = null;
		//this.axesHelper = new THREE.AxesHelper(20);
		this.texture = new THREE.TextureLoader().load("textures/lenna.png");
		this.texture.wrapS = THREE.SphericalReflectionMapping;
		this.texture.wrapT = THREE.SphericalReflectionMapping;
		this.texture.repeat.set(2, 2); //dispensavel, mas fica mais preceptivel
		this.standardMaterial = new THREE.MeshPhongMaterial({
			color: 0xffffff,
			specular: 0xffffff,
			shininess: 100,
			map: this.texture,
			wireframe: false,
		});

		this.basicMaterial = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			specular: 0xffffff,
			shininess: 100,
			map: this.texture,
			wireframe: false,
		});
		this.currentMaterial = this.standardMaterial;
		this.createElements();
	}

	createElements() {
		const geometry = new THREE.SphereGeometry(10, 32, 32);
		this.ball = new THREE.Mesh(geometry, this.currentMaterial);
		this.ball.position.set(-40, 10, 0);
		this.rotationPivot = new THREE.Object3D();
		this.rotationPivot.add(this.ball);
		this.add(this.rotationPivot);
	}

	reset() {
		this.currentROTATIONVelocity = 0;
		this.ball.rotation.y = 0;
		this.rotationPivot.rotation.y = 0;
	}

	toggleLightCalc() {
		if (this.currentMaterial === this.basicMaterial) {
			this.currentMaterial = this.standardMaterial;
		} else {
			this.currentMaterial = this.basicMaterial;
		}
		this.ball.material = this.currentMaterial;
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
		this.ball.rotation.y += this.currentROTATIONVelocity / 100;
		this.rotationPivot.rotation.y += this.currentROTATIONVelocity / 100;
		//this.ball.rotateOnAxis(this.rotationAxes, Math.PI/8);
	}

	update() {
		if (!this.scene.STOP_ANIMATIONS) this.animations();
		if (this.scene.UPDATE_WIREFRAME) {
			this.basicMaterial.wireframe = !this.basicMaterial.wireframe;
			this.standardMaterial.wireframe = !this.standardMaterial.wireframe;
		}
	}
}
