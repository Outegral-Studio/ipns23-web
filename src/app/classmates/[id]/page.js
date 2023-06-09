"use client";
import useSWR from "swr";
import path from "path";
import Image from "next/image";
import emoji from 'react-easy-emoji';
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons'


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ClassmatePage({ params }) {
    const imagePath = path.join(process.cwd(), `public/img/classmates/${params.id}.webp`);
	const { data, error } = useSWR(params.id ? `/api/classmates/${params.id}` : null, fetcher);
	//Handle different states
	if (error) return <div>Failed to load or classmate does not exist!</div>;
	if (!data) return <div className="place-self-center min-w-screen min-h-screen">Loading...</div>;

    function fetchNameOfLink(link) {
        const symbol = "/";
        const lastIndex = link.lastIndexOf(symbol);

        if(lastIndex !== -1) {
            const substring = link.substring(lastIndex + 1);
            if(substring.startsWith("profile")) {
                return data.Name;
            }
            return substring;
        }
        return link;
    }

	return (
		<div className="mx-10 md:mx-24 lg:mx-60 2xl:mx-48
                        my-40  pt-8">
			<header className="grid mb-10">
                <div className="flex justify-between flex-col-reverse md:flex-row">
                    <div className="grid">
                        <h1 className="tracking-[0.2em]">{data.Name}</h1>
                        <div className="school grid gap-y-2">
                            <span className="grad-school">{data.GradSchool}</span>
                            <span className="expertise">{data.FirstExpertise} / {data.SecondExpertise}</span>
                            <span className="high-school">{data.HighSchool}</span>
                        </div>
                    </div>
                    <div className="mb-10 md:mb-0 lg:mb-0 2xl:mb-0">
                        <Image
                            src={data.PhotoURL}
                            alt={`Photo of ${data.Name}`}
                            width={300} height={400}
                            className="object-cover rounded-[3em] aspect-[5/4] lg:aspect-video"
                            priority
                        />

                    </div>
                </div>
				<blockquote className="blockquote mt-40">
                    {emoji("💡")}
                    {data.Quote}
                </blockquote>
			</header>
			<main>
                <article>
                    <section className="grid pb-40">
                        <p className="blockquote">
                            {emoji("🙋")}
                            {data.SelfIntro}
                        </p>
                        <ul className="social-media grid pb-8">
                            {data.SocialMedia.Facebook && (
                                <li>
                                    <a href={data.SocialMedia.Facebook}>
                                        <FontAwesomeIcon icon={faFacebook} className="me-2" />
                                        {fetchNameOfLink(data.SocialMedia.Facebook)}
                                    </a>
                                </li>
                            )}
                            {data.SocialMedia.Instagram && (
                                <li>
                                    <a href={data.SocialMedia.Instagram}>
                                        <FontAwesomeIcon icon={faInstagram} className="me-1" />
                                        {fetchNameOfLink(data.SocialMedia.Instagram)}
                                    </a>
                                </li>
                            )}
                            {data.SocialMedia.Twitter && (
                                <li>
                                <a href={data.SocialMedia.Twitter}>
                                    <FontAwesomeIcon icon={faTwitter} className="me-1" />
                                    {fetchNameOfLink(data.SocialMedia.Twitter)}
                                </a>
                            </li>
                            )}
                            {data.SocialMedia.LinkedIn && (
                                <li>
                                <a href={data.SocialMedia.LinkedIn}>
                                    <FontAwesomeIcon icon={faLinkedin} className="me-1" />
                                    {fetchNameOfLink(data.SocialMedia.LinkedIn)}
                                </a>
                            </li>
                            )}
                            {data.SocialMedia.TikTok && (
                                <li>
                                <a href={data.SocialMedia.TikTok}>
                                    <FontAwesomeIcon icon={faTiktok} className="me-1" />
                                    {fetchNameOfLink(data.SocialMedia.TikTok)}
                                </a>
                            </li>
                            )}
                        </ul>
                        <span className="blockquote pb-8">
                            {emoji("⛳")}
                            {data.Clubs}
                        </span>
                        <span className="blockquote pb-8">
                            {emoji("❤️")}
                            {data.Hobbies}
                        </span>
                    </section>
                    {(data.Experience !== "") && (
                        <section>
                            {data.Experience !== "" && (
                                <p className="blockquote">
                                    {emoji("💥")}
                                    {data.Experience}
                                </p>
                            )}
                            {data.Portfolio !== "" && (
                                <p className="blockquote">
                                    {emoji("💡")}
                                    {data.Portfolio}
                                </p>
                            )}
                        </section>
                    )}
                </article>
            </main>
		</div>
	);
}