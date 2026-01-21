"use client";

import React, { useEffect, useState, useRef } from 'react';

interface AspectRatioScalerProps {
    children: React.ReactNode;
    ratio?: number; // default 3/2 = 1.5
    referenceWidth?: number; // Logical width to design against, e.g., 1920
}

export function AspectRatioScaler({
    children,
    ratio = 3 / 2,
    referenceWidth = 1920
}: AspectRatioScalerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const { clientWidth } = containerRef.current;
                // Calculate scale based on the container width vs reference width
                // The container itself is already constrained to the correct aspect ratio by CSS
                const newScale = clientWidth / referenceWidth;
                setScale(newScale);
            }
        };

        // Initial calc
        updateScale();

        // Observer for resizing
        const observer = new ResizeObserver(updateScale);
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [referenceWidth]);

    const referenceHeight = referenceWidth / ratio;

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
            {/* 
                This container creates the "letterboxed" area.
                It grows as large as possible within the window while keeping the aspect ratio.
            */}
            <div
                ref={containerRef}
                className="relative bg-[#1a1a2e] overflow-hidden shadow-2xl"
                style={{
                    maxWidth: '100vw',
                    maxHeight: '100vh',
                    aspectRatio: `${ratio}`,
                    width: '100%',  // try to be full width
                    height: 'auto', // adjust height to ratio
                }}
            >
                {/* 
                    This inner container is fixed at the reference resolution.
                    It is scaled down/up to fit the outer container.
                */}
                <div
                    style={{
                        width: `${referenceWidth}px`,
                        height: `${referenceHeight}px`,
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                >
                    {children}
                </div>
            </div>

            {/* Force height constraint if width constraint isn't enough (for tall screens) */}
            <style jsx global>{`
                /* 
                   If the screen is taller than the ratio implies for full width, 
                   we need to limit height to 100vh and let width shrink.
                   CSS aspect-ratio usually handles this if we toggle between 
                   width: 100% / height: auto AND width: auto / height: 100%.
                   But simpler: max-width/max-height + box-sizing usually works. 
                   Let's ensure the inner div always matches the aspect ratio logic above.
                */
            `}</style>
        </div>
    );
}
