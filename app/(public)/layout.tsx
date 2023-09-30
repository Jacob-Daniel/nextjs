import "./globals.css";
import Header from "@components/Header";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="w-full">
			<body className="w-full bg-gray-200">
				<div className="container relative mx-auto grid w-full grid-cols-12 bg-white">
					<Header />
					{children}
				</div>
			</body>
		</html>
	);
}
