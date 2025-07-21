import { forwardRef, useRef, useState, useEffect, useCallback } from "react";
import Ball from "./ball";
import Obstacle from "./obstacle";

class Hole {
	constructor(x, y, r, width, height) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.width = width;
		this.height = height;
		this.dr = 0;
	}
	update() {
		this.y -= 4;
		this.dr += 0.2;
		this.r += this.dr;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fillStyle = "#EBECF2";
		ctx.fill();
		ctx.closePath();
	}
}

const Game = (props) => {
	const [gameStarted, setGameStarted] = useState(false);
	const [bang, setBang] = useState(false);
	const isBang = useState(false);
	const isGameOver = useRef(false);

	useEffect(() => {
		setGameStarted(props.gameStarted);
	}, [props.gameStarted]);

	const canvasRef = useRef(null);
	const ctx = useRef(null);
	const ball = useRef();
	const hole = useRef();
	const obstacles = useRef();

	const canvasWidth = useRef();
	const canvasHeight = useRef();
	const animationFrameId = useRef();

	const gameLostMsg = "沒解出來";
	const gameWonMsg = "順利畢業";

	// Main functions
	const animate = useCallback(() => {
		// Immediately returns if game is over
		if (isGameOver.current) {
			return;
		}

		if (isBang.current) {
			ctx.current.clearRect(
				0,
				0,
				ctx.current.canvas.width,
				ctx.current.canvas.height
			);

			hole.current.update();
			hole.current.draw(ctx.current);

			obstacles.current.forEach((obstacle) => {
				obstacle.update();
				obstacle.draw(ctx.current);
			});

			animationFrameId.current = requestAnimationFrame(animate);

			if (
				hole.current.r * hole.current.r >
				(ctx.current.canvas.width * ctx.current.canvas.width) / 4 +
					(ctx.current.canvas.height * ctx.current.canvas.height) / 4
			) {
				isGameOver.current = true;
				cancelAnimationFrame(animationFrameId);
				props.done();
				return;
			}
		}

		if (!isBang.current) {
			ctx.current.clearRect(
				0,
				0,
				ctx.current.canvas.width,
				ctx.current.canvas.height
			);

			hole.current.draw(ctx.current);

			obstacles.current.forEach((obstacle) => {
				obstacle.draw(ctx.current);
			});

			ball.current.update();
			ball.current.draw(ctx.current);

			animationFrameId.current = requestAnimationFrame(animate);

			if (ball.current.y > hole.current.y) {
				isBang.current = true;
			}
		}
	}, [props, isBang]);

	const startGame = useCallback(() => {
		const canvas = canvasRef.current;
		ctx.current = canvas.getContext("2d");
		isGameOver.current = false;

		canvasWidth.current = window.innerWidth;
		canvasHeight.current = window.innerHeight;

		canvasRef.current.width = canvasWidth.current;
		canvasRef.current.height = canvasHeight.current;

		ball.current = new Ball(
			canvasWidth.current / 2,
			50,
			canvasHeight.current / 45,
			canvasWidth.current,
			canvasHeight.current
		);

		hole.current = new Hole(
			canvasWidth.current / 2,
			(canvasHeight.current * 6) / 7,
			50
		);

		// 產生0~1的隨機數
		function rand() {
			return Math.random();
		}

		// 產生0~360的隨機數
		function randAngle() {
			return Math.random() * 360;
		}

		// 將角度轉換為弧度
		function degToRad(deg) {
			return (deg * Math.PI) / 180;
		}

		// 初始化障礙物陣列
		obstacles.current = [];

		// 創建20個新的障礙物並添加到陣列中
		for (let i = 0; i < 60; i++) {
			let r = ((rand() * canvasHeight.current) / 45) * 3;
			let angle = degToRad(randAngle());
			let x = canvasWidth.current / 2 + r * Math.cos(angle);
			let y = (canvasHeight.current * 6) / 7 + r * Math.sin(angle);
			let color = Math.round(rand()); // 隨機產生0或1

			obstacles.current.push(
				new Obstacle(x, y, canvasHeight.current / 45, color, angle)
			);
		}

		if (animationFrameId !== undefined) {
			cancelAnimationFrame(animationFrameId);
		}

		animationFrameId.current = requestAnimationFrame(animate);
		props.afterStart();
	}, [animate, props]);

	useEffect(() => {
		if (gameStarted) {
			startGame();
		}
		// Similar to componentWillUnmount:
		return () => {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
			}
		};
	}, [gameStarted, startGame, animationFrameId]);

	return (
		<>
			<canvas ref={canvasRef}></canvas>
			{/* <h2 className="text-white">{isBang.toString()}</h2> */}
		</>
	);
};

export default forwardRef(function FissionGame(props, ref) {
	return <Game {...props} forwardedRef={ref} />;
});
