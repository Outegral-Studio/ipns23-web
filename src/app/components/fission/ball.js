class Ball {
	constructor(x, y, radius, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.radius = radius;
		this.dx = 0;
		this.dy = 0;
		this.history = [];
		this.count = 0;
	}

	update() {
		this.x = this.width / 2;
		this.dy += this.count * 0.04;
		this.y += this.dy;
		this.count += 1;

		if (this.count % 5 == 0) {
			if (this.history.length > 50) {
				// Limit the length of the trail
				this.history.shift();
			}
			this.history.push({ x: this.x, y: this.y });
		}
	}

	draw(ctx) {
		// Draw the ball's path
		ctx.save();
		for (let i = 0; i < this.history.length; i++) {
			const pos = this.history[i];
			const alpha = (i + 1) / this.history.length; // Calculate the alpha value based on the position in the history
			ctx.beginPath();
			ctx.arc(pos.x, pos.y, 3, 0, Math.PI * 2); // Draw a small circle at the position
			ctx.fillStyle = `rgba(180, 180, 180, ${alpha})`; // Set the color to black with the calculated alpha value
			ctx.fill();
			ctx.closePath();
		}
		ctx.restore();

		// Draw the ball
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = "#FFA741";
		ctx.fill();
		ctx.closePath();
	}

	collidesWith(obstacle) {
		// Find the position of the ball's center relative to the center of the obstacle
		const dx = this.x - (obstacle.x + obstacle.r / 2);
		const dy = this.y - (obstacle.y + obstacle.r / 2);

		// Rotate this position back by the rotation of the obstacle
		const rotatedX =
			dx * Math.cos(obstacle.rotation) + dy * Math.sin(obstacle.rotation);
		const rotatedY =
			dy * Math.cos(obstacle.rotation) - dx * Math.sin(obstacle.rotation);

		// Check if this position is inside the obstacle
		if (Math.pow(dx, 2) + Math.pow(dy, 2) < obstacle.r) {
			return true;
		}

		return false;
	}
}

export default Ball;
