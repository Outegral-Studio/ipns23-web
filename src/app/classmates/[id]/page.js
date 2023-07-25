"use client";
import useSWR from "swr";
import path from "path";
import Image from "next/image";
import emoji from 'react-easy-emoji';
import { fetcher } from "@/app/utils/fetcher";
import { Load, LoadFailed, LoadCustom, TitleDecoCustom } from "../../components/gadgets"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons'

export default function ClassmatePage({ params }) {
    const imagePath = path.join(process.cwd(), `public/img/classmates/${params.id}.webp`);
	const { data, error, isLoading } = useSWR(params.id ? `/api/classmates/${params.id}` : null, fetcher);
	if(error) return <LoadFailed />;
	if(isLoading) return <Load />;
    if(data && data.notFound) return <LoadCustom msg={`編號 ${params.id} 的學生不存在`}/>;

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
                            <h1 className="self-center tracking-[0.2em]">{data.name}</h1>
                            <div className="school grid items-center w-fit self-center
                                            gap-y-6 lg:gap-y-8 mt-4">
                                {/* // TODO: Fix overflow spans on small screens */}
                                <span className="grad-school">{data.gradSchool}</span>
                                <span className="expertise">{data.firstExpertise} / {data.secondExpertise}</span>
                                <span className="high-school">{data.highSchool}</span>
                            </div>
                        </div>
                        {data.photoURL !== null && (
                            <Image
                                src={data.photoURL}
                                alt={`Photo of ${data.name}`}
                                width={500} height={400}
                                className="block object-cover rounded-[3em]
                                        w-full mb-20 aspect-video
                                        lg:w-1fr lg:mb-0 lg:aspect-[5/4]
                                        xl:aspect-[4/3]"
                                quality={100}
                                priority
                            />
                        )}
                    </div>
                    <div className="blockquote mt-32">
                        <div className="bq-icon">{emoji("✉️")}</div>
                        <blockquote>
                            <em><strong>{data.quote}</strong></em>
                        </blockquote>
                    </div>
                </header>
                <main>
                    <article className="grid gap-y-40">
                        <section className="grid gap-y-20">
                            <div className="blockquote">
                                <div className="bq-icon">{emoji("🙋")}</div>
                                <p>{data.selfIntro}</p>
                            </div>
                            <ul className="social-media grid justify-start md:justify-center">
                                {data.socialMedia.facebook && (
                                    <li>
                                        <a href={data.socialMedia.facebook}>
                                            <FontAwesomeIcon icon={faFacebook} className="me-4" />
                                            {fetchNameOfLink(data.socialMedia.facebook)}
                                        </a>
                                    </li>
                                )}
                                {data.socialMedia.instagram && (
                                    <li>
                                        <a href={data.socialMedia.instagram}>
                                            <FontAwesomeIcon icon={faInstagram} className="me-4" />
                                            {fetchNameOfLink(data.socialMedia.instagram)}
                                        </a>
                                    </li>
                                )}
                                {data.socialMedia.twitter && (
                                    <li>
                                    <a href={data.socialMedia.twitter}>
                                        <FontAwesomeIcon icon={faTwitter} className="me-4" />
                                        {fetchNameOfLink(data.socialMedia.twitter)}
                                    </a>
                                </li>
                                )}
                                {data.socialMedia.LinkedIn && (
                                    <li>
                                    <a href={data.socialMedia.LinkedIn}>
                                        <FontAwesomeIcon icon={faLinkedin} className="me-4" />
                                        {fetchNameOfLink(data.socialMedia.LinkedIn)}
                                    </a>
                                </li>
                                )}
                                {data.socialMedia.TikTok && (
                                    <li>
                                    <a href={data.socialMedia.TikTok}>
                                        <FontAwesomeIcon icon={faTiktok} className="me-4" />
                                        {fetchNameOfLink(data.socialMedia.TikTok)}
                                    </a>
                                </li>
                                )}
                            </ul>
                            <div className="blockquote">
                                <div className="bq-icon">{emoji("⛳")}</div>
                                <span>{data.clubs}</span>
                            </div>
                            <div className="blockquote">
                                <div className="bq-icon">{emoji("❤️")}</div>
                                <span>{data.hobbies}</span>
                            </div>
                        </section>
                        {((data.experience !== "") || (data.portfolio !== "")) && (
                            <section className="grid gap-y-20">
                                {data.experience !== "" && (
                                    <div className="blockquote">
                                        <div className="bq-icon">{emoji("💥")}</div>
                                        <p>{data.experience}</p>
                                    </div>
                                )}
                                {data.portfolio !== "" && (
                                    <div className="blockquote">
                                        <div className="bq-icon">{emoji("💡")}</div>
                                        <p>{data.portfolio}</p>
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