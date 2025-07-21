"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { match } from "ts-pattern";

// Brown Game
import BrownGame from "./brown/game";

// Components & UI
import { Button } from "@/components/ui/button";
import { H2, H3, P } from "@/components/common/typography";

// Icons & Images
import { RotateCw } from "lucide-react";



// TODO: Refactor
export function BrownGameSection() {
	const containerRef = useRef(null);
	const isInView = useInView(containerRef, {
		once: true,
		amount: 0.4,
	});

	const [status, setStatus] = useState("playing"); // playing, fail, success
	const [started, setStarted] = useState(false);
	const [reset, setReset] = useState(false);

	// Start new game when ref is in view
	useEffect(() => {
		if (isInView) {
			setStarted(isInView);
			console.log(isInView);
		}
	}, [isInView]);

	const handleReset = () => {
		setReset(true);
		setStatus("playing");
	}

	function handleResetComplete() {
		setReset(false);
	}
	function handleStartComplete() {
		setStarted(false);
	}

	return (
		<section
			ref={containerRef}
			className="relative grid place-items-center h-svh"
		>
			<div className="absolute top-0 left-0 p-6 sm:p-12 text-muted-foreground text-balance">
				<H2 className="max-sm:text-3xl">這方程式不存在解析解<br />只好蒙地卡羅</H2>
				<P className="leading-relaxed">保護好你的高能粒子<br />不要被鉛板吸收</P>
			</div>

			{status !== "playing" && (
				<div className="z-10">
					{match(status)
						.with("success", () => (
							<Button
								variant="secondary"
								size="icon"
								className="flex-col size-32 p-4 text-lg rounded-sm shadow-md"
								onClick={handleReset}
							>
								<H3>恭喜畢業</H3>
								<div className="flex items-center gap-2">
									<RotateCw />
									<span>重新入學</span>
								</div>
							</Button>
						))
						.with("fail", () => (
							<Button
								variant="secondary"
								size="icon"
								className="flex-col size-32 p-4 text-lg rounded-sm shadow-md"
								onClick={handleReset}
							>
								<RotateCw className="size-6" />
								重修就好
							</Button>
						))
						.otherwise(() => null)
					}
				</div>
			)}

			<div className="absolute inset-x-0 bottom-0 w-screen h-fit">
				<BrownGame gameStarted={started}
					reset={reset}
					setStatus={setStatus}
					afterReset={handleResetComplete}
					afterStart={handleStartComplete} />
			</div>
		</section>
	);
}