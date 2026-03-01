"use client";

import dynamic from "next/dynamic";

function GameSkeleton() {
    return (
        <div className="min-h-[100dvh] bg-background flex flex-col items-center p-4">
            <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full">
                {/* Title */}
                <div className="flex items-center gap-3 w-full max-w-sm">
                    <div className="flex-1" />
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        <span className="text-x">Tic</span>
                        <span className="text-foreground"> Tac </span>
                        <span className="text-o">Toe</span>
                    </h1>
                    <div className="flex-1" />
                </div>

                {/* Score Board skeleton */}
                <div className="flex justify-center gap-4 w-full max-w-sm">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="flex-1 bg-card rounded-2xl p-4 text-center flex flex-col items-center justify-center gap-2 animate-pulse"
                        >
                            <div className="w-8 h-8 rounded-full bg-muted" />
                            <div className="w-6 h-7 rounded bg-muted" />
                        </div>
                    ))}
                </div>

                {/* Game Status skeleton */}
                <div className="h-7 w-48 rounded bg-muted animate-pulse" />

                {/* Game Board skeleton */}
                <div className="w-full max-w-sm">
                    <div className="grid grid-cols-3 gap-3 p-4 bg-card rounded-3xl opacity-40">
                        {Array(9)
                            .fill(null)
                            .map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-cell rounded-2xl aspect-square animate-pulse"
                                />
                            ))}
                    </div>
                </div>

                {/* Button skeleton */}
                <div className="flex flex-col gap-3 w-full max-w-sm min-h-[128px]">
                    <div className="h-11 rounded-lg bg-muted animate-pulse" />
                    <div className="h-11 rounded-lg bg-muted/50 animate-pulse" />
                </div>
            </div>

            {/* Footer */}
            <footer className="pt-4 pb-2 text-center text-sm text-muted-foreground select-none">
                Made with ❤ by Mostly Works Studio
            </footer>
        </div>
    );
}

const Index = dynamic(() => import("@/pages/Index"), {
    ssr: false,
    loading: () => <GameSkeleton />,
});

export default function Home() {
    return <Index />;
}
