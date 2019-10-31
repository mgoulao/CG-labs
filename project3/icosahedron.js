import * as THREE from "../node_modules/three/build/three.module.js";

export default class Icosahedron extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;


		this.GOURAUD = "gouraud";
		this.PHONG = "phong";
		this.BASIC = "basic";

		this.currentShading = this.BASIC;
		//Golden Number
		this.goldenNMB = (1+Math.sqrt(5))/2;

		//GEOMETRY
		var icosahedron = new THREE.Geometry();
		
		// create an array of vertices by way of
		// and array of vector3 instances
		icosahedron.vertices.push(
			new THREE.Vector3( -1, this.goldenNMB, 0 ),
			new THREE.Vector3( 1, this.goldenNMB, 0 ),
			new THREE.Vector3( -1, -this.goldenNMB, 0 ),
			new THREE.Vector3( 1, -this.goldenNMB, 0 ),

			new THREE.Vector3( 0, -1, this.goldenNMB ),
			new THREE.Vector3( 0, 1, this.goldenNMB ),
			new THREE.Vector3( 0, -1, -this.goldenNMB ),
			new THREE.Vector3( 0, 1, -this.goldenNMB ),

			new THREE.Vector3( this.goldenNMB, 0, -1 ),
			new THREE.Vector3( this.goldenNMB, 0, 1 ),
			new THREE.Vector3( -this.goldenNMB, 0, -1 ),
			new THREE.Vector3( -this.goldenNMB, 0, 1 ));
		
		// create faces by way of an array of
		// face3 instances
		icosahedron.faces.push(
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
			new THREE.Face3(9, 8, 1));

		// compute Normals
    icosahedron.computeVertexNormals();
 
    // normalize the geometry
		icosahedron.normalize();
		
		icosahedron.scale(30, 30, 30);
 
    // MESH with GEOMETRY, and Normal MATERIAL
    scene.add(new THREE.Mesh(
 
            // geometry as first argument
            icosahedron,
 
            // then Material
            new THREE.MeshBasicMaterial({
								color: 0xffffff
						})));
						
						//Gourad ??? é suposto criar?
						//Phong ???
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
