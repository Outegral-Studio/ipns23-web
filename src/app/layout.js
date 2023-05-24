"use client";
import "./globals.scss";
import Navbar from "./navbar";
import Footer from "./footer";
import { Space_Grotesk, Noto_Sans_TC } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-space-grotesk",
});

const notoSansTC = Noto_Sans_TC({
	weight: ["400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-noto-sans-tc",
});

export const metadata = {
	icons: {
		icon: "/icon.svg",
	},
	title: "清大原科 23 畢業網站",
	description: "IPNS 23rd Graduation Website",
	image: "",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
            <head>
            </head>
			<body className={`${spaceGrotesk.variable} ${notoSansTC.variable} text-sm sm:text-base xl:text-lg`}>
				<Navbar />
                {children}
                <Footer />
			</body>
		</html>
	);
}
