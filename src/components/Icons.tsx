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
