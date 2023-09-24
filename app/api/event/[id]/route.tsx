import { dbconnect } from "@/lib/functions";
import { NextResponse } from "next/server";
export async function GET(request: Request, { params }) {
	const { id } = params;

	const sql = `select id,cat_id,metak,metad,title,path,summary,content,imagepath,start_date,end_date,start_time,end_time,price from news_events where id = ?`;
	const data = await dbconnect({ query: sql, values: [id] });
	return NextResponse.json(data);
}
