import { cn } from "@/lib/utils";



export function MultiAtomEquationLogo({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-row-reverse gap-3 font-bold text-2xl leading-none select-none", className)} {...props}>
            <div className="grid gap-3">
                <span>多</span>
                <span>原</span>
                <div className="content-center size-6">
                    <div className="w-full h-1/2 bg-primary" />
                </div>
            </div>
            <div className="grid gap-3">
                <span>方</span>
                <span>程</span>
                <span>式</span>
            </div>
        </div>
    );
}