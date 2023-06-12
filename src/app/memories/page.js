"use client";
import useSWR from "swr";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Load, LoadFailed } from "../components/gadgets"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Memories() {
    const [selectedImage, setSelectedImage] = useState(null);
    useEffect(() => {
        // TODO: Not working
        function handleOutsideClick(event) {
            const { target } = event;
            const image = document.getElementById("full-image");
            const closeButton = document.getElementById("close-button");
    
            if (!image.contains(target) && !closeButton.contains(target)) {
                closeImage();
            }
        }

        function handleKeyDown(event) {
            if(event.keyCode === 27) {
                closeImage();
            }
        }

        if(selectedImage) {
            document.documentElement.classList.add("overflow-y-hidden");
            document.addEventListener("click", handleOutsideClick);
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.documentElement.classList.remove("overflow-y-hidden");
            document.removeEventListener("click", handleOutsideClick);
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [selectedImage]);

    const { data, error } = useSWR("/api/memories?size=org", fetcher);
	if(error) return <LoadFailed />;
	if(!data) return <Load />;

    const title = 0, PhotoURL = 1;

    function openImage(photo) {
        setSelectedImage(photo);
    }

    function closeImage() {
        setSelectedImage(null);
    }

    return (
        <div className="w-full">
            <header className="mb-10">
                <h1>Photos</h1>
            </header>
            <main>
                <div className="columns-1 lg:columns-2 2xl:columns-3 gap-2">
                    {data.map((photo, index) => (
                        <div key={index} className="mb-2 cursor-pointer" onClick={() => openImage(photo)}>
                            <Image
                                src={photo[PhotoURL]}
                                alt={photo[title]}
                                width={500} height={400}
                                className="w-full object-cover rounded-[1em]"
                                // ! "priority" removed to allow lazy loading
                            />
                        </div>
                    ))}
                </div>

                {selectedImage && (
                    <div id="image-container" className="grid fixed inset-0 place-content-center bg-black bg-opacity-90 z-20">
                        <button id="close-button" className="fixed p-4 text-primary-invert text-[2em] z-1" onClick={closeImage}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <Image
                            id="full-image"
                            src={selectedImage[PhotoURL]}
                            alt={selectedImage[title]}
                            quality={100}
                            className="object-contain"
                            fill
                            priority
                        />
                    </div>
                )}
            </main>
        </div>
    );
}