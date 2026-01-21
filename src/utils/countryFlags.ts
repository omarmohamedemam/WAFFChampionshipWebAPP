
export const COUNTRY_FLAG_MAP: Record<string, string> = {
    "Syria": "/assets/flags-svg/sy.svg",
    "Bahrain": "/assets/flags-svg/bh.svg",
    "Chad": "/assets/flags-svg/td.svg",
    "China": "/assets/flags-svg/cn.svg",
    "Comoros": "/assets/flags-svg/km.svg",
    "Egypt": "/assets/flags-svg/eg.svg",
    "India": "/assets/flags-svg/in.svg",
    "Iraq": "/assets/flags-svg/iq.svg",
    "Jordan": "/assets/flags-svg/jo.svg",
    "Kuwait": "/assets/flags-svg/kw.svg",
    "Lebanon": "/assets/flags-svg/lb.svg",
    "Libya": "/assets/flags-svg/ly.svg",
    "Mauritania": "/assets/flags-svg/mr.svg",
    "Nigeria": "/assets/flags-svg/ng.svg",
    "Oman": "/assets/flags-svg/om.svg",
    "Palestine": "/assets/flags-svg/ps.svg",
    "Saudi Arabia": "/assets/flags-svg/sa.svg",
    "South Sudan": "/assets/flags-svg/ss.svg",
    "Sudan": "/assets/flags-svg/sd.svg",
    "Yemen": "/assets/flags-svg/ye.svg",
};

export const getCountryFlag = (countryName: string): string | undefined => {
    // Normalize string to match keys if needed (e.g. trimming)
    const normalizedName = countryName.trim();
    // Try exact match first
    if (COUNTRY_FLAG_MAP[normalizedName]) {
        return COUNTRY_FLAG_MAP[normalizedName];
    }

    // Fallback? Or maybe try case-insensitive?
    const key = Object.keys(COUNTRY_FLAG_MAP).find(k => k.toLowerCase() === normalizedName.toLowerCase());
    return key ? COUNTRY_FLAG_MAP[key] : undefined;
};
