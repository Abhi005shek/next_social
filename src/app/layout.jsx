import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Nav";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Abhishek Dev Social Media App",
  description: "Social media app built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="w-full bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-16">
            <NavBar />
          </div>
          <div className="w-full bg-slate-100 py-5 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-16">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
