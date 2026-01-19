import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSettings } from '@/hooks/useSettings';

interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    ogType?: string;
    ogImage?: string;
    twitterHandle?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    canonical,
    ogType = 'website',
    ogImage,
    twitterHandle = '@NJREXIM',
}) => {
    const { data: settings } = useSettings();
    const siteName = settings?.siteName || 'NJR EXIM';
    const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Premium Agricultural Export Company`;
    const defaultDescription = settings?.siteDescription || 'NJR EXIM is a leading international export company specializing in premium agricultural and food products.';
    const finalDescription = description || defaultDescription;
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://njrexim.com';

    // Use provided ogImage first, then settings.ogImageUrl, then fallback
    const finalOgImage = ogImage || settings?.ogImageUrl || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200&q=80';

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={finalDescription} />
            {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalOgImage} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalOgImage} />
            {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
        </Helmet>
    );
};

export default SEO;
