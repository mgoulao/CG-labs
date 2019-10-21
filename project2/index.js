import Scene from "./scene.js";

const animate = (scene) => {
	scene.update();
	scene.render();

	requestAnimationFrame((tms) => {
		animate(scene);
	});
};

const onKeyDown = (e, scene) => {
	console.log(e.code);
	switch (e.keyCode) {
		case 37:
			scene.FIRE_ANGLE_DIRECT = false;
			scene.FIRE_ANGLE_INDIRECT = true;
			break;
		case 39:
			scene.FIRE_ANGLE_DIRECT = true;
			scene.FIRE_ANGLE_INDIRECT = false;
			break;
		case 49: // 1
			scene.changeToCameraTop();
			break;
		case 50: // 2
			scene.changeToCameraAll();
			break;
		case 51: // 3
			scene.changeToCameraBall();
			break;
		case 52: // 4
			scene.UPDATE_WIREFRAME = true;
			break;
		case 81: // Q
		case 113: // q
			scene.CANNON_ONE = true;
			scene.CANNON_TWO = false;
			scene.CANNON_THREE = false;
			console.log("SELCTED cannon 1");
			break;
		case 87: // W
		case 119: // w
			scene.CANNON_ONE = false;
			scene.CANNON_TWO = true;
			scene.CANNON_THREE = false;

			console.log("SELCTED cannon 2");
			break;
		case 69: // E
		case 101: // e
			scene.CANNON_ONE = false;
			scene.CANNON_TWO = false;
			scene.CANNON_THREE = true;
			console.log("SELCTED cannon 3");
			break;
		case 32: // space
			scene.FIRE_CANNON = true;
			console.log("FIRED cannon!");
			break;
		case 39: // down
			scene.FIRE_ANGLE_DIRECT = true;
			break;
		case 37: // left
			scene.FIRE_ANGLE_INDIRECT = true;
			break;
	}
};

const onKeyUp = (e, scene) => {
	// console.log(e.keyCode);
	switch (e.keyCode) {
		case 32: // space
			scene.FIRE_CANNON = false;
			break;
		case 39: // down
			scene.FIRE_ANGLE_DIRECT = false;
			break;
		case 37: // left
			scene.FIRE_ANGLE_INDIRECT = false;
			break;
	}
};

const setupListeners = (scene) => {
	window.addEventListener("keydown", (e) => {
		onKeyDown(e, scene);
	});
	window.addEventListener("keyup", (e) => {
		onKeyUp(e, scene);
	});
	window.addEventListener("resize", (e) => {
		onResize(e, scene);
	});
};

const onResize = (e, scene) => {
	scene.resize();
};

const init = () => {
	const scene = new Scene();

	setupListeners(scene);
	animate(scene);
};

init();
