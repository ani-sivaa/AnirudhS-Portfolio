import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anirudh Sivakumar",
  description: "Portfolio of Anirudh Sivakumar – Software Engineer",
  icons: {
    icon: [
      {
        url: "/icons/portfolio_logo.svg",
        type: "image/svg+xml",
      }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased bg-[#2B2B2B] text-[#E0E0E0]`}>
        {children}
      </body>
    </html>
  );
}
