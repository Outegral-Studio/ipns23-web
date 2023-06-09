"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useLayoutEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function useNavbarEffect() {
    const breakpoint = 768;
    const pathname = usePathname();
    const [expanded, setExpanded] = useState(false);

    useLayoutEffect(() => {
        const handleResize = () => {
            const state = (window.innerWidth < breakpoint);
            if(state) {
                setExpanded(!state);
            }
        };

        // Run once to determine then add to listener
        handleResize();
        window.addEventListener("resize", handleResize);

        // ! Must be placed after event listener
        // ? Set to false on every pathname change
        setExpanded(false);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [pathname]);

    return {expanded, setExpanded};
}

export default function Navbar() {
    const {expanded, setExpanded} = useNavbarEffect();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const toggleNav = () => {
        setExpanded(!expanded);
    };

    const links = [
        ["首頁", "/"],
        ["同學", "/classmates"],
        ["文章", "/articles"],
        ["照片", "/memories"],
    ];

    return (
        <>
            <motion.div className="fixed w-screen h-3 bg-accent origin-left z-2" style={{ scaleX }} />
            
            {/* <nav id="primary-navbar" data-visible={expanded}
                 className={`flex fixed flex-col md:flex-row top-24
                             bg-accent shadow-lg text-[0.875em] z-10`}>
                <div className="panel">
                    <div id="navbar-control">
                        <button onClick={toggleNav} aria-controls="primary-navbar-nav" aria-expanded={expanded}>
                            <FontAwesomeIcon icon={faBars} className="p-2" />
                        </button>
                    </div>
                    <div id="primary-navbar-nav" aria-labelledby="navbar-control" role="region">
                        <ul className="grid md:grid-flow-col gap-x-[4.5em] gap-y-[2.5em]">
                            <NavLinks links={links} />
                        </ul>
                    </div>
                </div>
            </nav> */}
            <nav id="primary-navbar" data-visible={expanded}
                 className={`bg-primary shadow-lg rounded-r-[100vw]
                            flex w-fit h-fit text-[0.875em] z-10
                            fixed mt-24`}>
                <button onClick={toggleNav} aria-controls="primary-navbar" aria-expanded={expanded}
                        className="md:ml-10 lg:ml-12 xl:ml-20">
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <ul className={`${(!expanded) ? "hidden" : ""}
                                navbar-nav flex flex-wrap gap-x-[4.5em] gap-y-[2.5em]
                                flex-col justify-self-center
                                md:flex-row md:justify-self-start`}
                                >
                    <NavLinks links={links} />
                </ul>
            </nav>
        </>
    );
}

function NavLinks({links}) {
    return (
        <>
            {links.map((link, index) => (
                <li key={index} className="text-center">
                    <Link
                        href={link[1]}
                        className="nav-link w-fit hover:after:opacity-100">
                        {/* onClick={(e) => {
                            e.preventDefault();
                            setExpanded(false);
                        }} */}
                        {link[0]}
                    </Link>
                </li>
            ))}
        </>
    );
}