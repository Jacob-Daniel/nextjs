import { readUserServerAction } from "@/app/_userServerActions";
export default async function Page() {
	const user = await readUserServerAction();
	return (
		<section className="md:mt-5 p-3 md:p-0 md:col-start-2">
			<h1>Logged In!</h1>
		</section>
	);
}
