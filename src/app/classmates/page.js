"use client";
import Link from "next/link";
import useSWR from "swr";
import path from "path";
import Image from "next/image";
import { fetcher } from "../utils/fetcher";
import { Load, LoadFailed } from "../components/gadgets"

export default function ClassmateList() {
    const imageBasePath = path.join(process.cwd(), "public/img/classmates/");
    const { data, error, isLoading } = useSWR("/api/classmates", fetcher);
    if (error) return <LoadFailed />;
    if (isLoading) return <Load />;

    return (
        <div className="max-w-[1200px] w-full">
            <header className="mb-20">
                <h1>Classmates</h1>
            </header>
            <main>
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-2">
                    {data.map((cm) => (
                        <div key={cm.id} className="relative mb-3 break-inside-avoid">
                            <Link href={`/classmates/${cm.id}`} className="card bg-white hover:bg-primary">
                                {cm.photoURL.length > 1 ? (
                                    <Image
                                        src={cm.photoURL}
                                        alt={`Photo of ${cm.name}`}
                                        width={500} height={400}
                                        className="object-cover rounded-[3em] aspect-[5/4] lg:aspect-video"
                                        quality={100}
                                        priority
                                    />
                                ) :
                                    <div className="object-cover rounded-[3em] aspect-[5/4] lg:aspect-video bg-gray-100">
                                        <div className="flex justify-center items-center h-full text-5xl text-secondary-invert">
                                            <div className="rounded-full bg-white w-20 h-20 flex justify-center text-secondary items-center">
                                                {cm.name[0]}
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div>
                                    <h2>{cm.name}</h2>
                                    <div className="font-bold flex gap-1 pt-2">
                                        <span>{cm.firstExpertise}</span>
                                        /
                                        <span className="underline underline-offset-4 decoration-4 decoration-sky-500">{cm.secondExpertise}</span>
                                    </div>

                                    <div className="text-secondary text-xs py-3">{cm.quote}</div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}