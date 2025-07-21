import { type Result, UnauthorizedError, ensureError } from "@/lib/fetch/response";

// Database
import { db } from "@/lib/db/drizzle";
import { type Memory } from "@/lib/db/schema";



export async function POST(): Promise<Response> {
    try {
        throw new UnauthorizedError();
        // const memoryData = await req.json();
        // await db.insert(memories).values(memoryData);

        // return Response.json(
		// 	{
		// 		success: true,
		// 		data: memoryData,
		// 		level: "info",
		// 		message: `Memory created successfully.`,
		// 	} satisfies Result<Memory>,
		// 	{ status: 201 }
        // );
    } catch(err) {
		const error = ensureError(err);
		console.error(`ERR::MEMORIES::POST: ${error.message}`);

		return Response.json(
			{
				success: false,
				message: `Failed to create memory, reason: ${error.message}`,
			} satisfies Result,
			{ status: error.status }
		);
	}
}

export async function GET(): Promise<Response> {
    try {
        const memories = await db.query.memories.findMany();

		return Response.json(
			{
				success: true,
				data: memories,
				level: "info",
				message: `Memories fetched successfully.`,
			} satisfies Result<Memory[]>,
			{ status: 200 }
		);
    } catch (err) {
		const error = ensureError(err);
		console.error(`ERR::MEMORIES::GET: ${error.message}`);

		return Response.json(
			{
				success: false,
				message: `Failed to fetch memories, reason: ${error.message}`,
			} satisfies Result,
			{ status: error.status }
		);
	}
}