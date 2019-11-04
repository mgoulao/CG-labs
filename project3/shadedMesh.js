import * as THREE from "../node_modules/three/build/three.module.js";

export default class ShadedMesh extends THREE.Mesh {
	constructor(geometry, color) {
		super(geometry, new THREE.MeshBasicMaterial({ color: color }));

		this.currentShading = ShadedMesh.BASIC;

		this.basicMaterial = new THREE.MeshBasicMaterial({
			color: color,
		});
		this.basicMaterial.needsUpdate = true;
		this.lambertMaterial = new THREE.MeshLambertMaterial({
			color: color,
		});
		this.lambertMaterial.needsUpdate = true;
		this.phongMaterial = new THREE.MeshPhongMaterial({
			color: color,
		});
		this.phongMaterial.needsUpdate = true;
	}

	static get GOURAUD() {
		return "gouraud";
	}
	static get PHONG() {
		return "phong";
	}
	static get BASIC() {
		return "basic";
	}

	updateShading(currentShading) {
		this.currentShading = currentShading;
		switch (this.currentShading) {
			case ShadedMesh.GOURAUD:
				this.material = this.lambertMaterial;
				break;
			case ShadedMesh.PHONG:
				this.material = this.phongMaterial;
				break;
			case ShadedMesh.BASIC:
				this.material = this.basicMaterial;
				break;
		}
	}
}
