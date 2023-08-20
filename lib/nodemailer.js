import nodemailer from "nodemailer";
const user = process.env.COMPANY_EMAIL_USER;
const pass = process.env.COMPANY_EMAIL_PASS;
const host = process.env.COMPANY_EMAIL_HOST;
const email = process.env.COMPANY_EMAIL_ADDR;
export const transporter = nodemailer.createTransport({
	host: host,
	port: 465,
	tls: true,
	debug: true,
	secure: true, // use TLS
	auth: {
		user: user,
		pass: pass,
	},
});

export const mailOptions = {
	from: email,
	to: email,
	bcc: "jacobrety@gmail.com",
	cc: "webable@protonmail.com",
};
