import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "@/components/ReactQueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dharyl CRUD app!",
  description: "Server action, RTK and zustand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <Toaster
            position="top-center"
            toastOptions={{ duration: 3000, success: { duration: 3000 } }}
          />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
