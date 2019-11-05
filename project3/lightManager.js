import * as THREE from "../node_modules/three/build/three.module.js";
import ShadedMesh from "./shadedMesh.js";
import Spotlight from "./spotlight.js";
export default class LightManager {
	constructor(scene) {
		this.scene = scene;

		this.light = new THREE.DirectionalLight(0xffffff, 0.9); // soft white light
		this.light.position.set(0, 210, 210);
		this.light.visible = false;
		this.scene.add(this.light);

		this.spotlightPos1 = [85, 100, 50];
		this.spotlightPos2 = [115, 100, 150];
		this.spotlightPos3 = [-50, 100, 20];
		this.spotlightPos4 = [-150, 100, 20];

		this.width1 = 5;
		this.height1 = 20;
		this.depth1 = 32;

		this.width2 = 5;
		this.height2 = 32;
		this.depth2 = 32;

		this.coneColor = 0x000000;
		this.sphereColor1 = 0xf5ff93;
		this.sphereColor2 = 0xf5ff93;
		this.sphereColor3 = 0xf5ff93;
		this.sphereColor4 = 0xf5ff93;

		this.rotation1 = [-Math.PI / 8, 0, 0];
		this.rotation2 = [Math.PI / 8, 0, 0];
		this.rotation3 = [Math.PI / 8, 0, -Math.PI / 12];
		this.rotation4 = [Math.PI / 8, 0, Math.PI / 12];

		this.createSpotlight();
	}

	createSpotlight() {
		this.spotLight1 = new Spotlight(
			this.scene,
			this.spotlightPos1,
			this.sphereColor1,
			this.rotation1
		);
		this.scene.add(this.spotLight1);
		this.spotLight2 = new Spotlight(
			this.scene,
			this.spotlightPos2,
			this.sphereColor2,
			this.rotation2
		);
		this.scene.add(this.spotLight2);
		this.spotLight3 = new Spotlight(
			this.scene,
			this.spotlightPos3,
			this.sphereColor3,
			this.rotation3
		);
		this.scene.add(this.spotLight3);
		this.spotLight4 = new Spotlight(
			this.scene,
			this.spotlightPos4,
			this.sphereColor4,
			this.rotation4
		);
		this.scene.add(this.spotLight4);
	}

	updateLightsShading() {
		this.spotLight1.updateShading(this.scene.currentShading);
		this.spotLight2.updateShading(this.scene.currentShading);
		this.spotLight3.updateShading(this.scene.currentShading);
		this.spotLight4.updateShading(this.scene.currentShading);
	}

	update() {
		this.light.visible = this.scene.TOGGLE_LIGHT;
		this.spotLight1.spotLight.visible = this.scene.TOGGLE_LIGHT1;
		this.spotLight2.spotLight.visible = this.scene.TOGGLE_LIGHT2;
		this.spotLight3.spotLight.visible = this.scene.TOGGLE_LIGHT3;
		this.spotLight4.spotLight.visible = this.scene.TOGGLE_LIGHT4;
	}
}
