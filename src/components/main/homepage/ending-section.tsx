// Components & UI
import Link from "next/link";
import Image from "next/image";
import { H2 } from "@/components/common/typography";

// Constants & Variables
const LINKS = [
	{
		label: "同學",
		href: "/classmates"
	},
	{
		label: "照片",
		href: "/memories"
	},
];



// TODO: Refactor
export function EndingSection() {
	return (
		<header className="relative flex place-items-center h-lvh">
			<H2 className="absolute top-0 right-4 p-6 sm:p-12 max-sm:text-3xl text-muted-foreground text-right text-balance whitespace-pre-wrap">
				{`蒐藏此網站\n關注同學的生涯發展`}
			</H2>
			<div className="grid relative w-screen h-screen place-items-center">
				<div className="flex flex-col justify-around items-center lg:absolute lg:right-1/5 lg:w-[30vw] lg:h-fit lg:place-items-start lg:gap-5 lg:ml-20">
					{/* 主要標題 */}
					<span className="text-[3em] font-bold">
						<i>IPNS 23rd</i>
					</span>

					{/* 次標題 */}
					<h3 className="text-center py-5">立即查看更多</h3>

					{/* 導覽按鈕區域 */}
					<nav className="flex flex-row justify-around text-[0.875em] z-10 place-items-center w-full">
						<div className="panel w-full">
							<div
								id="primary-navbar-nav"
								aria-labelledby="navbar-control"
								role="region"
								className="place-items-center w-full"
							>
								<ul className="grid gap-x-[4.5em] gap-y-2 place-items-center w-full">
									{LINKS.map((link, index) => (
										<li key={index} className="w-full">
											<Link
												href={link.href}
												className="block px-4 w-full py-3 bg-gray-300 text-black text-xl text-center rounded-lg transition duration-300 ease-in-out delay-150 hover:scale-105 origin-bottom"
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					</nav>
				</div>

			</div>

			<div className="absolute -left-80 opacity-0 lg:opacity-100 lg:w-[50vw]">
				<Image
					src="https://foxp9d4zmo.ufs.sh/f/bge15WcC0SevDNktzsAbMN8qRHyJExPiwpLoKsd34nFX2cbB"
					alt="Photo of IPNS 23rd members"
					width={3600} height={2400}
					className="relative h-screen object-cover aspect-[5/4] lg:h-fit lg:rounded-[3em] lg:aspect-video"
				/>
			</div>
		</header>
	);
}