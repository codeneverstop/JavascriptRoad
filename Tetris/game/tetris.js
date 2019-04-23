class Tetris
{
	constructor(htmlDocument, arena, player)
	{
		this.document = htmlDocument;
		this.canvas_bkg = this.document.getElementById('bkg');
		this.context_bkg = this.canvas_bkg.getContext('2d');    /*never change*/
		this.context_bkg.scale(20, 20);

		this.arena = new Arena(12, 20);
		this.player = new Player({x: 2, y: 2}, 0, this.arena);

		let lastTime = 0;
		
		//必须要用指针，否则在tetrisAddEventListener上下文，this就是不是tetris实例了。
		const update = (time = 0) => {  
			const deltaTime = time - lastTime;
			lastTime = time;
			dropCounter += deltaTime;
			if (dropCounter > dropInterval)
			{
				this.player.drop(1);
			}
			this.arena.eliminate();
			this.draw();
			requestAnimationFrame(update);
		}

		this.tetrisAddEventListener();
		update();
	}

	_drawMatrix(matrix, offset){
		matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value !== 0){
					//console.log("x is " + x + " y is " + y + ", value is " + value);
					this.context_bkg.fillStyle = colorarr[value - 1];
					this.context_bkg.fillRect(x + offset.x, y + offset.y, 1, 1);
					//context_bkg.fillRect(x * 20, y * 20, 20, 20); //等于scale 20
				}
			}); 
		});
	}

	draw(){
		/*renew back ground*/
		this.context_bkg.fillStyle = '#000';
		this.context_bkg.fillRect(0, 0, this.canvas_bkg.width, this.canvas_bkg.height);
		this._drawMatrix(this.arena.arena, {x: 0, y: 0});
		this._drawMatrix(this.player.block, this.player.pos);
	}

	tetrisAddEventListener(){
		this.document.addEventListener('keydown', event => {
			if (event.keyCode === 37){ // left
				this.player.moveHorizontally(-1);
				if (this.arena.isCollideWithPlayer(this.player))
				{
					this.player.moveHorizontally(1);
				}
			} else if (event.keyCode === 39){
				this.player.moveHorizontally(1);
				if (this.arena.isCollideWithPlayer(this.player))
				{
					this.player.moveHorizontally(-1);
				}
			} else if (event.keyCode === 40){
				this.player.drop(1);
			} else if (event.keyCode === 81){
				this.player.rotate(-1);
			} else if (event.keyCode === 87){
				this.player.rotate(1);
			}

		});
	}
}