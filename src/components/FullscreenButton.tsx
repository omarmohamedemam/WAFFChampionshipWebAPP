"use client";

import { useState, useEffect } from "react";
import { Maximize, Minimize } from "lucide-react";
import screenfull from "screenfull";

export function FullscreenButton() {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isSupported, setIsSupported] = useState(false);

    useEffect(() => {
        if (screenfull.isEnabled) {
            setIsSupported(true);

            const handleChange = () => {
                setIsFullscreen(screenfull.isFullscreen);
            };

            screenfull.on('change', handleChange);
            return () => screenfull.off('change', handleChange);
        }
    }, []);

    const toggleFullscreen = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle();
        }
    };

    // Only render if fullscreen is supported
    if (!isSupported) return null;

    return (
        <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white font-semibold transition-all shadow-lg hover:shadow-xl z-[100] cursor-pointer"
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
