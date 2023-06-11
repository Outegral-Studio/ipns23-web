"use client";
import Link from "next/link";
import useSWR from "swr";
import path from "path";
import Image from "next/image";
import { Load, LoadFailed } from "../components/gadgets"

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ClassmateList() {
    const imageBasePath = path.join(process.cwd(), "public/img/classmates/");
	const { data, error } = useSWR("/api/classmates", fetcher);
	if(error) return <LoadFailed />;
	if(!data) return <Load />;

    const Name = 0, FirstExpertise = 1, SecondExpertise = 2, Quote = 3, PhotoURL = 4;

	return (
		<div className="max-w-[1200px] w-full">
			<header className="mb-20">
				<h1>Classmates</h1>
			</header>
			<main>
				<ul className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-20">
					{data.map((classmate, index) => (
						<li key={++index} className="">
							<Link href={`/classmates/${++index}`} className="card">
                                {classmate[PhotoURL] !== null && (
                                    <Image
                                        src={classmate[PhotoURL]}
                                        alt={`Photo of ${classmate[Name]}`}
                                        width={500} height={400}
                                        className="object-cover rounded-[3em] aspect-[5/4] lg:aspect-video"
                                        priority
                                    />
                                )}
                                <div>
                                    <h2>{classmate[Name]}</h2>
                                    <span>{classmate[FirstExpertise]}</span>
                                    <span>{classmate[SecondExpertise]}</span>
                                    <p>{classmate[Quote]}</p>
                                </div>
                            </Link>
						</li>
					))}
				</ul>
			</main>
		</div>
	);
}