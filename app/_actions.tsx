"use server";
import { revalidatePath } from "next/cache";
import { mailOptions, transporter } from "@/lib/nodemailer";
import { NextRequest, NextResponse } from "next/server";
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

// export async function Subscribe(request: Request) {
// 	const body = await request.json();
// 	const date = Math.floor(Date.now() / 1000);
// 	try {
// 		const sql = "select id from subscribers where email = ?";
// 		const data = await dbconnect({ query: sql, values: [body.email] });
// 		if (Object.keys(data).length !== 0) {
// 			return NextResponse.json({ message: "Subscribed!" });
// 		} else {
// 			const sql = `insert into subscribers (email, date) values (?,?)`;
// 			const data = await dbconnect({
// 				query: sql,
// 				values: [body.email, date],
// 			});
// 			return NextResponse.json({ message: "Subscribed!" });
// 		}
// 	} catch (error) {
// 		return NextResponse.json({ error: "sql error." });
// 	}
// }
