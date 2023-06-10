"use client";
import useSWR from "swr";
import Image from "next/image";
import { Load, LoadFailed } from "../components/gadgets"

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Memories() {
    const { data, error } = useSWR("/api/memories", fetcher);
	if(error) return <LoadFailed />;
	if(!data) return <Load />;

    const title = 0, PhotoURL = 1;

    return (
        <div className="w-full">
            <header>
                <h1>Photos</h1>
            </header>
            <main>
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
                    {data.map((photo, index) => (
                        <div key={index} className="grid pb-10 px-3">
                            <Image
                                src={photo[PhotoURL]}
                                alt={photo[title]}
                                width={700} height={600}
                                className="object-cover rounded-[3em] aspect-[5/4]"
                                priority
                            />
                            {/* <span>{photo[title]}</span> */}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}