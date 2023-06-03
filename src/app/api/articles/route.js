import path from "path";
import { promises as fs } from 'fs';
import { NextResponse } from "next/server";

const basePath = path.join(process.cwd(), "src/app/json/articles/");

function formatID(id) {
    return id ? id.toString().padStart(3, "0") : "";
}

// export function extractID(format) {
//     // ? Remove "a" and parse as int
//     const id = format.slice(1);
//     return parseInt(id, 10);
// }

export function isValidID(id) {
    if(Number.isInteger(parseInt(id, 10))) {
        return true;
    }

    return false;
}

export async function fetchJSON(ID) {
    const formattedID = formatID(ID);
    let filename = `a${formattedID}.json`;
    
    const data = await fs.readFile(basePath + filename, "utf-8");
    return data;
}

async function fetchArticleList() {
    const articles = [];
    let counter = 1;
    
    while(true) {
        try {
            const article = await fetchJSON(counter);
            const data = JSON.parse(article);
            const arr = [data.title,
                         data.subtitle,
                         data.author,
                         data.description];
            articles.push(arr);
            counter++;
        } catch(error) {
            console.error(error);
            break;
        }
    }

    return JSON.stringify(articles);
}

export async function GET(request) {
    const data = await fetchArticleList();
    return NextResponse.json(JSON.parse(data));
}