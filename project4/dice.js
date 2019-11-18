import * as THREE from "../node_modules/three/build/three.module.js";

export default class Dice extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;

		this.rotSpeed = 2/100;
		this.rotationPivot = null;

		const textureLoader = new THREE.TextureLoader();

		const texture0 = textureLoader.load( 'textures/dice1.png' );
		const texture1 = textureLoader.load( 'textures/dice2.png' );
		const texture2 = textureLoader.load( 'textures/dice3.png' );
		const texture3 = textureLoader.load( 'textures/dice4.png' );
		const texture4 = textureLoader.load( 'textures/dice5.png' );
		const texture5 = textureLoader.load( 'textures/dice6.png' );
		const textureBackgroundWood = textureLoader.load( 'textures/wood-bump-map.jpg' );

		this.basicMaterial = [
		    new THREE.MeshBasicMaterial( { bumpMap: texture0 , color: 0xc0c0c0, map: textureBackgroundWood } ),
		    new THREE.MeshBasicMaterial( { bumpMap: texture1 , color: 0xc0c0c0, map: textureBackgroundWood } ),
		    new THREE.MeshBasicMaterial( { bumpMap: texture2 , color: 0xc0c0c0, map: textureBackgroundWood } ),
		    new THREE.MeshBasicMaterial( { bumpMap: texture3 , color: 0xc0c0c0, map: textureBackgroundWood } ),
		    new THREE.MeshBasicMaterial( { bumpMap: texture4 , color: 0xc0c0c0, map: textureBackgroundWood } ),
		    new THREE.MeshBasicMaterial( { bumpMap: texture5 , color: 0xc0c0c0, map: textureBackgroundWood } )
		];

		this.standardMaterial = [
		    new THREE.MeshStandardMaterial( { bumpMap: texture0 , color: 0xc0c0c0, map: textureBackgroundWood } ),
		    new THREE.MeshStandardMaterial( { bumpMap: texture1 , color: 0xc0c0c0, map: textureBackgroundWood } ),
		    new THREE.MeshStandardMaterial( { bumpMap: texture2 , color: 0xc0c0c0, map: textureBackgroundWood } ),
		    new THREE.MeshStandardMaterial( { bumpMap: texture3 , color: 0xc0c0c0, map: textureBackgroundWood } ),
		    new THREE.MeshStandardMaterial( { bumpMap: texture4 , color: 0xc0c0c0, map: textureBackgroundWood } ),
		    new THREE.MeshStandardMaterial( { bumpMap: texture5 , color: 0xc0c0c0, map: textureBackgroundWood } )
		];

		this.faceMaterialB = new THREE.MeshFaceMaterial( this.basicMaterial );
		this.faceMaterialS = new THREE.MeshFaceMaterial ( this.standardMaterial );

		this.currentMaterial = this.standardMaterial;
		this.createElements();
	}

	createElements() {
		const geometry = new THREE.BoxGeometry(10, 10, 10);
		this.boxMeshB = new THREE.Mesh( geometry, this.faceMaterialB );
		this.boxMeshS = new THREE.Mesh( geometry, this.faceMaterialS );
		this.boxMeshB.position.set(0, 20, 0);
		this.boxMeshS.position.set(0, 20, 0);
		this.boxMeshB.visible = false;
		this.boxMeshS.visible = true;
		this.boxMeshB.rotateX(Math.PI/4);
		this.boxMeshB.rotateZ(Math.PI/4);
		this.boxMeshS.rotateX(Math.PI/4);
		this.boxMeshS.rotateZ(Math.PI/4);
		this.rotationPivot = new THREE.Object3D();
		this.rotationPivot.add(this.boxMeshB);
		this.rotationPivot.add(this.boxMeshS);
		this.add(this.rotationPivot);
	}

	animations() {
		if (this.scene.IN_MOTION) {
			this.rotationPivot.rotation.y += this.rotSpeed;
		}
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
	}
}