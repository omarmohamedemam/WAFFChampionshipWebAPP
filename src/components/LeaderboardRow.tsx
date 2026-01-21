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

    const isCountryRow = !subLabel;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 40 }}
            className={twMerge(baseClass, rowClass, getRankStyle(rank), "relative overflow-hidden")}
        >
            {/* Animated Background Layer - Using CSS text rendering instead of SVG */}
            {isCountryRow && flag && (
                <motion.div
                    className="absolute inset-0 z-0 flex items-center justify-center"
                    initial={{ scale: 1 }}
                    animate={{
                        scale: [1, 1.3, 1],
                        x: ["-10%", "10%", "-10%"],
                        rotate: [0, 3, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatType: "reverse"
                    }}
                    style={{
                        opacity: 0.4,
                        filter: "blur(2px) brightness(1.2)",
                        fontSize: "20rem",
                        lineHeight: 0,
                    }}
                >
                    {flag}
                </motion.div>
            )}

            {/* Static Gradient Overlay - for text contrast */}
            {isCountryRow && flag && (
                <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/75 via-black/50 to-black/65 pointer-events-none" />
            )}

            {/* Content Layer - Above backgrounds */}
            <div className={twMerge(rankClass, "relative z-10")}>{rank}</div>

            <div className="flex items-center gap-3 overflow-hidden relative z-10">
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
                    <span className="truncate leading-tight drop-shadow-lg">{label}</span>
                    {subLabel && <span className="text-xs text-white/50 truncate font-medium">{subLabel}</span>}
                </div>
            </div>

            <motion.div
                key={score}
                initial={{ scale: 1.5, color: "#fff" }}
                animate={{ scale: 1, color: "#d8b4fe" }}
                className={twMerge(scoreClass, "relative z-10 drop-shadow-lg")}
            >
                {score}
            </motion.div>
        </motion.div>
    );
}
