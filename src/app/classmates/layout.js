export const metadata = {
    title: "同學",
    description: "是誰就讀清大的原科 23",
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