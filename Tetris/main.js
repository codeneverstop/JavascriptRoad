const canvas_bkg = document.getElementById('bkg');
const context_bkg = canvas_bkg.getContext('2d');    /*never change*/

const matrix = [
	[0, 0, 0],
	[1, 1, 1],
	[0, 1, 0],
];

context_bkg.scale(20, 20);

context_bkg.fillStyle = '#000';
context_bkg.fillRect(0, 0, canvas_bkg.width, canvas_bkg.height);

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

const player = {
	pos: {x: 2, y: 2},  //属性是冒号
	matrix: matrix,     //最后是逗号
}  //没有分号


function draw(){
	drawMatrix(player.matrix, player.pos);
}

function update(){
	draw();
	requestAnimationFrame(update);
}

update();