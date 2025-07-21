"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// SWR
import useSWRImmutable from "swr/immutable";
import { fetcher } from "@/lib/fetch";

// Components & UI
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { H1, H2 } from "@/components/common/typography";
import { Skeleton } from "@/components/ui/skeleton";

// Types & Interfaces
import type { Variants } from "motion/react";
import type { Classmate } from "@/lib/db/schema";

// Constants & Variables
const DELAY = 0.1;
const CONTAINER_VARIANTS: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.01, delayChildren: DELAY } },
};
const CLASSMATE_LINK_VARIANTS: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 25 } },
};



export default function ClassmateList() {
    const { data, error, isLoading } = useSWRImmutable("/api/classmates", fetcher);
    const classmateData: Classmate[] = data?.success ? data.data : [];

	const [animate, setAnimate] = useState(false);
	useEffect(() => {
		if (!isLoading && !error) setAnimate(true);
	}, [isLoading, error]);

    return (
        <>
            <header className="mb-20">
                <H1>Classmates</H1>
            </header>
            <main>
                <motion.div
                    className="[--gap:_1rem] columns-1 @lg:columns-2 @4xl:columns-3 gap-(--gap) [&>*]:mb-(--gap)"
                    variants={CONTAINER_VARIANTS}
                    initial="hidden"
                    animate={animate ? "visible" : "hidden"}
                >
                    <AnimatePresence>
                        {!error && isLoading ? (
                            Array.from({ length: 20 }).map((_, index) => (
                                <motion.div
                                    key={index}
                                    exit={{ opacity: 0, transition: { duration: DELAY } }}
                                >
                                    <Skeleton
                                        className="w-full h-32 break-inside-avoid"
                                        style={{ height: `${Math.floor(Math.random() * (45 - 20 + 1)) + 20}rem` }}
                                        suppressHydrationWarning
                                    />
                                </motion.div>
                            ))
                        ) : classmateData.sort(() => Math.random() - 0.5).map(classmate => (
                            <motion.div
                                key={getStudentId(classmate.id)}
                                variants={CLASSMATE_LINK_VARIANTS}
                            >
                                <ClassmateCard classmate={classmate} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </main>
        </>
    );
}

function ClassmateCard({ classmate }: { classmate: Classmate }) {
    const {
        id,
        name,
        image,
        quote,
        firstExpertise,
        secondExpertise,
    } = classmate;

    return (
        <Link
            href={`classmates/${id}`}
            className="block rounded-xl outline-primary break-inside-avoid"
        >
            <Card>
                <CardHeader>
                    {image ? (
                        <Image
                            src={image}
                            alt={`Photo of ${name}`}
                            width={480} height={600}
                            className="object-cover rounded-4xl aspect-[4/5]"
                            quality={100}
                        />
                    ) : (
                        <div className="flex justify-center items-center bg-muted rounded-4xl aspect-video">
                            <Avatar className="size-16 text-muted-foreground text-3xl">
                                <AvatarFallback className="bg-card">
                                    {name[0]}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    )}
                    <H2 asChild>
                        <CardTitle
                            id={getStudentId(id)}
                            className="mt-4"
                        >
                            {name}
                        </CardTitle>
                    </H2>
                    <span className="font-semibold">
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
                </CardHeader>
                <CardContent className="pb-2">
                    <CardDescription>{quote}</CardDescription>
                </CardContent>
            </Card>
        </Link>
    );
}

function getStudentId(id: string | number) {
    return `1080100${String(id).padStart(2, "0")}`;
}