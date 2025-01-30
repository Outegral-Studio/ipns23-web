import "./globals.scss";
import Navbar from "./navbar";
import Footer from "./footer";
import { Montserrat, Noto_Sans_TC } from "next/font/google";

// FontAwesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

// Google Fonts
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

// Metadata
export const metadata = {
    metadataBase: new URL("https://ipns23-web.vercel.app/"),
    title: {
        default: "多原方程式",
        template: "%s | 多原方程式",
    },
    description: "清大原科院學士班 23 屆畢業紀念網站",
    keywords: ["清大", "原科", "IPNS", "畢業", "多原方程式", "原子科學院", "學士班"],

    // 告訴搜尋引擎該如何索引與追蹤
    // "index, follow" 表示允許索引、允許追蹤連結
    robots: {
        index: true,
        follow: true,
    },

    // 指定 canonical URL (主站網址)
    alternates: {
        canonical: "https://ipns23-web.vercel.app/",
    },

    // Open Graph
    openGraph: {
        title: "多原方程式",
        description: "清大原科院學士班 23 屆畢業紀念網站",
        url: "https://ipns23-web.vercel.app/",
        siteName: "多原方程式",
        images: [
            {
                url: "https://live.staticflickr.com/65535/52962605444_08530fa78c_o.jpg",
                width: 800,
                height: 600,
            },
        ],
        locale: "zh_TW",
        type: "website",
    },

    // Twitter
    twitter: {
        card: "summary_large_image",
        title: "多原方程式",
        description: "清大原科院學士班 23 屆畢業紀念網站",
        images: [
            "https://live.staticflickr.com/65535/52962605444_08530fa78c_o.jpg",
        ],
    },

    // Icons
    icons: {
        icon: "/icon",           // favicon
        apple: "/apple-icon",    // apple-touch-icon
    },

    // Browser theme color
    themeColor: "white",
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
                "http://ipns.web.nthu.edu.tw/bin/home.php"
            ],
        },
    ];
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
                <link rel="apple-touch-icon" href="/apple-icon?<generated>" type="image/<generated>" sizes="<generated>" />
                {/* // TODO: Test after pull #51890 merge into stable */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap" />
                {/* 在 <head> 中插入 JSON-LD 結構化資料 */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </head>
            <body className={`${montserrat.variable} ${notoSansTC.variable}
                             grid grid-rows-[1fr_auto] min-h-screen min-h-[100dvh] scroll-smooth
                             text-sm sm:text-base xl:text-lg
                             text-primary bg-primary`}>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}