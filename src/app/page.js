"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import bannerImg from "../../public/img/Banner.jpg";
import Menu from "./components/3DMenu";
import BrownGame from "./components/brown/game";
import FissionGame from "./components/fission/game"
import { NavLinks } from "./navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { set } from "lodash";

export default function Homepage() {
    return (
        <>
            <div id="main-layout" className="grid relative overflow-hidden">
                <header className="banner flex relative h-screen h-[100svh] overflow-hidden">
                    <div className="grid absolute lg:right-1/8 w-full lg:max-w-min h-fit place-items-center lg:place-items-end gap-y-[10em] p-6 top-20 lg:top-1/5">
                        <h1 className="w-max xl:text-[6em] tracking-[0.4em]" style={{ writingMode: "vertical-rl" }}>
                            多原<br />方程式
                        </h1>
                    </div>
                    <span className="hidden md:block absolute right-1/8 bottom-1/8 text-[0.875em] font-bold tracking-widest z-1">
                        原科 <i>23</i> 畢業紀念
                    </span>
                    <div className="grid relative max-w-fit self-center place-items-start gap-y-12 lg:ml-20 -z-1">
                        <div className="opacity-10 lg:opacity-100 lg:w-[50vw]">
                            <div className="block lg:hidden absolute w-full h-full bg-white/30
                                            backdrop-blur-sm backdrop-contrast-150 z-1"></div>
                            <Image
                                src={bannerImg}
                                alt="Photo of IPNS 23rd members"
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
                    <div className="grid absolute w-fit bottom-20 left-0 right-0 place-items-center mx-auto gap-4 text-secondary"   >
                        <FontAwesomeIcon icon={faChevronDown} />
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



function Chat() {

    const containerRef = useRef(null);
    const isInView = useInView(containerRef, {
        once: true,    // 只偵測一次
        amount: 0.1,   // 10% 元素進入可視區就觸發
    });

    // 先定義泡泡要顯示的內容
    const bubblesData = [
        { text: "什麼是「多原方程式」?", side: "right" },
        { text: "這是個清大原科院學士班的必修方程式 !", side: "left" },
        { text: "它跨領域又非線性所以非常不好解", side: "left" },
        { text: "那你們有解出來嗎 ?", side: "right" },
        { text: "我們 21 個人解出了 21 個線性獨立的特解 ...", side: "left" },
    ];

    return (
        <section
            ref={containerRef}
            className={`grid min-h-screen
        px-6 sm:px-10 md:px-16 lg:px-32 2xl:px-48
        py-20 md:py-28 font-bold bg-gray-200
        flex items-center`}
        >
            <div className="grid h-fit gap-3">
                {/* map 出每個 bubble */}
                {bubblesData.map((bubble, index) => (
                    <BubbleItem
                        key={index}
                        text={bubble.text}
                        side={bubble.side}
                        inView={isInView}
                        delay={index * 200} // 依照 index 產生遞增的延遲
                    />
                ))}
            </div>
        </section>
    );
}

function BubbleItem({ text, side, inView, delay }) {
    return (
        <span
            className={`
          bubble
          bubble-${side}
          transform
          transition-all duration-700 ease-in-out
          ${inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-10"}
        `}
            style={{
                transitionDelay: `${delay}ms`, // 動態延遲
            }}
        >
            {text}
        </span>
    );
}


function ExpertiseSec() {
    const menuItemsFirst = ['能源', '醫環', '修爆'];
    const menuItemsSecond = ['電機', '資工', '物理', '計財', '材料', '化學', '工科', '醫環', '生科', '人社'];

    return (
        <section className="flex place-items-center min-h-screen bg-accent text-white">
            <div className="grid place-items-center gap-5">
                <span className="tet-secondary">用滾輪選擇你的一二專長</span>
                <div className="flex w-screen place-content-around">
                    <Menu items={menuItemsFirst} />
                    <Menu items={menuItemsSecond} />
                </div>
                <h2 className="text-center">這方程式有 <i>(2N)<span className="align-super text-[0.5em]">20</span></i> 個自由度</h2>
            </div>
        </section>
    );
}

function BrownGameSec() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, {
        once: true,    // 只偵測一次
        amount: 0.2,   // 10% 元素進入可視區就觸發
    });
    const [status, setStatus] = useState("playing") // playing, fail, success 
    const [started, setStarted] = useState(false);
    const [reset, setReset] = useState(false);

    // Start new game when ref is in view
    useEffect(() => {
        if (isInView) {
            setStarted(isInView);
            console.log(isInView);
        }
    }, [isInView]);

    const handleReset = () => {
        setReset(true);
        setStatus("playing");
    }

    function handleResetComplete() {
        setReset(false);
    }
    function handleStartComplete() {
        setStarted(false);
    }

    return (
        <section ref={containerRef} className="grid relative place-items-center min-h-screen">
            <div className="w-full absolute grid top-10 lg:place-items-start insert-10 justify-items-center gap-5 p-10">
                <div className="grid gap-5 text-secondary text-center lg:text-left">
                    <h2 className="lg:text-4xl text-2xl">這方程式不存在解析解<br />只好蒙地卡羅</h2>
                    <div>保護好你的高能粒子<br />不要被鉛板吸收</div>
                </div>
            </div>


            {status === "fail" ? <button className="absolute p-5 flex-col place-items-center bg-white rounded-lg shadow-md z-50" onClick={handleReset}>
                <div className="w-6 h-6 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M463.5 224l8.5 0c13.3 0 24-10.7 24-24l0-128c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l119.5 0z" /></svg>
                </div>
                重修就好
            </button>
                :
                status === "success" ? <div className="absolute flex-col place-items-center bg-white rounded-lg shadow-md z-50 px-5">
                    <h2 className="p-5">恭喜畢業</h2>
                    <button className="flex place-items-center gap-x-2 p-5 pt-0" onClick={handleReset}>
                        <div className="w-4 h-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M463.5 224l8.5 0c13.3 0 24-10.7 24-24l0-128c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l119.5 0z" /></svg>
                        </div>
                        重新入學
                    </button>
                </div>
                    :
                    null
            }

            <div className="absolute inset-x-0 bottom-0 w-screen h-fit">
                <BrownGame gameStarted={started}
                    reset={reset}
                    setStatus={setStatus}
                    afterReset={handleResetComplete}
                    afterStart={handleStartComplete} />
            </div>
            <div className="absolute sr-only bottom-40"></div>
        </section>
    );
}

