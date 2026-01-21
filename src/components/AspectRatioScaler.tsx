"use client";

import React, { useEffect, useState, useRef } from 'react';

interface AspectRatioScalerProps {
    children: React.ReactNode;
    ratio?: number; // default 3/2 = 1.5
}

export function AspectRatioScaler({ children, ratio = 3 / 2 }: AspectRatioScalerProps) {
    const [scale, setScale] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    // Optional: If we want true "scaling" (transform scale) vs just "responsive container" (css aspect-ratio).
    // The user said "perfect fit... keeping the size adjustable".
    // A pure CSS aspect-ratio container allows responsive content (text wrapping) to adapt.
    // A transform scale forces the layout to look exactly the same, just bigger/smaller.
    // Given the context of a "Leaderboard" on a specific screen size (6m x 4m), 
    // often these are designed for a specific resolution (e.g. 1920x1080 usually, but here 3:2).
    // Let's implement a CSS-based constrained container first as it's more "web-native".
    // If text becomes too small/big, we might need the scale approach.
    // HOWEVER, "fit to a screen" often implies the content fills the 3:2 area perfectly.

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
            <div
                className="relative w-full h-full bg-[#1a1a2e] overflow-hidden shadow-2xl"
                style={{
                    maxWidth: '100vw',
                    maxHeight: '100vh',
                    aspectRatio: `${ratio}`,
                    // If the view is wider than 3:2, height hits 100vh, width adjusts.
                    // If the view is taller than 3:2, width hits 100vw, height adjusts.
                }}
            >
                {children}
            </div>
        </div>
    );
}
