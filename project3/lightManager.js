import * as THREE from "../node_modules/three/build/three.module.js";

export default class LightManager {
	constructor(scene) {
		this.scene = scene;

		this.light = new THREE.DirectionalLight(0xffffff, 0.5); // soft white light
		//const light = new THREE.AmbientLight( 0xff00ff ); // soft white light
		this.light.position.set(0, 210, 210);
		this.light.visible = false;
		this.scene.add(this.light);
	}

	update() {
		if (this.scene.TOGGLE_LIGHT) {
			this.light.visible = true;
		}
		if (!this.scene.TOGGLE_LIGHT) {
			this.light.visible = false;
		}
	}
}
