import { useEffect, useState } from "react";

const useElementPos = (ref) => {
    const [elementPos, setElementPos] = useState(0);
    useEffect(() => {
        const getElementPos = () => {
            const rect = ref.current.getBoundingClientRect();
            const top = rect.top;
            setElementPos(top);
        }

        window.addEventListener('scroll', getElementPos);
        getElementPos();

        return () => window.removeEventListener('scroll', getElementPos);
    }, [ref]);

    return elementPos;
}

export default useElementPos;