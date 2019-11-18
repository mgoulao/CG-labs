import Scene from "./scene.js";

const animate = (scene) => {
	scene.update();
	scene.render();

	if (scene.UPDATE_WIREFRAME) scene.UPDATE_WIREFRAME = false;

	requestAnimationFrame((tms) => {
		animate(scene);
	});
};

const onKeyDown = (e, scene) => {
	console.log(e.code);
	switch (e.keyCode) {
		case 76: // l
			scene.TOGGLE_LIGHT_CALC = !scene.TOGGLE_LIGHT_CALC;
			break;
		case 66: // b
			scene.IN_MOTION = !scene.IN_MOTION;
			break;
		case 68: // d
			scene.AMBIENT_LIGHT = !scene.AMBIENT_LIGHT;
			break;
		case 80: // P
		case 112: // p
			scene.POINTLIGHT = !scene.POINTLIGHT;
			break;
		case 82: // r
			scene.RESET = true;
			break;
		case 83: // s
			scene.STOP_ANIMATIONS = !scene.STOP_ANIMATIONS;
			break;
		case 87: //w
			scene.UPDATE_WIREFRAME = true;
			console.log("mudou");
			
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
