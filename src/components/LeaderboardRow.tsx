"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type LeaderboardRowProps = {
    rank: number;
    label: string;      // Country Name or Player Name
    subLabel?: string;  // Country Name (for player row)
    flag?: string;      // Emoji or URL
    score: number;
    isHeader?: boolean;
};

export function LeaderboardRow({ rank, label, subLabel, flag, score, isHeader }: LeaderboardRowProps) {
    // Styles
    const baseClass = "grid grid-cols-[3rem_1fr_4rem] md:grid-cols-[4rem_1fr_6rem] items-center gap-2 px-4 py-2 rounded-lg";
    const headerClass = "bg-white/10 text-white/60 font-medium text-xs md:text-sm uppercase tracking-wider mb-2 backdrop-blur-sm";
    const rowClass = "bg-white/10 text-white font-bold text-sm md:text-lg border-l-4 border-transparent hover:bg-white/20 transition-colors backdrop-blur-md shadow-md";
    const rankClass = "text-center font-mono opacity-80";
    const scoreClass = "text-center font-mono text-xl md:text-2xl text-purple-300";

    // Rank 1/2/3 specific styling
    const getRankStyle = (r: number) => {
        if (r === 1) return "border-l-yellow-400 bg-gradient-to-r from-yellow-500/20 to-transparent";
        if (r === 2) return "border-l-gray-400 bg-gradient-to-r from-gray-400/20 to-transparent";
        if (r === 3) return "border-l-amber-700 bg-gradient-to-r from-amber-700/20 to-transparent";
        return "";
    };

    if (isHeader) {
        return (
            <div className={twMerge(baseClass, headerClass)}>
                <div className="text-center">#</div>
                <div>{label}</div>
                <div className="text-center">PTS</div>
            </div>
        );
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 40 }}
            className={twMerge(baseClass, rowClass, getRankStyle(rank))}
        >
            <div className={rankClass}>{rank}</div>
            <div className="flex items-center gap-3 overflow-hidden">
                {flag && (
                    <span className="text-xl md:text-2xl shrink-0" role="img" aria-label="flag">
                        {flag.startsWith('http') ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={flag} alt="flag" className="w-6 h-4 object-cover rounded shadow-sm" />
                        ) : (
                            flag
                        )}
                    </span>
                )}
                <div className="flex flex-col min-w-0">
                    <span className="truncate leading-tight">{label}</span>
                    {subLabel && <span className="text-xs text-white/50 truncate font-medium">{subLabel}</span>}
                </div>
            </div>
            <motion.div
                key={score}
                initial={{ scale: 1.5, color: "#fff" }}
                animate={{ scale: 1, color: "#d8b4fe" }}
                className={scoreClass}
            >
                {score}
            </motion.div>
        </motion.div>
    );
}
