import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DifficultyMenuProps {
    position: { x: number; y: number };
    currentDifficulty: "easy" | "medium" | "hard";
    onSelect: (difficulty: "easy" | "medium" | "hard") => void;
    onClose: () => void;
}

const DifficultyMenu = ({ position, currentDifficulty, onSelect, onClose }: DifficultyMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    // Adjust position to keep menu in viewport
    useEffect(() => {
        if (menuRef.current) {
            const rect = menuRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let adjustedX = position.x;
            let adjustedY = position.y;

            // Adjust horizontal position
            if (position.x + rect.width > viewportWidth) {
                adjustedX = viewportWidth - rect.width - 10;
            }

            // Adjust vertical position
            if (position.y + rect.height > viewportHeight) {
                adjustedY = viewportHeight - rect.height - 10;
            }

            menuRef.current.style.left = `${adjustedX}px`;
            menuRef.current.style.top = `${adjustedY}px`;
        }
    }, [position]);

    const difficulties: Array<{ value: "easy" | "medium" | "hard"; label: string; color: string }> = [
        { value: "easy", label: "Easy", color: "#4ADE80" },
        { value: "medium", label: "Medium", color: "#FACC15" },
        { value: "hard", label: "Hard", color: "#D2190B" },
    ];

    return (
        <div
            ref={menuRef}
            className="fixed z-50 backdrop-blur-lg bg-black/20 rounded-lg shadow-lg min-w-[120px] animate-in fade-in-0 zoom-in-95 overflow-hidden"
            style={{
                left: position.x,
                top: position.y,
                boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1), 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
            }}
        >
            {difficulties.map((diff, index) => (
                <button
                    key={diff.value}
                    onClick={() => {
                        onSelect(diff.value);
                        onClose();
                    }}
                    className={cn(
                        "w-full px-4 py-2 text-left flex items-center gap-2 [@media(hover:hover)]:hover:bg-white/10 transition-colors select-none",
                        currentDifficulty === diff.value && "bg-white/10",
                        index === 0 && "rounded-t-lg",
                        index === difficulties.length - 1 && "rounded-b-lg",
                        index !== difficulties.length - 1 && (
                            currentDifficulty === diff.value
                                ? "border-b border-white/5"
                                : "border-b border-white/10"
                        )
                    )}
                >
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: diff.color }}
                    />
                    <span className="text-sm font-medium">{diff.label}</span>
                </button>
            ))}
        </div>
    );
};

export default DifficultyMenu;
