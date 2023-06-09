"use client";
import useSWR from "swr";
import Image from "next/image";

const metadata = {
    title: "Memories",
}

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Memories() {
    const { data, error } = useSWR("/api/memories", fetcher);
	//Handle different states
	if (error) return <div>Failed to load :(</div>;
	if (!data) return <div>Loading...</div>;

    const title = 0, PhotoURL = 1;

    return (
        <div className="mx-20 lg:mx-32 2xl:mx-40
                        my-20">
            <header>
                <h1>Photos</h1>
            </header>
            <main>
                <div className="grid grid-cols-3">
                    {data.map((photo, index) => (
                        <div key={index} className="grid">
                            <Image
                                src={photo[PhotoURL]}
                                alt={photo[title]}
                                width={300} height={400}
                                className="object-cover rounded-[3em] aspect-[5/4] lg:aspect-video"
                                priority
                            />
                            <span>{photo[title]}</span>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}