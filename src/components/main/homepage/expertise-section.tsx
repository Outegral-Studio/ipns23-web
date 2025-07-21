"use client";
import { useEffect, useRef, useState } from "react";
import { match } from "ts-pattern";
import { cn } from "@/lib/utils";

// Components & UI
import { H2 } from "@/components/common/typography";
import { WrapperLayout } from "@/components/common/layouts";

// Constants & Variables
const FIRST_EXPERTISES = ["能源", "醫環", "修爆"];
const SECOND_EXPERTISES = ["電機", "資工", "物理", "計財", "材料", "化學", "工科", "醫環", "生科", "人社"];



export function ExpertiseSection() {
	return (
		<section className="relative h-lvh bg-primary text-primary-foreground">
			<H2 className="absolute bottom-0 right-4 p-6 sm:p-12 max-sm:text-3xl text-right text-balance">
				這個方程式有 <i>(2N)<sup className="align-super text-[0.5em]">20</sup></i> 個自由度
			</H2>
			<WrapperLayout className="grid content-center items-center gap-4 h-full">
				<span className="text-center">用滾輪選擇你的一二專長</span>
				<div className="flex justify-around">
					<Menu items={FIRST_EXPERTISES} />
					<Menu items={SECOND_EXPERTISES} />
				</div>
			</WrapperLayout>
		</section>
	);
}

// TODO: Maybe motion/react?
export default function Menu({ items }: { items: string[] }) {
	const ref = useRef<HTMLDivElement>(null);

	// Create a new array where the active item is always in the middle
	const [active, setActive] = useState(0);
	const orderedItems = [
		items[(active - 1 + items.length) % items.length],
		items[active],
		items[(active + 1) % items.length],
	];

	useEffect(() => {
		function handleScroll(e: WheelEvent) {
			e.preventDefault();
			e.stopPropagation();

			if (e.deltaY > 0) {
				setActive((prevactive) => (prevactive + 1) % items.length);
			} else {
				setActive(
					(prevactive) => (prevactive - 1 + items.length) % items.length
				);
			}
		};

		const container = ref.current;
		if (!container) return;

		container.addEventListener("wheel", handleScroll, { passive: false });
		return () => container.removeEventListener("wheel", handleScroll);
	}, [ref, items.length]);

	return (
		<div
			ref={ref}
			className={cn(
				"grid place-content-center md:px-8 py-8 xs:py-12 perspective-normal overflow-hidden",
				"text-5xl xs:text-7xl sm:text-7xl tracking-widest leading-tight"
			)}
		>
			{orderedItems.map((item, index) => (
				<span
					key={item}
					data-position={match(index)
						.with(0, () => "top")
						.with(1, () => "active")
						.with(2, () => "bottom")
						.otherwise(() => "hidden")
					}
					className={cn(
						"block w-max px-2 font-medium text-muted-foreground transition-[transform,font-weight] ease-out-quint duration-1000",
						"data-[position=top]:rotate-x-45 data-[position=top]:scale-90",
						"data-[position=active]:rotate-0 data-[position=active]:scale-110 data-[position=active]:font-bold data-[position=active]:text-primary-foreground",
						"data-[position=bottom]:-rotate-x-45 data-[position=bottom]:scale-90",
						"data-[position=hidden]:hidden",
					)}
				>
					{item}
				</span>
			))}
		</div>
	);
}