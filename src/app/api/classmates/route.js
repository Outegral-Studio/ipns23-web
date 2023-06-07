import path from "path";
import { promises as fs } from 'fs';
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "src/app/json/classmates/classmates.json");

export function isValidID(id) {
    if(Number.isInteger(parseInt(id, 10))) {
        return true;
    }

    return false;
}

export async function fetchJSONData(id) {
    if(!isValidID(id)) {
        return null;
    }
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data)[id.toString()];
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
                         classmate.Quote];
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