import * as THREE from "../node_modules/three/build/three.module.js";

export default class LightManager {
	constructor(scene) {
		this.scene = scene;

		const light = new THREE.DirectionalLight(0xff0000, 1); // soft white light
		light.position.set(0,1,0);
	}

	update() {}
}
