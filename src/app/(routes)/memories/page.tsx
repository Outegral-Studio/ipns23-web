"use client";
import { useState, useEffect } from "react";

// SWR
import useSWRImmutable from "swr/immutable";
import { fetcher } from "@/lib/fetch";

// Components & UI
import Image from "next/image";
import { H1 } from "@/components/common/typography";

// Icons & Images
import { X } from "lucide-react";

// Types & Interfaces
import { Memory } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";



export default function Memories() {
    const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
    const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

    useEffect(() => {
        // TODO: Not working
        function handleOutsideClick(event) {
            console.log("Clicked outside:", event.target);
            const image = document.getElementById("full-image");
            if (image && !image.contains(event.target)) {
                closeMemory();
            }
        }

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                closeMemory();
            }
        }

        if (selectedMemory) {
            document.documentElement.classList.add("overflow-y-hidden");
            document.addEventListener("click", handleOutsideClick);
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.documentElement.classList.remove("overflow-y-hidden");
            document.removeEventListener("click", handleOutsideClick);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedMemory]);

    const { data, error } = useSWRImmutable("/api/memories", fetcher);
    const memoryData: Memory[] = data?.success ? data.data : [];

    function openMemory(memory: Memory) {
        setSelectedMemory(memory);
    }

    function closeMemory() {
        setSelectedMemory(null);
    }

    function handleImageLoaded(id: string) {
        setLoadedImages((prev) => ({ ...prev, [id]: true }));
    }

    return (
        <>
            <header className="mb-10">
                <H1>Photos</H1>
            </header>
            <main>
                <div className="[--gap:_1rem] columns-1 @lg:columns-2 @4xl:columns-3 gap-(--gap) [&>*]:mb-(--gap)">
                    {memoryData.map(memory => (
                        <div
                            key={memory.id}
                            className="relative mb-2 rounded-sm hover:scale-105 overflow-hidden cursor-pointer transition-transform"
                            onClick={() => openMemory(memory)}
                        >
                            <Image
                                src={memory.url}
                                alt={memory.title}
                                width={500} height={400}
                                data-loaded={loadedImages?.[memory.id] || false}
                                className="w-full object-cover data-[loaded=false]:blur-lg transition-filter duration-500 ease-in-out"
                                placeholder={memory?.placeholder as PlaceholderValue || undefined}
                                onLoad={() => handleImageLoaded(memory.id)}
                                priority
                            />
                        </div>
                    ))}
                </div>

                {selectedMemory && (
                    <div
                        id="image-container"
                        className="grid fixed inset-0 place-content-center bg-black bg-opacity-90 z-20"
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="fixed top-0 right-0 z-10"
                            onClick={closeMemory}
                        >
                            <X />
                        </Button>
                        <Image
                            id="full-image"
                            src={selectedMemory.url}
                            alt={selectedMemory.title}
                            className="object-contain"
                            fill
                            quality={100}
                            priority
                        />
                    </div>
                )}
            </main>
        </>
    );
}