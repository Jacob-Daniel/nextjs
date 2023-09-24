"use server";
import { dbconnect, strReverse } from "@/lib/functions";
import { NextRequest, NextResponse } from "next/server";
import { getServerActionSession, getSession } from "@/lib/session";

const dbHash = async function (hash: string | null) {
	try {
		const data = await dbconnect({
			query: "update `user_hashes` set `used` = ? where `hash` = ?",
			values: [1, hash],
		});
		return { error: false };
	} catch (error: unknown) {
		console.error((error as Error).message);
	}
};

export const removeHash = async (hash: string | null) => {
	await dbHash(hash);
};
