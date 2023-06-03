"use client";
import Image from "next/image";
import { useRef, forwardRef, useImperativeHandle } from "react";
import useElementPos from "./components/useElementsPos";
import homepageImg from "../../public/img/HomepageImg.svg";

export default forwardRef(function Home(props, ref) {
    const classmateRef = useRef(null);
    const articleRef = useRef(null);
    const memoryRef = useRef(null);
    useImperativeHandle(ref, () => ({
        classmateRef,
        articleRef,
        memoryRef,
    }));

	return (
        <div>
            <header className="banner grid overflow-hidden place-content-center">
                <div className="grid max-w-min h-fit place-items-center gap-y-[1em] px-6">
                    <h1 className="w-max text-right tracking-[0.4em]">
                        多原<br />方程<br />式
                    </h1>
                    <span>
                        原科 23 畢業紀念
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
            <BannerImg classmateRef={classmateRef} articleRef={articleRef} memoryRef={memoryRef} />
        </div>
	);
})



function BannerImg({ classmateRef, articleRef, memoryRef }) {
    const classmateSecPos = useElementPos(classmateRef);
    const articleSecPos = useElementPos(articleRef);
    const memorySecPos = useElementPos(memoryRef);
    let x = 17.5, y = 12.5;
    if(memorySecPos <= 300) {
        x = 70;
        y = -10;
    }
    else if(articleSecPos <= 300) {
        x = -60;
        y = -60;
    }
    else if(classmateSecPos <= 300) {
        x = 60;
        y = 30;
    }

    return (
        <div className="grid fixed inset-0 place-content-center -z-2 transition-all ease-out-quint duration-1000 motion-reduce:duration-300"
             style={{transform: `translate(${x}%, ${y}%)`}}>
            <Image
                src={homepageImg}
                alt="Concept art of this website"
                className="max-w-none max-h-none scale-300"
                priority
            />
        </div>
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