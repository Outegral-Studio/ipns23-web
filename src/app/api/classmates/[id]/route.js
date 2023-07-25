import { NextResponse } from "next/server";
import { fetchJSON } from "../route";

export async function GET(req, { params }) {
    const data = await fetchJSON(params.id);
    return NextResponse.json(data);
}