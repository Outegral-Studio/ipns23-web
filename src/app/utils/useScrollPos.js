"use client";
import { useEffect, useState } from "react";

const useScrollPos = () => {
    const [scrollPos, setScrollPos] = useState(0);

    useEffect(() => {
        const updateScrollPos = () => {
            setScrollPos(window.scrollY);
        }
        window.addEventListener("scroll", updateScrollPos);
        updateScrollPos();
        return () => window.removeEventListener("scroll", updateScrollPos);
    }, []);

    return scrollPos;
};

export default useScrollPos;