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

class Player
{
	constructor(pos, matrix_type)
	{
		this.pos = pos;
		this.block = matrix_block[matrix_type];
	}

	reset()
	{
		this.pos.y = 2;
		this.pos.x = 3;//canvas_bkg.width / 20 / 2 - 1;
		//A NEW RECT
		var type = Math.random() * colorarr.length| 0;
		console.log("type is " + type);
		this.block = matrix_block[type];
	}

	moveHorizontally(x_len)
	{
		this.pos.x += x_len;
	}

	drop(height)
	{
		this.pos.y += height;

		if (collide(arena, this)){
			console.log("collide --------------------------");
			this.pos.y--;
			merge(arena, this);
			//start again
			this.reset();
			if (collide(arena, this))
			{
				//TODO: back to menu
				for (var i = 0; i < arena.length; i++) {
					for (var j = 0; j < arena[i].length; j++) {
						arena[i][j] = 0;
					}
				}
				console.log("GAME OVER!");
			}
		}
		dropCounter = 0;
	}

	rotate(dir)
	{
		for (let y = 0; y < this.block.length; y++){
		for (let x = 0; x < y; x++){
				[
					this.block[x][y],
					this.block[y][x],
				] = [
					this.block[y][x],
					this.block[x][y],
				]
			}
		}

		//TODO: dir should be an enum
		if (dir > 0){
			this.block.forEach(row => row.reverse());
		} else {
			this.block.reverse(); 
		}
	}

	draw()
	{

	}
}