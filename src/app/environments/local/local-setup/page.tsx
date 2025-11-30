"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Settings, Container, Code, Package, FileCode, Cloud, Terminal, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function LocalSetupPage() {
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
          <Settings className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-4xl font-semibold">Local Setup</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Configure and optimize your local development environment with essential tools
        </p>
      </div>

      <Tabs defaultValue="docker" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="docker" className="flex items-center gap-2">
            <Container className="h-4 w-4" />
            Docker
          </TabsTrigger>
          <TabsTrigger value="python" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Python
          </TabsTrigger>
          <TabsTrigger value="poetry" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Poetry
          </TabsTrigger>
          <TabsTrigger value="vscode" className="flex items-center gap-2">
            <FileCode className="h-4 w-4" />
            VS Code
          </TabsTrigger>
        </TabsList>

        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
          <TabsTrigger value="terraform" className="flex items-center gap-2">
            <Cloud className="h-4 w-4" />
            Terraform
          </TabsTrigger>
          <TabsTrigger value="aws-cdk" className="flex items-center gap-2">
            <Cloud className="h-4 w-4" />
            AWS CDK
          </TabsTrigger>
          <TabsTrigger value="other" className="flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            Other Tools
          </TabsTrigger>
        </TabsList>

        {/* Docker Tab */}
        <TabsContent value="docker" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Container className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <CardTitle>Docker Installation</CardTitle>
              </div>
              <CardDescription>Containerization platform for consistent development environments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">macOS</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Using Homebrew (Recommended)
brew install --cask docker

# Or download from docker.com
# Visit: https://www.docker.com/products/docker-desktop`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Linux (Ubuntu/Debian)</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Update package index
sudo apt-get update

# Install prerequisites
sudo apt-get install -y ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up repository
echo \\
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \\
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add user to docker group (to run without sudo)
sudo usermod -aG docker $USER
# Log out and back in for changes to take effect`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Windows</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>Download Docker Desktop from <a href="https://www.docker.com/products/docker-desktop" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">docker.com</a></li>
                  <li>Run the installer and follow the setup wizard</li>
                  <li>Enable WSL 2 if prompted</li>
                  <li>Restart your computer if required</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Verify Installation</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`docker --version
docker compose version
docker run hello-world`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Python Tab */}
        <TabsContent value="python" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <CardTitle>Python Installation</CardTitle>
              </div>
              <CardDescription>Python runtime and package management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Using pyenv (Recommended)</h3>
                <p className="text-sm text-muted-foreground mb-2">pyenv allows you to manage multiple Python versions easily.</p>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# macOS
brew install pyenv

# Linux
curl https://pyenv.run | bash

# Add to shell profile (~/.zshrc or ~/.bashrc)
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"

# Install Python 3.11
pyenv install 3.11.7
pyenv global 3.11.7

# Verify
python --version`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">macOS (Homebrew)</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Install Python
brew install python@3.11

# Verify
python3 --version
pip3 --version`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Linux (Ubuntu/Debian)</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Update package list
sudo apt update

# Install Python 3.11
sudo apt install -y python3.11 python3.11-venv python3.11-dev python3-pip

# Create symlink (optional)
sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.11 1

# Verify
python3 --version
pip3 --version`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Windows</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>Download Python from <a href="https://www.python.org/downloads/" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">python.org</a></li>
                  <li>Run the installer</li>
                  <li>Check "Add Python to PATH" during installation</li>
                  <li>Verify: <code className="bg-muted px-1 rounded">python --version</code></li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Virtual Environments</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Create virtual environment
python3 -m venv venv

# Activate (macOS/Linux)
source venv/bin/activate

# Activate (Windows)
venv\\Scripts\\activate

# Deactivate
deactivate`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Poetry Tab */}
        <TabsContent value="poetry" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <CardTitle>Poetry Installation</CardTitle>
              </div>
              <CardDescription>Modern Python dependency management and packaging</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Official Installer (Recommended)</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# macOS/Linux
curl -sSL https://install.python-poetry.org | python3 -

# Add to PATH (add to ~/.zshrc or ~/.bashrc)
export PATH="$HOME/.local/bin:$PATH"

# Verify
poetry --version`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">macOS (Homebrew)</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`brew install poetry`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">pip (Alternative)</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`pip install poetry

