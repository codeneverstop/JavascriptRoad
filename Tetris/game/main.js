const canvas_bkg = document.getElementById('bkg');
const context_bkg = canvas_bkg.getContext('2d');    /*never change*/

context_bkg.scale(20, 20);

function createMatrix(width, height){
	const matrix = [];   //为什么这个const可以被push？ 是因为这个只是const的“指针”吗
	while (height--){
		matrix.push(new Array(width).fill(0));
	}

	return matrix;
}

function drawMatrix(matrix, offset){
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0){
				//console.log("x is " + x + " y is " + y + ", value is " + value);
				context_bkg.fillStyle = colorarr[value - 1];
				context_bkg.fillRect(x + offset.x, y + offset.y, 1, 1);
				//context_bkg.fillRect(x * 20, y * 20, 20, 20); //等于scale 20
			}
		}); 
	});
}

const player = new Player({x: 2, y: 2}, 0);
const arena = new Arena(12, 20);

function draw(){
	/*renew back ground*/
	context_bkg.fillStyle = '#000';
	context_bkg.fillRect(0, 0, canvas_bkg.width, canvas_bkg.height);
	drawMatrix(arena.arena, {x: 0, y: 0});
	drawMatrix(player.block, player.pos);
}

let lastTime = 0; //let ES6新增 块作用域 new
let dropCounter = 0;
let dropInterval = 1000;

function update(time = 0){ //默认参数 单位为ms new
	const deltaTime = time - lastTime;
	lastTime = time;
	dropCounter += deltaTime;
	if (dropCounter > dropInterval)
	{
		player.drop(1);
	}
	arena.eliminate();
	draw();
	requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
	if (event.keyCode === 37){ // left
		player.moveHorizontally(-1);
		if (arena.isCollideWithPlayer(player))
		{
			player.moveHorizontally(1);
		}
	} else if (event.keyCode === 39){
		player.moveHorizontally(1);
		if (arena.isCollideWithPlayer(player))
		{
			player.moveHorizontally(-1);
		}
	} else if (event.keyCode === 40){
		player.drop(1);
	} else if (event.keyCode === 81){
		player.rotate(-1);
	} else if (event.keyCode === 87){
		player.rotate(1);
	}

});

update();