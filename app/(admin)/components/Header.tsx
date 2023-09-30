import Nav from "./Nav";
import { readUserServerAction } from "@/app/_userServerActions";
export default async function Header(): Promise<JSX.Element> {
	const user = await readUserServerAction();
	return (
		<header className="px-5">
			<div className="inner max-w-[1200px] grid grid-cols-2 mx-auto h-[60px]">
				<Nav loggedIn={user.isLoggedIn} />
			</div>
		</header>
	);
}
