import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SidebarNav from "@/components/SidebarNav";
import UserChip from "@/components/UserChip";
import { ThemeProvider } from "./theme-context";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Lashon Trainer",
  description: "Hebrew training hub for soldiers and madrichot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {/* Root shell: sidebar + main play area */}
          <div className="min-h-screen flex lbp-bg">
            {/* Sidebar */}
            <SidebarNav />

            {/* Main content area */}
            <main className="flex-1 px-4 py-4 md:px-8 md:py-6">
              <div className="max-w-6xl mx-auto">
                {/* Mobile top bar */}
                <div className="md:hidden mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-base font-semibold tracking-tight">
                      Lashon · Beta
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Hebrew training hub
                    </div>
                  </div>
                  <UserChip />
                </div>

                {/* Desktop user chip */}
                <div className="hidden md:flex items-center justify-end mb-4">
                  <UserChip />
                </div>

                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
