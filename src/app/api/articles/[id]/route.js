import { NextResponse } from "next/server";
import { isValidID, fetchJSON } from "../route";

export async function GET(request, { params }) {
    if(!isValidID(params.id)) {
        return null;
    }

    const data = await fetchJSON(params.id);
    return NextResponse.json(JSON.parse(data));
}