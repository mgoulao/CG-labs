import * as THREE from "../node_modules/three/build/three.module.js";

export default class Wall extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;

		this.wallFrontSize = [3, 20, 100]; // width, height, deapth
		this.wallSideSize = [100, 20, 3]; // width, height, deapth
		const wallOffset = this.wallFrontSize[2] / 2;
		const groundOffset = this.wallFrontSize[1] / 2;
		const widthOffset = this.wallFrontSize[0] / 2;
		this.wall1Position = [-wallOffset, groundOffset, 0];
		this.wall2Position = [
			-widthOffset,
			groundOffset,
			-wallOffset - widthOffset,
		];
		this.wall3Position = [-widthOffset, groundOffset, wallOffset + widthOffset];

		this.wallMaterial = new THREE.MeshBasicMaterial({
			color: 0xff8b8b,
			wireframe: false,
		});

		this.createWall(this.wall1Position, this.wallFrontSize);
		this.createWall(this.wall2Position, this.wallSideSize);
		this.createWall(this.wall3Position, this.wallSideSize);
	}

	createWall(pos, size) {
		const wallGeometry = new THREE.BoxGeometry(...size);
		const wallBox = new THREE.Mesh(wallGeometry, this.wallMaterial);
		console.log(pos);
		wallBox.position.set(...pos);
		wallBox.geometry.computeBoundingBox();
		this.add(wallBox);
	}

	update() {
		// alterar a cor em vez do wireframe para os cannons
		if (this.scene.UPDATE_WIREFRAME) {
			this.wallMaterial.wireframe = !this.wallMaterial.wireframe;
		}
	}
}
