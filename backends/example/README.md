# Backend Service Examples

This directory contains examples for creating backend services in different languages that can be used with the Next.js frontend.

## Available Backend Examples

### Python (Flask) Example

To add a Python backend service:

1. Create a `python` directory with the following structure:

```
python/
├── Dockerfile
├── app.py
├── requirements.txt
└── README.md
```

2. Add a simple Flask API in `app.py`:

```python
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({
        'message': 'Hello from Python backend!',
        'service': 'Flask API',
        'language': 'Python'
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

3. Create a `requirements.txt` file:

```
flask==2.0.1
flask-cors==3.0.10
```

4. Create a `Dockerfile`:

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
```

5. Update the main `docker-compose.yml` to include this service:

```yaml
python-backend:
  build:
    context: ./backends/python
    dockerfile: Dockerfile
  ports:
    - "5000:5000"
  volumes:
    - ./backends/python:/app
```

## Adding Other Backend Services

You can follow a similar pattern to add backends in other languages:

### Go Example

```
go/
├── Dockerfile
├── go.mod
├── go.sum
├── main.go
└── README.md
```

### Rust Example

```
rust/
├── Cargo.toml
├── Dockerfile
├── src/
│   └── main.rs
└── README.md
```

## Connecting from Next.js

To connect to a backend service from your Next.js application, update the API route in `src/app/api/example/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Call the Python backend service
    const response = await fetch('http://python-backend:5000/api/data');
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error connecting to backend:', error);
    return NextResponse.json(
      { error: 'Failed to connect to backend service' },
      { status: 500 }
    );
  }
}
```