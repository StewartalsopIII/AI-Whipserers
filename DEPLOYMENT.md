# Deployment Documentation

## Docker Compose Configuration

### Port Configuration

This project uses Docker Compose with an override strategy for environment-specific settings. The base configuration in `docker-compose.yml` uses the default port mapping of 3000:3000, while production environments use 3001:3000.

### How It Works

- **Base Configuration**: The repository includes a standard `docker-compose.yml` that defines the default configuration.
- **Environment-Specific Overrides**: Each environment has a `docker-compose.override.yml` file (not tracked in Git) to specify local settings.
- **Merge Behavior**: Docker Compose automatically merges these files at runtime, with override settings taking precedence.

### Setting Up a New Environment

When setting up this project on a new server:

1. Clone the repository as normal
2. Create a local `docker-compose.override.yml` with your environment-specific settings:

```yaml
version: '3'

services:
  nextjs:
    ports:
      - "3001:3000"  # Or any other port you need
```

3. This file is included in `.gitignore` so it won't be tracked by Git.

### Updating Existing Deployments

When pulling updates from the repository:

1. Run `git pull` as usual
2. Your local customizations in `docker-compose.override.yml` remain untouched
3. Rebuild and restart containers:
```bash
docker-compose down
docker-compose up -d --build
```

### Benefits of This Approach

- No Git conflicts when pulling updates
- Clear separation between shared configuration and environment-specific settings
- Easy to maintain across multiple environments
- Follows Docker Compose best practices

## Additional Deployment Notes

- The application runs on port 3000 inside the container but is exposed on port 3001 on the host machine.
- Use `docker-compose ps` to verify the port mapping.
- For Nginx configurations, proxy to port 3001 on the host.