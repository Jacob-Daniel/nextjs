"use server";
import { dbconnect } from "@/lib/dbconnect";
import { revalidatePath } from "next/cache";

async function insertRecord(data: FormData) {
	const email = data.get("email");
	const date = Math.floor(Date.now() / 1000);

	try {
		const sql = "select id from subscribers where email = ?";
		const data = await dbconnect({ query: sql, values: [email] });
		if (Object.keys(data).length !== 0) {
			return { error: "Already exists." };
		} else {
			const sql = `insert into subscribers (email, date) values (?,?)`;
			const data = await dbconnect({
				query: sql,
				values: [email, date],
			});
			return { success: "Subscribed!" };
			revalidatePath("/subscriber");
		}
	} catch (error) {
		return { error: error };
	}
}

export async function addSubscriber(data: FormData) {
	return insertRecord(data);
}

async function deleteRecord(data: FormData) {
	const email = data.get("email");
	const date = Math.floor(Date.now() / 1000);

	try {
		const sql = "select id from subscribers where email = ? and unsub = ?";
		const data = await dbconnect({ query: sql, values: [email, 0] });
		if (Object.keys(data).length === 0) {
			return { error: "Email does not exists or email Pending Removal." };
		} else {
			const sql = `update subscribers set unsub = ? where email = ?`;
			const data = await dbconnect({
				query: sql,
				values: [1, email],
			});
			return { success: "UnSubscribed!" };
			revalidatePath("/subscriber");
		}
	} catch (error) {
		return { error: error };
	}
}

export async function Unsubscribe(data: FormData) {
	return deleteRecord(data);
}
