import Nav from "./Nav";
import { readUserServerAction } from "@/app/_userServerActions";
export default async function Header() {
	const user = await readUserServerAction();
	return (
		<header className="bg-orange-400 px-5">
			<div className="inner max-w-[1200px] grid grid-cols-2 mx-auto h-[60px]">
				<h1 className="col-span-1 col-start-1 flex align-middle items-center font-bold">
					Iron Admin
				</h1>
				<Nav loggedIn={user.isLoggedIn} />
			</div>
		</header>
	);
}
