import type { Metadata } from "next";
import { Playpen_Sans } from "next/font/google";
import "./globals.css";

const playpenSans = Playpen_Sans({
  variable: "--font-playpen",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "HBD",
  description: "Memories for us ❤️",
  // ชี้ไปที่ไฟล์ในโฟลเดอร์ public
  icons: {
    icon: "../heart.png", // หรือ "/icon.png" ตามชื่อไฟล์ของคุณ
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${playpenSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-playpen">
        {children}
      </body>
    </html>
  );
}