import { NextResponse } from 'next/server';

// This is an example API route that could connect to any backend service
export async function GET() {
  // In a real app, you might call a service in another language here
  // For example: const data = await fetch('http://python-backend:5000/api/data');
  
  // For demonstration, we'll return mock data
  const data = {
    message: 'Hello from the API route!',
    timestamp: new Date().toISOString(),
    info: 'This API route can be connected to any backend service',
    services: [
      { name: 'Python Backend', status: 'ready to configure' },
      { name: 'Go Microservice', status: 'ready to configure' },
      { name: 'Database', status: 'ready to configure' }
    ]
  };
  
  return NextResponse.json(data);
}