import { NextResponse } from "next/server";
import { isValidID, fetchJSONData } from "../route";

export async function GET(request, { params }) {
    if(!isValidID(params.id)) {
        return null;
    }
    
    const data = await fetchJSONData(params.id);
    return NextResponse.json(data);
}