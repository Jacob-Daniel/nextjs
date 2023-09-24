"use client";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { insertHash } from "@/app/_insertHashAction";
const initValues = {
	message: "",
	error: false,
	hashed: "",
};

export default function AddUserHash({
	loggedIn,
	hash,
}: {
	loggedIn: boolean;
	hash: string;
}) {
	const path = useSearchParams();
	const hashParam = path.get("hash");

	const [state, setState] = useState(initValues);
	const [clipboardText, setClipboardText] = useState("Copy To Clipboard");
	const [isPending, startTransition] = useTransition();
	const url = process.env.BASE_URL;
	const handleSubmitHash = async () => {
		setState({
			...state,
			message: "Loading",
		});
		startTransition(async () => {
			const res = await insertHash();
			if (res) {
				setState({
					message: res.message,
					error: res.error,
					hashed: res.hashed || "",
				});
			}
		});
	};

	const pathname = usePathname();
	const base = process.env.BASE_URL;

	const link = base + "admin?hash=" + state.hashed;
	const copylink = (e) => {
		navigator.clipboard.writeText(link);
		setClipboardText("Coppied Link To Clipboard!");
	};

	if (!loggedIn) {
		return null;
	} else {
		return (
			<section
				id="addUserHash"
				className={`transition-[height] login transform transition duration-150 col-span-12 bg-white pb-2 mb-3 rounded`}
			>
				<form
					action={handleSubmitHash}
					className="grid grid-cols-1 gap-2 border p-3 mb-3"
				>
					<h2 className="mb-3">
						Create User Login Account. Get a (one-time use) link and
						send to new user.
					</h2>
					<button
						type="submit"
						disabled={isPending}
						className={`border rounded p-2 ${
							isPending
								? "bg-gray-200"
								: "border-green-600 bg-green-400"
						}`}
					>
						{isPending ? "Processing ..." : "Get Link"}
					</button>
					<output
						className={`p-3 border text-center ${
							state.error
								? "text-red-400 bg-red-200"
								: "text-green-600 bg-green-200"
						} ${state.message ? "block" : "hidden"}`}
					>
						{state.message}
					</output>
				</form>
				<p
					className={`p-3 border text-center  ${
						state.hashed ? "block" : "hidden"
					}`}
				>
					<button
						onClick={copylink}
						className="cursor-pointer bg-green-400 border rounded p-2"
					>
						{clipboardText}
					</button>
				</p>
			</section>
		);
	}
}
