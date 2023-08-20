"use server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { mailOptions, transporter } from "@/lib/nodemailer";
import { dbconnect } from "@/lib/dbconnect";

async function handler(data: FormData) {
	const date = new Date();
	const email = data.get("email");
	const name = data.get("name");
	const message = data.get("message");
	if (!name || !email || !message) {
		return NextResponse.json({
			error: "Missing form values",
		});
	}
	try {
		await transporter.sendMail({
			...mailOptions,
			subject: process.env.COMPANY_NAME + " Web Form Message ",
			html:
				"<div><p><b>Message:</b><br />" +
				message +
				"</p><p><b>From:</b><br />" +
				name +
				": " +
				email +
				"</p><p><b>Created Date:</b><br />" +
				date +
				"</p></div>",
		});
		return NextResponse.json({
			success: "Thank you " + name + ", your message has been sent!",
		});
	} catch (error) {
		await transporter.verify(function (error, success) {
			if (error) {
				console.log(error);
				// return NextResponse.json({
				// 	error: "" + error.message + "",
				// });
			} else {
				console.log("Server is ready to take our messages");
			}
		});
	}
	return NextResponse.json({
		error: "Bad Request",
	});
}

export async function sendMail(data: FormData) {
	const res = await handler(data);
	return res.json();
}

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
			revalidatePath("/subscribe");
			return { success: "Subscribed!" };
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
			revalidatePath("/subscribe");
			return { success: "UnSubscribed!" };
		}
	} catch (error) {
		return { error: error };
	}
}

export async function Unsubscribe(data: FormData) {
	return deleteRecord(data);
}
