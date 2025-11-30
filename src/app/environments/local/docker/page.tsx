"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Container, Lightbulb, Settings, Rocket } from "lucide-react";
import { useState, useEffect } from "react";

export default function DockerPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen container mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto max-w-7xl px-6 py-12">
      <Link href="/environments/local" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4" />
        Back to Local Environment
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <Container className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-4xl font-semibold">Docker</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Containerization and container management for local development
        </p>
      </div>

      <Tabs defaultValue="introduction" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="introduction">Introduction & Benefits</TabsTrigger>
          <TabsTrigger value="setup">Local Setup</TabsTrigger>
          <TabsTrigger value="fastapi">FastAPI Microservice</TabsTrigger>
        </TabsList>

        {/* Introduction & Benefits Tab */}
        <TabsContent value="introduction" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Container className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <CardTitle>What is Docker?</CardTitle>
              </div>
              <CardDescription>Understanding containerization and its role in modern development</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Definition</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Docker is a platform that uses containerization technology to package applications and their dependencies into lightweight, portable containers. These containers run consistently across different environments, from development to production.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Key Concepts</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li><strong>Container:</strong> A lightweight, standalone executable package that includes everything needed to run an application (code, runtime, system tools, libraries, settings)</li>
                  <li><strong>Image:</strong> A read-only template used to create containers. Images are built from Dockerfiles.</li>
                  <li><strong>Dockerfile:</strong> A text file containing instructions for building a Docker image</li>
                  <li><strong>Docker Compose:</strong> A tool for defining and running multi-container Docker applications</li>
                  <li><strong>Registry:</strong> A repository for Docker images (e.g., Docker Hub, AWS ECR)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Docker vs Virtual Machines</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Aspect</th>
                        <th className="text-left p-2">Docker Containers</th>
                        <th className="text-left p-2">Virtual Machines</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b">
                        <td className="p-2">Isolation</td>
                        <td className="p-2">Process-level</td>
                        <td className="p-2">OS-level</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Startup Time</td>
                        <td className="p-2">Seconds</td>
                        <td className="p-2">Minutes</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Resource Usage</td>
                        <td className="p-2">Low (shares host OS)</td>
                        <td className="p-2">High (full OS per VM)</td>
                      </tr>
                      <tr>
                        <td className="p-2">Size</td>
                        <td className="p-2">MBs (typically 50-500MB)</td>
                        <td className="p-2">GBs (typically 1-20GB)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Lightbulb className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                <CardTitle>Benefits of Docker</CardTitle>
              </div>
              <CardDescription>Why Docker is essential for modern development workflows</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. Consistency Across Environments</h3>
                <p className="text-sm text-muted-foreground">
                  "Works on my machine" becomes a thing of the past. Docker ensures your application runs identically in development, staging, and production environments.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. Isolation and Dependency Management</h3>
                <p className="text-sm text-muted-foreground">
                  Each container runs in isolation with its own dependencies. No more conflicts between different projects requiring different versions of the same library.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Fast Deployment and Scaling</h3>
                <p className="text-sm text-muted-foreground">
                  Containers start in seconds, making it easy to scale applications horizontally. Perfect for microservices architectures.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">4. Resource Efficiency</h3>
                <p className="text-sm text-muted-foreground">
                  Containers share the host OS kernel, making them much more lightweight than VMs. You can run many containers on a single host.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">5. Easy Collaboration</h3>
                <p className="text-sm text-muted-foreground">
                  Share Docker images with your team or deploy them to production. Everyone gets the exact same environment.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">6. Version Control for Infrastructure</h3>
                <p className="text-sm text-muted-foreground">
                  Dockerfiles are code, so you can version control your infrastructure. Track changes, review diffs, and roll back if needed.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">7. Simplified CI/CD</h3>
                <p className="text-sm text-muted-foreground">
                  Build once, run anywhere. Docker images can be built in CI pipelines and deployed to any environment without modification.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Use Cases in MLOps</CardTitle>
              <CardDescription>How Docker fits into machine learning operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li><strong>Model Serving:</strong> Package ML models with their dependencies for consistent serving across environments</li>
                <li><strong>Training Environments:</strong> Reproducible training environments with specific Python, CUDA, and library versions</li>
                <li><strong>Data Processing:</strong> Containerized ETL pipelines that can run on any infrastructure</li>
                <li><strong>Feature Stores:</strong> Isolated services for feature computation and storage</li>
                <li><strong>Experiment Tracking:</strong> Consistent environments for running ML experiments</li>
                <li><strong>API Services:</strong> Microservices for model inference, monitoring, and alerting</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Local Setup Tab */}
        <TabsContent value="setup" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Settings className="h-6 w-6 text-green-600 dark:text-green-400" />
                <CardTitle>Installing Docker</CardTitle>
              </div>
              <CardDescription>Step-by-step installation guide for different operating systems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">macOS</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-2">Option 1: Docker Desktop (Recommended)</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>Download Docker Desktop from <a href="https://www.docker.com/products/docker-desktop" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">docker.com</a></li>
                    <li>Open the downloaded .dmg file and drag Docker to Applications</li>
                    <li>Launch Docker Desktop from Applications</li>
                    <li>Follow the setup wizard to complete installation</li>
                  </ol>
                  <p className="text-sm text-muted-foreground mt-4 mb-2">Option 2: Homebrew</p>
                  <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`brew install --cask docker`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Linux (Ubuntu/Debian)</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Update package index
