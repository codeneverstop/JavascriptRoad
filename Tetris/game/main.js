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

const tetris = new Tetris(document);

