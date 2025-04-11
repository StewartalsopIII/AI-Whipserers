import './globals.css';
import type { Metadata } from 'next';
import { JetBrains_Mono, Inter } from 'next/font/google';

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter', 
});

export const metadata: Metadata = {
  title: 'AI WHISPERERS',
  description: 'Helping humans talk to machines — and each other',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrainsMono.variable} ${inter.variable}`}>
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-terminal-green/30 p-4">
            <nav className="container mx-auto flex justify-between items-center">
              <div className="font-mono text-terminal-white text-lg">
                <span className="text-terminal-green">~/</span>
                <span className="text-terminal-white">ai-whisperers</span>
              </div>
              <div className="flex space-x-6">
                <a href="/" className="font-mono text-terminal-green hover:text-terminal-dimgreen transition-colors duration-200">home</a>
                <a href="#about" className="font-mono text-terminal-green hover:text-terminal-dimgreen transition-colors duration-200">about</a>
                <a href="#join" className="font-mono text-terminal-green hover:text-terminal-dimgreen transition-colors duration-200">join</a>
              </div>
            </nav>
          </header>
          <main className="flex-grow container mx-auto p-4">
            {children}
          </main>
          <footer className="border-t border-terminal-green/30 p-4 text-center text-terminal-gray">
            <div className="container mx-auto font-mono">
              <span className="text-terminal-green">$</span> echo "© {new Date().getFullYear()} AI WHISPERERS"
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}