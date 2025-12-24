import { useState, useEffect } from "react";
import { Share, PlusSquare, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { usePWAInstall } from "@/hooks/usePWAInstall";

export const PWAInstallPrompt = () => {
    const { deferredPrompt, install, isStandalone, isIOS } = usePWAInstall();
    const [showIOSDrawer, setShowIOSDrawer] = useState(false);
    const [showInstallDialog, setShowInstallDialog] = useState(false);

    useEffect(() => {
        // Show dialog for Android/Desktop if not installed and prompt is available
        if (deferredPrompt && !isStandalone) {
            setShowInstallDialog(true);
        }

        // Show iOS drawer if on iOS and not standalone
        if (isIOS && !isStandalone) {
            // Small delay to not be intrusive immediately
            const timer = setTimeout(() => setShowIOSDrawer(true), 3000);
            return () => clearTimeout(timer);
        }
    }, [deferredPrompt, isStandalone, isIOS]);

    if (isStandalone) return null;

    return (
        <>
            {/* Android/Desktop Install Dialog */}
            <Dialog open={showInstallDialog} onOpenChange={setShowInstallDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Install Tic Tac Toe</DialogTitle>
                        <DialogDescription>
                            Install the app for a better full-screen experience and offline access.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-center py-4">
                        <div className="bg-muted p-4 rounded-full">
                            <Download className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <Button type="button" variant="secondary" onClick={() => setShowInstallDialog(false)}>
                            Maybe Later
                        </Button>
                        <Button type="button" onClick={() => {
                            install();
                            setShowInstallDialog(false);
                        }}>
                            Install App
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* iOS Install Instructions Drawer */}
            <Drawer open={showIOSDrawer} onOpenChange={setShowIOSDrawer}>
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
