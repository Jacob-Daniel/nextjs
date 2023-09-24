"use server";
import { dbconnect } from "@/lib/functions";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { getServerActionSession } from "@/lib/session";

export async function insertUser(
	username: string,
	password: string,
	email: string,
) {
	const session = await getServerActionSession();
	try {
		const data = await dbconnect({
			query: "select `email` from `adminusers` where `email` = ?",
			values: [email],
		});
		if (data && data[0]) {
			return { message: "User Exists", error: true };
		}
	} catch (error: unknown) {
		console.error((error as Error).message);
	}
	const hash = await new Promise((resolve, reject) => {
		bcrypt.hash(password, 10, function (err, hash) {
			if (err) reject(err);
			resolve(hash);
		});
	});

	if (hash) {
		const sql = `insert into adminusers (username,password,email) values(?,?,?)`;
		const data = await dbconnect({
			query: sql,
			values: [username, hash, email],
		});
		if (data && data.insertId) {
			session.hash = false;
			return { message: "User Created.. Redirecting..", error: false };
		}
		return { message: "error", error: true };
		revalidatePath("/admin");
	}
}
