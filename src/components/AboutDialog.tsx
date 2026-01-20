import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import packageJson from "../../package.json";

interface AboutDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const AboutDialog = ({ open, onOpenChange }: AboutDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center">About Tic Tac Toe</DialogTitle>
                </DialogHeader>
                <DialogDescription asChild>
                    <div className="space-y-4 text-foreground">
                        <p>
                            Tic Tac Toe is a sleek, modern take on the classic game, designed for quick, fun, and distraction-free play.
                            Play against the computer at multiple difficulty levels or challenge a friend in local multiplayer.
                        </p>

                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg">Features</h3>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Classic 3 × 3 Tic Tac Toe gameplay</li>
                                <li>Play against the computer or a friend</li>
                                <li>Three AI difficulty levels</li>
                                <li>Clean, modern design with a neon aesthetic</li>
                                <li>Works offline — no sign-in required</li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg">Website</h3>
                            <p className="text-sm">
                                Access this game at{" "}
                                <a
                                    href="https://ttt.panshul.dev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    ttt.panshul.dev
                                </a>
                                {" "}or{" "}
                                <a
                                    href="https://tictactoe.panshul.dev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    tictactoe.panshul.dev
                                </a>
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center justify-center gap-x-2 text-sm">
                                <a
                                    href="https://play.google.com/store/apps/details?id=dev.panshul.tictactoe"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    Google Play Store
                                </a>
                                <span className="text-muted-foreground">•</span>
                                <a
                                    href="https://privacy-policy.panshul.dev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    Privacy Policy
                                </a>
                                <span className="text-muted-foreground">•</span>
                                <a
                                    href="mailto:support@panshul.dev"
                                    className="text-primary hover:underline"
                                >
                                    Contact Us
                                </a>
                            </div>
                        </div>

                        <div className="pt-4 border-t text-sm text-muted-foreground flex justify-between items-center">
                            <span>Developed by Mostly Works Studio</span>
                            <span>v{packageJson.version}</span>
                        </div>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};
