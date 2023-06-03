"use client";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArticleList() {
	const { data, error } = useSWR("/api/articles", fetcher);
	//Handle different states
	if (error) return <div>Failed to load :(</div>;
	if (!data) return <div>Loading...</div>;

    const title = 0, subtitle = 1, author = 2, desc = 3;

	return (
		<div className="mx-20 lg:mx-32 2xl:mx-40
                        my-20">
			<header className="mb-20">
				<h1>文章列表</h1>
			</header>
			<main>
				<ul className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-20">
					{data.map((article, index) => (
						<li key={++index} className="">
							<Link href={`/articles/${++index}`} className="card">
                                <h2>{article[title]}</h2>
                                <span>{article[subtitle]}</span><br />
                                <span>{article[author]}</span><br />
                                <p>{article[desc]}</p>
                            </Link>
						</li>
					))}
				</ul>
			</main>
		</div>
	);
}