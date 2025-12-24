import { useState, useEffect } from "react";
import { Share, PlusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { toast } from "sonner";

export const PWAInstallPrompt = () => {
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if running in standalone mode
        const isStandaloneMode =
            window.matchMedia("(display-mode: standalone)").matches ||
            window.matchMedia("(display-mode: fullscreen)").matches ||
            (window.navigator as any).standalone === true;

        setIsStandalone(isStandaloneMode);

        // Check if device is iOS
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
        setIsIOS(isIosDevice);

        // Listen for beforeinstallprompt event (Android/Desktop)
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
            // Show toast or button for Android
            if (!isStandaloneMode) {
                toast("Install App", {
                    description: "Install Tic Tac Toe for a better experience!",
                    action: {
                        label: "Install",
                        onClick: () => handleInstallClick(),
                    },
                    duration: 10000,
                });
            }
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        // Show iOS drawer if on iOS and not standalone
        if (isIosDevice && !isStandaloneMode) {
            // Small delay to not be intrusive immediately
            const timer = setTimeout(() => setIsOpen(true), 3000);
            return () => clearTimeout(timer);
        }

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
            setDeferredPrompt(null);
        }
    };

    if (isStandalone) return null;

    return (
        <>
            {/* iOS Install Instructions Drawer */}
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Install Tic Tac Toe</DrawerTitle>
                        <DrawerDescription>
                            Install this app on your home screen for the best full-screen experience.
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-muted p-2 rounded-lg">
                                <Share className="w-6 h-6" />
                            </div>
                            <p className="text-sm">
                                1. Tap the <span className="font-bold">Share</span> button in the menu bar.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-muted p-2 rounded-lg">
                                <PlusSquare className="w-6 h-6" />
                            </div>
                            <p className="text-sm">
                                2. Scroll down and select <span className="font-bold">Add to Home Screen</span>.
                            </p>
                        </div>
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Maybe Later</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};
