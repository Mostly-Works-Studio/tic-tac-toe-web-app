import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
    title: "Tic Tac Toe",
    description:
        "Looking for a quick mental break? A modern version of the classic Tic-Tac-Toe game with smooth animations and clean, minimalist design.",
    authors: [{ name: "Mostly Works Studio" }],
    openGraph: {
        title: "Tic Tac Toe",
        description:
            "A modern version of the classic Tic-Tac-Toe game with smooth animations and clean design.",
        type: "website",
    },
    icons: {
        icon: "/favicon.png",
        apple: "/pwa-192x192.png",
    },
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "Tic Tac Toe",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "#0B1622",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              window.deferredPrompt = null;
              window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                window.deferredPrompt = e;
              });
            `,
                    }}
                />
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
