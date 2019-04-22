class Arena
{
	constructor(width, height)
	{
		this.pos = {x: 0, y: 0};
		this.arena = [];
		for (let y = 0; y < height; y++)
		{
			this.arena.push(new Array(width).fill(0));
		}
	}

	isCollideWithPlayer(player)
	{
		const [pos, matrix] = [player.pos, player.block];
	
		/*
		在forEach里break是没有用的，因为这里forEach是个函数，是肯定都要执行的。 所以这里用forEach不合适。
		*/
		
		for (let y = 0; y < matrix.length; ++y)
		{
			for (let x = 0; x < matrix[y].length; ++x){
				//console.log("-pos origin(" + y + ", " + x + "), matrix pos is " + matrix[y][x]);
				if (matrix[y][x] !== 0 && 
					(this.arena[y + pos.y] && 
					this.arena[y + pos.y][x + pos.x]) !== 0){
					return true;
				}
			}
		}
		
		return false;
	}

	eliminate()
	{
		start: for (let y = 0; y < this.arena.length; y++)
		{
			for (let x = 0; x < this.arena[y].length; x++)
			{
				if (this.arena[y][x] === 0)
				{
					continue start;
				}
			}
			this.arena.splice(y, 1);
			this.arena.unshift(new Array(this.arena[0].length).fill(0));
		}
	}

	merge(player)
	{
		const [pos, matrix] = [player.pos, player.block];
		matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value !== 0){
					this.arena[y + pos.y][x + pos.x] = value;
				}
			});
		}); 
	}
}