import { type Result, UnauthorizedError, ensureError } from "@/lib/fetch/response";

// Database
import { db } from "@/lib/db/drizzle";
import { type Classmate, classmates } from "@/lib/db/schema";



export async function POST(req: Request): Promise<Response> {
    try {
        // throw new UnauthorizedError();
        const classmateData = await req.json();
        await db.insert(classmates).values(classmateData);

        return Response.json(
			{
				success: true,
				data: classmateData,
				level: "info",
				message: `Classmate created successfully.`,
			} satisfies Result<Classmate>,
			{ status: 201 }
        );
    } catch(err) {
		const error = ensureError(err);
		console.error(`ERR::CLASSMATES::POST: ${error.message}`);

		return Response.json(
			{
				success: false,
				message: `Failed to create classmate, reason: ${error.message}`,
			} satisfies Result,
			{ status: error.status }
		);
	}
}

export async function GET(): Promise<Response> {
    try {
        const classmates = await db.query.classmates.findMany({
            columns: {
                id: true,
                name: true,
                image: true,
                quote: true,
                firstExpertise: true,
                secondExpertise: true,
            },
            orderBy: (chunks, { asc }) => asc(chunks.id),
        });

		return Response.json(
			{
				success: true,
				data: classmates,
				level: "info",
				message: `Classmates fetched successfully.`,
			} satisfies Result<Partial<Classmate>[]>,
			{ status: 200 }
		);
    } catch (err) {
		const error = ensureError(err);
		console.error(`ERR::CLASSMATES::GET: ${error.message}`);

		return Response.json(
			{
				success: false,
				message: `Failed to fetch classmates, reason: ${error.message}`,
			} satisfies Result,
			{ status: error.status }
		);
	}
}