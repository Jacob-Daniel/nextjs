import SubscribeForm from "@components/SubscribeForm";
import Subscribers from "@components/Subscribers";
import Link from "next/link";

export default async function Subscribe() {
	return (
		<main className="col-span-12 grid grid-cols-12 gap-y-10 bg-white pt-5">
			<section className="col-span-12 px-5 md:col-span-6 md:col-start-4 md:px-0">
				<h4 className="mb-1 inline-block font-bold">Subscribe</h4>
				<p className="mb-3">
					Subscribers receive new event and general announcement
					emails.
				</p>
				<SubscribeForm />
				<Subscribers />
				<p className="mb-3 flex flex-col text-sm">
					<Link href="/unsubscribe" className="text-blue-400">
						Unsubscribe
					</Link>
					<Link href="/privacy" className="text-blue-400">
						Privacy Policy
					</Link>
				</p>
			</section>
		</main>
	);
}
