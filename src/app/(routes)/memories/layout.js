import { generatePreviewMetadata, getFullTitle } from "@/lib/utils";

// Components & UI
import { WrapperLayout } from "@/components/common/layouts";

// Metadata
const title = "照片集";
const description = "照片集";
const url = "/memories";
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



export default function MemoriesLayout({ children }) {
    return (
        <WrapperLayout className="py-24">
            {children}
        </WrapperLayout>
    );
}