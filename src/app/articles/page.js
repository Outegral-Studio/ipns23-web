"use client";
import useSWR from "swr";
import Link from "next/link";
import { Load, LoadFailed } from "../components/gadgets"

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArticleList() {
	const { data, error } = useSWR("/api/articles", fetcher);
	if(error) return <LoadFailed />;
	if(!data) return <Load />;

    const title = 0, subtitle = 1, author = 2, desc = 3;

	return (
		<div className="w-full">
			<header className="mb-20">
				<h1>文章列表</h1>
			</header>
			<main>
				<ul className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-20">
					{data.map((article, index) => (
						<li key={++index} className="">
							<Link href={`/articles/${++index}`} className="card">
                                <h2>{article[title]}</h2>
                                <span>{article[subtitle]}</span>
                                <span>{article[author]}</span>
                                <p>{article[desc]}</p>
                            </Link>
						</li>
					))}
				</ul>
			</main>
		</div>
	);
}