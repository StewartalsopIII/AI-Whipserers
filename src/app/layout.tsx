import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js Multilingual Boilerplate',
  description: 'A modern Next.js boilerplate ready for multilingual backends',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-primary-700 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
              <div className="font-bold text-xl">Multilingual Boilerplate</div>
              <div className="flex space-x-4">
                <a href="/" className="hover:text-primary-200">Home</a>
                <a href="/api-example" className="hover:text-primary-200">API Example</a>
              </div>
            </nav>
          </header>
          <main className="flex-grow container mx-auto p-4">
            {children}
          </main>
          <footer className="bg-gray-100 p-4 text-center text-gray-600">
            <div className="container mx-auto">
              &copy; {new Date().getFullYear()} Next.js Multilingual Boilerplate
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}