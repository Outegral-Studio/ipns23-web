"use client";
import useSWR from "swr";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArticlePage({ params }) {
	const { data, error } = useSWR(params.id ? `/api/articles/${params.id}` : null, fetcher);
	//Handle different states
	if (error) return <div>Failed to load or article does not exist!</div>;
	if (!data) return <div>Loading...</div>;

	return (
		<div className="mx-20 lg:mx-32 2xl:mx-40 my-20">
			<header className="mb-10">
				<ul className="flex list-none">
					{Object.values(data.tags).map((tag, index) => (
                        <li key={index} className={`${(index !== data.tags.length - 1) ? "mr-3" : ""} p-1 rounded-[0.375em] bg-slate-400`}>
                            {tag}
                        </li>
                    ))}
				</ul>

				<h1>{data.title}</h1>
				<span>{data.subtitle}</span>
				<br />
				<span>{data.author}</span>
			</header>
			<main>
                <article>
                    {Object.values(data.sections).map((section, index) => (
                        <section key={index}>
                            {Object.values(Object.values(data.sections)[index].contents).map((content, index) => (
                                <p key={index}>
                                    <ReactMarkdown escapeHtml={false}>
                                        {content}
                                    </ReactMarkdown>
                                </p>
                            ))}
                        </section>
                    ))}
                </article>
            </main>
		</div>
	);
}