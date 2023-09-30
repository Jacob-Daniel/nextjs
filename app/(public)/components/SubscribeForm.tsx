"use client";
import { addSubscriber } from "@/app/_actions";
import { useRef, useState } from "react";
import SubmitButton from "@components/SubmitButton";
let r = (Math.random() + 1).toString(36).substring(7);
export default function SubscribeForm() {
	const [validationError, setValidationError] = useState(null);
	const [count, setCount] = useState(0);
	const [error, setError] = useState(false);
	const [message, setMessage] = useState("");
	const formRef = useRef<HTMLFormElement>(null);
	async function action(data: FormData) {
		setCount(count + 1);
		if (count >= 3) {
			setMessage("Sorry too many attempts, page refresh required.");
			setError(true);
			return 0;
		}
		if (data.get("human") !== r) {
			setMessage(
				`Incorrect value. <b>${2 - count}</b> attempts remaining.`,
			);
			setError(true);
			return false;
		} else {
			const res = await addSubscriber(data);
			if (res.error) {
				setMessage(`${res?.error}`);
				setError(true);
				formRef.current?.reset();
			} else if (res?.success) {
				setValidationError(null);
				setMessage(res.success);
				setError(false);
				formRef.current?.reset();
			}
		}
	}

	return (
		<form ref={formRef} className="form mb-5 border-b pb-3" action={action}>
			<label htmlFor="mailformname" className="hidden">
				Email
			</label>
			<input
				minLength={5}
				maxLength={50}
				type="email"
				className="mb-2 w-full rounded border p-3 text-black"
				name="email"
				autoComplete="email"
				placeholder="Enter email address"
				required
			/>
			<label htmlFor="mailformessage" className="hidden">
				Human
			</label>
			<span className="1 mb-3 block rounded border border-red-500 p-2 p-3 text-red-500">
				Please enter
				<code className="mx-2 bg-gray-300 p-1 text-black">{r}</code>
				in field below.
			</span>
			<input
				id="human"
				className="mb-3 block w-full border p-3"
				type="text"
				placeholder="Validation Field"
				name="human"
				required
			/>
			<SubmitButton />
			<output
				name="result"
				htmlFor="email"
				className={`rounded border p-3 ${
					error
						? "border-yellow-500 text-yellow-500"
						: "border-green-500 text-green-500"
				} ${message === "" ? "hidden" : "block"}`}
				dangerouslySetInnerHTML={{ __html: message }}
			/>{" "}
		</form>
	);
}
