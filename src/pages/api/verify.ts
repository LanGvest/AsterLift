import type {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";

interface VerifyData {
	success: boolean
	challenge_ts: string
	hostname: string
	score: number
	action: string
}

export interface SuccessfulVerifiedResponse {
	ok: true
	verified: boolean
}

export interface FailedVerifiedResponse {
	ok: false
}

export type VerifiedResponse = SuccessfulVerifiedResponse | FailedVerifiedResponse;

function cansel(res: NextApiResponse<VerifiedResponse>): void {
	res.json({
		ok: false
	});
}

export default async function verify(req: NextApiRequest, res: NextApiResponse<VerifiedResponse>) {
	if(req.method !== "POST") return cansel(res);

	const {token} = req.body;

	if(!token) return cansel(res);

	let verifyRes = null;

	try {
		verifyRes = await axios.post<VerifyData>(
			"https://www.google.com/recaptcha/api/siteverify",
			`secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}
		);
	} catch(e) {
		return cansel(res);
	}

	if(!verifyRes || !verifyRes.data) return cansel(res);

	const {action, success, score} = verifyRes.data;

	if(!success) return cansel(res);

	let verified: boolean = false;

	if(action === "init") verified = score >= 0.4;

	res.json({
		ok: true,
		verified
	});
}