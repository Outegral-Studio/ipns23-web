import { NextResponse } from "next/server";

const defaultURL = "https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=e6f16a81394c125d5e162efac97542b9&photoset_id=72177720308919351&user_id=198477524%40N07&format=json&nojsoncallback=1";
const largeURL = "https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=e6f16a81394c125d5e162efac97542b9&photoset_id=72177720308919351&user_id=198477524%40N07&extras=url_l&format=json&nojsoncallback=1";
const originalURL = "https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=e6f16a81394c125d5e162efac97542b9&photoset_id=72177720308919351&user_id=198477524%40N07&extras=url_o&format=json&nojsoncallback=1";

async function fetchPhotosetLarge() {
    const photoset = [];
    try {
        const data = await fetch(largeURL);
        if(data.ok) {
            const photoData = await data.json();
            photoData.photoset.photo.forEach((photo) => {
                const title = photo.title;
                const url = photo.url_l;
                const arr = [title, url];
                photoset.push(arr);
            })
            
            return JSON.stringify(photoset);
        }
    } catch(error) {
        console.log(error);
        return null;
    }
}

async function fetchPhotosetOriginal() {
    const photoset = [];
    try {
        const data = await fetch(originalURL);
        if(data.ok) {
            const photoData = await data.json();
            photoData.photoset.photo.forEach((photo) => {
                const title = photo.title;
                const url = photo.url_o;
                const arr = [title, url];
                photoset.push(arr);
            })
            
            return JSON.stringify(photoset);
        }
    } catch(error) {
        console.log(error);
        return null;
    }
}

async function fetchPhotosetDefault() {
    const photoset = [];
    try {
        const data = await fetch(defaultURL);
        if(data.ok) {
            const photoData = await data.json();
            photoData.photoset.photo.forEach((photo) => {
                const title = photo.title;
                const farmID = photo.farm,
                      serverID = photo.server,
                      photoID = photo.id,
                      secret = photo.secret;
                const url = `https://farm${farmID}.staticflickr.com/${serverID}/${photoID}_${secret}.jpg`;
                const arr = [title, url];
                photoset.push(arr);
            })
            
            return JSON.stringify(photoset);
        }
    } catch(error) {
        console.log(error);
        return null;
    }
}

export async function GET(request) {
    const size = request.nextUrl.searchParams.get("size");
    let data;
    switch (size) {
        case "l":
            data = await fetchPhotosetLarge();
            break;
        case "org":
            data = await fetchPhotosetOriginal();
            break;
        default:
            data = await fetchPhotosetDefault();
            break;
    }
    return NextResponse.json(JSON.parse(data));
}