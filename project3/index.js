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
		case 37: // <-
			break;
		case 39: // ->
			break;
		case 49: // 1
			scene.changeToCameraTop(); // TODO
			break;
		case 50: // 2
			scene.changeToCameraAll();
			break;
		case 51: // 3
			scene.changeToCameraBall();
			break;
		case 52: // 4
			scene.TOGGLE_AXES = true;
			break;
		case 81: // Q
		case 113: // q
			break;
		case 87: // W
		case 119: // w
			break;
		case 69: // E
		case 101: // e
			break;
		case 32: // space
			break;
		case 39: // down
			break;
		case 37: // left
			break;
	}
};

const onKeyUp = (e, scene) => {
	// console.log(e.keyCode);
	switch (e.keyCode) {
		case 32: // space
			break;
		case 39: // down
			break;
		case 37: // left
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