sudo apt-get update

# Install prerequisites
sudo apt-get install -y \\
    ca-certificates \\
    curl \\
    gnupg \\
    lsb-release

# Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up the repository
echo \\
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \\
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add your user to the docker group (to run without sudo)
sudo usermod -aG docker $USER

# Log out and back in for group changes to take effect`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Windows</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>Download Docker Desktop from <a href="https://www.docker.com/products/docker-desktop" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">docker.com</a></li>
                  <li>Run the installer and follow the setup wizard</li>
                  <li>Enable WSL 2 if prompted (Windows Subsystem for Linux)</li>
                  <li>Restart your computer if required</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Verify Installation</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Check Docker version
docker --version

# Check Docker Compose version
docker compose version

# Run a test container
docker run hello-world`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Essential Docker Commands</CardTitle>
              <CardDescription>Common commands you'll use daily</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Image Management</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# List all images
docker images

# Pull an image from registry
docker pull python:3.11

# Remove an image
docker rmi <image_id>

# Remove all unused images
docker image prune -a`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Container Management</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Start a container
docker start <container_id>

# Stop a container
docker stop <container_id>

# Remove a container
docker rm <container_id>

# View container logs
docker logs <container_id>

# Execute command in running container
docker exec -it <container_id> /bin/bash`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Building Images</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Build an image from Dockerfile
docker build -t myapp:latest .

# Build with specific Dockerfile
docker build -f Dockerfile.prod -t myapp:prod .

# Build without cache
docker build --no-cache -t myapp:latest .`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Running Containers</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Run a container
docker run <image_name>

# Run with port mapping
docker run -p 8000:8000 <image_name>

# Run in detached mode (background)
docker run -d <image_name>

# Run with environment variables
docker run -e ENV_VAR=value <image_name>

# Run with volume mount
docker run -v /host/path:/container/path <image_name>

# Run with all options
docker run -d -p 8000:8000 \\
  -e ENV_VAR=value \\
  -v /host/path:/container/path \\
  --name mycontainer \\
  <image_name>`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FastAPI Microservice Tab */}
        <TabsContent value="fastapi" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Rocket className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <CardTitle>FastAPI Microservice in Docker</CardTitle>
              </div>
              <CardDescription>Build and run a sample FastAPI application using Docker</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Project Structure</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`fastapi-docker/
