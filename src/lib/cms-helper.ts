import { getCMSContent } from "@/app/actions/cms";
import { HERO_CONTENT, FACILITY_CATEGORIES, PRICING_TIERS, ROOM_IMAGES, HOUSE_RULES, FAQS, CONTACT_INFO, ROOM_SPECS, NAV_LINKS } from "@/lib/data";

export async function getPublicContent() {
    const [hero, facilities, pricing, gallery, rules, faqs, contact, specs, nav] = await Promise.all([
        getCMSContent("HERO_CONTENT"),
        getCMSContent("FACILITY_CATEGORIES"),
        getCMSContent("PRICING_TIERS"),
        getCMSContent("ROOM_IMAGES"),
        getCMSContent("HOUSE_RULES"),
        getCMSContent("FAQS"),
        getCMSContent("CONTACT_INFO"),
        getCMSContent("ROOM_SPECS"),
        getCMSContent("NAV_LINKS"),
    ]);

    return {
        hero: hero || HERO_CONTENT,
        facilities: facilities || FACILITY_CATEGORIES,
        pricing: pricing || PRICING_TIERS,
        gallery: gallery || ROOM_IMAGES,
        rules: rules || HOUSE_RULES,
        faqs: faqs || FAQS,
        contact: contact || CONTACT_INFO,
        specs: specs || ROOM_SPECS,
        nav: nav || NAV_LINKS,
    };
}
