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
	if(error) return <LoadFailed />;
	if(isLoading) return <Load />;

    return (
		<div className="max-w-[1200px] w-full">
			<header className="mb-20">
				<h1>Classmates</h1>
			</header>
			<main>
				<ul className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-20">
					{data.map((cm) => (
						<li key={cm.id} className="">
							<Link href={`/classmates/${cm.id}`} className="card">
                                {cm.photoURL !== null && (
                                    <Image
                                        src={cm.photoURL}
                                        alt={`Photo of ${cm.name}`}
                                        width={500} height={400}
                                        className="object-cover rounded-[3em] aspect-[5/4] lg:aspect-video"
                                        quality={100}
                                        priority
                                    />
                                )}
                                <div>
                                    <h2>{cm.name}</h2>
                                    <span>{cm.firstExpertise}</span>
                                    <span>{cm.secondExpertise}</span>
                                    <p>{cm.quote}</p>
                                </div>
                            </Link>
						</li>
					))}
				</ul>
			</main>
		</div>
	);
}