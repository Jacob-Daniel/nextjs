"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { insertUser } from "@/app/_insertUserAction";
import { getHash } from "@/app/_getHashAction";
import { removeHash } from "@/app/_removeHashAction";

const initValues = {
	message: "",
	error: false,
};

export default function AddUserForm({
	loggedIn,
	hash,
}: {
	loggedIn: boolean;
	hash: boolean;
}) {
	const path = useSearchParams();
	const router = useRouter();
	const hashParam = path.get("hash");
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setPassword] = useState("");
	const [state, setState] = useState(initValues);
	const [isPending, startTransition] = useTransition();

	async function checkHash() {
		startTransition(async () => {
			const hashExpired = await getHash(hashParam);
			if (hashExpired) {
				setState({
					...state,
					error: true,
					message: "Cookie Already Used.",
				});
				return;
			} else {
				handleSubmitInsert();
			}
		});
	}

	const handleSubmitInsert = async () => {
		setState({
			...state,
			message: "Loading ...",
			error: false,
		});

		const res = await insertUser(userName, userPassword, userEmail);
		if (res) {
			setState({
				message: res.message,
				error: res.error || false,
			});
			if (res.error === false) {
				setTimeout(() => {
					router.push("/admin/dashboard?usercreate=1");
					removeHash(hashParam);
				}, 3000);
			}
		}
	};
	if (!hashParam) {
		return null;
	} else {
		return (
			<section
				id="login"
				className={`transition-[height] login transform transition duration-150 col-span-12 bg-white pb-2 mb-3 rounded`}
			>
				<h2 className="font-bold mb-3 text-center">
					Create Map User Account
				</h2>
				<p className="mb-3">
					Once created, you will be directed to Log In Page.
				</p>
				<form
					action={checkHash}
					className="grid grid-cols-1 gap-2 border p-3"
				>
					<label htmlFor="name">Name</label>
					<input
						className="border rounded p-2"
						id="userName"
						name="userName"
						placeholder="Enter Name Here"
						value={userName || ""}
						onChange={(event) => setUserName(event.target.value)}
						required
					/>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						className="border p-2 rounded"
						id="userEmail"
						name="userEmail"
						placeholder="Enter Valid Email Here"
						value={userEmail}
						onChange={(event) => setUserEmail(event.target.value)}
						required
					/>
					<label htmlFor="password">Password</label>
					<input
						pattern=".{10,}"
						type="password"
						className="border rounded p-2"
						id="userPassword"
						name="userPassword"
						placeholder="Min 10 Characters"
						value={userPassword}
						onChange={(event) => setPassword(event.target.value)}
						required
					/>
					<button
						disabled={isPending}
						className={`border rounded p-2 ${
							isPending
								? "bg-gray-200"
								: "border-green-600 bg-green-400"
						}`}
					>
						{isPending ? "Processing ..." : "Submit"}
					</button>
					<output
						className={`p-3 border text-center ${
							state.error
								? "text-red-600 bg-red-200"
								: "text-green-600 bg-green-200"
						} ${state.message ? "block" : "hidden"}`}
					>
						{state.message}
					</output>
				</form>
			</section>
		);
	}
}
