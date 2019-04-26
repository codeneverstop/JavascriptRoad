const matrix_block = [
[
	[0, 0, 0],
	[1, 1, 1],
	[0, 1, 0],
],
[
	[2, 2],
	[2, 2],
],
[
	[0, 3, 0, 0],
	[0, 3, 0, 0],
	[0, 3, 0, 0],
	[0, 3, 0, 0],
],
[
	[4, 0, 0],
	[4, 0, 0],
	[4, 4, 0],
],
[
	[0, 0, 5],
	[0, 0, 5],
	[0, 5, 5],
],
[
	[6, 6, 0],
	[0, 6, 6],
	[0, 0, 0],
],
[
	[0, 7, 7],
	[7, 7, 0],
	[0, 0, 0],
],

];

const colorarr = ['red', 'blue', 'yellow', 'pink', 'purple', 'cyan', 'gray'];
const dropInterval = 1000;
let dropCounter = 0;

const tetris = [];
var game_canvas;
const playerElement = document.querySelectorAll('.game');
[...playerElement].forEach((element) => {
	game_canvas = element.querySelector('canvas');
	const tetrisInstance = new Tetris(game_canvas);
	tetris.push(tetrisInstance);
});

function tetrisAddEventListener() {
	//这里面的this就是Tetris
	var key = [
        [65, 68, 81, 69, 83],
        [72, 75, 89, 73, 74],
	];

	key.forEach((value, i) => {
		document.addEventListener('keydown', event => {
		if (event.keyCode === value[0]) 
	        { // left
	    	    tetris[i].player.moveHorizontally(-1);
	    	    if (tetris[i].arena.isCollideWithPlayer(tetris[i].player)) {                                                                                                                                      	
		    	    tetris[i].player.moveHorizontally(1);
		        }
	        } else if (event.keyCode === value[1]) {
		        tetris[i].player.moveHorizontally(1);
		        if (tetris[i].arena.isCollideWithPlayer(tetris[i].player)) {
		    	    tetris[i].player.moveHorizontally(-1);
		        }
	        } else if (event.keyCode === value[2]) {
		         tetris[i].player.drop(1);
	        } else if (event.keyCode === value[3]) {
		        tetris[i].player.rotate(-1);
	            if (tetris[i].arena.isCollideWithPlayer(tetris[i].player)) {
		            tetris[i].player.rotate(1);
	            }
	        } else if (event.keyCode === value[4]) {
		        tetris[i].player.rotate(1);
		        if (tetris[i].arena.isCollideWithPlayer(tetris[i].player)) {
			        tetris[i].player.rotate(-1);
		        }
	        }
	    });
	});
}
tetrisAddEventListener();