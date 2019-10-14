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
		case 49: // 1
			scene.changeToCameraTop();
			break;
		case 50: // 2
			scene.changeToCameraBall();
			break;
		case 51: // 3
			scene.changeToCameraAll();
			break;
		case 52: // 4
			scene.UPDATE_WIREFRAME = true;
			break;
		case 65: // A
		case 97: // a
			scene.THETA1_DIRECT = true;
			break;
		case 83: // S
		case 115: // s
			scene.THETA1_INDIRECT = true;
			break;
		case 81: // q
			scene.THETA2_DIRECT = true;
			break;
		case 87: // w
			scene.THETA2_INDIRECT = true;
			break;
		case 69: // E
		case 101: // e
			break;
		case 38: // up
			scene.UP_DOWN = true;
			break;
		case 40: // down
			scene.DOWN_DOWN = true;
			break;
		case 37: // left
			scene.LEFT_DOWN = true;
			break;
		case 39: // right
			scene.RIGHT_DOWN = true;
			break;
	}
};

const onKeyUp = (e, scene) => {
	// console.log(e.keyCode);
	switch (e.keyCode) {
		case 65: // A
		case 97: // a
			scene.THETA1_DIRECT = false;
			break;
		case 83: // S
		case 115: // s
			scene.THETA1_INDIRECT = false;
			break;
		case 81: // q
			scene.THETA2_DIRECT = false;
			break;
		case 87: // w
			scene.THETA2_INDIRECT = false;
			break;
		case 38: // up
			scene.UP_DOWN = false;
			break;
		case 40: // down
			scene.DOWN_DOWN = false;
			break;
		case 37: // left
			scene.LEFT_DOWN = false;
			break;
		case 39: // right
			scene.RIGHT_DOWN = false;
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
