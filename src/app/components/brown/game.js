import { forwardRef, useRef, useState, useEffect, useCallback } from "react";
import Ball from "./ball";
import Obstacle from "./obstacle";

const Game = (props) => {
	const [gameStarted, setGameStarted] = useState(props.gameStarted);
	const [reset, setReset] = useState(false);
    const isGameOver = useRef(false);
	useEffect(() => {
		setGameStarted(props.gameStarted);
        setReset(props.reset);
	}, [props.gameStarted, props.reset]);

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



    // Event functions
	const handleMouseMove = useCallback((e) => {
		const rect = canvasRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		ball.current.accelerateTowards(x, y);
	}, []);

	const handleMouseDown = useCallback(() => {
		const canvas = canvasRef.current;
		canvas.addEventListener("mousemove", handleMouseMove);
	}, [handleMouseMove]);

	const handleMouseUp = useCallback(() => {
		const canvas = canvasRef.current;
		canvas.removeEventListener("mousemove", handleMouseMove);
	}, [handleMouseMove]);

	const handleTouchMove = useCallback((e) => {
		e.preventDefault();
		const rect = canvasRef.current.getBoundingClientRect();
		const x = e.touches[0].clientX - rect.left;
		const y = e.touches[0].clientY - rect.top;

		ball.current.accelerateTowards(x, y);
	}, []);

	const handleTouchStart = useCallback((e) => {
		e.preventDefault();
		canvasRef.current.addEventListener("touchmove", handleTouchMove);
	}, [handleTouchMove]);

	const handleTouchEnd = useCallback((e) => {
		e.preventDefault();
		canvasRef.current.removeEventListener("touchmove", handleTouchMove);
	}, [handleTouchMove]);



    // Main functions
	const animate = useCallback(() => {
        // Immediately returns if game is over
        if(isGameOver.current) {
            return;
        }

		ctx.current.clearRect(
			0,
			0,
			ctx.current.canvas.width,
			ctx.current.canvas.height
		);
		ball.current.update();
		ball.current.draw(ctx.current);
		animationFrameId.current = requestAnimationFrame(animate);
		obstacles.current.forEach((obstacle) => {
			obstacle.update();
			obstacle.draw(ctx.current);
		});



		ctx.current.save();
		ctx.current.textAlign = "center";
		ctx.current.textBaseline = "middle";
		ctx.current.fillStyle = "#000000";
		ctx.current.font = "900 45px 'Noto Sans TC'"; // font-style, font-weight, font-size, and font-family
		ctx.current.fillText("畢", hole.current.x - 26, hole.current.y);
		ctx.current.restore();

		ctx.current.save();
		ctx.current.textAlign = "center";
		ctx.current.textBaseline = "middle";
		ctx.current.fillStyle = "#000000";
		ctx.current.font = "900 45px 'Noto Sans TC'"; // font-style, font-weight, font-size, and font-family
		ctx.current.fillText("業", hole.current.x + 26, hole.current.y);
		ctx.current.restore();

		if(ball.current.y > canvasHeight.current) {
            isGameOver.current = true;
			cancelAnimationFrame(animationFrameId);
			const canvas = canvasRef.current;
			canvas.removeEventListener("touchstart", handleTouchStart);
			canvas.removeEventListener("touchend", handleTouchEnd);
			canvas.removeEventListener("touchmove", handleTouchMove);
			alert(gameLostMsg);
			return;
		}
		if(ball.current.x > canvasWidth.current || ball.current.x < 0) {
            isGameOver.current = true;
			cancelAnimationFrame(animationFrameId);
			const canvas = canvasRef.current;
			canvas.removeEventListener("touchstart", handleTouchStart);
			canvas.removeEventListener("touchend", handleTouchEnd);
			canvas.removeEventListener("touchmove", handleTouchMove);
			alert(gameLostMsg);
			return;
		}

		obstacles.current.forEach((obstacle) => {
			if(ball.current.collidesWith(obstacle)) {
                isGameOver.current = true;
				cancelAnimationFrame(animationFrameId);
				const canvas = canvasRef.current;
				canvas.removeEventListener("touchstart", handleTouchStart);
				canvas.removeEventListener("touchend", handleTouchEnd);
				canvas.removeEventListener("touchmove", handleTouchMove);
				alert(gameLostMsg);
				return;
			}
		});

		const dx = ball.current.x - hole.current.x;
		const dy = ball.current.y - hole.current.y;
		if(Math.sqrt(dx * dx + dy * dy) < ball.current.radius + hole.current.radius) {
            isGameOver.current = true;
			cancelAnimationFrame(animationFrameId);
			alert(gameWonMsg);
			return;
		}
	}, [handleTouchStart, handleTouchMove, handleTouchEnd]);

	const resetGame = useCallback(() => {
		canvasWidth.current = window.innerWidth;
		canvasHeight.current = window.innerHeight;
		const canvas = canvasRef.current;

		canvas.addEventListener("touchstart", handleTouchStart);
		canvas.addEventListener("touchend", handleTouchEnd);
		canvas.addEventListener("touchmove", handleTouchMove);

		canvas.addEventListener("mousedown", handleMouseDown);
		canvas.addEventListener("mouseup", handleMouseUp);

		canvasRef.current.width = canvasWidth.current;
		canvasRef.current.height = canvasHeight.current;
		ball.current = new Ball(
			canvasWidth.current / 2,
			50,
			canvasHeight.current / 45,
			canvasWidth.current,
			canvasHeight.current
		);
		hole.current = {
			x: canvasWidth.current / 2,
			y: (canvasHeight.current * 6) / 7,
			radius: 50,
		};

		obstacles.current = [
			new Obstacle(
				(canvasWidth.current * 5) / 7 - 80,
				(canvasHeight.current * 6) / 7 / 3.8,
				200,
				38,
				"分流去其他系"
			),
			new Obstacle(
				(canvasWidth.current * 2) / 9 - 80,
				(canvasHeight.current * 6) / 7 / 2,
				200,
				38,
				"高估自己實力"
			),
			new Obstacle(
				(canvasWidth.current * 3) / 7 - 80,
				(((canvasHeight.current * 6) / 7) * 3) / 4,
				200,
				38,
				"放棄夢想"
			),
		];

		if(canvasWidth.current > 1300) {
			obstacles.current.push(
				new Obstacle(
					(canvasWidth.current * 4) / 7 - 80,
					(((canvasHeight.current * 6) / 7) * 2.1) / 4,
					200,
					38,
					"脊椎側彎"
				)
			);
		}
		if(animationFrameId !== undefined) {
			cancelAnimationFrame(animationFrameId);
		}

		animationFrameId.current = requestAnimationFrame(animate);
        isGameOver.current = false;
		props.afterReset();
	}, [
		animate,
		handleMouseDown,
		handleMouseUp,
        handleTouchMove,
		handleTouchStart,
		handleTouchEnd,
        props
	]);

	const startGame = useCallback(() => {
		const canvas = canvasRef.current;
		ctx.current = canvas.getContext("2d");
		window.addEventListener("resize", resetGame);
		resetGame();
        isGameOver.current = false;
		props.afterStart();
	}, [resetGame, props]);


    
	// Start new game if gameStarted false => true
	// Similar to componentDidMount and componentDidUpdate:
	useEffect(() => {
		if(gameStarted) {
			startGame();
		}
		if(reset) {
			resetGame();
		}

		// Similar to componentWillUnmount:
		return() => {
			if(animationFrameId) {
				cancelAnimationFrame(animationFrameId);
			}
			window.removeEventListener("resize", resetGame);
		};
	}, [
		gameStarted,
		reset,
		animationFrameId,
	]);

	return (
		<canvas ref={canvasRef} width={500} height={800}></canvas>
	);
};

export default forwardRef(function BrownGame(props, ref) {
	return (
		<Game {...props} forwardedRef={ref} />
	);
});
