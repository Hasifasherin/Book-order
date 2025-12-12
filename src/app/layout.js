import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Product Order",
  description: "Product ordering web app built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ProductProvider>
            {children}
            <ToastContainer position="top-right" autoClose={2000} />
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
