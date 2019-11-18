import * as THREE from "../node_modules/three/build/three.module.js";

export default class Chessboard extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;
		this.board = null;

		this.standardMaterial = [
			new THREE.MeshStandardMaterial({ color: 0xf4f5f0, wireframe: false  }),
			new THREE.MeshStandardMaterial({ color: 0xf4f5f0, wireframe: false  }),
			new THREE.MeshStandardMaterial({ color: 0xf4f5f0, wireframe: false  }),
			new THREE.MeshStandardMaterial({ color: 0xf4f5f0, wireframe: false  }),
			new THREE.MeshStandardMaterial({ color: 0xf4f5f0, wireframe: false  }),
			new THREE.MeshStandardMaterial({ color: 0xf4f5f0, wireframe: false  }),
		];
		this.basicMaterial = [
			new THREE.MeshBasicMaterial({ color: 0xf4f5f0, wireframe: false  }),
			new THREE.MeshBasicMaterial({ color: 0xf4f5f0, wireframe: false  }),
			new THREE.MeshBasicMaterial({ color: 0xf4f5f0, wireframe: false  }),
			new THREE.MeshBasicMaterial({ color: 0xf4f5f0, wireframe: false  }),
			new THREE.MeshBasicMaterial({ color: 0xf4f5f0, wireframe: false  }),
			new THREE.MeshBasicMaterial({ color: 0xf4f5f0, wireframe: false  }),
		];
		this.currentMaterial = this.standardMaterial;

		this.setMaterialsProperties();
		this.createBumpMapTexture();
		this.createTopTexture();
		this.createElements();
	}

	setMaterialsProperties() {
		for (let i = 0; i < this.standardMaterial.length; i++) {
			this.standardMaterial[i].metalness = 0.2;
		}
	}

	createTopTexture() {
		const topTexture = new THREE.TextureLoader().load(
			"textures/chessboard.png"
		);
		topTexture.wrapS = THREE.ClampToEdgeWrapping;
		topTexture.wrapT = THREE.ClampToEdgeWrapping;
		const sideTexture = new THREE.TextureLoader().load("textures/wood.jpg");
		sideTexture.wrapS = THREE.ClampToEdgeWrapping;
		sideTexture.wrapT = THREE.ClampToEdgeWrapping;

		this.standardMaterial[2].map = topTexture;
		this.basicMaterial[2].map = topTexture;
		for (let i = 0; i < this.standardMaterial.length; i++) {
			if (i !== 2) {
				this.standardMaterial[i].map = sideTexture;
				this.basicMaterial[i].map = sideTexture;
			}
		}
	}

	createBumpMapTexture() {
		const texture = new THREE.TextureLoader().load(
			"textures/wood-bump-map.jpg"
		);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(20, 20);
		for (let i = 0; i < this.standardMaterial.length; i++) {
			this.basicMaterial[i].bumpMap = texture;
			this.standardMaterial[i].bumpMap = texture;
		}
	}

	createElements() {
		const geometry = new THREE.BoxGeometry(100, 5, 100);
		this.board = new THREE.Mesh(geometry, this.currentMaterial);
		this.add(this.board);
	}

	toggleLightCalc() {
		if (this.currentMaterial === this.basicMaterial) {
			this.currentMaterial = this.standardMaterial;
		} else {
			this.currentMaterial = this.basicMaterial;
		}
		this.board.material = this.currentMaterial;
	}

	update() {
		if (this.scene.UPDATE_WIREFRAME){
			for (const mesh_i in  this.basicMaterial) {
				this.basicMaterial[mesh_i].wireframe = !this.basicMaterial[mesh_i].wireframe;
			}
			for (const mesh_i in  this.standardMaterial) {
				this.standardMaterial[mesh_i].wireframe = !this.standardMaterial[mesh_i].wireframe;
			}
		}
	}
}
