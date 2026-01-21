"use client";

import { useState, useEffect } from "react";
import { Maximize, Minimize } from "lucide-react";

export function FullscreenButton() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleFullscreenChange = () => {
            const isNowFullscreen = !!(
                document.fullscreenElement ||
                (document as any).webkitFullscreenElement ||
                (document as any).mozFullScreenElement ||
                (document as any).msFullscreenElement
            );
            setIsFullscreen(isNowFullscreen);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
        document.addEventListener("mozfullscreenchange", handleFullscreenChange);
        document.addEventListener("MSFullscreenChange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
            document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
            document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
        };
    }, []);

    const toggleFullscreen = async () => {
        try {
            const doc = document.documentElement as any;

            if (!isFullscreen) {
                // Enter fullscreen with browser compatibility
                if (doc.requestFullscreen) {
                    await doc.requestFullscreen();
                } else if (doc.webkitRequestFullscreen) {
                    await doc.webkitRequestFullscreen();
                } else if (doc.mozRequestFullScreen) {
                    await doc.mozRequestFullScreen();
                } else if (doc.msRequestFullscreen) {
                    await doc.msRequestFullscreen();
                }
            } else {
                // Exit fullscreen with browser compatibility
                const docAny = document as any;
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (docAny.webkitExitFullscreen) {
                    await docAny.webkitExitFullscreen();
                } else if (docAny.mozCancelFullScreen) {
                    await docAny.mozCancelFullScreen();
                } else if (docAny.msExitFullscreen) {
                    await docAny.msExitFullscreen();
                }
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
