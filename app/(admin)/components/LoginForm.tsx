"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { submitCookieServerAction } from "@/app/_userServerActions";
const initValues = {
	message: "",
	error: false,
};

export default function LoginFormServerAction({
	loggedIn,
	hash,
}: {
	loggedIn: boolean;
	hash: boolean;
}) {
	const path = useSearchParams();
	const hashParam = path.get("hash");
	const createdNewUser = path.get("usercreate");
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setPassword] = useState("");
	const [state, setState] = useState(initValues);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleSubmitServerAction = async () => {
		setState({
			...state,
			message: "Loading",
		});
		startTransition(async () => {
			const res = await submitCookieServerAction(userPassword, userEmail);
			if (res?.isLoggedIn === false) {
				setState({
					message: "There was a Problem",
					error: true,
				});
				return;
			} else if (res?.isLoggedIn === true) {
				setState({
					message: "Logged In",
					error: false,
				});
				router.push("/dashboard?usercreate=1");
			}
		});
	};

	return (
		<section
			id="login"
			className={`transition-[height] login transform transition duration-150 col-span-12 bg-white pb-2 mb-3 rounded`}
		>
			<h1 className="font-bold mb-3 text-center">{"User Login"}</h1>
			<form
				action={handleSubmitServerAction}
				className="grid grid-cols-1 gap-2 border p-3"
			>
				<label htmlFor="email">Email</label>
				<input
					className="border p-2 rounded"
					id="userEmail"
					name="userEmail"
					placeholder="Enter Value Here"
					value={userEmail}
					onChange={(event) => setUserEmail(event.target.value)}
					required
				/>
				<label htmlFor="password">Password</label>
				<input
					className="border p-2 rounded"
					id="userPassword"
					name="userPassword"
					placeholder="Enter Value Here"
					value={userPassword}
					onChange={(event) => setPassword(event.target.value)}
					required
				/>
				<button
					type="submit"
					disabled={isPending}
					className={`border rounded p-2 ${
						isPending
							? "bg-gray-200"
							: "border-green-600 bg-green-400"
					}`}
				>
					{isPending ? "Processing ..." : "Login"}
				</button>
				<output
					className={`p-3 text-center rounded ${
						state.error
							? "text-red-400 bg-red-200"
							: "text-green-400 bg-green-200"
					} ${state.message ? "block" : "hidden"}`}
				>
					{state.message}
				</output>
			</form>
		</section>
	);
}
