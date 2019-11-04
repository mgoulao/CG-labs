import * as THREE from "../node_modules/three/build/three.module.js";
import ShadedMesh from "./shadedMesh.js";

export default class LightManager {
	constructor(scene, pos1, pos2, pos3, pos4) {
		this.scene = scene;

		this.light = new THREE.DirectionalLight(0xffffff, 0.5); // soft white light
		this.light.position.set(0, 210, 210);
		this.light.visible = false;
		this.scene.add(this.light);

		this.width1 = 5;
		this.height1 = 20;
		this.depth1 = 32;

		this.width2 = 5;
		this.height2 = 32;
		this.depth2 = 32;

		this.coneColor = 0x000000;
		this.sphereColor1 = 0xff0000;
		this.sphereColor2 = 0x00ff00;
		this.sphereColor3 = 0x0000ff;
		this.sphereColor4 = 0xff00ff;

		this.posSpotlight1 = pos1;
		this.posSpotlight2 = pos2;
		this.posSpotlight3 = pos3;
		this.posSpotlight4 = pos4;

		this.spotLight1 = new THREE.SpotLight( this.sphereColor1 , 0.5 );
		this.spotLight2 = new THREE.SpotLight( this.sphereColor2 , 0.5 );
		this.spotLight3 = new THREE.SpotLight( this.sphereColor3 , 0.5 );
		this.spotLight4 = new THREE.SpotLight( this.sphereColor4 , 0.5 );
		this.spotLight1.position.set( this.posSpotlight1 );
		this.spotLight2.position.set( this.posSpotlight2 );
		this.spotLight3.position.set( this.posSpotlight3 );
		this.spotLight4.position.set( this.posSpotlight4 );
		this.scene.add(this.spotLight1);
		this.scene.add(this.spotLight2);
		this.scene.add(this.spotLight3);
		this.scene.add(this.spotLight4);

		this.createSpotlight();
	}

	createSpotlight(){
		this.createCone();
		this.createSphere();
	}

	createCone(){
		const coneGeometry = new THREE.ConeGeometry(this.width1, this.height1, this.depth1);
		//LIGHT1
		this.coneLight1 = new ShadedMesh(coneGeometry, this.coneColor);
		this.coneLight1.position.set(...this.posSpotlight1);
		this.coneLight1.rotateZ(Math.PI);
		this.scene.add(this.coneLight1);
		//LIGHT2
		this.coneLight2 = new ShadedMesh(coneGeometry, this.coneColor);
		this.coneLight2.position.set(...this.posSpotlight2);
		this.coneLight2.rotateZ(Math.PI);
		this.scene.add(this.coneLight2);
		//LIGHT3
		this.coneLight3 = new ShadedMesh(coneGeometry, this.coneColor);
		this.coneLight3.position.set(...this.posSpotlight3);
		this.coneLight3.rotateZ(Math.PI);
		this.scene.add(this.coneLight3);
		//LIGHT4
		this.coneLight4 = new ShadedMesh(coneGeometry, this.coneColor);
		this.coneLight4.position.set(...this.posSpotlight4);
		this.coneLight4.rotateZ(Math.PI);
		this.scene.add(this.coneLight4);

	}

	createSphere(){
		const sphereGeometry = new THREE.SphereGeometry(this.width2, this.height2, this.depth2);
		//LIGHT1
		this.sphereLight1 = new ShadedMesh(sphereGeometry, this.sphereColor1);
		this.sphereLight1.position.set(...this.posSpotlight1);
		this.sphereLight1.translateY(12);
		this.scene.add(this.sphereLight1);
		//LIGHT2
		this.sphereLight2 = new ShadedMesh(sphereGeometry, this.sphereColor2);
		this.sphereLight2.position.set(...this.posSpotlight2);
		this.sphereLight2.translateY(12);
		this.scene.add(this.sphereLight2);
		//LIGHT3
		this.sphereLight3 = new ShadedMesh(sphereGeometry, this.sphereColor3);
		this.sphereLight3.position.set(...this.posSpotlight3);
		this.sphereLight3.translateY(12);
		this.scene.add(this.sphereLight3);
		//LIGHT4
		this.sphereLight4 = new ShadedMesh(sphereGeometry, this.sphereColor4);
		this.sphereLight4.position.set(...this.posSpotlight4);
		this.sphereLight4.translateY(12);
		this.scene.add(this.sphereLight4);
	}

	update() {
		if (this.scene.TOGGLE_LIGHT) {
			this.light.visible = true;
		}
		if (!this.scene.TOGGLE_LIGHT) {
			this.light.visible = false;
		}
	}
}
