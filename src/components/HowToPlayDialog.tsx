import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface HowToPlayDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const HowToPlayDialog = ({ open, onOpenChange }: HowToPlayDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center">How to Play</DialogTitle>
                </DialogHeader>
                <DialogDescription asChild>
                    <div className="space-y-6 text-foreground">
                        {/* Game Basics */}
                        <section className="space-y-3">
                            <h3 className="font-semibold text-lg">🎯 Game Basics</h3>
                            <p className="text-sm">
                                Tic Tac Toe is a classic two-player game played on a 3 × 3 grid. Players take turns placing <strong>X </strong>
                                and <strong>O</strong>. The first player to get <strong>three in a row</strong> — horizontally, vertically, or diagonally — wins.
                            </p>
                        </section>

                        {/* Getting Started */}
                        <section className="space-y-3">
                            <h3 className="font-semibold text-lg">🚀 Getting Started</h3>
                            <ul className="list-disc list-inside space-y-2 text-sm">
                                <li>Click <strong>TOSS & START</strong> to randomly choose who goes first</li>
                                <li>The <strong>glowing score card</strong> shows whose turn it is</li>
                                <li>Click any empty cell to place your mark</li>
                                <li>Take turns and aim for three in a row before your opponent</li>
                            </ul>
                        </section>

                        {/* Game Modes */}
                        <section className="space-y-3">
                            <h3 className="font-semibold text-lg">🎮 Game Modes</h3>
                            <p className="text-sm">Choose who you want to play against:</p>
                            <ul className="space-y-2 text-sm">
                                <li><strong>🤖 Bot Mode</strong> — Play against the AI</li>
                                <li><strong>👥 Human Mode</strong> — Play with a friend on the same device</li>
                            </ul>
                            <p className="text-sm text-muted-foreground italic">
                                * You can switch game modes <strong>when no game is active</strong>.
                            </p>
                        </section>

                        {/* Difficulty Levels */}
                        <section className="space-y-3">
                            <h3 className="font-semibold text-lg">⚙️ Difficulty Levels (Bot Mode)</h3>
                            <p className="text-sm">Set how challenging the bot should be:</p>
                            <ul className="space-y-2 text-sm">
                                <li><strong>🟢 Easy</strong> — Great for beginners</li>
                                <li><strong>🟡 Medium</strong> — A balanced challenge</li>
                                <li><strong>🔴 Hard</strong> — Tough and strategic play</li>
                            </ul>
                            <p className="text-sm text-muted-foreground italic">
                                <strong>Right-click the O player's score card</strong> to open the difficulty menu.
                            </p>
                            <p className="text-sm text-muted-foreground italic">
                                * Available only in <strong>Bot mode and when no game is active</strong>.
                            </p>
                        </section>

                        {/* Winning & Draws */}
                        <section className="space-y-3">
                            <h3 className="font-semibold text-lg">🏆 Winning & Draws</h3>
                            <ul className="list-disc list-inside space-y-2 text-sm">
                                <li>Get <strong>three of your marks in a row</strong> to win</li>
                                <li>If the grid fills up with no winner, the game ends in a <strong>draw</strong></li>
                            </ul>
                        </section>

                        {/* Game Controls */}
                        <section className="space-y-3">
                            <h3 className="font-semibold text-lg">🎛️ Game Controls</h3>
                            <ul className="list-disc list-inside space-y-2 text-sm">
                                <li><strong>RESIGN</strong> — End the current game (the opponent wins)</li>
                                <li><strong>PLAY AGAIN</strong> — Start a new round with the same scores</li>
                                <li><strong>RESET ALL</strong> — Start a new game with scores reset</li>
                            </ul>
                        </section>

                        {/* Score Tracking */}
                        <section className="space-y-3">
                            <h3 className="font-semibold text-lg">📊 Score Tracking</h3>
                            <p className="text-sm">
                                Your <strong>wins, draws, and losses</strong> are saved automatically. Scores persist even if you close the app, so you can track your progress over time.
                            </p>
                        </section>

                        {/* Final Message */}
                        <section className="space-y-3">
                            <h3 className="font-semibold text-lg">✅ That's it!</h3>
                            <p className="text-sm">
                                You're all set to play — enjoy <strong>Tic Tac Toe</strong> 🎉
                            </p>
                        </section>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};
