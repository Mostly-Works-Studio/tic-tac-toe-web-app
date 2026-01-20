import { MoreVertical, HelpCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface GameMenuProps {
    onHowToPlay: () => void;
    onAbout: () => void;
}

export const GameMenu = ({ onHowToPlay, onAbout }: GameMenuProps) => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [canHover, setCanHover] = useState(false);

    const menuItems = [
        { id: "how-to-play", label: "How to Play", icon: HelpCircle, onClick: onHowToPlay },
        { id: "about", label: "About", icon: Info, onClick: onAbout },
    ];

    // Handle pointer enter to detect if device supports hover
    const handlePointerEnter = (e: React.PointerEvent, id: string) => {
        // Enable hover for mouse and pen/stylus, but not for touch
        if (e.pointerType === "mouse" || e.pointerType === "pen") {
            setCanHover(true);
            setHoveredItem(id);
        }
    };

    const handlePointerLeave = () => {
        setHoveredItem(null);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full hover:bg-card/50"
                    aria-label="Menu"
                >
                    <MoreVertical className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="min-w-[160px] backdrop-blur-lg bg-black/20 border-0 p-0 overflow-hidden rounded-lg"
                style={{
                    boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1), 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
                }}
            >
                {menuItems.map((item, index) => (
                    <DropdownMenuItem
                        key={item.id}
                        onClick={item.onClick}
                        onPointerEnter={(e) => handlePointerEnter(e, item.id)}
                        onPointerLeave={handlePointerLeave}
                        className={cn(
                            "cursor-pointer px-4 py-2.5 flex items-center gap-3 transition-colors select-none focus:bg-white/10 rounded-none",
                            canHover && hoveredItem === item.id && "bg-white/10",
                            index === 0 && "rounded-t-lg",
                            index === menuItems.length - 1 && "rounded-b-lg",
                            index !== menuItems.length - 1 && "border-b border-white/10"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{item.label}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
