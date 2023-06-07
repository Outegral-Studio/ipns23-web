"use client";
import useSWR from "swr";
import path from "path";
import Image from "next/image";
import Twemoji from 'react-twemoji';
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ClassmatePage({ params }) {
    const imagePath = path.join(process.cwd(), `public/img/classmates/${params.id}.webp`);
	const { data, error } = useSWR(params.id ? `/api/classmates/${params.id}` : null, fetcher);
	//Handle different states
	if (error) return <div>Failed to load or classmate does not exist!</div>;
	if (!data) return <div>Loading...</div>;

	return (
		<div className="mx-20 lg:mx-32 2xl:mx-40
                        my-20">
			<header className="grid mb-10">
                <div className="flex justify-between flex-col-reverse md:flex-row">
                    <div className="grid">
                        <h1>{data.Name}</h1>
                        <div className="school grid gap-y-2">
                            <span className="grad-school">{data.GradSchool}</span>
                            <span className="expertise">{data.FirstExpertise} / {data.SecondExpertise}</span>
                            <span className="high-school">{data.HighSchool}</span>
                        </div>
                    </div>
                    <Image
                        src={imagePath}
                        alt={`Photo of ${data.name}`}
                        width={300} height={400}
                        className="object-cover aspect-[5/4] rounded-[3em]"
                        priority
                    />
                </div>
				
				{/* <span>{data.Hometown}</span><br /> */}
				<blockquote className="blockquote mt-40">
                    <Twemoji options={{ className: 'twemoji' }}>
                        <span>💡</span>
                    </Twemoji>
                    {data.Quote}
                </blockquote><br />
			</header>
			<main>
                <article>
                    <section>
                        <p>{data.SelfIntro}</p>
                    </section>
                    <section>
                        <p>{data.Social}</p>
                    </section>
                </article>
            </main>
		</div>
	);
}