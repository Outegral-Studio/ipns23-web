import { NextResponse } from "next/server";

const photoUrl = "https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=e6f16a81394c125d5e162efac97542b9&photoset_id=72177720308919351&user_id=198477524%40N07&format=json&nojsoncallback=1";

async function fetchPhotoset() {
    const photoset = [];
    try {
        const data = await fetch(photoUrl);
        if(data.ok) {
            const photoData = await data.json();
            photoData.photoset.photo.forEach((photo) => {
                const title = photo.title;
                const farmID = photo.farm,
                      serverID = photo.server,
                      photoID = photo.id,
                      secret = photo.secret;
                const photoURL = `https://farm${farmID}.staticflickr.com/${serverID}/${photoID}_${secret}.jpg`;
                const arr = [title, photoURL];
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
    const data = await fetchPhotoset();
    return NextResponse.json(JSON.parse(data));
}