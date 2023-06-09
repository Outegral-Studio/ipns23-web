import path from "path";
import { promises as fs } from 'fs';
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "src/app/json/classmates/classmates.json");
const photoUrl = "https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=e6f16a81394c125d5e162efac97542b9&photoset_id=72177720308879077&user_id=198477524%40N07&format=json&nojsoncallback=1";

export function isValidID(id) {
    if(Number.isInteger(parseInt(id, 10))) {
        return true;
    }

    return false;
}

async function fetchPhotoURL(id) {
    if(!isValidID(id)) {
        return null;
    }
    
    try {
        const data = await fetch(photoUrl);
        if(data.ok) {
            const trueData = await data.json();
            const matchingData = trueData.photoset.photo.find((photo) => {
                return parseInt(id, 10) === parseInt(photo.title);
            })
            
            if(!matchingData) {
                return null;
            }
            const farmID = matchingData.farm,
                  serverID = matchingData.server,
                  photoID = matchingData.id,
                  secret = matchingData.secret;
            const photoURL = `https://farm${farmID}.staticflickr.com/${serverID}/${photoID}_${secret}.jpg`;
            return photoURL;
        }
    } catch(error) {
        console.log(error);
        return null;
    }
}

export async function fetchJSONData(id) {
    if(!isValidID(id)) {
        return null;
    }

    const data = await fs.readFile(filePath, "utf-8");
    const url = await fetchPhotoURL(id);
    const matchingData = JSON.parse(data)[id.toString()];
    matchingData.PhotoURL = url;
    return matchingData;
}

async function fetchClassmateList() {
    const classmates = [];
    let counter = 1;
    
    while(true) {
        try {
            const classmate = await fetchJSONData(counter);
            const arr = [classmate.Name,
                         classmate.FirstExpertise,
                         classmate.SecondExpertise,
                         classmate.Quote,
                         classmate.PhotoURL];
            classmates.push(arr);
            counter++;
        } catch(error) {
            console.error(error);
            break;
        }
    }

    return JSON.stringify(classmates);
}

export async function GET(request) {
    const data = await fetchClassmateList();
    return NextResponse.json(JSON.parse(data));
}