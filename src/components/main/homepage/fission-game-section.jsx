"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Fission Game
import FissionGame from "./fission/game";

// Components & UI
import { Button } from "@/components/ui/button";
import { H1, H2 } from "@/components/common/typography";

// Icons & Images
import { RotateCw } from "lucide-react";



export function FissionGameSection() {
    const [done, setDone] = useState(false);
    const [started, setStarted] = useState(false);

	return (
		<section className={cn("relative h-lvh isolate", done ? "bg-zinc-50 text-zinc-950" : "bg-foreground dark:bg-background")}>
			<H2 className="absolute bottom-0 left-0 p-6 xs:p-12 max-sm:text-3xl text-muted-foreground text-balance whitespace-pre-wrap">
				{done
					? "我們將在不同領域\n燒壞他們的蓋格計數器"
					: "畢業作為起始條件\n找到各自的出路，然後..."
				}
			</H2>

			{done ? (
				<Button
					variant="ghost"
					size="icon"
					className="absolute top-0 right-4 size-12 m-4 z-1"
					onClick={(() => setDone(false))}
				>
					<RotateCw />
				</Button>
			) : (
				<div className="grid absolute inset-0 pointer-events-none z-1">
					<FissionGame
						gameStarted={started}
						afterStart={() => setStarted(false)}
						done={() => setDone(true)}
					/>
				</div>
			)}

			<div className="grid items-center justify-items-center size-full">
				{done ? (
					<H1 className="text-center whitespace-pre-wrap" asChild>
						<p>{`將能量\n輻射全世界\n!!!`}</p>
					</H1>
				) : (
					<>
						<Button
							variant="nothing"
							className="inline-grid h-auto text-white animate-pulse"
							onClick={() => setStarted(true)}
						>
							<span className="text-lg font-light animate-bounce">點擊我</span>
							<H2 className="m-0" asChild>
								<span>從原科院學士班畢業</span>
							</H2>
						</Button>
						<H2 className="m-0 text-white" asChild>
							<span>世界</span>
						</H2>
					</>
				)}
			</div>
		</section>
	);
}