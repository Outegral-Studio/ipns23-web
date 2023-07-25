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
                        <span className="font-light">往下滑動開始你的證明</span>
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
    return (
        <section className="grid min-h-screen items-center
                            px-6 sm:px-10 md:px-16 lg:px-32 2xl:px-48
                            py-20 md:py-28 font-bold">
            <div className="grid h-fit">
                <span className="bubble bubble-right">什麼是「多原方程式」?</span>
                <i><span className="text-[1.2em]">IPNS 23rd</span></i>
                <span className="bubble bubble-left">這是個清大原科院學士班的必修方程式 !</span>
                <span className="bubble bubble-left mt-2">它跨領域又非線性所以非常不好解</span>
                <span className="bubble bubble-right mt-2">那你們有解出來嗎 ?</span>
                <i><span className="mt-2 text-[1.2em]">IPNS 23rd</span></i>
                <span className="bubble bubble-left">我們 <i>21</i> 個人解出了 <i>21</i> 個線性獨立的特解 ...</span>
            </div>
        </section>
    );
}

function ExpertiseSec() {
    const menuItemsFirst = ['能源', '醫環', '修爆'];
    const menuItemsSecond = ['電機', '資工', '物理', '計財', '材料', '化學', '工科', '醫環', '生科', '人社'];

    return (
        <section className="flex place-items-center min-h-screen">
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
    const ref = useRef(null)
    const isInView = useInView(ref)
    const [started, setStarted] = useState(false);
    const [reset, setReset] = useState(false);

    // Start new game when ref is in view
    useEffect(() => {
        if(isInView) {
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
        <section ref={ref} className="grid relative place-items-center min-h-screen">
            <div className="grid sticky top-10 ml-10 place-self-start justify-items-start">
                <div className="grid gap-5 text-secondary">
                    <h2>並且不存在解析解<br />只好蒙地卡羅</h2>
                    <span>保護好你的高能粒子<br />不要被鉛板吸收</span>
                </div>
                <button className="text-center p-2" onClick={() => setReset(true)}>重置遊戲</button>
            </div>
            <div className="mt-4 w-screen">
                <BrownGame gameStarted={started}
                           reset={reset}
                           afterReset={handleResetComplete}
                           afterStart={handleStartComplete} />
            </div>
            <div ref={ref} className="absolute sr-only bottom-40"></div>
        </section>
    );
}

function FissionGameSec() {
    const [shoot, setShoot] = useState(false);
    const [done, setDone] = useState(false);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        setStarted(shoot)
    }, [shoot]);

    function handleDone() {
        setDone(true);
    }

    function handleStartComplete() {
        setStarted(false);
    }

    if(!done){
        return (
            <section className="min-h-screen relative bg-primary-invert">
                <div className="absolute h-screen w-screen grid place-items-center gap-5 justify-around z-10">
                    <h2>
                        <button onClick={() => setShoot(true)} className="text-white">畢業</button>
                    </h2>

                    <h2 className="text-white">世界</h2>
                </div>
                <div className="grid absolute min-h-screen min-w-screen z-2">

                    <FissionGame gameStarted={started} afterStart={handleStartComplete} done={handleDone}/>
                </div>

                <h2 className="absolute bottom-10 left-10 text-white/25 z-0">畢業作為起始條件<br />找到各自的出路，然後...</h2>


            </section>
        );
    }
    else{
        return (
        <section className="min-h-screen relative bg-primary">
            <button onClick={() => setDone(false)} className="text-black">畢業</button>
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
		["同學", "/classmates"],
		["文章", "/articles"],
		["照片", "/memories"],
	];

	return (
		<header className="banner flex relative h-screen h-[100svh]  place-items-center">
			<div className="grid absolute right-1/8 max-w-min h-fit place-items-end gap-y-[10em] p-6
                            top-24 md:top-1/5 md:self-center">
				<h1 className="w-max xl:text-[6em] tracking-[0.4em]"
					style={{ writingMode: "vertical-rl" }}>
					多原<br />方程式
				</h1>
			</div>
			<div className="grid relative w-screen h-screen place-items-center">
				<div className="flex-col justify-around">
					<span className="text-[3em] font-bold ">
						<i>IPNS 23rd</i>
					</span>
					<h3 className="text-center pt-10">立即查看更多</h3>
					<nav className={`flex flex-row justify-around shadow-lg text-[0.875em] z-10 place-items-center`}>
						<div className="panel p-8">
							<div
								id="primary-navbar-nav"
								aria-labelledby="navbar-control"
								role="region"
								className="place-items-center">
								<ul className="grid gap-x-[4.5em] gap-y-[2.5em] place-items-center">
									<NavLinks links={links} />
								</ul>
							</div>
						</div>
					</nav>
				</div>
			</div>
			<h2 className="absolute bottom-10 left-10 text-black/25">
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
