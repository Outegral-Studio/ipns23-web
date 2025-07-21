"use client";
import { use } from "react";

// SWR
import useSWR from "swr";
import { fetcher } from "@/lib/fetch";

// Components & UI
import Image from "next/image";
import { Anchor, Blockquote, H1, H2, MarkdownText, Muted, P } from "@/components/common/typography";
import { MultiAtomEquationLogo } from "@/components/common/multiatom-equation";
import { SectionLayout } from "@/components/common/layouts";
import { Twemoji } from "@/components/common/twemoji";

// Icons & Images
import { InstagramLogoIcon, LinkedInLogoIcon, NotionLogoIcon } from "@radix-ui/react-icons";

// Types & Interfaces
import type { Classmate } from "@/lib/db/schema";
import { match } from "ts-pattern";
import { Button } from "@/components/ui/button";



export default function ClassmatePage(props: { params: Promise<{ classmateId: string }> }) {
	const params = use(props.params);
	const classmateId = params.classmateId;

	const { data, error, isLoading } = useSWR(`/api/classmates/${classmateId}`, fetcher);
    const classmateData: Classmate = data?.success ? data.data : [];

	return (
		<>
            {/* <div className="hidden lg:inline-block fixed top-10 right-6 justify-self-end">
                <TitleDecoCustom size={1.5} />
            </div> */}
            <MultiAtomEquationLogo className="@max-6xl:hidden fixed top-6 right-6" />
            {error ? (
                <div className="grid content-center size-full">
                    <H1 className="text-center">IPNS 23 沒有這位同學歐</H1>
                </div>
            ) : isLoading ? (
                null
            ) : (
                <>
                    <ClassmateHeader classmate={classmateData} />
                    <main>
                        <article className="grid gap-y-20">
                            <SelfIntroSection classmate={classmateData} />
                            <SocialMediaSection classmate={classmateData} />
                            <ClubsSection classmate={classmateData} />
                            <HobbiesSection classmate={classmateData} />
                            <ExperienceSection classmate={classmateData} />
                            <SectionLayout className="@6xl:hidden">
                                <MultiAtomEquationLogo className="w-max mx-auto" />
                            </SectionLayout>
                        </article>
                    </main>
                </>
            )}
        </>
	);
}

function ClassmateHeader({ classmate }: { classmate: Classmate }) {
    const {
        name,
        image,
        quote,
        firstExpertise,
        secondExpertise,
        gradSchool,
        highSchool,
    } = classmate;

    return (
        <header className="grid">
            <div className="flex justify-between flex-col-reverse @4xl:flex-row gap-x-16 gap-y-12 mb-16">
                <div className="grid items-center gap-2 w-full">
                    <H1>{name}</H1>
                    <Blockquote className="[&>*]:block space-y-4">
                       {gradSchool && <div>
                            <span className="font-medium">{gradSchool}</span>
                            <Muted>(2023 ~ )</Muted>
                        </div>}
                        <div>
                            <span className="font-medium">
                                {firstExpertise}
                                {secondExpertise && (
                                    <>
                                        {` / `}
                                        <span className="underline underline-offset-4 decoration-2 decoration-secondary">
                                            {secondExpertise}
                                        </span>
                                    </>
                                )}
                            </span>
                            <Muted>(2019 ~ 2023)</Muted>
                        </div>
                        {highSchool && <div>
                            <span className="font-medium">{highSchool}</span>
                            <Muted>(2016 ~ 2019)</Muted>
                        </div>}
                    </Blockquote>
                </div>
                {image && (
                    <Image
                        src={image}
                        alt={`Photo of ${name}`}
                        width={720} height={405}
                        className="object-cover w-full @4xl:h-[400px] rounded-xl aspect-video @4xl:aspect-[5/4] @6xl:aspect-video"
                        quality={100}
                        priority
                    />
                )}
            </div>
            {quote && (
                <Section className="text-center" title="✉️">
                    <P>{quote}</P>
                </Section>
            )}
        </header>
    );
}

function SelfIntroSection({ classmate }: { classmate: Classmate }) {
    const { selfIntro } = classmate;

    return selfIntro ? (
        <Section title="🙋">
            <MarkdownText>{selfIntro}</MarkdownText>
        </Section>
    ) : null;
}

function SocialMediaSection({ classmate }: { classmate: Classmate }) {
    const { socialMedia } = classmate;

    function renderSocialMediaLinks() {
        return Object.entries(socialMedia as Record<string, string>).map(([social, link]) => {
            const url = new URL(link);
            const title = match(social)
                .with("notion", () => {
                    const { hostname } = url;
                    const parts = hostname.split(".");
                    return parts.length > 2
                        ? parts.slice(0, -2).join(".")  // Subdomain
                        : hostname;
                })
                .otherwise(() => {
                    const { pathname } = url;
                    const segments = pathname.split("/").filter(Boolean);
                    return segments.length > 0
                        ? segments[segments.length - 1]
                        : social.charAt(0).toUpperCase() + social.slice(1);
                });

            return (
                <li key={social}>
                    <Button variant="link" asChild>
                        <Anchor href={link} className="text-base">
                            {getSocialMediaIcon(social)}
                            {title}
                        </Anchor>
                    </Button>
                </li>
            );
        });
    }

    function getSocialMediaIcon(social: string) {
        return match(social)
            .with("facebook", () => <InstagramLogoIcon />)
            .with("instagram", () => <InstagramLogoIcon />)
            .with("linkedIn", () => <LinkedInLogoIcon />)
            .with("notion", () => <NotionLogoIcon />)
            .with("tiktok", () => <InstagramLogoIcon />)
            .otherwise(() => null);
    }

    return socialMedia && Object.keys(socialMedia).length > 0 ? (
        <Section className="text-center" title="📱">
            <ul>{renderSocialMediaLinks()}</ul>
        </Section>
    ) : null;
}

function ClubsSection({ classmate }: { classmate: Classmate }) {
    const { clubs } = classmate;

    return clubs && clubs.length > 0 ? (
        <Section className="text-center" title="⛳">
            <P>{clubs.join("、")}</P>
        </Section>
    ) : null;
}

function HobbiesSection({ classmate }: { classmate: Classmate }) {
    const { hobbies } = classmate;

    return hobbies && hobbies.length > 0 ? (
        <Section className="text-center" title="❤️">
            <P>{hobbies.join("、")}</P>
        </Section>
    ) : null;
}

function ExperienceSection({ classmate }: { classmate: Classmate }) {
    const { experience } = classmate;

    return experience ? (
        <Section title="💥">
            <MarkdownText>{experience}</MarkdownText>
        </Section>
    ) : null;
}

function Section({
    children,
	className,
    title,
}: React.ComponentProps<typeof SectionLayout>) {
    return (
        <SectionLayout className={className}>
            <Twemoji>
                <H2 className="mb-8 text-center">{title}</H2>
            </Twemoji>
            {children}
        </SectionLayout>
    );
}