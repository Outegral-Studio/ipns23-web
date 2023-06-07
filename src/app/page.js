"use client";
import Image from "next/image";
import { useRef } from "react";
import bannerImg from "../../public/img/Banner.jpg";
import Menu from "./components/3DMenu";
import Game from "./components/brown/game";

export default function Homepage() {
    return (
        <>
            
            <div className="grid relative overflow-hidden">
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
                                        md:place-self-start md:relative">
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
                        <Expertise />
                        {/* <BrownGame /> */}
                    </article>
                </main>
            </div>
        </>
	);
}



// function Slash({ articleRef }) {
//     const articleSecPos = useElementPos(articleRef);
//     console.log(headingPos);
//     let x =0, y = 0, r = 0;
//     if(headingPos[1] <= 1000) {
//         x = headingPos[0] - 20;
//         y = headingPos[1];
//         r = -20;
//     }
//     else if(memorySecPos[1] <= 300) {
//         x = 70;
//         y = -10;
//     }
//     else if(articleSecPos[1] <= 300) {
//         x = -60;
//         y = -60;
//     }
//     else if(classmateSecPos[1] <= 300) {
//         x = 60;
//         y = 30;
//     }

//     return (
//         <motion.div className="absolute top-0 left-0 w-[max(3vw,_3vh)] h-[max(15vw,_15vh)] bg-black"
//                     style={{transform: `translate(${x}px, ${y}px) rotate(${r}deg)`}}>
//         </motion.div>
//     );
// }



function Chat() {
    return (
        <section className="flex place-items-center min-h-screen">
            CHAT
        </section>
    );
}

function Expertise() {
    const menuItems = ['電機', '資工', '物理', '計財', '材料', '化學', '工科', '醫環', '生科', '人社'];

    return (
        <section className="flex place-items-center min-h-screen">
            <div className="grid place-items-center gap-5">
                <div className="flex w-screen place-content-around">
                    <Menu items={menuItems} />
                    <Menu items={menuItems} />
                </div>
                <h2 className="text-center">這方程式有 <i>(2N) <span className="align-super text-[0.5em]">21</span></i> 個自由度</h2>
            </div>
        </section>
    );
}

function BrownGame() {
    const gameRef = useRef();

    function handleResetClick() {
        gameRef.current.resetGame();
    }
    return (
        <section className="flex place-items-center min-h-screen">
            <div className="grid">
                <h2>並且不存在解析解<br />只好蒙地卡羅</h2>
                <span>保護好你的高能粒子<br />不要被鉛板吸收</span>
            </div>
            <div>
                <button onClick={handleResetClick}>重置遊戲</button>
                <Game ref={gameRef} />
            </div>
        </section>
    );
}