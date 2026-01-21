"use client";

import { useState, useEffect } from "react";
import { Maximize, Minimize } from "lucide-react";

export function FullscreenButton() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (err) {
            console.error("Fullscreen error:", err);
        }
    };

    return (
        <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white font-semibold transition-all shadow-lg hover:shadow-xl"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
            {isFullscreen ? (
                <>
                    <Minimize className="w-5 h-5" />
                    <span className="hidden md:inline">Exit Fullscreen</span>
                </>
            ) : (
                <>
                    <Maximize className="w-5 h-5" />
                    <span className="hidden md:inline">Fullscreen</span>
                </>
            )}
        </button>
    );
}
