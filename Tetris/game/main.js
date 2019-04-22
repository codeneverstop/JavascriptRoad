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

function rotate(matrix, dir){
	for (let y = 0; y < matrix.length; y++){
		for (let x = 0; x < y; x++){
			[
				matrix[x][y],
				matrix[y][x],
			] = [
				matrix[y][x],
				matrix[x][y],
			]
		}
	}

	//TODO: dir should be an enum
	if (dir > 0){
		matrix.forEach(row => row.reverse());
	} else {
		matrix.reverse(); 
	}
}

function playerRotate(dir) {
	player.rotate(dir);
	if (collide(arena, player)){
		player.rotate(-dir);
		//这里在视频里面不是直接不让rotate
	}
}

function merge(arena, player){
	const [pos, matrix] = [player.pos, player.block];
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0){
				arena[y + pos.y][x + pos.x] = value; //[0, 0] [0, 1] [0, 2] [1, 0] [1, 1] [1, 2]
			}
		});
	}); 
}

function eliminateArena()
{
	start: for (let y = 0; y < arena.length; y++){
		for (let x = 0; x < arena[y].length; x++){
			if (arena[y][x] === 0){
				continue start;
			}
		}
		arena.splice(y, 1);
		arena.unshift(new Array(arena[0].length).fill(0));
	}
}

/*判断对于arena来说 player的输入是外界输入，需要判断合法性*/
function collide(arena, player){
	const [pos, matrix] = [player.pos, player.block];
	
	/*
	在forEach里break是没有用的，因为这里forEach是个函数，是肯定都要执行的。 所以这里用forEach不合适。
	*/
	
	for (let y = 0; y < matrix.length; ++y){
		for (let x = 0; x < matrix[y].length; ++x){
			//console.log("-pos origin(" + y + ", " + x + "), matrix pos is " + matrix[y][x]);
			if (matrix[y][x] !== 0 && 
				(arena[y + pos.y] && 
				arena[y + pos.y][x + pos.x]) !== 0){
				return true;
			}
		}
	}
	
	return false;
}

const player = new Player({x: 2, y: 2}, 0);

const arena = createMatrix(12, 20);


function draw(){
	/*renew back ground*/
	context_bkg.fillStyle = '#000';
	context_bkg.fillRect(0, 0, canvas_bkg.width, canvas_bkg.height);
	drawMatrix(arena, {x: 0, y: 0});
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
	eliminateArena();
	draw();
	requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
	if (event.keyCode === 37){ // left
		player.moveHorizontally(-1);
		if (collide(arena, player))
		{
			player.moveHorizontally(1);
		}
	} else if (event.keyCode === 39){
		player.moveHorizontally(1);
		if (collide(arena, player))
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