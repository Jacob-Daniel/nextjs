import "@/app/globals.css";
import Link from "next/link";
import Header from "@/app/admin/components/Header";

export const metadata = {
	title: "Postcode Gardener Map",
	description: "Mapping Notting Dale Ward.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Header />
				<main className="grid grid-cols-1 md:grid-cols-3">
					{children}
				</main>
			</body>
		</html>
	);
}
