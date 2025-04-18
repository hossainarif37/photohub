import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/layout/navbar/Navbar";
import { UploadProvider } from "@/providers/UploadProvider";
import Footer from "./components/layout/footer/Footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <UploadProvider>
          <Navbar />
          {children}
          <Footer />
        </UploadProvider>
      </body>
    </html>
  );
}
