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
			break;
		case 50: // 2
			break;
		case 51: // 3
			break;
		case 52: // 4
			break;
		case 53: // 5
			break;
		case 54: // 6
			break;
		case 66: // B
		case 98: // b
			scene.IN_MOTION = !scene.IN_MOTION;
			break;
		case 80: // P
		case 112: // p
			scene.POINTLIGHT = !scene.POINTLIGHT;	
			break;
		case 69: // E
		case 101: // e
			break;
		case 83:
			scene.STOP_ANIMATIONS = !scene.STOP_ANIMATIONS;
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
