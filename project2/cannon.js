import * as THREE from "../node_modules/three/build/three.module.js";

export default class Cannon extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;

		this.cannonMainSize = [5, 5, 20, 32];
		this.cannonTireSize = [3, 2, 10, 16]; // Inner Radius [0]-[1]

		this.cannonFINAL = new THREE.Group();

    const wallOffset = 50;
		const groundOffset = this.cannonMainSize[1] / 2;

    this.cannon1Mainposition = [
      wallOffset,
      groundOffset,
      0,
    ];
    this.cannon2Mainposition = [
      wallOffset,
      groundOffset,
      -30,
    ];
    this.cannon3Mainposition = [
      wallOffset,
      groundOffset,
      30,
    ];

		this.material = new THREE.MeshBasicMaterial({
			color: 0xffec7d,
			wireframe: false,
		});

		this.torusMaterial = new THREE.MeshBasicMaterial({
			color: 0x434371,
			wireframe: false,
		});
		this.createCannon(this.cannonFINAL, ...this.cannon1Mainposition);
    this.createCannon(this.cannonFINAL, ...this.cannon2Mainposition);
    this.createCannon(this.cannonFINAL, ...this.cannon3Mainposition);
	}

	createCannon(cannonFINAL, x, y, z) {
		const cannonCylinderGeometry = new THREE.CylinderGeometry(
			...this.cannonMainSize
		);
		const cannonCylinder = new THREE.Mesh(
			cannonCylinderGeometry,
			this.material
		);
		cannonCylinder.position.set(x, y, z);
    cannonCylinder.rotateZ(Math.PI / 2);
		cannonCylinder.add(new THREE.AxesHelper(15));
		cannonFINAL.add(cannonCylinder);

    const xTire = this.cannonMainSize[1] / 2;
    const zTire = this.cannonMainSize[1];
		const cannonTire1Geometry = new THREE.TorusGeometry(...this.cannonTireSize);
		const cannonTire1 = new THREE.Mesh(cannonTire1Geometry, this.torusMaterial);
		cannonTire1.position.set(x + xTire, y, z + zTire);
		cannonFINAL.add(cannonTire1);

    const cannonTire2Geometry = new THREE.TorusGeometry(...this.cannonTireSize);
		const cannonTire2 = new THREE.Mesh(cannonTire2Geometry, this.torusMaterial);
		cannonTire2.position.set(x + xTire, y, z - zTire);
		cannonFINAL.add(cannonTire2);
		this.add(cannonFINAL);
	}

	update() {//alterar a cor em vez do wireframe para os cannons
		if (this.scene.UPDATE_WIREFRAME) {
			this.material.wireframe = !this.material.wireframe;
			this.torusMaterial.wireframe = !this.torusMaterial.wireframe;
		}
	}
}