import * as THREE from "../node_modules/three/build/three.module.js";

export default class Icosahedron extends THREE.Group {
	constructor(scene) {
		super();
		this.scene = scene;


		this.GOURAUD = "gouraud";
		this.PHONG = "phong";
		this.BASIC = "basic";

		this.currentShading = this.BASIC;
		//this.
		this.goldenNMB = (1+Math.sqrt(5))/2;

		var material = new THREE.MeshStandardMaterial( { color : 0x00cc00 } );

		function pushVertices(verticeA, verticeB, verticeC, geometry){
			geometry.vertices.push(verticeA);
			geometry.vertices.push(verticeB);
			geometry.vertices.push(verticeC);
			console.log("GEOMETRYYYY",);
			
			return geometry;
		}

		//create a triangular geometry
		var geometry = new THREE.Geometry();
		var vertice0 = new THREE.Vector3( -1, this.goldenNMB, 0 );
		var vertice1 = new THREE.Vector3( 1, this.goldenNMB, 0 );
		var vertice2 = new THREE.Vector3( -1, -this.goldenNMB, 0 );
		var vertice3 = new THREE.Vector3( 1, -this.goldenNMB, 0 );
		var vertice4 = new THREE.Vector3( 0, -1, this.goldenNMB );
		var vertice5 = new THREE.Vector3( 0, 1, this.goldenNMB );
		var vertice6 = new THREE.Vector3( 0, -1, -this.goldenNMB );
		var vertice7 = new THREE.Vector3( 0, 1, -this.goldenNMB );
		var vertice8 = new THREE.Vector3( this.goldenNMB, 0, -1 );
		var vertice9 = new THREE.Vector3( this.goldenNMB, 0, 1 );
		var vertice10 = new THREE.Vector3( -this.goldenNMB, 0, -1 );
		var vertice11 = new THREE.Vector3( -this.goldenNMB, 0, 1 );
		geometry.vertices.push(vertice0, vertice11, vertice5);
		geometry.vertices.push(vertice0, vertice5, vertice1);
		geometry.vertices.push(vertice0, vertice7, vertice10);
		//geometry.vertices.push(verticeC);
		//pushVertices(vertice0, vertice11, vertice5, geometry);
		//pushVertices(vertice0, vertice5, vertice1, geometry);
		//pushVertices(vertice0, vertice1, vertice7, geometry);
		//pushVertices(vertice0, vertice7, vertice10, geometry);
		//pushVertices(vertice0, vertice10, vertice11, geometry);

		//pushVertices(vertice1, vertice5, vertice9, geometry);
		//pushVertices(vertice5, vertice11, vertice4, geometry);
		//pushVertices(vertice11, vertice10, vertice2, geometry);
		//pushVertices(vertice10, vertice7, vertice6, geometry);
		//pushVertices(vertice7, vertice1, vertice8, geometry);

		//pushVertices(vertice3, vertice9, vertice4, geometry);
		//pushVertices(vertice3, vertice4, vertice2, geometry);
		//pushVertices(vertice3, vertice2, vertice6, geometry);
		//pushVertices(vertice3, vertice6, vertice8, geometry);
		//pushVertices(vertice3, vertice8, vertice9, geometry);

		//pushVertices(vertice4, vertice9, vertice5, geometry);
		//pushVertices(vertice2, vertice4, vertice11, geometry);
		//pushVertices(vertice6, vertice2, vertice10, geometry);
		//pushVertices(vertice8, vertice6, vertice7, geometry);
		//pushVertices(vertice9, vertice8, vertice1, geometry);

		geometry.scale(2, 2, 2);
		console.log(geometry);

		//create a new face using vertices 0, 1, 2
		var normal = new THREE.Vector3( 0, 1, 0 ); //optional
		var color = new THREE.Color( 0xffaa00 ); //optional
		var materialIndex = 0; //optional
		var face = new THREE.Face3( 0, 1, 2, normal, color, materialIndex );

		//add the face to the geometry's faces array
		geometry.faces.push( face );

		//the face normals and vertex normals can be calculated automatically if not supplied above
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();

		scene.add( new THREE.Mesh( geometry, material ) );
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
