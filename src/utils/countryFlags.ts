
export const COUNTRY_FLAG_MAP: Record<string, string> = {
    "Syria": "/assets/flags/Flag_of_Syria_(2025-).svg.png",
    "Bahrain": "/assets/flags/bahrain-flag.png",
    "Chad": "/assets/flags/chad-flag.png",
    "China": "/assets/flags/china-flag.png",
    "Comoros": "/assets/flags/comoros-flag.png",
    "Egypt": "/assets/flags/egypt-flag.jpg",
    "India": "/assets/flags/india-flag.png",
    "Iraq": "/assets/flags/iraq-flag.png",
    "Jordan": "/assets/flags/jordan-flag.png",
    "Kuwait": "/assets/flags/kuwait-flag.png",
    "Lebanon": "/assets/flags/lebanon-flag.png",
    "Libya": "/assets/flags/libya-flag.png",
    "Mauritania": "/assets/flags/mauritania-flag.png",
    "Nigeria": "/assets/flags/nigeria-flag.png",
    "Oman": "/assets/flags/oman-flag.png",
    "Palestine": "/assets/flags/palestine.png",
    "Saudi Arabia": "/assets/flags/saudi-arabia-flag.png",
    "South Sudan": "/assets/flags/south-sudan-flag.png",
    "Sudan": "/assets/flags/sudan-flag.png",
    "Yemen": "/assets/flags/yemen-flag.png",
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
