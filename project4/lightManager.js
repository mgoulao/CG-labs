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

		this.sphereGeometry = new THREE.SphereBufferGeometry( 1, 16, 8 );
		this.pointLightColor = 0xff00ff;

		this.pointLight = new THREE.PointLight(this.pointLightColor, 1, 100, 3);
		this.pointLight.add( new THREE.Mesh( this.sphereGeometry, new THREE.MeshBasicMaterial( { color:  this.pointLightColor} ) ) );
		this.pointLight.position.set(30, 30, -10);
		this.pointLight.visible = true;
		this.scene.add(this.pointLight);
	}

	update() {
		this.pointLight.visible = this.scene.POINTLIGHT;
	}
}
