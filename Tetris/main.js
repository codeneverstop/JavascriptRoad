const canvas_bkg = document.getElementById('bkg');
const context_bkg = canvas_bkg.getContext('2d');    /*never change*/

const matrix = [
	[0, 0, 0],
	[1, 1, 1],
	[0, 1, 0],
];

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
				context_bkg.fillStyle = 'red';
				context_bkg.fillRect(x + offset.x, y + offset.y, 1, 1);
				//context_bkg.fillRect(x * 20, y * 20, 20, 20); 等于scale 20
			}
		}); 
	});
}

function playerDrop(){
	player.pos.y++;
	if (collide(arena, player)){
		console.log("collide --------------------------");
		player.pos.y--;
		merge(arena, player);
		//start again
		player.pos.y = 0;
	}
	dropCounter = 0;
}

function merge(arena, player){
	const [pos, matrix] = [player.pos, player.matrix];
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0){
				arena[y + pos.y][x + pos.x] = value; //[0, 0] [0, 1] [0, 2] [1, 0] [1, 1] [1, 2]
			}
		});
	}); 
}

/*判断对于arena来说 player的输入是外界输入，需要判断合法性*/
function collide(arena, player){
	const [pos, matrix] = [player.pos, player.matrix];
	
	/*
	collide_flag = false;
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			//if (arena[y + pos.y][x + pos.x] !== 0)
			console.log("+pos origin(" + y + ", " + x + "), matrix pos is " + matrix[y][x]);
			//console.log("pos real(" + (pos.y + y) + ", " + (pos.x + x) +"), arena real pos is " + arena[y + pos.y][x + pos.x]);
			if (matrix[y][x] !== 0)
			{
				if((arena[y + pos.y] && arena[y + pos.y][x + pos.x]) !== 0)
				{
					console.log("+collied");
					collide_flag = true;  //在这里break是没有用的，因为这里forEach是个函数，是肯定都要执行的。 所以这里用forEach不合适。
				}
			}
		});
	});
	return collide_flag;
	*/
	
	for (let y = 0; y < matrix.length; ++y){
		for (let x = 0; x < matrix[y].length; ++x){
			console.log("-pos origin(" + y + ", " + x + "), matrix pos is " + matrix[y][x]);
			if (matrix[y][x] !== 0 && 
				(arena[y + pos.y] && 
				arena[y + pos.y][x + pos.x]) !== 0){
				return true;
			}
		}
	}
	
	return false;
}

const player = {
	pos: {x: 2, y: 2},  //属性是冒号
	matrix: matrix,     //最后是逗号
}  //没有分号

const arena = createMatrix(12, 20);


function draw(){
	/*renew back ground*/
	context_bkg.fillStyle = '#000';
	context_bkg.fillRect(0, 0, canvas_bkg.width, canvas_bkg.height);
	drawMatrix(arena, {x: 0, y: 0});
	drawMatrix(player.matrix, player.pos);
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
		playerDrop();
	}

	draw();
	requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
	if (event.keyCode === 37){ // left
		player.pos.x--;
		if (collide(arena, player))
		{
			player.pos.x++;
		}
	} else if (event.keyCode === 39){
		player.pos.x++;
		if (collide(arena, player))
		{
			player.pos.x--;
		}
	} else if (event.keyCode === 40){
		playerDrop();
	}

});

update();