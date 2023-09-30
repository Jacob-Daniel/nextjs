"use client";
import { useRef, useTransition } from "react";

export default function Button({
	checkHash,
}: {
	checkHash: () => Promise<null | undefined>;
}) {
	let [isPending, startTransition] = useTransition();
	return (
		<button
			disabled={isPending}
			onClick={async () => {
				startTransition(async () => {
					await checkHash();
				});
			}}
			className={`border rounded p-2 ${
				isPending ? "bg-gray-200" : "border-green-600 bg-green-400"
			}`}
		>
			{isPending ? "Processing ..." : "Add User"}
		</button>
	);
}
