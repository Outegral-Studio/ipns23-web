import { ThemeProvider } from "next-themes";
import { getBaseUrl, getFullTitle, generatePreviewMetadata } from "@/lib/utils";

// Styles
import "@/app/globals.css";
// import "@/app/globals.scss";

// Components & UI
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

// Fonts
import { Montserrat, Noto_Sans_TC } from "next/font/google";
const MontserratFont = Montserrat({
	weight: "variable",
	style: ["normal", "italic"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-montserrat",
});
const NotoSansTC = Noto_Sans_TC({
	weight: "variable",
	style: ["normal"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-noto-sans-tc",
});

// Metadata
const description = "清大原科院學士班 23 屆畢業紀念網站";
const keywords = ["清大", "原科", "IPNS", "畢業", "多原方程式", "原子科學院", "學士班"];
const author = "Outegral Studio";
export const metadata = {
	metadataBase: getBaseUrl(),
	title: {
		default: getFullTitle(),
		template: `%s | ${getFullTitle()}`,
	},
	description,
	applicationName: getFullTitle(),
	keywords,
	authors: [{ name: author }],
	creator: author,
	publisher: author,
	...generatePreviewMetadata({ title: getFullTitle(), description, url: "/" }),
	robots: {
		index: true,
		follow: true,
		nocache: false,
	},
};



export default function RootLayout({ children }) {
	const structuredData = [
		{
			"@context": "https://schema.org",
			"@type": "Organization",
			name: "多原方程式",
			url: "https://ipns23-web.vercel.app/",
			logo: "https://live.staticflickr.com/65535/52962605444_08530fa78c_o.jpg",

			// 創立日期 (範例)
			foundingDate: "2023-01-01",

			// 聯絡資訊
			contactPoint: [
				{
					"@type": "ContactPoint",
					telephone: "+886-2-1234-5678",
					contactType: "customer service",
					areaServed: "TW",
					availableLanguage: ["zh-TW", "en"],
				},
			],

			// 地址資訊 (若沒有可移除)
			address: {
				"@type": "PostalAddress",
				streetAddress: "光復路二段101號",
				addressLocality: "新竹市",
				addressRegion: "新竹",
				postalCode: "30013",
				addressCountry: "TW",
			},

			// 同步到其他社群平台連結
			sameAs: [
				"https://www.facebook.com/nthuipns",
				"http://ipns.web.nthu.edu.tw/bin/home.php",
			],
		},
	];

	return (
		<html
			lang="zh-Hant-TW"
			className={`${MontserratFont.variable} ${NotoSansTC.variable}`}
			suppressHydrationWarning
		>
			<head>
				{/* 在 <head> 中插入 JSON-LD 結構化資料 */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData),
					}}
				/>
			</head>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<Navbar />
					{children}
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}