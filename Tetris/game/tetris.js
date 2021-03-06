class Tetris
{
	/* 这里传html的document就没意义，最终它是要画不同的tetris，canvas是不同的 包括class是game的div的里面的score等所有元素都是不同的
		所以要改成传特定的game的div或者特定的canvas都可以
	*/
	constructor(canvas, index)
	{
		this.canvas_bkg = canvas;
		this.context_bkg = this.canvas_bkg.getContext('2d');    /*never change*/
		this.context_bkg.scale(20, 20);

		this.arena = new Arena(12, 20);
		this.player = new Player({x: 2, y: 2}, 0, this.arena);
		this.index = index;

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
			let row = this.arena.eliminate();
			this.player.updateScore(row * 10);
			this.draw();
			requestAnimationFrame(update);
		}

		update();
	}

	_drawMatrix(matrix, offset){
		matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value !== 0){
					this.context_bkg.fillStyle = colorarr[value - 1];
					this.context_bkg.fillRect(x + offset.x, y + offset.y, 1, 1);
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
		document.getElementById("score_" + this.index).innerText = this.player.score;
	}

}