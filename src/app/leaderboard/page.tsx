"use client";

import useSWR from 'swr';
import { LeaderboardPanel } from '@/components/LeaderboardPanel';

import { getCountryFlag } from '@/utils/countryFlags';
import { AspectRatioScaler } from '@/components/AspectRatioScaler';

const fetcher = async (url: string) => {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        try {
            return JSON.parse(text);
        } catch (e) {
            console.error("JSON Parse Error. Response was:", text.slice(0, 500));
            throw new Error("Invalid JSON response. Check Apps Script permissions (Must be 'Anyone'). Response: " + text.slice(0, 100));
        }
    } catch (err: any) {
        console.error("Fetch Error:", err);
        throw err;
    }
};

export default function LeaderboardPage() {
    const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || '';

    const { data, error } = useSWR(APPS_SCRIPT_URL, fetcher, {
        refreshInterval: 2000,
        isPaused: () => !APPS_SCRIPT_URL
    });

    const countries = data?.countries?.map((c: any) => ({
        id: c.country,
        rank: c.rank,
        label: c.country,
        flag: getCountryFlag(c.country) || c.flag, // Prefer asset flag, fallback to API flag (emoji)
        score: c.score
    })) || [];

    const players = data?.players?.map((p: any) => ({
        id: `${p.name}__${p.country}`,
        rank: p.rank,
        label: p.name,
        subLabel: p.country,
        flag: p.flag,
        score: p.score
    })) || [];

    const isLoading = !data && !error;

    return (
        <AspectRatioScaler>
            <div className="relative h-full w-full overflow-hidden" style={{ backgroundColor: '#e93490' }}>
                {/* Single background */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/assets/b2.svg')" }}
                />

                {/* Logos */}
                <img src="/assets/logo1.svg" alt="Logo" className="absolute top-6 left-6 w-40 md:w-52 z-50" />
                <div className="absolute top-6 right-6 flex flex-col items-end gap-4 z-50">
                    <div className="flex gap-6">
                        <img src="/assets/logo2.svg" alt="Logo" className="w-24 md:w-32" />
                        <img src="/assets/1x/logo3.png" alt="Logo" className="w-24 md:w-32" />
                    </div>

                </div>
                <img src="/assets/logo4.svg" alt="PiMX" className="absolute bottom-6 left-6 w-28 md:w-36 z-50" />

                {/* Content */}
                <div className="relative z-50 h-full flex flex-col px-4 pt-8">
                    {/* Title always at top */}
                    <img src="/assets/tittle.png" alt="Title" className="w-full max-w-2xl mx-auto mb-4 drop-shadow-2xl flex-none" />

                    {/* Leaderboard Grid centered in remaining space */}
                    <div className="flex-1 flex items-center justify-center pb-12">
                        <div className="w-full max-w-[95%] grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <LeaderboardPanel
                                title="Top 5 Countries"
                                items={countries}
                                isLoading={isLoading}
                            />
                            <LeaderboardPanel
                                title="Top 5 Players"
                                items={players}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-4 rounded-xl text-sm font-bold z-[100]">
                            <p>⚠️ {String(error.message || error)}</p>
                        </div>
                    )}
                </div>
            </div>
        </AspectRatioScaler>
    );
}
