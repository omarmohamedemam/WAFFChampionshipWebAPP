"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LeaderboardRow } from "./LeaderboardRow";
import { clsx } from "clsx";

type Item = {
    rank: number;
    label: string;
    subLabel?: string;
    flag?: string;
    score: number;
    id: string; // unique key for animations
};

type LeaderboardPanelProps = {
    title: string;
    items: Item[];
    isLoading?: boolean;
};

export function LeaderboardPanel({ title, items, isLoading }: LeaderboardPanelProps) {
    return (
        <div className="flex flex-col h-full w-full max-w-lg mx-auto bg-black/60 rounded-2xl p-4 border border-white/20 shadow-2xl backdrop-blur-md">
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest text-center mb-6 drop-shadow-lg">
                {title}
            </h2>

            <LeaderboardRow rank={0} label={title.includes("Player") ? "Player" : "Country"} score={0} isHeader />

            <div className="flex-1 space-y-2 relative min-h-[300px]">
                {isLoading && items.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center text-white/30 animate-pulse">Loading updates...</div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {items.map((item) => (
                            <LeaderboardRow
                                key={item.id}
                                rank={item.rank}
                                label={item.label}
                                subLabel={item.subLabel}
                                flag={item.flag}
                                score={item.score}
                            />
                        ))}
                    </AnimatePresence>
                )}

                {!isLoading && items.length === 0 && (
                    <div className="text-center text-white/30 py-10 italic">No data available</div>
                )}
            </div>
        </div>
    );
}
