import { useEffect, useState, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedScoreCardProps {
    triggerValue: number;
    children: ReactNode;
    className?: string;
    active?: boolean;
    activeClassName?: string;
    onClick?: () => void;
    staticContent?: ReactNode;
}

const AnimatedScoreCard = ({
    triggerValue,
    children,
    className,
    active,
    activeClassName,
    onClick,
    staticContent
}: AnimatedScoreCardProps) => {
    const [animating, setAnimating] = useState(false);
    const prevValue = useRef(triggerValue);
    const [displayChildren, setDisplayChildren] = useState(children);

    useEffect(() => {
        if (triggerValue !== prevValue.current) {
            setAnimating(true);

            // We want to keep the OLD children visible during the exit animation
            // But React children are dynamic. This is a bit tricky.
            // For simplicity in this specific app, we know the children structure.

            const timer = setTimeout(() => {
                setAnimating(false);
                prevValue.current = triggerValue;
                setDisplayChildren(children);
            }, 300);
            return () => clearTimeout(timer);
        } else {
            // Update display children if they change but triggerValue doesn't (e.g. active state)
            setDisplayChildren(children);
        }
    }, [triggerValue, children]);

    return (
        <div
            className={cn(
                "flex-1 bg-card rounded-2xl p-4 text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 relative overflow-hidden",
                className,
                active && activeClassName
            )}
            onClick={onClick}
        >
            {/* Static content that doesn't animate */}
            {staticContent}

            {animating ? (
                <div className="relative flex flex-col items-center justify-center">
                    {/* Old Content - Sliding Out */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 animate-slide-out-up">
                        {displayChildren}
                    </div>
                    {/* New Content - Sliding In (In Flow) */}
                    <div className="flex flex-col items-center justify-center gap-2 animate-slide-in-up">
                        {children}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                    {children}
                </div>
            )}
        </div>
    );
};

export default AnimatedScoreCard;
