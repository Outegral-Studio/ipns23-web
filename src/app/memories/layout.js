export const metadata = {
    title: "Memories",
    description: "照片集",
}

export default function MemoryLayout({ children }) {
    return (
        <div className="grid justify-items-center
                        px-6 sm:px-10 md:px-16 lg:px-32
                        py-20 md:py-28">
            {children}
        </div>
    );
}