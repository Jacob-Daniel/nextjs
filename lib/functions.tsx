const mysql = require("mysql2/promise");

export async function dbconnect({
	query,
	values,
}: {
	query: string;
	values: any;
}) {
	const dbconnection = await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB,
	});
	try {
		const [results] = await dbconnection.execute(query, values);
		dbconnection.end();
		return results;
	} catch (error) {
		throw Error(error.message);
		return { error };
	}
}

const date: Date = new Date();
export function formatDate(date: Date) {
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let month = monthNames[date.getMonth()];
	let day = dayNames[date.getDay()];
	let ampm = hours >= 12 ? "pm" : "am";
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? "0" + minutes : minutes;
	let strTime = hours + ":" + minutes;
	return day + " " + date.getDate() + " " + month + " " + date.getFullYear();
}
