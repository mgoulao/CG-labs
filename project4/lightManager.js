import * as THREE from "../node_modules/three/build/three.module.js";
export default class LightManager {
	constructor(scene) {
		this.scene = scene;

		// soft white ambientLight
		this.ambientLight = new THREE.DirectionalLight(0xffffff, 1);
		this.ambientLight.position.set(0, 50, 10);
		this.ambientLight.visible = true;
		this.scene.add(this.ambientLight);

		this.pointLightColor = 0xff00ff;

		this.pointLight = new THREE.PointLight(this.pointLightColor, 1, 200, 3);
		this.pointLight.position.set(30, 30, -10);
		this.pointLight.visible = true;
		this.scene.add(this.pointLight);
	}

	reset() {}

	update() {
		this.pointLight.visible = this.scene.POINTLIGHT;
		this.ambientLight.visible = this.scene.AMBIENT_LIGHT;
	}
}
