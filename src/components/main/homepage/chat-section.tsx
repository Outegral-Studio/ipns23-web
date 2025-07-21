"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

// Components & UI
import { WrapperLayout } from "@/components/common/layouts";

// Types & Interfaces
import type { Variants } from "motion/react";
type Message = {
	text: string;
	side: "left" | "right";
};

// Constants & Variables
const MESSAGES: Message[] = [
	{ text: "什麼是「多原方程式」?", side: "right" },
	{ text: "這是個清大原科院學士班的必修方程式 !", side: "left" },
	{ text: "它跨領域又非線性所以非常不好解", side: "left" },
	{ text: "那你們有解出來嗎 ?", side: "right" },
	{ text: "我們 21 個人解出了 21 個線性獨立的特解 ...", side: "left" },
];
const CONTAINER_VARIANTS: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.2 } },
};
const CHILDREN_VARIANTS: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 25 } },
};



export function ChatSection() {
	const containerRef = useRef(null);
	const isInView = useInView(containerRef, {
		once: true,   // 只偵測一次
		amount: 0.1,  // 10% 元素進入可視區就觸發
	});

	return (
		<section className="h-lvh bg-muted">
			<WrapperLayout
				ref={containerRef}
				className="grid items-center h-full py-20 md:py-28"
			>
				<motion.div
					className="space-y-3"
					variants={CONTAINER_VARIANTS}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
				>
					{MESSAGES.map((bubble, index) => (
						<MessageBubble
							key={index}
							text={bubble.text}
							side={bubble.side}
						/>
					))}
				</motion.div>
			</WrapperLayout>
		</section>
	);
}

function MessageBubble({ text, side }: Message) {
	return (
		<motion.p
			data-side={side}
			className={cn(
				"[--size:_1.2em] md:[--size:_1.5em] xl:[--size:_1.65em]",
				"w-fit max-w-[70%] data-[side=right]:ml-auto px-(--size) py-[calc(0.5_*_var(--size))]",
				"font-bold text-(length:--size) bg-primary text-primary-foreground data-[side=left]:bg-accent data-[side=left]:text-accent-foreground",
				"rounded-(--size) data-[side=left]:rounded-bl-[calc(0.25_*_var(--size))] data-[side=right]:rounded-br-[calc(0.25_*_var(--size))]",
			)}
			variants={CHILDREN_VARIANTS}
		>
			{text}
		</motion.p>
	);
}