# Next.js Multilingual Boilerplate

A containerized Next.js boilerplate that's designed to connect easily with backends in multiple languages.

## Features

- 🚀 **Modern Next.js App Router**: Built with the latest Next.js features
- 🐳 **Docker-Ready**: Fully containerized with multi-stage builds for optimal production images
- 🔌 **API Integration**: Example API routes showing how to connect to various backends
- 🌐 **Multilingual Backend Support**: Easy integration with Python, Go, Rust, or any other language
- 🎨 **Minimal Styling**: Clean, professional UI with Tailwind CSS
- ⚡ **Performance Focused**: Optimized for speed and efficiency

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [Docker](https://www.docker.com/get-started) (for containerized development)

### Development

1. Clone the repository:

```bash
git clone https://github.com/yourusername/nextjs-multilingual-boilerplate.git
cd nextjs-multilingual-boilerplate
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Using Docker

To run the application with Docker:

```bash
# Build the Docker image
docker build -t nextjs-multilingual-boilerplate .

# Run the container
docker run -p 3000:3000 nextjs-multilingual-boilerplate
```

Or use Docker Compose:

```bash
docker-compose up
```

## Project Structure

```
nextjs-multilingual-boilerplate/
├── src/                   # Application source code
│   ├── app/               # Next.js App Router pages and layouts
│   ├── components/        # Reusable UI components
│   ├── lib/               # Utility functions and services
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
├── backends/              # Example backend services in different languages
├── Dockerfile             # Production-ready Docker configuration
├── docker-compose.yml     # Docker Compose configuration
└── ...                    # Other configuration files
```

## Adding a Backend Service

This boilerplate is designed to work with backend services in any language. See the `backends/example/README.md` file for detailed instructions on how to add services in:

- Python (Flask/FastAPI/Django)
- Go
- Rust
- Any other language

## Deployment

The included Dockerfile is production-ready and creates an optimized build of your application. You can deploy the container to any service that supports Docker, including:

- AWS (ECS, EKS)
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Render
- Railway

## Customization

This boilerplate is designed to be a starting point. Feel free to:

- Add more UI components as needed
- Integrate authentication
- Connect to databases
- Add state management
- Customize styling

## License

This project is licensed under the MIT License - see the LICENSE file for details.