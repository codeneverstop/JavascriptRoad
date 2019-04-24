class Player
{
	constructor(pos, matrix_type, arena)
	{
		this.pos = pos;
		this.block = matrix_block[matrix_type];
		this.arena = arena;
		this.score = 0;
	}

	reset()
	{
		this.pos.y = 2;
		this.pos.x = 3;//canvas_bkg.width / 20 / 2 - 1;
		var type = Math.random() * colorarr.length| 0;
		this.block = matrix_block[type];
	}

	moveHorizontally(x_len)
	{
		this.pos.x += x_len;
	}

	drop(height)
	{
		this.pos.y += height;

		if (this.arena.isCollideWithPlayer(this)){
			this.pos.y--;
			this.arena.merge(this);
			this.reset();
			if (this.arena.isCollideWithPlayer(this))
			{
				//TODO: back to menu
				for (var i = 0; i < this.arena.arena.length; i++) {
					for (var j = 0; j < this.arena.arena[i].length; j++) {
						this.arena.arena[i][j] = 0;
					}
				}
				player.score = 0;
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

	updateScore(score)
	{
		this.score += score;
	}
}