# Verify
poetry --version`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Basic Usage</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Create a new project
poetry new my-project
cd my-project

# Initialize in existing project
poetry init

# Install dependencies
poetry install

# Add a dependency
poetry add fastapi
poetry add pytest --group dev

# Update dependencies
poetry update

# Activate virtual environment
poetry shell

# Run commands in virtual environment
poetry run python script.py

# Build package
poetry build

# Publish package
poetry publish`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Configuration</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Configure Poetry to create virtualenv in project directory
poetry config virtualenvs.in-project true

# Show configuration
poetry config --list`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* VS Code Tab */}
        <TabsContent value="vscode" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <FileCode className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <CardTitle>VS Code Setup</CardTitle>
              </div>
              <CardDescription>Visual Studio Code with essential extensions for MLOps</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Installation</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64,arm64,arm64 signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
sudo apt update
sudo apt install code

# Windows: Download from code.visualstudio.com`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Essential Extensions</h3>
                <div className="space-y-3">
                  <div className="bg-muted p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Python Development</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li><strong>Python</strong> (ms-python.python) - Python language support</li>
                      <li><strong>Pylance</strong> (ms-python.vscode-pylance) - Fast Python language server</li>
                      <li><strong>Python Test Explorer</strong> - Test discovery and running</li>
                    </ul>
                  </div>

                  <div className="bg-muted p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Infrastructure as Code</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li><strong>HashiCorp Terraform</strong> (hashicorp.terraform) - Terraform syntax highlighting</li>
                      <li><strong>YAML</strong> (redhat.vscode-yaml) - YAML language support</li>
                      <li><strong>Docker</strong> (ms-azuretools.vscode-docker) - Docker extension</li>
                    </ul>
                  </div>

                  <div className="bg-muted p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">General Development</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li><strong>GitLens</strong> (eamodio.gitlens) - Git supercharged</li>
                      <li><strong>Prettier</strong> (esbenp.prettier-vscode) - Code formatter</li>
                      <li><strong>ESLint</strong> (dbaeumer.vscode-eslint) - JavaScript/TypeScript linting</li>
                      <li><strong>Remote - SSH</strong> (ms-vscode-remote.remote-ssh) - Remote development</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Install Extensions via Command Line</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Install extensions
code --install-extension ms-python.python
code --install-extension ms-python.vscode-pylance
code --install-extension hashicorp.terraform
code --install-extension ms-azuretools.vscode-docker
code --install-extension eamodio.gitlens`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Recommended Settings</h3>
                <p className="text-sm text-muted-foreground mb-2">Add to <code className="bg-muted px-1 rounded">settings.json</code>:</p>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "python.formatting.provider": "black",
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.testing.pytestEnabled": true,
  "files.exclude": {
    "**/__pycache__": true,
    "**/*.pyc": true
  },
  "editor.rulers": [88, 120],
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Terraform Tab */}
        <TabsContent value="terraform" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Cloud className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <CardTitle>Terraform Installation</CardTitle>
              </div>
              <CardDescription>Infrastructure as Code tool for managing cloud resources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Using tfenv (Recommended)</h3>
                <p className="text-sm text-muted-foreground mb-2">tfenv allows you to manage multiple Terraform versions easily, similar to pyenv for Python.</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Installation</h4>
                  <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# macOS (Homebrew - Recommended)
brew install tfenv

# Linux
git clone https://github.com/tfutils/tfenv.git ~/.tfenv
echo 'export PATH="$HOME/.tfenv/bin:$PATH"' >> ~/.zshrc
# Or for bash: echo 'export PATH="$HOME/.tfenv/bin:$PATH"' >> ~/.bashrc
source ~/.zshrc  # or source ~/.bashrc

# Verify installation
tfenv --version`}
                  </pre>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Basic Usage</h4>
                  <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# List available Terraform versions
tfenv list-remote

# Install a specific version
tfenv install 1.6.0
tfenv install 1.5.0

# Install latest version
tfenv install latest

# List installed versions
tfenv list

# Use a specific version (local to directory)
tfenv use 1.6.0

# Set global default version
tfenv use 1.6.0 --set-default

# Uninstall a version
tfenv uninstall 1.5.0

# Verify current version
terraform version`}
                  </pre>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Version Files</h4>
                  <p className="text-sm text-muted-foreground mb-2">tfenv respects version files in your project directory:</p>
                  <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Create .terraform-version file in your project
echo "1.6.0" > .terraform-version

# tfenv will automatically use this version when you cd into the directory
# This ensures all team members use the same Terraform version`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Advanced Usage</h4>
                  <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Install min-required version (reads from required_version in terraform block)
