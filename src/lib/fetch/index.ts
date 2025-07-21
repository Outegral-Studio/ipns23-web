import ky, { HTTPError } from "ky";
import { match } from "ts-pattern";
import { type Result, ensureError } from "./response";



export async function fetcher(url: string): Promise<Result> {
    try {
        const response: Result = await ky.get(url, {}).json();
        const { message } = response;

        match(response)
			.with({ success: false }, () => console.error(message))
			.with({ success: true, level: "info" }, () => console.log(message))
			.with({ success: true, level: "warning" }, () => console.warn(message))
			.exhaustive();

        return response;
    } catch (err) {
		let status: number;
		let msg: string;

		if (err instanceof HTTPError) {
			status = err.response.status;

			const contentType = err.response.headers.get("content-type");
			msg = await match(contentType ?? "")
				.with("application/json", async () => {
					const { message } = await err.response.json();
					return message ?? err.message;
				})
				.otherwise(() => err.message);
		} else {
			const error = ensureError(err);
			status = error.status;
			msg = error.message;
		}

		const message = `[${status}] ${msg}`;
		console.error("ERR::FETCHER:", message);
		throw new Error(message);
	}
}