import { cn } from "@/lib/utils";

// Components & UI
import TwemojiBase from "react-twemoji";

export function Twemoji({
    className,
    children,
}: React.ComponentProps<"div">) {
    return (
        <TwemojiBase
            options={{ className: cn("[--margin:_0.2em] inline size-[1.1em] mx-(--margin) align-[-0.2em] [&+.twemoji]:ml-0", className) }}
            noWrapper
        >
            {children}
        </TwemojiBase>
    );
}