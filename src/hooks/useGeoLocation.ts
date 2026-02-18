import { useState, useEffect } from 'react';

interface GeoData {
    city: string | null;
    country: string | null;
    countryCode: string | null;
    currency: string;
    loading: boolean;
}

const useGeoLocation = () => {
    const [geoData, setGeoData] = useState<GeoData>({
        city: null,
        country: null,
        countryCode: null,
        currency: 'USD',
        loading: true,
    });

    useEffect(() => {
        const fetchLocation = async () => {
            // Check session storage first to avoid API spam
            const cached = sessionStorage.getItem('rootedai_geo');
            if (cached) {
                setGeoData(JSON.parse(cached));
                return;
            }

            try {
                const response = await fetch('https://ipwho.is/');
                const data = await response.json();

                if (data.success) {
                    const newData = {
                        city: data.city,
                        country: data.country,
                        countryCode: data.country_code,
                        currency: data.currency?.code || 'USD',
                        loading: false,
                    };
                    setGeoData(newData);
                    sessionStorage.setItem('rootedai_geo', JSON.stringify(newData));
                } else {
                    // Fallback
                    setGeoData((prev) => ({ ...prev, loading: false }));
                }
            } catch (error) {
                console.error('Geo detect failed:', error);
                setGeoData((prev) => ({ ...prev, loading: false }));
            }
        };

        fetchLocation();
    }, []);

    return geoData;
};

export default useGeoLocation;