tfenv install min-required

# Use min-required version
tfenv use min-required

# Check which version would be used
tfenv version-name

# Show installation path
tfenv which`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">macOS (Homebrew)</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`brew tap hashicorp/tap
brew install hashicorp/tap/terraform

# Verify
terraform version`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Linux</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Download and install
wget https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_linux_amd64.zip
unzip terraform_1.6.0_linux_amd64.zip
sudo mv terraform /usr/local/bin/

# Verify
terraform version`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Windows</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>Download from <a href="https://www.terraform.io/downloads" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">terraform.io</a></li>
                  <li>Extract and add to PATH</li>
                  <li>Verify: <code className="bg-muted px-1 rounded">terraform version</code></li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Basic Usage</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Initialize Terraform
terraform init

# Validate configuration
terraform validate

# Plan changes
terraform plan

# Apply changes
terraform apply

# Destroy infrastructure
terraform destroy

# Format code
terraform fmt

# Show current state
terraform show`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">AWS Provider Setup</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Configure AWS credentials
aws configure

# Or set environment variables
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_DEFAULT_REGION=us-east-1

# Example main.tf
provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "example" {
  bucket = "my-terraform-bucket"
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AWS CDK Tab */}
        <TabsContent value="aws-cdk" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Cloud className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <CardTitle>AWS CDK Installation</CardTitle>
              </div>
              <CardDescription>Define cloud infrastructure using familiar programming languages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Prerequisites</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>Node.js (v18.0.0 or later)</li>
                  <li>Python 3.7+ (for Python CDK apps)</li>
                  <li>AWS CLI configured</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Install AWS CDK CLI</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Install globally via npm
npm install -g aws-cdk

# Verify installation
cdk --version

# Or install locally in project
npm install aws-cdk`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Bootstrap CDK (First Time Setup)</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Bootstrap CDK in your AWS account
cdk bootstrap

# Bootstrap for specific region
cdk bootstrap aws://ACCOUNT-ID/REGION`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Create a New CDK Project</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Initialize a new CDK app (Python)
mkdir my-cdk-app
cd my-cdk-app
cdk init app --language python

# Initialize with TypeScript
cdk init app --language typescript

# Install dependencies (Python)
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\\Scripts\\activate
pip install -r requirements.txt`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Basic CDK Commands</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# List stacks
cdk list

# Synthesize CloudFormation template
cdk synth

# Compare deployed stack with current state
cdk diff

# Deploy stack
cdk deploy

# Deploy specific stack
cdk deploy MyStack

# Destroy stack
cdk destroy

# View stack outputs
aws cloudformation describe-stacks --stack-name MyStack`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Example CDK App (Python)</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# app.py
from aws_cdk import (
    Stack,
    aws_s3 as s3,
    App
)

class MyStack(Stack):
    def __init__(self, scope, id, **kwargs):
        super().__init__(scope, id, **kwargs)
        
        # Create S3 bucket
        bucket = s3.Bucket(
            self, "MyBucket",
            versioned=True,
            encryption=s3.BucketEncryption.S3_MANAGED
        )

app = App()
MyStack(app, "MyStack")
app.synth()`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">CDK Constructs Library</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# Python
pip install aws-cdk-lib

# TypeScript/JavaScript
npm install aws-cdk-lib`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other Tools Tab */}
        <TabsContent value="other" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Terminal className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <CardTitle>Other Essential Tools</CardTitle>
              </div>
              <CardDescription>Additional tools for MLOps development</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Git</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# macOS
brew install git

# Linux
sudo apt install git

# Configure
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global init.defaultBranch main`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">AWS CLI</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# macOS
brew install awscli

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configure
aws configure

# Verify
aws --version`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">kubectl (Kubernetes)</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# macOS
brew install kubectl

# Linux
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Verify
kubectl version --client`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">jq (JSON Processor)</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# macOS
brew install jq

# Linux
sudo apt install jq

# Usage
echo '{"name": "test"}' | jq '.name'`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Make</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# macOS (usually pre-installed)
# If not: xcode-select --install

# Linux
sudo apt install build-essential

# Verify
make --version`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">curl & wget</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# macOS (usually pre-installed)
# Linux
sudo apt install curl wget`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">PostgreSQL Client</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`# macOS
brew install postgresql

# Linux
sudo apt install postgresql-client

# Connect
psql -h hostname -U username -d database`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

