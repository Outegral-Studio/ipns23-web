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
                    <h1 className="w-max">
                        原科 23
                    </h1>
                    <p>
                        哈哈是我啦
                    </p>
                </div>
                <div className="banner-filter frost-50 absolute w-screen h-full -top-1/3 md:top-0 md:-left-2/4
                                skew-x-0 -skew-y-30 md:-skew-x-30 md:skew-y-0 -z-1"></div>
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
    let x = 0, y = 0;
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