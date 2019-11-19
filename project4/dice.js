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
		const textureBackgroundWood = textureLoader.load(
			"textures/wood-bump-map.jpg"
		);

		this.basicMaterial = [
			new THREE.MeshBasicMaterial({
				bumpMap: texture0,
				color: 0xc0c0c0,
				map: texture0,
				wireframe: false,
			}),
			new THREE.MeshBasicMaterial({
				bumpMap: texture1,
				color: 0xc0c0c0,
				map: texture1,
				wireframe: false,
			}),
			new THREE.MeshBasicMaterial({
				bumpMap: texture2,
				color: 0xc0c0c0,
				map: texture2,
				wireframe: false,
			}),
			new THREE.MeshBasicMaterial({
				bumpMap: texture3,
				color: 0xc0c0c0,
				map: texture3,
				wireframe: false,
			}),
			new THREE.MeshBasicMaterial({
				bumpMap: texture4,
				color: 0xc0c0c0,
				map: texture4,
				wireframe: false,
			}),
			new THREE.MeshBasicMaterial({
				bumpMap: texture5,
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

		this.faceMaterialB = new THREE.MeshFaceMaterial(this.basicMaterial);
		this.faceMaterialS = new THREE.MeshFaceMaterial(this.standardMaterial);

		this.currentMaterial = this.standardMaterial;
		this.createElements();
	}

	createElements() {
		const geometry = new THREE.BoxGeometry(10, 10, 10);
		this.boxMeshB = new THREE.Mesh(geometry, this.faceMaterialB);
		this.boxMeshS = new THREE.Mesh(geometry, this.faceMaterialS);
		this.boxMeshB.position.set(0, 20, 0);
		this.boxMeshS.position.set(0, 20, 0);
		this.boxMeshB.visible = false;
		this.boxMeshS.visible = true;
		this.boxMeshB.rotateX(0.7853981633974483);
		this.boxMeshB.rotateZ(0.9553166181245093);
		this.boxMeshS.rotateX(0.7853981633974483);
		this.boxMeshS.rotateZ(0.9553166181245093);
		this.rotationPivot = new THREE.Object3D();
		this.rotationPivot.add(this.boxMeshB);
		this.rotationPivot.add(this.boxMeshS);
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