function FissionGameSec() {

    const [shoot, setShoot] = useState(false);
    const [done, setDone] = useState(false);
    const [started, setStarted] = useState(false);

    const handleClick = () => {
        setStarted(true)
    }

    function handleDone() {
        setDone(true);
    }

    function handleStartComplete() {
        setStarted(false);
    }

    if (!done) {
        return (
            <section className="min-h-screen relative bg-primary-invert">
                <div className="absolute h-screen w-screen grid place-items-center gap-5 justify-around z-10">
                    <h2>
                        <button onClick={handleClick} className="text-white animate-pulse">
                            <div className="text-lg font-light animate-bounce">點擊我</div>
                            <div>從原科院學士班畢業</div>
                        </button>
                    </h2>

                    <h2 className="text-white">世界</h2>
                </div>
                <div className="grid absolute min-h-screen min-w-screen z-2">

                    <FissionGame gameStarted={started} afterStart={handleStartComplete} done={handleDone} />
                </div>

                <h2 className="absolute bottom-10 left-10 text-white/25 z-0">畢業作為起始條件<br />找到各自的出路，然後...</h2>


            </section>
        );
    }
    else {
        return (
            <section className="min-h-screen relative bg-gray-100 w-full">
                <button onClick={() => setDone(false)} className="absolute text-black right-3 p-5 top-0">
                    <div className="w-4 h-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M463.5 224l8.5 0c13.3 0 24-10.7 24-24l0-128c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l119.5 0z" /></svg>
                    </div>
                </button>
                <div className="h-screen grid place-items-center gap-5 justify-around">
                    <div className="place-items-center grid" >
                        <h1 className="text-black text-center">將能量<br />輻射全世界</h1>
                        <h2 className="text-accent-color">!!!</h2>
                    </div>

                </div>

                <h2 className="absolute bottom-10 left-10 text-black/25">我們將在不同領域<br />燒壞他們的蓋格計數器</h2>
            </section>
        );
    };
}

function Ending() {
    const [shoot, setShoot] = useState(false);
    const [done, setDone] = useState(false);
    useEffect(() => {
        setDone(shoot);
    }, [shoot]);

    const links = [
        {
            label: "同學",
            href: "/classmates"
        },
        {
            label: "照片",
            href: "/memories"
        },
    ];

    return (
        <header className="banner flex relative h-screen h-[90svh]  place-items-center bg-gray-200">
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
                                    {links.map((link, index) => (
                                        <li key={index} className="w-full">
                                            <button
                                                className="px-4 w-full py-3 bg-gray-300 hover:bg-stone-400 text-black text-xl rounded-lg transition duration-300 ease-in-out delay-150
                                                hover:-translate-y-1 hover:scale-105"
                                                onClick={() => window.location.href = link.href} // 點擊導向
                                            >
                                                {link.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>

            </div>
            <h2 className="absolute bottom-10 left-10 text-black/25 text-lg">
                蒐藏此網站
                <br />
                關注同學的生涯發展
            </h2>

            <div className="absolute  -left-80 opacity-0 lg:opacity-100 lg:w-[50vw]">
                <div
                    className="block lg:hidden absolute w-full h-full bg-white/30
                                            backdrop-blur-sm backdrop-contrast-150 z-0"
                ></div>
                <Image
                    src={bannerImg}
                    alt="Photo of IPNS 23rd members"
                    className="relative h-screen object-cover aspect-[5/4]
                                        lg:h-fit lg:rounded-[3em] lg:aspect-video"
                    quality={100}
                    priority
                />
            </div>
        </header>
    );
}
