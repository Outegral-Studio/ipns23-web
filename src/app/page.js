"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import bannerImg from "../../public/img/Banner.jpg";
import Menu from "./components/3DMenu";
import BrownGame from "./components/brown/game";

export default function Homepage() {
    return (
        <>
            <div id="main-layout" className="grid relative overflow-hidden">
                <header className="banner flex relative h-screen h-[100svh] overflow-hidden">
                    <div className="grid absolute right-1/8 max-w-min h-fit place-items-end gap-y-[10em] p-6
                                    top-24 md:top-1/5 md:self-center">
                        <h1 className="w-max xl:text-[6em] tracking-[0.4em]" style={{ writingMode: "vertical-rl" }}>
                            多原<br />方程式
                        </h1>
                    </div>
                    <span className="hidden md:block fixed right-1/8 bottom-1/8 text-[0.875em] font-bold tracking-widest z-1">
                            原科 <i>23</i> 畢業紀念
                    </span>
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
                                        lg:place-self-start lg:relative">
                            <i>IPNS 23rd</i>
                        </span>
                    </div>
                    <div className="absolute w-fit bottom-16 left-0 right-0 mx-auto">
                        <span className="font-light text-gray-400">往下滑動開始你的證明</span>
                    </div>
                </header>

                <main>
                    <article>
                        <Chat />
                        <ExpertiseSec />
                        <BrownGameSec />
                        <Fission />
                        <END />
                    </article>
                </main>
            </div>
        </>
	);
}



function Chat() {
    return (
        <section className="flex place-items-center min-h-screen">
            CHAT
        </section>
    );
}

function ExpertiseSec() {
    const menuItems1 = ['能源', '醫環', '修爆'];
    const menuItems2 = ['電機', '資工', '物理', '計財', '材料', '化學', '工科', '醫環', '生科', '人社'];

    return (
        <section className="flex place-items-center min-h-screen">
            <div className="grid place-items-center gap-5">
                <div className="flex w-screen place-content-around">
                    <Menu items={menuItems1} />
                    <Menu items={menuItems2} />
                </div>
                <h2 className="text-center">這方程式有 <i>(2N) <span className="align-super text-[0.5em]">20</span></i> 個自由度</h2>
            </div>
        </section>
    );
}

function BrownGameSec() {
    const ref = useRef(null)
    const isInView = useInView(ref)
    const [started, setStarted] = useState(false);
    const [reset, setReset] = useState(false);

    // Start new game when ref is in view
    useEffect(() => {
        if(isInView){
            setStarted(isInView);
            console.log(isInView);
        }

    }, [isInView]);

    function handleResetComplete() {
        setReset(false);
    }
    function handleStartComplete() {
        setStarted(false);
    }

    return (
        <section className="grid min-h-screen relative">
            <div className="place-items-center grid justify-items-start-col absolute inset-x-0 top-0 pt-20">
                <button onClick={() => setReset(true)} className="text-center p-10 z-10">重置遊戲</button>
                <div className="text-center text-black/50 z-0">
                    <h2 className="">並且不存在解析解<br />只好蒙地卡羅</h2>
                    <span className="">保護好你的高能粒子<br />不要被鉛板吸收</span>

                </div>
                                
            </div>
            
            <div className="grid z-8">
                <div className="h-60 sm:h-0"></div>
                <BrownGame gameStarted={started}
                        reset={reset}
                        afterReset={handleResetComplete}
                        afterStart={handleStartComplete} />
            </div>
            <div ref={ref} className="z-6 absolute inset-x-0 bottom-20"></div>
        </section>
    );
}


function Fission() {
    const menuItems1 = ['能源', '醫環', '修爆'];
    const menuItems2 = ['電機', '資工', '物理', '計財', '材料', '化學', '工科', '醫環', '生科', '人社'];
    const [Shoot, setShoot] = useState(false);
    const [Done, setDone] = useState(false);
    useEffect(() => {
        setDone(Shoot)
    }, [Shoot]);


    if(!Done){
        return (
            <section className="min-h-screen relative bg-primary-invert">
                <div className="flex h-screen grid place-items-center gap-5 justify-around">
                    <button onClick={() => setShoot(true)} className="h2 text-white">畢業</button>
                    <h2 className="text-white">世界</h2>
                </div>

                <h2 className="absolute bottom-10 left-10 text-white/25">畢業作為起始條件<br />找到各自的出路，然後...</h2>
            </section>
        );
    }
    else{
        return (
        <section className="min-h-screen relative bg-primary">
            <button onClick={() => setShoot(false)} className="text-black">畢業</button>
            <div className="flex h-screen grid place-items-center gap-5 justify-around">
                <div className="place-items-center grid" >
                    <h2 className="text-black text-center">將能量<br />輻射全世界</h2>
                    <h2 className="text-accent-color">!!!</h2>
                </div>
                
            </div>

            <h2 className="absolute bottom-10 left-10 text-black/25">我們將在不同領域<br />燒壞他們的蓋格計數器</h2>
        </section>
        );
    };
}


function END() {
    const [Shoot, setShoot] = useState(false);
    const [Done, setDone] = useState(false);
    useEffect(() => {
        setDone(Shoot)
    }, [Shoot]);

    return(
        <header className="banner flex relative h-screen h-[100svh] overflow-hidden">
                    <div className="grid absolute right-1/8 max-w-min h-fit place-items-end gap-y-[10em] p-6
                                    top-24 md:top-1/5 md:self-center">
                        <h1 className="w-max xl:text-[6em] tracking-[0.4em]" style={{ writingMode: "vertical-rl" }}>
                            多原<br />方程式
                        </h1>
                    </div>
                    <div className="grid flex h-screen place-items-center">
                        <span className="text-[3em] font-bold ">
                            <i>IPNS 23rd</i>
                        </span>
                    </div>
                </header>
    );

}