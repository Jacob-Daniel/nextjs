"use client";
import { useState, useRef } from "react";
import { Unsubscribe } from "@/app/_subscribeAction";
import SubmitButton from "@/app/components/SubmitButton";
let r = (Math.random() + 1).toString(36).substring(7);
export default function UnsubscribeForm(): JSX.Element {
	const [random, setRandom] = useState(r);
	const [count, setCount] = useState(0);
	const [error, setError] = useState(false);
	const [message, setMessage] = useState("");
	const formRef = useRef<HTMLFormElement>(null);
	async function action(formData: FormData) {
		setCount(count + 1);
		if (count >= 3) {
			setMessage("Sorry too many attempts, page refresh required.");
			setError(true);
			return 0;
		}
		if (formData.get("human") !== r) {
			setMessage(
				`Incorrect value. <b>${2 - count}</b> attempts remaining.`,
			);
			setError(true);
			return false;
		} else {
			const res = await Unsubscribe(formData);
			if (res?.error) {
				setMessage(`${res.error}`);
				setError(true);
			} else if (res?.success) {
				setMessage(res.success);
				setError(false);
				formRef.current?.reset();
			}
		}
	}
	return (
		<div className="mb-5 border-b border-b-gray-300 pb-5">
			<form ref={formRef} action={action} className="grid grid-cols-1">
				<label htmlFor="mailformemail" className="hidden">
					Email
				</label>
				<input
					id="mailformemail"
					className="mb-3 border p-3"
					type="email"
					placeholder="Email"
					name="email"
					minLength={5}
					maxLength={50}
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
					className="mb-3 border p-3"
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
							? "border-red-500 text-red-500"
							: "border-green-500 text-green-500"
					} ${message === "" ? "hidden" : "block"}`}
					dangerouslySetInnerHTML={{ __html: message }}
				/>{" "}
			</form>
		</div>
	);
}
