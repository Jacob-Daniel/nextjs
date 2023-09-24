"use server";
import { dbconnect } from "@/lib/functions";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

export async function insertHash() {
	const hasMinutePassed = Math.floor(Date.now() / 1000) - 60;

	try {
		const data = await dbconnect({
			query: "select `created` from `user_hashes` where `created` > ?",
			values: [hasMinutePassed],
		});
		if (data && data[0]) {
			console.log("too many attempts");
			return {
				message: "Sorry Too Many Attempts",
				error: true,
				hash: "",
			};
		}
	} catch (error: unknown) {
		console.error((error as Error).message);
	}
	let str = (Math.random() + 1).toString(36).substring(10);
	const time = Math.floor(Date.now() / 1000);
	const hashed: string = await new Promise((resolve, reject) => {
		bcrypt.hash(str, 10, function (err, hash) {
			if (err) reject(err);
			resolve(hash);
		});
	});

	if (hashed) {
		const sql = `insert into user_hashes (hash,used,created) values(?,?,?)`;
		const data = await dbconnect({
			query: sql,
			values: [hashed, 0, time],
		});
		if (data && data.insertId) {
			return {
				message: "Success, Token Stored!",
				error: false,
				hashed: hashed,
			};
		}
		return { message: "error", error: true, hashed: "" };
		revalidatePath("/admin");
	}
}
