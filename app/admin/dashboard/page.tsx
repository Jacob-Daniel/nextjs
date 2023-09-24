import AddUserHash from "@/app/admin/components/AddUserHash";
import { readUserServerAction } from "@/app/_userServerActions";
export default async function Page() {
	const user = await readUserServerAction();
	return (
		<section className="md:mt-5 p-3 md:p-0 md:col-start-2">
			<h1 className="mb-5">{user.isLoggedIn && "Logged In!"}</h1>
			<AddUserHash loggedIn={user.isLoggedIn} hash={user.hash} />
		</section>
	);
}
