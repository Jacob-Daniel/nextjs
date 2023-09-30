import LoginForm from "@/app/(admin)/components/LoginForm";
import { readUserServerAction } from "@/app/_userServerActions";
export default async function Page() {
	const user = await readUserServerAction();
	if (user.isLoggedIn) {
		return (
			<section className="md:mt-5 p-3 md:p-0 md:col-start-2">
				<p>logged in</p>
			</section>
		);
	} else {
		return (
			<section className="md:mt-5 p-3 md:p-0 md:col-start-2">
				<LoginForm loggedIn={user.isLoggedIn} hash={user.hash} />
			</section>
		);
	}
}
