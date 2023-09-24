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

export function strReverse(str: string) {
	let leng = str.length;
	let word = "";
	for (leng; leng > 0; leng--) {
		word += str[leng - 1];
	}
	return word;
}
