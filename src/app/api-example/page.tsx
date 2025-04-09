import { Card } from '@/components/ui/Card';
import { fetchData } from '@/lib/api';

export default async function ApiExample() {
  // This is an example of fetching data from an API route
  const data = await fetchData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">API Integration Example</h1>
        <p className="text-lg text-gray-600 mb-8">
          This page demonstrates how to fetch data from an API endpoint and render it in a Next.js application.
          In a real application, this could connect to any backend service written in any language.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Response from API:</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Backend Integration Options:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            title="Node.js Backend"
            description="Use JavaScript/TypeScript for a unified language stack."
            icon="⚡"
          />
          <Card
            title="Python Backend"
            description="Integrate with Flask, FastAPI, or Django for data processing."
            icon="🐍"
          />
          <Card
            title="Go Backend"
            description="High-performance microservices with Go's concurrency."
            icon="🚀"
          />
          <Card
            title="Custom Service"
            description="Connect to any service with a RESTful or GraphQL API."
            icon="🔗"
          />
        </div>
      </div>
    </div>
  );
}