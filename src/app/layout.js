import { Inter, Oswald } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-oswald" });

export const metadata = {
  title: "FitLog — Workout Library",
  description:
    "A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="flex min-h-screen flex-col">
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#15171d",
                color: "#f3f4f6",
                border: "1px solid #222630",
                fontSize: "14px",
              },
              success: { iconTheme: { primary: "#c2f800", secondary: "#0c0d10" } },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}
