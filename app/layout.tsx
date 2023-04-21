import { Header } from "@/components/header";
import "./globals.css";
import { Fira_Code } from "next/font/google";

const inter = Fira_Code({ subsets: ["latin"] });

export const metadata = {
  title: "coach report home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <section className="p-2">{children}</section>
      </body>
    </html>
  );
}
