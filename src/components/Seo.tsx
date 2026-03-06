import { Helmet } from 'react-helmet-async';

interface SeoProps {
    title: string;
    description: string;
    canonical?: string;
    keywords?: string[];
    ogImage?: string;
    noIndex?: boolean;
    structuredData?: object;
}

const Seo = ({
    title,
    description,
    canonical,
    keywords,
    ogImage = '/og-image.png',
    noIndex = false,
    structuredData
}: SeoProps) => {
    const siteUrl = 'https://www.rootedai.co.in';
    // Strip query params — canonical URLs must never include ?s= or any other query strings
    const fullUrl = canonical
        ? canonical
        : (typeof window !== 'undefined'
            ? siteUrl + window.location.pathname
            : '');

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title.includes('RootedAI') ? title : `${title} | RootedAI`}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords.join(', ')} />}
            <link rel="canonical" href={fullUrl} />

            {/* Geo Tags */}
            <meta name="geo.region" content={structuredData?.["address"]?.["addressRegion"] || "IN-TN"} />
            <meta name="geo.placename" content={structuredData?.["address"]?.["addressLocality"] || "Hosur"} />
            <meta name="geo.position" content={structuredData?.["geo"] ? `${structuredData["geo"]["latitude"]};${structuredData["geo"]["longitude"]}` : "12.7409;77.8253"} />
            <meta name="ICBM" content={structuredData?.["geo"] ? `${structuredData["geo"]["latitude"]}, ${structuredData["geo"]["longitude"]}` : "12.7409, 77.8253"} />

            {/* Open Graph Tags */}
            <meta property="og:title" content={title} />
            <meta property="og:site_name" content="RootedAI" />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={siteUrl + ogImage} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content="website" />

            {/* Twitter Card Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={siteUrl + ogImage} />

            {/* Robots Tag */}
            {noIndex && <meta name="robots" content="noindex" />}

            {/* Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default Seo;
