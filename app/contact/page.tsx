import ContactForm from "@/app/components/ContactForm";
import { dbconnect } from "@/lib/dbconnect";

export default async function Contact() {
	return (
		<main className="col-span-12 grid grid-cols-12 gap-y-10 bg-white pt-5">
			<section className="col-span-12 px-5 md:col-span-6 md:col-start-4 md:px-0">
				<ContactForm />
			</section>
		</main>
	);
}
