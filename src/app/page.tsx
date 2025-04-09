import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-10">
      <div className="text-center space-y-5">
        <h1 className="text-4xl font-bold">Welcome to Next.js Multilingual Boilerplate</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          A containerized starter template ready for connecting to backends in any language
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <Card
          title="Docker Ready"
          description="Pre-configured for containerized development and deployment with multi-stage builds."
          icon="🐳"
        />
        <Card
          title="API Integration"
          description="Examples of connecting to external services and other language backends."
          icon="🔌"
        />
        <Card
          title="Multilingual Support"
          description="Easily extend with backends in Python, Go, Rust, or any other language."
          icon="🌐"
        />
      </div>

      <div className="space-y-3 text-center">
        <h2 className="text-2xl font-semibold">Ready to explore?</h2>
        <div className="flex space-x-4 justify-center">
          <Button asChild>
            <Link href="/api-example">
              API Example
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://github.com/yourusername/nextjs-multilingual-boilerplate" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}