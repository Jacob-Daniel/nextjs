import "@/app/(admin)/globals.css";
import Link from "next/link";
import Header from "@/app/(admin)/components/Header";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	return {
		title: "Admin",
	};
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<body>
				<Header />
				<main className="grid grid-cols-1 md:grid-cols-3">
					{children}
				</main>
			</body>
		</html>
	);
}
