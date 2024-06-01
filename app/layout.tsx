import { GeistSans } from "geist/font/sans";
import "./globals.css";
import AuthButton from '@/components/AuthButton';
import Link from 'next/link';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <div className="flex-1 w-full h-screen flex flex-col gap-4 items-center">
          <div className="w-full flex justify-center items-center border-b border-b-foreground/10 h-16 px-2">
            <h1 className='text-lg font-bold hover:underline'><Link href='/'>Hobby Projects</Link></h1>
            <nav className="w-full max-w-4xl flex justify-end items-center p-3 text-sm pr-0">
              {/* {isSupabaseConnected && <AuthButton />} */}
              <AuthButton />
            </nav>
          </div>
          <main className='flex-grow max-w-[1000px] w-full px-2'>
            {children}
          </main>
          <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
            <p>
              Powered by{" "}
              <a
                href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                target="_blank"
                className="font-bold hover:underline"
                rel="noreferrer"
              >
                Supabase
              </a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
