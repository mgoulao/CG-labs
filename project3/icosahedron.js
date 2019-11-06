import * as THREE from "../node_modules/three/build/three.module.js";
import ShadedMesh from "./shadedMesh.js";

export default class Icosahedron extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;

		this.stand = new THREE.Group();

		// GEOMETRY
		this.icosahedron = new THREE.Geometry();

		this.icosahedronMesh = null;

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

		this.standColor = 0xffffff;
		this.icosahedronColor = 0x00ffff;

		this.createElements();
	}

	createStand() {
		const baseGeometry = new THREE.BoxGeometry(
			...this.baseSize,
			...this.baseSize
		);
		this.base = new ShadedMesh(baseGeometry, this.standColor);
		this.base.position.set(...this.basePos);
		this.stand.add(this.base);

		const topGeometry = new THREE.BoxGeometry(...this.topSize, ...this.topSize);
		this.top = new ShadedMesh(topGeometry, this.standColor);
		this.top.position.set(...this.topPos);
		this.stand.add(this.top);

		const standCylinderGeometry = new THREE.CylinderGeometry(
			...this.standCylinderSize
		);
		this.standCylinder = new ShadedMesh(standCylinderGeometry, this.standColor);
		this.standCylinder.position.set(...this.standCylinderPos);
		this.stand.add(this.standCylinder);

		const standCylinder2Geometry = new THREE.CylinderGeometry(
			...this.standCylinder2Size
		);
		this.standCylinder2 = new ShadedMesh(
			standCylinder2Geometry,
			this.standColor
		);
		this.standCylinder2.position.set(...this.standCylinder2Pos);
		this.stand.add(this.standCylinder2);

		this.add(this.stand);
	}

	createElements() {
		this.createStand();

		this.position.set(100, 0, 100);

		// Golden Number
		this.goldenNMB = 1.618033988749895;

		// create an array of vertices by way of
		// and array of vector3 instances
		this.icosahedron.vertices.push(
			new THREE.Vector3(-1, this.goldenNMB, 0.5), // 0
			new THREE.Vector3(1, this.goldenNMB, 0.5), // 1
			new THREE.Vector3(-1, -this.goldenNMB, 0.5), // 2
			new THREE.Vector3(1, -this.goldenNMB, 0.5), // 3

			new THREE.Vector3(0, 1, this.goldenNMB), // 5
			new THREE.Vector3(0.5, -1, this.goldenNMB), // 4
			new THREE.Vector3(0, -1, -this.goldenNMB), // 6
			new THREE.Vector3(0, 1, -this.goldenNMB), // 7

			new THREE.Vector3(this.goldenNMB, 0, -1), // 8
			new THREE.Vector3(this.goldenNMB, 0, 1), // 9
			new THREE.Vector3(-this.goldenNMB, 0, -1), // 10
			new THREE.Vector3(-this.goldenNMB, 0, 1) // 11
		);

		// create faces by way of an array of
		// face3 instances
		this.icosahedron.faces.push(
			new THREE.Face3(0, 11, 5),
			new THREE.Face3(0, 5, 1),
			new THREE.Face3(0, 1, 7),
			new THREE.Face3(0, 7, 10),
			new THREE.Face3(0, 10, 11),

			new THREE.Face3(1, 5, 9),
			new THREE.Face3(5, 11, 4),
			new THREE.Face3(11, 10, 2),
			new THREE.Face3(10, 7, 6),
			new THREE.Face3(7, 1, 8),

			new THREE.Face3(3, 9, 4),
			new THREE.Face3(3, 4, 2),
			new THREE.Face3(3, 2, 6),
			new THREE.Face3(3, 6, 8),
			new THREE.Face3(3, 8, 9),

			new THREE.Face3(4, 9, 5),
			new THREE.Face3(2, 4, 11),
			new THREE.Face3(6, 2, 10),
			new THREE.Face3(8, 6, 7),
			new THREE.Face3(9, 8, 1)
		);

		// compute Normals
		this.icosahedron.computeVertexNormals();

		// normalize the geometry
		this.icosahedron.normalize();

		this.icosahedron.scale(10, 10, 10);

		// MESH with GEOMETRY, and Normal MATERIAL
		this.icosahedronMesh = new ShadedMesh(
			this.icosahedron,
			this.icosahedronColor
		);
		this.icosahedronMesh.position.set(0, 63, 0);
		this.add(this.icosahedronMesh);
	}

	updateStandShading() {
		this.base.updateShading(this.scene.currentShading);
		this.top.updateShading(this.scene.currentShading);
		this.standCylinder.updateShading(this.scene.currentShading);
		this.standCylinder2.updateShading(this.scene.currentShading);
	}

	updateShading() {
		this.updateStandShading();
		this.icosahedronMesh.updateShading(this.scene.currentShading);
	}

	update() {}
}
