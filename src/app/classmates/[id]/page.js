"use client";
import useSWR from "swr";
import path from "path";
import Image from "next/image";
import emoji from 'react-easy-emoji';
import { TitleDecoCustom } from "../../components/gadgets";
import { Load, LoadCustom } from "../../components/gadgets"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons'

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ClassmatePage({ params }) {
    const imagePath = path.join(process.cwd(), `public/img/classmates/${params.id}.webp`);
	const { data, error } = useSWR(params.id ? `/api/classmates/${params.id}` : null, fetcher);
	//Handle different states
	if(error) return <LoadCustom msg={"Failed to load or article does not exist!"}/>;
	if(!data) return <Load />;

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
		<>
            <div className="hidden lg:inline-block fixed top-10 right-6 justify-self-end">
                <TitleDecoCustom size={1.5} />
            </div>
            <div className="max-w-[1200px] w-full">
                <header className="grid mb-20">
                    <div className="flex justify-between flex-col-reverse lg:flex-row gap-x-16">
                        <div className="grid w-full lg:w-2fr">
                            <h1 className="self-center tracking-[0.2em]">{data.Name}</h1>
                            <div className="school grid items-center w-fit self-center
                                            gap-y-6 lg:gap-y-8 mt-4">
                                {/* // TODO: Fix overflow spans on small screens */}
                                <span className="grad-school">{data.GradSchool}</span>
                                <span className="expertise">{data.FirstExpertise} / {data.SecondExpertise}</span>
                                <span className="high-school">{data.HighSchool}</span>
                            </div>
                        </div>
                        {data.PhotoURL !== null && (
                            <Image
                                src={data.PhotoURL}
                                alt={`Photo of ${data.Name}`}
                                width={500} height={400}
                                className="block object-cover rounded-[3em]
                                        w-full mb-20 aspect-video
                                        lg:w-1fr lg:mb-0 lg:aspect-[5/4]
                                        xl:aspect-[4/3]"
                                priority
                            />
                        )}
                    </div>
                    <div className="blockquote mt-32">
                        <div className="bq-icon">{emoji("✉️")}</div>
                        <blockquote>
                            <em><strong>{data.Quote}</strong></em>
                        </blockquote>
                    </div>
                </header>
                <main>
                    <article className="grid gap-y-40">
                        <section className="grid gap-y-20">
                            <div className="blockquote">
                                <div className="bq-icon">{emoji("🙋")}</div>
                                <p>{data.SelfIntro}</p>
                            </div>
                            <ul className="social-media grid justify-start md:justify-center">
                                {data.SocialMedia.Facebook && (
                                    <li>
                                        <a href={data.SocialMedia.Facebook}>
                                            <FontAwesomeIcon icon={faFacebook} className="me-4" />
                                            {fetchNameOfLink(data.SocialMedia.Facebook)}
                                        </a>
                                    </li>
                                )}
                                {data.SocialMedia.Instagram && (
                                    <li>
                                        <a href={data.SocialMedia.Instagram}>
                                            <FontAwesomeIcon icon={faInstagram} className="me-4" />
                                            {fetchNameOfLink(data.SocialMedia.Instagram)}
                                        </a>
                                    </li>
                                )}
                                {data.SocialMedia.Twitter && (
                                    <li>
                                    <a href={data.SocialMedia.Twitter}>
                                        <FontAwesomeIcon icon={faTwitter} className="me-4" />
                                        {fetchNameOfLink(data.SocialMedia.Twitter)}
                                    </a>
                                </li>
                                )}
                                {data.SocialMedia.LinkedIn && (
                                    <li>
                                    <a href={data.SocialMedia.LinkedIn}>
                                        <FontAwesomeIcon icon={faLinkedin} className="me-4" />
                                        {fetchNameOfLink(data.SocialMedia.LinkedIn)}
                                    </a>
                                </li>
                                )}
                                {data.SocialMedia.TikTok && (
                                    <li>
                                    <a href={data.SocialMedia.TikTok}>
                                        <FontAwesomeIcon icon={faTiktok} className="me-4" />
                                        {fetchNameOfLink(data.SocialMedia.TikTok)}
                                    </a>
                                </li>
                                )}
                            </ul>
                            <div className="blockquote">
                                <div className="bq-icon">{emoji("⛳")}</div>
                                <span>{data.Clubs}</span>
                            </div>
                            <div className="blockquote">
                                <div className="bq-icon">{emoji("❤️")}</div>
                                <span>{data.Hobbies}</span>
                            </div>
                        </section>
                        {((data.Experience !== "") || (data.Portfolio !== "")) && (
                            <section className="grid gap-y-20">
                                {data.Experience !== "" && (
                                    <div className="blockquote">
                                        <div className="bq-icon">{emoji("💥")}</div>
                                        <p>{data.Experience}</p>
                                    </div>
                                )}
                                {data.Portfolio !== "" && (
                                    <div className="blockquote">
                                        <div className="bq-icon">{emoji("💡")}</div>
                                        <p>{data.Portfolio}</p>
                                    </div>
                                )}
                            </section>
                        )}

                        <section className="grid">
                        <div className="inline-block  justify-self-center">
                            <TitleDecoCustom size={1.5} />
                        </div>
                        </section>
                    </article>
                </main>
            </div>
        </>
	);
}