import {
	IronSessionOptions,
	getIronSession,
	IronSessionData,
	getServerActionIronSession,
} from "iron-session";

import { cookies } from "next/headers";

export const sessionOptions: IronSessionOptions = {
	password: process.env.SECRET_COOKIE_PASSWORD as string,
	cookieName: "ironSessionJD",
	cookieOptions: {
		secure: process.env.NODE_ENV === "production",
	},
};

declare module "iron-session" {
	interface IronSessionData {
		cookieVariable?: string;
		user?: string;
		isLoggedIn?: boolean;
		admin?: boolean;
		hash?: boolean;
	}
}

const getSession = async (req: Request, res: Response) => {
	const session = getIronSession<IronSessionData>(req, res, sessionOptions);
	return session;
};

const getServerActionSession = async () => {
	const session = getServerActionIronSession<IronSessionData>(
		sessionOptions,
		cookies(),
	);
	return session;
};

export { getSession, getServerActionSession };
