import { getPublicContent } from "@/lib/cms-helper";
import { CMSSettings } from "@/components/admin/CMSSettings";

export const dynamic = "force-dynamic";

// Serialize content to remove non-serializable icon components
function serializeContent(content: any) {
    return {
        ...content,
        // Strip icon functions from facilities
        facilities: content.facilities?.map((cat: any) => ({
            ...cat,
            items: cat.items?.map((item: any) => ({
                name: item.name,
                // Store icon name as string for potential future use
                iconName: typeof item.icon === "function" ? item.icon.displayName || item.icon.name : undefined,
            }))
        })),
        // Strip icon functions from rules
        rules: content.rules?.map((r: any) => ({
            rule: r.rule,
            iconName: typeof r.icon === "function" ? r.icon.displayName || r.icon.name : undefined,
        })),
    };
}

export default async function SettingsPage() {
    const rawContent = await getPublicContent();
    const content = serializeContent(rawContent);
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Pengaturan Web</h1>
            <CMSSettings content={content} />
        </div>
    );
}
