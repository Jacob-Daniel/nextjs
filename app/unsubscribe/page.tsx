import UnsubscribeForm from "@/app/components/UnsubscribeForm";
import { dbconnect } from "@/lib/dbconnect";
import Link from "next/link";

export default async function Unsubscribe() {
	return (
		<main className="col-span-12 grid grid-cols-12 gap-y-10 bg-white pt-5">
			<section className="col-span-12 px-5 md:col-span-6 md:col-start-4 md:px-0">
				<h4 className="mb-1 inline-block font-bold">Unsubscribe</h4>
				<p className="mb-3">Request Unsubscribe.</p>
				<UnsubscribeForm />
			</section>
		</main>
	);
}
