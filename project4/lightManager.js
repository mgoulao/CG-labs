import * as THREE from "../node_modules/three/build/three.module.js";
export default class LightManager {
	constructor(scene) {
		this.scene = scene;

		this.light = new THREE.DirectionalLight(0xffffff, 1); // soft white light
		this.light.position.set(0, 210, 210);
		this.light.visible = true;
		this.scene.add(this.light);
	}

	update() {}
}
