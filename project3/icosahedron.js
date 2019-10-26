import * as THREE from "../node_modules/three/build/three.module.js";

export default class Icosahedron extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;


		this.GOURAUD = "gouraud";
		this.PHONG = "phong";
		this.BASIC = "basic";

		this.currentShading = this.BASIC;
	}

	update() {
		if (!this.scene.LIGHT_CALC) {
			if (this.currentShading !== this.BASIC) {
				this.currentShading = this.BASIC;
				// this.toggleBallsMaterials();
				// this.toggleSquaresMaterials();
				// this.toggleBackgroundMaterial();
			}
		} else {
			if (this.currentShading === this.BASIC) {
				this.currentShading = this.PHONG;
				this.scene.TOGGLE_SHADING = true;
			}
			if (this.scene.TOGGLE_SHADING) {
				// this.toggleBallsMaterials();
				// this.toggleSquaresMaterials();
				// this.toggleBackgroundMaterial();
				if (this.currentShading === this.GOURAUD) {
					this.currentShading = this.PHONG;
				} else if (this.currentShading === this.PHONG) {
					this.currentShading = this.GOURAUD;
				}
			}
		}
	}
}
