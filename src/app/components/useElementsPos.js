import { useEffect, useState } from "react";
import _ from "lodash";

const useElementPos = (ref) => {
    const [elementPos, setElementPos] = useState(0);
    useEffect(() => {
        const updatePos = () => {
            const rect = ref.current.getBoundingClientRect();
            const left = rect.left;
            const top = rect.top;
            setElementPos([left, top]);
        }

        const debouncedUpdatePos = _.debounce(updatePos, 5);
        window.addEventListener("scroll", debouncedUpdatePos);
        window.addEventListener("resize", debouncedUpdatePos);
        debouncedUpdatePos();

        return () => {
            window.removeEventListener("scroll", debouncedUpdatePos);
            window.removeEventListener("resize", debouncedUpdatePos);
        }
    }, [ref]);

    return elementPos;
}

export default useElementPos;