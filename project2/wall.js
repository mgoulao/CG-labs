import * as THREE from "../node_modules/three/build/three.module.js";

export default class Wall extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;

		this.wallSize = [3, 40, 100]; //width, height, deapth
    const wallOffset = this.wallSize[2] / 2;
    const groundOffset = this.wallSize[1] / 2;

    this.wall1Position = [
      -wallOffset,
      groundOffset,
      0,
    ];
    this.wall2Position = [
      0,
      groundOffset,
      -wallOffset,
    ];
    this.wall3Position = [
      0,
      groundOffset,
      wallOffset,
    ];

		this.wallMaterial = new THREE.MeshBasicMaterial({
			color: 0xff8b8b,
			wireframe: false,
		});

		this.createWallFront(...this.wall1Position);
    this.createWallSide(...this.wall2Position);
    this.createWallSide(...this.wall3Position);
	}

	createWallFront(x, y, z) {
		const wallGeometry = new THREE.BoxGeometry(...this.wallSize);
		const wallBoxFront = new THREE.Mesh(wallGeometry, this.wallMaterial);
		wallBoxFront.position.set(x, y, z);
		this.add(wallBoxFront);
	}

  createWallSide(x, y, z) {
		const wallGeometry = new THREE.BoxGeometry(...this.wallSize);
		const wallBoxSide = new THREE.Mesh(wallGeometry, this.wallMaterial);
		wallBoxSide.position.set(x, y, z);
    wallBoxSide.rotateY(Math.PI / 2);
		this.add(wallBoxSide);
	}

	update() {//alterar a cor em vez do wireframe para os cannons
		if (this.scene.UPDATE_WIREFRAME) {
			this.wallMaterial.wireframe = !this.wallMaterial.wireframe;
		}
	}
}
