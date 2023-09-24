"use server"; //remove and set serverActions to false in next.config.js to disable server actions
import { dbconnect, strReverse } from "@/lib/functions";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { getServerActionSession, getSession } from "@/lib/session";

export const readCookieServerAction = async (): Promise<string> => {
	const session = await getServerActionSession();
	return session.cookieVariable || "No Cookie Stored!";
};

export const destroyServerAction = async (): Promise<T> => {
	const session = await getServerActionSession();
	session.destroy();
	return { isLoggedIn: false };
};

export const readUserServerAction = async (): Promise<T> => {
	const session = await getServerActionSession();
	return {
		user: session.user,
		isLoggedIn: session.isLoggedIn,
		admin: session.admin,
		hash: session.hash,
	};
};

export const User = async (): Promise<string[]> => {
	return [];
};

export const submitCookieServerAction = async (
	password: string,
	email: string,
) => {
	const res = await dbUser({ password, email });
	if (res?.hash === false) {
		return {
			isLoggedIn: false,
			user: "",
			admin: false,
			route: "/",
			hash: false,
		};
	}

	const session = await getServerActionSession();
	session.cookieVariable = strReverse(res?.username || "");
	session.user = res?.username;
	session.isLoggedIn = true;
	session.admin = true;
	await session.save();
	return {
		// user: username,
		isLoggedIn: true,
		route: "/",
		admin: true,
		hash: false,
	};
};

const dbUser = async function ({
	// username,
	password,
	email,
}: {
	// username: string;
	password: string;
	email: string;
}) {
	try {
		const res = { hash: false, username: "" };
		const data = await dbconnect({
			query: "select `username`,`password` from `adminusers` where `email` = ?",
			values: [email],
		});
		if (data && data[0]) {
			res.username = data[0].username;
			res.hash = await bcrypt
				.compare(password, data[0].password)
				.then(async function (result) {
					return result;
				});
			return res;
		}
		return res;
	} catch (error: unknown) {
		console.error((error as Error).message);
	}
};
