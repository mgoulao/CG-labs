import * as THREE from "../node_modules/three/build/three.module.js";
import Dice from "./dice.js"

export default class Ball extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;
		this.acceleration = 0;
		this.rotationVelocity = 5;
		this.orbitVelocity = 3;

		this.rotationPivot = null;
		this.rotationAxes = new THREE.Vector3(0, 0, 0);

		this.ball = null;
		this.axesHelper = new THREE.AxesHelper(20);
		this.texture = new THREE.TextureLoader().load("textures/lenna.png");
		this.texture.wrapS = THREE.SphericalReflectionMapping;
		this.texture.wrapT = THREE.SphericalReflectionMapping;
		this.material = new THREE.MeshPhongMaterial({
			color:     0xffffff, 
			specular:  0xffffff,
			shininess: 100,
			map:       this.texture });
		this.createElements();
	}

	createElements() {
		const geometry = new THREE.SphereGeometry(10, 32, 32);
		this.ball = new THREE.Mesh(geometry, this.material);
		this.ball.position.set(40, 10, 0);
		this.ball.add(this.axesHelper);
		this.rotationPivot = new THREE.Object3D();
		this.rotationPivot.add(this.ball);
		this.add(this.rotationPivot);
	}
	update() {
		this.ball.rotation.y += this.rotationVelocity/100;
		this.rotationPivot.rotation.y += this.orbitVelocity/100;
		//this.ball.rotateOnAxis(this.rotationAxes, Math.PI/8);
	}
}
