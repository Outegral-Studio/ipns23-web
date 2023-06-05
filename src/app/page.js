"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, forwardRef, useImperativeHandle } from "react";
import useElementPos from "./components/useElementsPos";
import bannerImg from "../../public/img/Banner.jpg";

export default forwardRef(function Home(props, ref) {
    const headingRef = useRef(null);
    const classmateRef = useRef(null);
    const articleRef = useRef(null);
    const memoryRef = useRef(null);
    useImperativeHandle(ref, () => ({
        headingRef,
        classmateRef,
        articleRef,
        memoryRef,
    }));

	return (
        <div className="relative overflow-hidden">
            <header className="banner flex relative h-screen h-[100svh] overflow-hidden">
                <div className="grid absolute right-1/8 max-w-min h-fit place-items-end gap-y-[10em] p-6
                                top-24 md:top-auto md:self-center">
                    <h1 className="w-max tracking-[0.4em]" style={{ writingMode: "vertical-rl" }} ref={headingRef}>
                        多原<br />方程式
                    </h1>
                    <span className="hidden md:block text-[0.875em] font-bold tracking-widest">
                        原科 <i>23</i> 畢業紀念
                    </span>
                </div>
                <div className="grid relative max-w-fit self-center place-items-start gap-y-12 lg:ml-20 -z-1">
                    <div className="opacity-70 lg:opacity-100 lg:w-[50vw]">
                        <div className="block lg:hidden absolute w-full h-full bg-white/30
                                        backdrop-blur-sm backdrop-contrast-150 z-1"></div>
                        <Image
                            src={bannerImg}
                            alt="Photo of IPNS 23rd members"
                            className="relative h-screen object-cover aspect-[5/4]
                                       lg:h-fit lg:rounded-[3em] lg:aspect-video"
                            priority
                        />
                    </div>
                    <span className="absolute max-w-fit text-[3em] font-bold tracking-widest
                                     place-self-center bottom-1/4
                                     md:place-self-start md:relative">
                        <i>IPNS 23rd</i>
                    </span>
                </div>
            </header>

            <main>
                <article>
                    <ClassmateSec ref={classmateRef}/>
                    <ArticleSec ref={articleRef} />
                    <MemorySec ref={memoryRef} />
                </article>
            </main>
            <Slash headingRef={headingRef} classmateRef={classmateRef} articleRef={articleRef} memoryRef={memoryRef} />
        </div>
	);
})



function Slash({ headingRef, classmateRef, articleRef, memoryRef }) {
    const headingPos = useElementPos(headingRef);
    const classmateSecPos = useElementPos(classmateRef);
    const articleSecPos = useElementPos(articleRef);
    const memorySecPos = useElementPos(memoryRef);
    console.log(headingPos);
    let x =0, y = 0, r = 0;
    if(headingPos[1] <= 1000) {
        x = headingPos[0] - 20;
        y = headingPos[1];
        r = -20;
    }
    else if(memorySecPos[1] <= 300) {
        x = 70;
        y = -10;
    }
    else if(articleSecPos[1] <= 300) {
        x = -60;
        y = -60;
    }
    else if(classmateSecPos[1] <= 300) {
        x = 60;
        y = 30;
    }

    return (
        <motion.div className="absolute top-0 left-0 w-[max(3vw,_3vh)] h-[max(15vw,_15vh)] bg-black"
                    style={{transform: `translate(${x}px, ${y}px) rotate(${r}deg)`}}>
        </motion.div>
    );
}



const ClassmateSec = forwardRef(function ClassmateSec(props, ref) {
    return (
        <section ref={ref}>
            <h2>Classmate Section</h2>
        </section>
    );
});

const ArticleSec = forwardRef(function ArticleSec(props, ref) {
    return (
        <section ref={ref}>
            <h2>Article Section</h2>
        </section>
    );
});

const MemorySec = forwardRef(function MemorySec(props, ref) {
    return (
        <section ref={ref}>
            <h2>Memory Section</h2>
        </section>
    );
});