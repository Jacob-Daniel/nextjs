import { dbconnect } from "@/lib/functions";
import { NextResponse } from "next/server";
export async function GET(request: Request, { params }) {
	const { id } = params;

	const sql = `select id,metak,metad,path,title, summary,pagecontent,imagepath from pages where id = ?`;
	const data = await dbconnect({ query: sql, values: [id] });
	return NextResponse.json(data);
}
