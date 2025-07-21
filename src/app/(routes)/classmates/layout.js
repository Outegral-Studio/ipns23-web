import { generatePreviewMetadata, getFullTitle } from "@/lib/utils";

// Components & UI
import { WrapperLayout } from "@/components/common/layouts";

// Metadata
const title = "同學";
const description = "是誰就讀清大的原科 23";
const url = "/classmates";
export const metadata = {
	title: {
		default: title,
		template: `%s｜${getFullTitle()}`,
	},
	description,
	...generatePreviewMetadata({
		title: getFullTitle(title),
		description,
		url,
	}),
	robots: {
		index: true,
		follow: true,
		nocache: false,
	},
};



export default function ClassmatesLayout({ children }) {
    return (
        <WrapperLayout className="py-24">
            {children}
        </WrapperLayout>
    );
}