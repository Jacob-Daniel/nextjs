"use server";
import { dbconnect, strReverse } from "@/lib/functions";
import { NextRequest, NextResponse } from "next/server";
import { getServerActionSession, getSession } from "@/lib/session";

const dbHash = async function (hash: string | null) {
	try {
		const data = await dbconnect({
			query: "select `id` from `user_hashes` where `hash` = ? and used =?",
			values: [hash, 0],
		});
		if (data && data[0]) {
			return { error: false };
		} else {
			return { error: true };
		}
	} catch (error: unknown) {
		console.error((error as Error).message);
	}
};

export const getHash = async (hash: string | null) => {
	const res = await dbHash(hash);
	if (res?.error === false) {
		const session = await getServerActionSession();
		session.hash = true;
		await session.save();
	}
	return res?.error;
};