├── app/
│   ├── __init__.py
│   ├── main.py
│   └── models.py
├── requirements.txt
├── Dockerfile
└── docker-compose.yml`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">1. Create the FastAPI Application</h3>
                <p className="text-sm text-muted-foreground mb-2">Create <code className="bg-muted px-1 rounded">app/main.py</code>:</p>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI(title="Sample FastAPI Microservice", version="1.0.0")

class Item(BaseModel):
    name: str
    description: str = None
    price: float

class ItemResponse(BaseModel):
    id: int
    name: str
    description: str = None
    price: float

# In-memory storage (use a database in production)
items_db = []
next_id = 1

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI Microservice"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.get("/items", response_model=List[ItemResponse])
async def get_items():
    return items_db

@app.post("/items", response_model=ItemResponse)
async def create_item(item: Item):
    global next_id
    new_item = ItemResponse(
        id=next_id,
        name=item.name,
        description=item.description,
        price=item.price
    )
    items_db.append(new_item)
    next_id += 1
    return new_item

@app.get("/items/{item_id}", response_model=ItemResponse)
async def get_item(item_id: int):
    for item in items_db:
        if item.id == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. Create requirements.txt</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Create Dockerfile</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Use Python 3.11 slim image as base
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \\
    PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y \\
    gcc \\
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip && \\
    pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app/ ./app/

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\
    CMD python -c "import requests; requests.get('http://localhost:8000/health')" || exit 1

# Run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">4. Create docker-compose.yml (Optional)</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`version: '3.8'

services:
  api:
    build: .
    container_name: fastapi-service
    ports:
      - "8000:8000"
    environment:
      - ENV=development
    volumes:
      - ./app:/app/app  # Mount for development (hot reload)
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">5. Build and Run</h3>
                <p className="text-sm text-muted-foreground mb-2">Using Docker directly:</p>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Build the image
docker build -t fastapi-service:latest .

# Run the container
docker run -d -p 8000:8000 --name fastapi-app fastapi-service:latest

# View logs
docker logs -f fastapi-app

# Stop the container
docker stop fastapi-app

# Remove the container
docker rm fastapi-app`}
                </pre>
                <p className="text-sm text-muted-foreground mt-4 mb-2">Using Docker Compose:</p>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Build and start
docker compose up -d

# View logs
docker compose logs -f

# Stop
docker compose down

# Rebuild after changes
docker compose up -d --build`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">6. Test the API</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Health check
curl http://localhost:8000/health

# Get all items
curl http://localhost:8000/items

# Create an item
curl -X POST http://localhost:8000/items \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Laptop", "description": "Gaming laptop", "price": 1299.99}'

# Get specific item
curl http://localhost:8000/items/1

# Interactive API docs
# Open in browser: http://localhost:8000/docs`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Dockerfile Best Practices</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li><strong>Use specific base image tags:</strong> Avoid <code className="bg-muted px-1 rounded">latest</code> for production</li>
                  <li><strong>Multi-stage builds:</strong> Use smaller final images by copying only necessary files</li>
                  <li><strong>Layer caching:</strong> Copy requirements.txt before code to leverage Docker cache</li>
                  <li><strong>Non-root user:</strong> Run containers as non-root for security</li>
                  <li><strong>.dockerignore:</strong> Exclude unnecessary files (similar to .gitignore)</li>
                  <li><strong>Health checks:</strong> Add HEALTHCHECK instructions for container orchestration</li>
                  <li><strong>Minimize layers:</strong> Combine RUN commands to reduce image size</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Advanced: Multi-stage Dockerfile</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Stage 1: Builder
FROM python:3.11-slim as builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y gcc

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Stage 2: Runtime
FROM python:3.11-slim

WORKDIR /app

# Copy only installed packages from builder
COPY --from=builder /root/.local /root/.local
COPY app/ ./app/

# Make sure scripts in .local are usable
ENV PATH=/root/.local/bin:$PATH

# Create non-root user
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

