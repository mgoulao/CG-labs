import * as THREE from "../node_modules/three/build/three.module.js";
export default class LightManager {
	constructor(scene) {
		this.scene = scene;

		this.light = new THREE.DirectionalLight(0xffffff, 1); // soft white light
		this.light.position.set(0, 50, 10);
		this.light.visible = true;
		this.scene.add(this.light);

		this.backLight = new THREE.DirectionalLight(0xffffff, 1); // soft white light
		this.backLight.position.set(-10, -50, -200);
		this.backLight.visible = true;
		this.scene.add(this.backLight);
	}

	update() {}
}
