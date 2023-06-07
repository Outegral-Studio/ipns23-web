import React from "react";
import Ball from "./Ball";
import Obstacle from "./Obstacle";

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.handleResize = this.handleResize.bind(this);
		this.obstacles = [];
		this.hole = {};
	}

	componentDidMount() {
		const canvas = this.canvasRef.current;
		this.ctx = canvas.getContext("2d");

		this.handleResize();
		window.addEventListener("resize", this.handleResize);

		canvas.addEventListener("touchstart", this.handleTouchStart);
		canvas.addEventListener("touchend", this.handleTouchEnd);
		canvas.addEventListener("touchmove", this.handleTouchMove);

		canvas.addEventListener("mousedown", this.handleMouseDown);
		canvas.addEventListener("mouseup", this.handleMouseUp);

		this.animationFrameId = requestAnimationFrame(this.animate);
	}

	resetGame() {
		this.canvasWidth = window.innerWidth;
		this.canvasHeight = window.innerHeight;

		this.canvasRef.current.width = this.canvasWidth;
		this.canvasRef.current.height = this.canvasHeight;
		this.ball = new Ball(
			this.canvasWidth / 2,
			50,
			this.canvasHeight / 45,
			this.canvasWidth,
			this.canvasHeight
		);
		this.hole = {
			x: this.canvasWidth / 2,
			y: (this.canvasHeight * 6) / 7,
			radius: 50,
		};

		this.obstacles = [
			new Obstacle(
				(this.canvasWidth * 3) / 5 - 80,
				(this.canvasHeight * 6) / 7 / 4,
				200,
				50,
				"高估自己"
			),
			new Obstacle(
				(this.canvasWidth * 2) / 9 - 80,
				(this.canvasHeight * 6) / 7 / 2,
				200,
				50,
				"放棄夢想"
			),
			new Obstacle(
				(this.canvasWidth * 3) / 7 - 80,
				(((this.canvasHeight * 6) / 7) * 3) / 4,
				200,
				50,
				"脊椎側彎"
			),
		];

		if (this.animationFrameId !== undefined) {
			cancelAnimationFrame(this.animationFrameId);
		}

		this.animationFrameId = requestAnimationFrame(this.animate);
	}

	handleResize() {
		this.resetGame();
	}

	handleMouseDown() {
		const canvas = this.canvasRef.current;
		canvas.addEventListener("mousemove", this.handleMouseMove);
	}

	handleMouseUp() {
		const canvas = this.canvasRef.current;
		canvas.removeEventListener("mousemove", this.handleMouseMove);
	}

	handleMouseMove(e) {
		const rect = this.canvasRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		this.ball.accelerateTowards(x, y);
	}

	handleTouchStart = (e) => {
		e.preventDefault();
		this.canvasRef.current.addEventListener("touchmove", this.handleTouchMove);
	};

	handleTouchEnd = (e) => {
		e.preventDefault();
		this.canvasRef.current.removeEventListener(
			"touchmove",
			this.handleTouchMove
		);
	};

	handleTouchMove = (e) => {
		e.preventDefault();
		const rect = this.canvasRef.current.getBoundingClientRect();
		const x = e.touches[0].clientX - rect.left;
		const y = e.touches[0].clientY - rect.top;

		this.ball.accelerateTowards(x, y);
	};

	animate = () => {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.ball.update();
		this.ball.draw(this.ctx);
		this.animationFrameId = requestAnimationFrame(this.animate);
		this.obstacles.forEach((obstacle) => {
			obstacle.update();
			obstacle.draw(this.ctx);
		});

		this.ctx.save();
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.fillStyle = "#000000";
		this.ctx.font = "900 45px 'Noto Sans'"; // font-style, font-weight, font-size, and font-family
		this.ctx.fillText("畢", this.hole.x - 26, this.hole.y);
		this.ctx.restore();

		this.ctx.save();
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.fillStyle = "#000000";
		this.ctx.font = "900 45px 'Noto Sans'"; // font-style, font-weight, font-size, and font-family
		this.ctx.fillText("業", this.hole.x + 26, this.hole.y);
		this.ctx.restore();

		// Other code as before

		if (this.ball.y > this.hole.y) {
			alert("沒解出來");
			cancelAnimationFrame(this.animationFrameId);
			return;
		}
		if (this.ball.x > this.canvasWidth || this.ball.x < 0) {
			alert("沒解出來");
			cancelAnimationFrame(this.animationFrameId);
			return;
		}

		this.obstacles.forEach((obstacle) => {
			if (this.ball.collidesWith(obstacle)) {
				alert("沒解出來");
				cancelAnimationFrame(this.animationFrameId);
				return;
			}
		});

		const dx = this.ball.x - this.hole.x;
		const dy = this.ball.y - this.hole.y;
		if (Math.sqrt(dx * dx + dy * dy) < this.ball.radius + this.hole.radius) {
			alert("順利畢業");
			cancelAnimationFrame(this.animationFrameId);
			return;
		}
	};

	componentWillUnmount() {
		cancelAnimationFrame(this.animationFrameId);
		window.removeEventListener("resize", this.handleResize);
		canvas.removeEventListener("touchstart", this.handleTouchStart);
		canvas.removeEventListener("touchend", this.handleTouchEnd);
		canvas.removeEventListener("touchmove", this.handleTouchMove);
	}

	render() {
		return <canvas ref={this.canvasRef} width={500} height={800}></canvas>;
	}
}

export default Game;
