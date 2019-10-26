import * as THREE from "../node_modules/three/build/three.module.js";

export default class LightManager {
	constructor(scene) {
		this.scene = scene;


		const light = new THREE.AmbientLight(0xffffff); // soft white light
		this, scene.add(light);
	}

	update() {}
}
