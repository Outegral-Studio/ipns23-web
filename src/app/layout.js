import "./globals.scss";
import Navbar from "./navbar";
import Footer from "./footer";
import { Montserrat, Noto_Sans_TC } from "next/font/google";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const montserrat = Montserrat({
	weight: ["400", "500", "700"],
	subsets: ["latin"],
    style: ["normal", "italic"],
	display: "swap",
	variable: "--font-montserrat",
});

const notoSansTC = Noto_Sans_TC({
	weight: ["400", "500", "700"],
	subsets: ["latin"],
    style: "normal",
	display: "swap",
	variable: "--font-noto-sans-tc",
});

export const metadata = {
	title: {
        default: "多原方程式",
        template: "%s | 多原方程式",
    },
	description: "清大原科院學士班 23 屆畢業紀念網站",
	image: "../../public/img/Banner.jpg",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
            <head>
                <link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
                {/* TEMP */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Noto+Sans+TC:wght@400;500;700&display=swap" />
            </head>
			<body className={`${montserrat.variable} ${notoSansTC.variable}
                             grid grid-rows-[1fr_auto] min-h-screen min-h-[100dvh] scroll-smooth
                             text-primary text-sm sm:text-base xl:text-lg bg-primary`}>
				<Navbar />
                {children}
                <Footer />
			</body>
		</html>
	);
}