import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface SiteSettings {
    siteName: string;
    siteDescription: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    facebookUrl: string;
    twitterUrl: string;
    linkedinUrl: string;
    instagramUrl: string;
    ogImageUrl: string;
}

export const useSettings = () => {
    return useQuery({
        queryKey: ["settings"],
        queryFn: async () => {
            const { data } = await api.get<SiteSettings>("/settings");
            return data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
