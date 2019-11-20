import * as THREE from "../node_modules/three/build/three.module.js";

export default class Dice extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;

		this.rotSpeed = 2 / 100;
		this.rotationPivot = null;

		const textureLoader = new THREE.TextureLoader();

		const texture0 = textureLoader.load("textures/dice1.png");
		const texture1 = textureLoader.load("textures/dice2.png");
		const texture2 = textureLoader.load("textures/dice3.png");
		const texture3 = textureLoader.load("textures/dice4.png");
		const texture4 = textureLoader.load("textures/dice5.png");
		const texture5 = textureLoader.load("textures/dice6.png");

		this.basicMaterial = [
			new THREE.MeshBasicMaterial({
				color: 0xc0c0c0,
				map: texture0,
				wireframe: false,
			}),
			new THREE.MeshBasicMaterial({
				color: 0xc0c0c0,
				map: texture1,
				wireframe: false,
			}),
			new THREE.MeshBasicMaterial({
				color: 0xc0c0c0,
				map: texture2,
				wireframe: false,
			}),
			new THREE.MeshBasicMaterial({
				color: 0xc0c0c0,
				map: texture3,
				wireframe: false,
			}),
			new THREE.MeshBasicMaterial({
				color: 0xc0c0c0,
				map: texture4,
				wireframe: false,
			}),
			new THREE.MeshBasicMaterial({
				color: 0xc0c0c0,
				map: texture5,
				wireframe: false,
			}),
		];

		this.standardMaterial = [
			new THREE.MeshStandardMaterial({
				bumpMap: texture0,
				color: 0xc0c0c0,
				map: texture0,
				wireframe: false,
			}),
			new THREE.MeshStandardMaterial({
				bumpMap: texture1,
				color: 0xc0c0c0,
				map: texture1,
				wireframe: false,
			}),
			new THREE.MeshStandardMaterial({
				bumpMap: texture2,
				color: 0xc0c0c0,
				map: texture2,
				wireframe: false,
			}),
			new THREE.MeshStandardMaterial({
				bumpMap: texture3,
				color: 0xc0c0c0,
				map: texture3,
				wireframe: false,
			}),
			new THREE.MeshStandardMaterial({
				bumpMap: texture4,
				color: 0xc0c0c0,
				map: texture4,
				wireframe: false,
			}),
			new THREE.MeshStandardMaterial({
				bumpMap: texture5,
				color: 0xc0c0c0,
				map: texture5,
				wireframe: false,
			}),
		];

		this.faceMaterialB = this.basicMaterial;
		this.faceMaterialS = this.standardMaterial;

		this.currentMaterial = this.standardMaterial;
		this.createElements();
	}

	createElements() {
		const geometry = new THREE.BoxGeometry(10, 10, 10);
		this.boxMeshB = new THREE.Mesh(geometry, this.faceMaterialB);
		this.boxMeshS = new THREE.Mesh(geometry, this.faceMaterialS);
		this.boxMeshB.visible = false;
		this.boxMeshS.visible = true;
		this.boxMeshS;
		// Math.PI/4
		this.boxMeshB.rotateOnWorldAxis(
			new THREE.Vector3(0, 0, 1),
			0.7853981633974483
		);
		this.boxMeshS.rotateOnWorldAxis(
			new THREE.Vector3(0, 0, 1),
			0.7853981633974483
		);
		// Math.PI/2 - Math.atan(Math.sqrt(2))
		this.boxMeshB.rotateOnWorldAxis(
			new THREE.Vector3(1, 0, 0),
			0.6154797086703873
		);
		this.boxMeshS.rotateOnWorldAxis(
			new THREE.Vector3(1, 0, 0),
			0.6154797086703873
		);
		this.rotationPivot = new THREE.Object3D();
		this.rotationPivot.add(this.boxMeshB);
		this.rotationPivot.add(this.boxMeshS);
		// y : 5 * Math.sqrt(2) + 5
		this.rotationPivot.position.set(0, 11, 0);

		this.add(this.rotationPivot);
	}

	animations() {
		this.rotationPivot.rotation.y += this.rotSpeed;
	}

	reset() {
		this.rotationPivot.rotation.y = 0;
	}

	toggleLightCalc() {
		if (this.currentMaterial === this.basicMaterial) {
			this.boxMeshB.visible = false;
			this.boxMeshS.visible = true;
			this.currentMaterial = this.standardMaterial;
		} else {
			this.boxMeshB.visible = true;
			this.boxMeshS.visible = false;
			this.currentMaterial = this.basicMaterial;
		}
	}

	update() {
		if (!this.scene.STOP_ANIMATIONS) this.animations();
		if (this.scene.UPDATE_WIREFRAME) {
			this.basicMaterial.forEach((mesh) => {
				mesh.wireframe = !mesh.wireframe;
			});
			this.standardMaterial.forEach((mesh) => {
				mesh.wireframe = !mesh.wireframe;
			});
		}
	}
}
