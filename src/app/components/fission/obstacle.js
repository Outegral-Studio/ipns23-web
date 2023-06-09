export default class Obstacle {
	constructor(x, y, r, color,theta, width, height) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.width = width;
		this.height = height;
		this.color = color;
		this.ddis = 0;
		this.dis = 0;
		this.theta = theta;
		this.rand = Math.random();
	}

	update() {
		this.y -= 4;
		this.ddis += 0.3 ;
		this.dis += this.ddis*(this.rand + 0.3);
	}

	draw(ctx) {

		ctx.beginPath();
		let r = this.dis;
		let angle = this.theta;
		ctx.ellipse(this.x + r * Math.cos(angle), this.y + r * Math.sin(angle),  this.r + 0.6*this.dis,this.r, this.theta, 0, Math.PI * 2);
		

		if(this.color === 1){
			ctx.fillStyle = "#DBDBDB";
		}
		else{
			ctx.fillStyle = "#FFA741";
		};
		ctx.fill();
		ctx.closePath();
	}
}
