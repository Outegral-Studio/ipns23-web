"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useLayoutEffect } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function useNavbarEffect() {
    const breakpoint = 768;
    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        setExpanded(localStorage.getItem("expanded"));
    }, [])

    useLayoutEffect(() => {
        const handleResize = () => {
            const state = (window.innerWidth >= breakpoint);
            if(!state) {
                setExpanded(state);
            }
        };

        // Run once to determine then add to listener
        handleResize();
        window.addEventListener("resize", handleResize);
        

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    // ? Saves {expanded} on change
    useLayoutEffect(() => {
        localStorage.setItem("expanded", expanded.toString());
    }, [expanded]);

    return {expanded, setExpanded};
}

export default function Navbar() {
    const {expanded, setExpanded} = useNavbarEffect();
    const links = [
        ["首頁", "/"],
        ["同學", "/classmates"],
        ["文章", "/articles"],
        ["照片", "/memories"],
    ];

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const toggleNav = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <motion.div className="fixed w-screen h-5 bg-accent origin-left z-2" style={{ scaleX }} />
            
            <nav id="primary-navbar" data-visible={expanded}
            // ${active ? "bg-primary shadow-lg" : ""}
                 className={`bg-primary shadow-lg
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
                        className="nav-link max-w-fit hover:after:opacity-100">
                        {link[0]}
                    </Link>
                </li>
            ))}
        </>
    );
}