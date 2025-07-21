import { type Result, NotFoundError, ensureError } from "@/lib/fetch/response";

// Database
import { db } from "@/lib/db/drizzle";
import { type Classmate } from "@/lib/db/schema";



export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ classmateId: string }> }
) {
	const classmateId = (await params).classmateId;

    try {
        const classmateData = await db.query.classmates.findFirst({
            where: (classmates, { eq }) => eq(classmates.id, Number(classmateId)),
        });

        if (!classmateData) throw new NotFoundError(`Classmate with ID \`${classmateId}\` not found.`);
		return Response.json(
			{
				success: true,
				data: classmateData,
				level: "info",
				message: `Classmate \`${classmateId}\` fetched successfully.`,
			} satisfies Result<Classmate>,
			{ status: 200 }
		);
    } catch (err) {
		const error = ensureError(err);
		console.error(`ERR::CLASSMATE::GET: ${error.message}`);

		return Response.json(
			{
				success: false,
				message: `Failed to fetch classmate \`${classmateId}\`, reason: ${error.message}`,
			} satisfies Result,
			{ status: error.status }
		);
    }
}