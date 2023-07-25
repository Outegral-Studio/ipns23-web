import path from "path";
import { promises as fs } from 'fs';
import { NextResponse } from "next/server";

const jsonURL = path.join(process.cwd(), "src/app/json/classmates_test.json");
const photoUrl = "https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=e6f16a81394c125d5e162efac97542b9&photoset_id=72177720308879077&user_id=198477524%40N07&format=json&nojsoncallback=1";

export function validateAndParseID(id) {
    const parsedID = parseInt(id, 10);
    if (Number.isInteger(parsedID)) {
        return parsedID;
    }

    return false;
}

async function fetchPhotoURL(id) {
    const parsedID = validateAndParseID(id);
    if (parsedID === false) {
        throw new Error("Invalid ID when trying to fetch photo");
    }
    
    try {
        const rawData = await fetch(photoUrl);
        if (rawData.ok) {
            const data = await rawData.json();
            const matchingData = data.photoset.photo.find(photo => parseInt(photo.title) === parsedID);
            if (!matchingData) {
                return "";
            }

            const farmID = matchingData.farm,
                  serverID = matchingData.server,
                  photoID = matchingData.id,
                  secret = matchingData.secret;
            const photoURL = `https://farm${farmID}.staticflickr.com/${serverID}/${photoID}_${secret}.jpg`;
            return photoURL;
        }
    } catch (error) {
        console.log(error);
        return "";
    }
}

export async function fetchJSON(id) {
    const rawData = await fs.readFile(jsonURL, "utf-8");
    const data = JSON.parse(rawData);

    // Add photoURL
    data.classmates = await Promise.all(data.classmates.map(async cm => {
        const photoURL = await fetchPhotoURL(cm.id);
        return {
            // Spread existing classmate properties & add photoURL property
            ...cm,
            photoURL,
        };
    }));

    if (id) {
        const parsedID = validateAndParseID(id);
        if (parsedID === false) {
            throw new Error("Invalid ID");
        } else {
            const classmateData = data.classmates.find(cm => cm.id === parsedID);
            return classmateData ? classmateData : { notFound: true };
        }
    }

    return data;
}

async function fetchClassmateList() {
    const data = await fetchJSON();
    const classmates = data.classmates.map(cm => ({id: cm.id,
                                                   name: cm.name,
                                                   firstExpertise: cm.firstExpertise,
                                                   secondExpertise: cm.secondExpertise,
                                                   quote: cm.quote,
                                                   photoURL: cm.photoURL}));
    const classmateList = classmates.sort((a, b) => a.id - b.id);
    return classmateList;
}

export async function GET(req) {
    const data = await fetchClassmateList();
    return NextResponse.json(data);
}