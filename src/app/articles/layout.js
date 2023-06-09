export const metadata = {
    title: "文章",
    description: "他們的文筆真的很好。尤其是歐予恩",
}

export default function ClassmateLayout({ children }) {
    return (
        <div className="grid justify-items-center
                        px-6 sm:px-10 md:px-16 lg:px-32 2xl:px-48
                        py-20 md:py-28">
            {children}
        </div>
    );
}