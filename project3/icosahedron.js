import * as THREE from "../node_modules/three/build/three.module.js";

export default class Icosahedron extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;

		this.GOURAUD = "gouraud";
		this.PHONG = "phong";
		this.BASIC = "basic";

		this.currentShading = this.BASIC;

		this.stand = new THREE.Group();

		// Stand

		this.baseSize = [20, 6, 20];
		this.topSize = [30, 8, 30];
		this.standCylinderSize = [5, 5, 40, 10];
		this.standCylinder2Size = [8, 8, 10, 10];

		this.basePos = [0, this.baseSize[1] / 2, 0];
		this.standCylinderPos = [
			0,
			this.baseSize[1] + this.standCylinderSize[2] / 2,
			0,
		];
		this.standCylinder2Pos = [
			0,
			this.baseSize[1] + this.standCylinder2Size[2] / 2,
			0,
		];
		this.topPos = [
			0,
			this.baseSize[1] + this.standCylinderSize[2] + this.topSize[1] / 2,
			0,
		];

		// Materials

		this.standBasicMaterial = new THREE.MeshBasicMaterial({
			color: 0xffffff,
		});
		this.standLambertMaterial = new THREE.MeshLambertMaterial({
			color: 0xffffff,
		});
		this.standPhongMaterial = new THREE.MeshPhongMaterial({
			color: 0xffffff,
		});

		this.createElements();
	}

	createStand() {
		const baseGeometry = new THREE.BoxGeometry(...this.baseSize);
		const base = new THREE.Mesh(baseGeometry, this.standBasicMaterial);
		base.position.set(...this.basePos);
		this.stand.add(base);

		const topGeometry = new THREE.BoxGeometry(...this.topSize);
		const top = new THREE.Mesh(topGeometry, this.standBasicMaterial);
		top.position.set(...this.topPos);
		this.stand.add(top);

		const standCylinderGeometry = new THREE.CylinderGeometry(
			...this.standCylinderSize
		);
		const standCylinder = new THREE.Mesh(
			standCylinderGeometry,
			this.standBasicMaterial
		);
		standCylinder.position.set(...this.standCylinderPos);
		this.stand.add(standCylinder);

		const standCylinder2Geometry = new THREE.CylinderGeometry(
			...this.standCylinder2Size
		);
		const standCylinder2 = new THREE.Mesh(
			standCylinder2Geometry,
			this.standBasicMaterial
		);
		standCylinder2.position.set(...this.standCylinder2Pos);
		this.stand.add(standCylinder2);

		this.add(this.stand);
	}

	createElements() {
		this.createStand();

		this.position.set(100, 0, 100);
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
