import * as THREE from "../node_modules/three/build/three.module.js";
import ShadedMesh from "./shadedMesh.js";

export default class Spotlight extends THREE.Group {
	constructor(scene, pos, color, rotations) {
		super();
		this.scene = scene;

		this.coneWidth = 12;
		this.coneHeight = 10;
		this.coneDepth = 32;

		this.coneColor = 0x4c4c4c;

		this.sphereWidth = 7;
		this.sphereHeight = 32;
		this.sphereDepth = 32;

		this.pos = pos;
		this.color = color;
		this.rotations = rotations;

		const sphereGeometry = new THREE.SphereGeometry(
			this.sphereWidth,
			this.sphereHeight,
			this.sphereDepth
		);

		this.sphereLight = new ShadedMesh(sphereGeometry, this.color);
		this.add(this.sphereLight);

		const coneGeometry = new THREE.ConeGeometry(
			this.coneWidth,
			this.coneHeight,
			this.coneDepth
		);

		this.targetObject = new THREE.Object3D();
		this.targetObject.position.set(0, -1, 0);
		this.add(this.targetObject);

		// LIGHT
		this.coneLight = new ShadedMesh(coneGeometry, this.coneColor);
		this.coneLight.translateY(6);
		this.add(this.coneLight);

		this.spotLight = new THREE.SpotLight(this.color);
		this.spotLight.penumbra = 0.2;
		this.spotLight.decay = 1.5;
		this.spotLight.distance = 10000;

		this.spotLight.angle = Math.PI / 5;
		this.spotLight.visible = false;
		this.spotLight.target = this.targetObject;
		this.add(this.spotLight);

		this.position.set(...this.pos);
		this.rotateX(this.rotations[0]);
		this.rotateY(this.rotations[1]);
		this.rotateZ(this.rotations[2]);
	}

	updateShading(currentShading) {
		this.coneLight.updateShading(currentShading);
	}
}
