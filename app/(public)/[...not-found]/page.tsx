import Link from "next/link";

export default async function NotFound() {
	return (
		<section className="bg-transparent md:col-start-2 md:col-span-10 col-span-12 lg:col-start-4 2xl:col-start-3 lg:col-span-6 2xl:col-span-8 text-base">
			<header className="col-span-12 md:px-0 text-center h-[60px] md:h-[80px] flex items-center align-center justify-center mb-5">
				<h1 className="leading-9 text-[2.2rem] md:text-5xl text-white font-bold leading-9">
					404 / Page Not Found!
				</h1>
			</header>
			<article className="rounded px-0"></article>
		</section>
	);
}
