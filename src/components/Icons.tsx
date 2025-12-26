import { cn } from "@/lib/utils";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

export const XIcon = ({ className, ...props }: IconProps) => {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-full h-full", className)}
            {...props}
        >
            <path
                d="M25 15 L50 40 L75 15 L85 25 L60 50 L85 75 L75 85 L50 60 L25 85 L15 75 L40 50 L15 25 Z"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const OIcon = ({ className, ...props }: IconProps) => {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-full h-full", className)}
            {...props}
        >
            <circle
                cx="50"
                cy="50"
                r="35"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
            />
        </svg>
    );
};

export const BotIcon = ({ className, ...props }: IconProps) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-full h-full", className)}
            {...props}
        >
            {/* Robot head */}
            <rect
                x="6"
                y="7"
                width="12"
                height="6"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Left antenna */}
            <line
                x1="8"
                y1="7"
                x2="8"
                y2="4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <circle cx="8" cy="4" r="0.8" fill="currentColor" />
            {/* Right antenna */}
            <line
                x1="16"
                y1="7"
                x2="16"
                y2="4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <circle cx="16" cy="4" r="0.8" fill="currentColor" />
            {/* Eyes */}
            <circle cx="9.5" cy="10" r="1" fill="currentColor" />
            <circle cx="14.5" cy="10" r="1" fill="currentColor" />
        </svg>
    );
};

export const UserIcon = ({ className, ...props }: IconProps) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-full h-full", className)}
            {...props}
        >
            {/* Head */}
            <circle
                cx="12"
                cy="8"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Body */}
            <path
                d="M6 19C6 16.2386 8.23858 14 11 14H13C15.7614 14 18 16.2386 18 19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

