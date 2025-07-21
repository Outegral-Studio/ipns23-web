// Components & UI
import Image from "next/image";
import { H1 } from "@/components/common/typography";
import {
    Chat,
    ExpertiseSec,
    BrownGameSec,
    FissionGameSec,
    Ending
} from "@/components/main/sections";

// Icons & Images
import { ChevronDown } from "lucide-react";



export default function Homepage() {
    return (
        <>
            <div id="main-layout" className="grid relative overflow-hidden">
                <header className="banner flex relative h-svh overflow-hidden">
                    <div className="grid absolute lg:right-1/8 w-full lg:max-w-min h-fit place-items-center lg:place-items-end gap-y-[10em] p-6 top-20 lg:top-1/5">
                        <H1 className="w-max xl:text-[6em] leading-normal tracking-[0.4em] [writing-mode:_vertical-rl]">
                            多原<br />方程式
                        </H1>
                    </div>
                    <span className="hidden md:block absolute right-1/8 bottom-1/8 text-[0.875em] font-bold tracking-widest z-1">
                        原科 <i>23</i> 畢業紀念
                    </span>
                    <div className="grid relative max-w-fit self-center place-items-start gap-y-12 lg:ml-20 -z-1">
                        <div className="opacity-10 lg:opacity-100 lg:w-[50vw]">
                            <div className="block lg:hidden absolute w-full h-full bg-white/30
                                            backdrop-blur-sm backdrop-contrast-150 z-1"></div>
                            <Image
                                src="https://foxp9d4zmo.ufs.sh/f/bge15WcC0SevDNktzsAbMN8qRHyJExPiwpLoKsd34nFX2cbB"
                                alt="Photo of IPNS 23rd members"
                                width={3600} height={2400}
                                className="relative h-screen object-cover aspect-[5/4]
                                        lg:h-fit lg:rounded-[3em] lg:aspect-video"
                                quality={100}
                                priority
                            />
                        </div>
                        <span className="absolute max-w-fit text-[3em] font-bold tracking-widest
                                        place-self-center bottom-1/4
                                        lg:place-self-start lg:relative">
                            <i>IPNS 23rd</i>
                        </span>
                    </div>
                    <div className="grid absolute w-fit bottom-20 left-0 right-0 place-items-center mx-auto gap-4 text-secondary">
                        <ChevronDown />
                        <span className="font-light animate-bounce">往下滑動開始你的證明</span>
                    </div>
                </header>

                <main>
                    <article>
                        <Chat />
                        <ExpertiseSec />
                        <BrownGameSec />
                        <FissionGameSec />
                        <Ending />
                    </article>
                </main>
            </div>
        </>
    );
}