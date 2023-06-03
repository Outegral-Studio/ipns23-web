"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useLayoutEffect } from "react";
import useScrollPos from "./components/useScrollPos";

function useNavbarEffect() {
    const breakpoint = 768;
    const storedExpanded = localStorage.getItem("expanded");
    const initialExpanded = (storedExpanded !== null ? Boolean(storedExpanded) : window.innerWidth >= breakpoint);
    const [expanded, setExpanded] = useState(initialExpanded);

    useLayoutEffect(() => {
        const handleResize = () => {
            const state = (window.innerWidth >= breakpoint);
            setExpanded(window.innerWidth >= breakpoint);
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
    const active = (useScrollPos() > 0);
    const {expanded, setExpanded} = useNavbarEffect();
    const links = [
        ["首頁", "/"],
        ["同學", "/classmates"],
        ["文章", "/articles"],
        ["照片", "/memories"],
    ];

    const toggleNav = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <button onClick={toggleNav} aria-controls="primary-navbar" aria-expanded={expanded}
                    className="fixed top-5 right-5 aspect-square w-6 bg-red-700 z-20
                               block md:hidden">
                <span className="sr-only">MENU</span>
            </button>
            <nav id="primary-navbar" data-visible={expanded}
                 className={`${active ? "bg-primary shadow-lg" : ""} ${(!expanded) ? "-translate-y-full" : ""}
                            grid w-screen h-fit p-6 text-[0.875em] transition-colors z-10
                            fixed md:sticky top-0`}>
                
                <ul className="navbar-nav flex flex-wrap p-2  gap-x-[4.5em] gap-y-[2.5em]
                                flex-col justify-self-center
                                md:flex-row md:justify-self-start
                                md:ml-20 lg:ml-32 xl:ml-40"
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