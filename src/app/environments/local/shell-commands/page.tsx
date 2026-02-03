"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Terminal, FileText, Cpu, Network, Container, Code, Package, Cloud, Apple } from "lucide-react";
import { useState, useEffect } from "react";
import { CopyButton } from "@/components/copy-button";
import { AppShell } from "@/components/app-shell";

export default function ShellCommandsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <AppShell title="Local / Shell">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="Local / Shell">
      <Link href="/environments/local" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors px-2 py-1 -ml-2 rounded hover:bg-accent/50">
        <ArrowLeft className="h-4 w-4" />
        Back to Local Environment
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <Terminal className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-4xl font-semibold">Shell Commands</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Essential command-line tools and workflows for ML development
        </p>
      </div>

      <Tabs defaultValue="files" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="files" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Files
          </TabsTrigger>
          <TabsTrigger value="processes" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            Processes
          </TabsTrigger>
          <TabsTrigger value="networking" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Networking
          </TabsTrigger>
          <TabsTrigger value="python" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Python
          </TabsTrigger>
        </TabsList>

        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="poetry" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Poetry
          </TabsTrigger>
          <TabsTrigger value="docker" className="flex items-center gap-2">
            <Container className="h-4 w-4" />
            Docker
          </TabsTrigger>
          <TabsTrigger value="kubernetes" className="flex items-center gap-2">
            <Cloud className="h-4 w-4" />
            Kubernetes
          </TabsTrigger>
          <TabsTrigger value="brew" className="flex items-center gap-2">
            <Apple className="h-4 w-4" />
            Homebrew
          </TabsTrigger>
        </TabsList>

        {/* Files Tab */}
        <TabsContent value="files" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>File Operations</CardTitle>
              <CardDescription>Common file and directory management commands</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">List files with details</div>
                    <code>ls -lah</code>
                  </div>
                  <CopyButton showOpenInTerminal text="ls -lah" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Find files by name</div>
                    <code>find . -name "*.py" -type f</code>
                  </div>
                  <CopyButton showOpenInTerminal text='find . -name "*.py" -type f' />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Search in files</div>
                    <code>grep -r "pattern" /path/to/dir</code>
                  </div>
                  <CopyButton showOpenInTerminal text='grep -r "pattern" /path/to/dir' />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Watch file changes</div>
                    <code>tail -f /path/to/logfile</code>
                  </div>
                  <CopyButton showOpenInTerminal text="tail -f /path/to/logfile" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Copy recursively</div>
                    <code>cp -r source/ destination/</code>
                  </div>
                  <CopyButton showOpenInTerminal text="cp -r source/ destination/" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Disk usage</div>
                    <code>du -sh * | sort -h</code>
                  </div>
                  <CopyButton showOpenInTerminal text="du -sh * | sort -h" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Create directory structure</div>
                    <code>{'mkdir -p project/{src,tests,docs}'}</code>
                  </div>
                  <CopyButton showOpenInTerminal text="mkdir -p project/{src,tests,docs}" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Move/rename file</div>
                    <code>mv oldname.txt newname.txt</code>
                  </div>
                  <CopyButton showOpenInTerminal text="mv oldname.txt newname.txt" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Remove directory recursively</div>
                    <code>rm -rf directory/</code>
                  </div>
                  <CopyButton showOpenInTerminal text="rm -rf directory/" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Compress directory</div>
                    <code>tar -czf archive.tar.gz directory/</code>
                  </div>
                  <CopyButton showOpenInTerminal text="tar -czf archive.tar.gz directory/" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Extract archive</div>
                    <code>tar -xzf archive.tar.gz</code>
                  </div>
                  <CopyButton showOpenInTerminal text="tar -xzf archive.tar.gz" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Processes Tab */}
        <TabsContent value="processes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Process Management</CardTitle>
              <CardDescription>Monitor and manage running processes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Running processes</div>
                    <code>ps aux | grep python</code>
                  </div>
                  <CopyButton showOpenInTerminal text="ps aux | grep python" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Resource usage</div>
                    <code>top -p $(pgrep -d,"," python)</code>
                  </div>
                  <CopyButton showOpenInTerminal text='top -p $(pgrep -d,"," python)' />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Kill process by name</div>
                    <code>pkill -f "script_name.py"</code>
                  </div>
                  <CopyButton showOpenInTerminal text='pkill -f "script_name.py"' />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Kill process by PID</div>
                    <code>kill -9 &lt;PID&gt;</code>
                  </div>
                  <CopyButton showOpenInTerminal text="kill -9 <PID>" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Run in background</div>
                    <code>nohup python script.py &gt; output.log 2&gt;&amp;1 &amp;</code>
                  </div>
                  <CopyButton showOpenInTerminal text="nohup python script.py > output.log 2>&1 &" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Monitor GPU usage</div>
                    <code>watch -n 1 nvidia-smi</code>
                  </div>
                  <CopyButton showOpenInTerminal text="watch -n 1 nvidia-smi" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">CPU and memory</div>
                    <code>htop</code>
                  </div>
                  <CopyButton showOpenInTerminal text="htop" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Find process using port</div>
                    <code>lsof -i :8000</code>
                  </div>
                  <CopyButton showOpenInTerminal text="lsof -i :8000" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">System load average</div>
                    <code>uptime</code>
                  </div>
                  <CopyButton showOpenInTerminal text="uptime" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Networking Tab */}
        <TabsContent value="networking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Networking Commands</CardTitle>
              <CardDescription>Network troubleshooting and file transfer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Check port in use</div>
                    <code>lsof -i :8000</code>
                  </div>
                  <CopyButton showOpenInTerminal text="lsof -i :8000" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Test connection</div>
                    <code>curl -I http://localhost:8000</code>
                  </div>
                  <CopyButton showOpenInTerminal text="curl -I http://localhost:8000" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Download file</div>
                    <code>wget https://example.com/file.zip</code>
                  </div>
                  <CopyButton showOpenInTerminal text="wget https://example.com/file.zip" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">SSH to server</div>
                    <code>ssh user@hostname</code>
                  </div>
                  <CopyButton showOpenInTerminal text="ssh user@hostname" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Copy over network</div>
                    <code>scp file.txt user@host:/path/</code>
                  </div>
                  <CopyButton showOpenInTerminal text="scp file.txt user@host:/path/" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Network interfaces</div>
                    <code>ifconfig</code> or <code>ip addr</code>
                  </div>
                  <div className="flex gap-1">
                    <CopyButton showOpenInTerminal text="ifconfig" />
                    <CopyButton showOpenInTerminal text="ip addr" />
                  </div>
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Ping host</div>
                    <code>ping -c 4 google.com</code>
                  </div>
                  <CopyButton showOpenInTerminal text="ping -c 4 google.com" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Check DNS resolution</div>
                    <code>nslookup example.com</code>
                  </div>
                  <CopyButton showOpenInTerminal text="nslookup example.com" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Show routing table</div>
                    <code>netstat -rn</code> or <code>ip route</code>
                  </div>
                  <div className="flex gap-1">
                    <CopyButton showOpenInTerminal text="netstat -rn" />
                    <CopyButton showOpenInTerminal text="ip route" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Python Tab */}
        <TabsContent value="python" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Python Commands</CardTitle>
              <CardDescription>Python environment and package management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Check Python version</div>
                    <code>python --version</code> | <code>python3 --version</code>
                  </div>
                  <div className="flex gap-1">
                    <CopyButton showOpenInTerminal text="python --version" />
                    <CopyButton showOpenInTerminal text="python3 --version" />
                  </div>
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Find Python location</div>
                    <code>which python</code> | <code>which python3</code>
                  </div>
                  <div className="flex gap-1">
                    <CopyButton showOpenInTerminal text="which python" />
                    <CopyButton showOpenInTerminal text="which python3" />
                  </div>
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Create virtual environment</div>
                    <code>python3 -m venv venv</code>
                  </div>
                  <CopyButton showOpenInTerminal text="python3 -m venv venv" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Activate virtual env (macOS/Linux)</div>
                    <code>source venv/bin/activate</code>
                  </div>
                  <CopyButton showOpenInTerminal text="source venv/bin/activate" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Activate virtual env (Windows)</div>
                    <code>venv\Scripts\activate</code>
                  </div>
                  <CopyButton showOpenInTerminal text="venv\Scripts\activate" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Deactivate virtual env</div>
                    <code>deactivate</code>
                  </div>
                  <CopyButton showOpenInTerminal text="deactivate" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Install package</div>
                    <code>pip install package-name</code>
                  </div>
                  <CopyButton showOpenInTerminal text="pip install package-name" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Install from requirements</div>
                    <code>pip install -r requirements.txt</code>
                  </div>
                  <CopyButton showOpenInTerminal text="pip install -r requirements.txt" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">List installed packages</div>
                    <code>pip list</code>
                  </div>
                  <CopyButton showOpenInTerminal text="pip list" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Freeze dependencies</div>
                    <code>pip freeze &gt; requirements.txt</code>
                  </div>
                  <CopyButton showOpenInTerminal text="pip freeze > requirements.txt" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Upgrade pip</div>
                    <code>pip install --upgrade pip</code>
                  </div>
                  <CopyButton showOpenInTerminal text="pip install --upgrade pip" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Run Python script</div>
                    <code>python script.py</code>
                  </div>
                  <CopyButton showOpenInTerminal text="python script.py" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Run Python module</div>
                    <code>python -m module_name</code>
                  </div>
                  <CopyButton showOpenInTerminal text="python -m module_name" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Poetry Tab */}
        <TabsContent value="poetry" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Poetry Commands</CardTitle>
              <CardDescription>Modern Python dependency management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Initialize Poetry project</div>
                    <code>poetry init</code>
                  </div>
                  <CopyButton showOpenInTerminal text="poetry init" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Create new project</div>
                    <code>poetry new project-name</code>
                  </div>
                  <CopyButton showOpenInTerminal text="poetry new project-name" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Install dependencies</div>
                    <code>poetry install</code>
                  </div>
                  <CopyButton showOpenInTerminal text="poetry install" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Add dependency</div>
                    <code>poetry add package-name</code>
                  </div>
                  <CopyButton showOpenInTerminal text="poetry add package-name" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Add dev dependency</div>
                    <code>poetry add --group dev package-name</code>
                  </div>
                  <CopyButton showOpenInTerminal text="poetry add --group dev package-name" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Update dependencies</div>
                    <code>poetry update</code>
                  </div>
                  <CopyButton showOpenInTerminal text="poetry update" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Remove dependency</div>
                    <code>poetry remove package-name</code>
                  </div>
                  <CopyButton showOpenInTerminal text="poetry remove package-name" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Activate Poetry shell</div>
                    <code>poetry shell</code>
                  </div>
                  <CopyButton showOpenInTerminal text="poetry shell" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Run command in Poetry env</div>
                    <code>poetry run python script.py</code>
                  </div>
                  <CopyButton showOpenInTerminal text="poetry run python script.py" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Show environment info</div>
                    <code>poetry env info</code>
                  </div>
                  <CopyButton showOpenInTerminal text="poetry env info" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">List environments</div>
                    <code>poetry env list</code>
                  </div>
                  <CopyButton showOpenInTerminal text="poetry env list" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Export to requirements.txt</div>
                    <code>poetry export -f requirements.txt --output requirements.txt</code>
                  </div>
                  <CopyButton showOpenInTerminal text="poetry export -f requirements.txt --output requirements.txt" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Show dependency tree</div>
                    <code>poetry show --tree</code>
                  </div>
                  <CopyButton showOpenInTerminal text="poetry show --tree" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Build package</div>
                    <code>poetry build</code>
                  </div>
                  <CopyButton showOpenInTerminal text="poetry build" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Docker Tab */}
        <TabsContent value="docker" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Docker Commands</CardTitle>
              <CardDescription>Container management and operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">List running containers</div>
                    <code>docker ps</code>
                  </div>
                  <CopyButton showOpenInTerminal text="docker ps" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">List all containers</div>
                    <code>docker ps -a</code>
                  </div>
                  <CopyButton showOpenInTerminal text="docker ps -a" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">List images</div>
                    <code>docker images</code>
                  </div>
                  <CopyButton showOpenInTerminal text="docker images" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Build image</div>
                    <code>docker build -t image-name .</code>
                  </div>
                  <CopyButton showOpenInTerminal text="docker build -t image-name ." />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Run container</div>
                    <code>docker run -d -p 8000:8000 image-name</code>
                  </div>
                  <CopyButton showOpenInTerminal text="docker run -d -p 8000:8000 image-name" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">View container logs</div>
                    <code>docker logs &lt;container_id&gt;</code>
                  </div>
                  <CopyButton showOpenInTerminal text="docker logs <container_id>" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Follow logs</div>
                    <code>docker logs -f &lt;container_id&gt;</code>
                  </div>
                  <CopyButton showOpenInTerminal text="docker logs -f <container_id>" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Stop container</div>
                    <code>docker stop &lt;container_id&gt;</code>
                  </div>
                  <CopyButton showOpenInTerminal text="docker stop <container_id>" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Remove container</div>
                    <code>docker rm &lt;container_id&gt;</code>
                  </div>
                  <CopyButton showOpenInTerminal text="docker rm <container_id>" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Execute command in container</div>
                    <code>docker exec -it &lt;container_id&gt; /bin/bash</code>
                  </div>
                  <CopyButton showOpenInTerminal text="docker exec -it <container_id> /bin/bash" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Docker Compose up</div>
                    <code>docker compose up -d</code>
                  </div>
                  <CopyButton showOpenInTerminal text="docker compose up -d" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Docker Compose down</div>
                    <code>docker compose down</code>
                  </div>
                  <CopyButton showOpenInTerminal text="docker compose down" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Clean up unused resources</div>
                    <code>docker system prune -a</code>
                  </div>
                  <CopyButton showOpenInTerminal text="docker system prune -a" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Kubernetes Tab */}
        <TabsContent value="kubernetes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kubernetes Commands</CardTitle>
              <CardDescription>Kubernetes cluster management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Get pods</div>
                    <code>kubectl get pods</code>
                  </div>
                  <CopyButton showOpenInTerminal text="kubectl get pods" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Get all resources</div>
                    <code>kubectl get all</code>
                  </div>
                  <CopyButton showOpenInTerminal text="kubectl get all" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Describe pod</div>
                    <code>kubectl describe pod &lt;pod-name&gt;</code>
                  </div>
                  <CopyButton showOpenInTerminal text="kubectl describe pod <pod-name>" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">View pod logs</div>
                    <code>kubectl logs &lt;pod-name&gt;</code>
                  </div>
                  <CopyButton showOpenInTerminal text="kubectl logs <pod-name>" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Follow logs</div>
                    <code>kubectl logs -f &lt;pod-name&gt;</code>
                  </div>
                  <CopyButton showOpenInTerminal text="kubectl logs -f <pod-name>" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Execute command in pod</div>
                    <code>kubectl exec -it &lt;pod-name&gt; -- /bin/bash</code>
                  </div>
                  <CopyButton showOpenInTerminal text="kubectl exec -it <pod-name> -- /bin/bash" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Apply manifest</div>
                    <code>kubectl apply -f manifest.yaml</code>
                  </div>
                  <CopyButton showOpenInTerminal text="kubectl apply -f manifest.yaml" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Delete resource</div>
                    <code>kubectl delete pod &lt;pod-name&gt;</code>
                  </div>
                  <CopyButton showOpenInTerminal text="kubectl delete pod <pod-name>" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Get services</div>
                    <code>kubectl get services</code>
                  </div>
                  <CopyButton showOpenInTerminal text="kubectl get services" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Port forward</div>
                    <code>kubectl port-forward &lt;pod-name&gt; 8000:8000</code>
                  </div>
                  <CopyButton showOpenInTerminal text="kubectl port-forward <pod-name> 8000:8000" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Get nodes</div>
                    <code>kubectl get nodes</code>
                  </div>
                  <CopyButton showOpenInTerminal text="kubectl get nodes" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Get namespaces</div>
                    <code>kubectl get namespaces</code>
                  </div>
                  <CopyButton showOpenInTerminal text="kubectl get namespaces" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Homebrew Tab */}
        <TabsContent value="brew" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Homebrew Commands</CardTitle>
              <CardDescription>Package management for macOS and Linux</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Install package</div>
                    <code>brew install package-name</code>
                  </div>
                  <CopyButton showOpenInTerminal text="brew install package-name" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Install cask (GUI app)</div>
                    <code>brew install --cask app-name</code>
                  </div>
                  <CopyButton showOpenInTerminal text="brew install --cask app-name" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Uninstall package</div>
                    <code>brew uninstall package-name</code>
                  </div>
                  <CopyButton showOpenInTerminal text="brew uninstall package-name" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">List installed packages</div>
                    <code>brew list</code>
                  </div>
                  <CopyButton showOpenInTerminal text="brew list" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Search for package</div>
                    <code>brew search package-name</code>
                  </div>
                  <CopyButton showOpenInTerminal text="brew search package-name" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Update Homebrew</div>
                    <code>brew update</code>
                  </div>
                  <CopyButton showOpenInTerminal text="brew update" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Upgrade packages</div>
                    <code>brew upgrade</code>
                  </div>
                  <CopyButton showOpenInTerminal text="brew upgrade" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Show package info</div>
                    <code>brew info package-name</code>
                  </div>
                  <CopyButton showOpenInTerminal text="brew info package-name" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Clean up old versions</div>
                    <code>brew cleanup</code>
                  </div>
                  <CopyButton showOpenInTerminal text="brew cleanup" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">List outdated packages</div>
                    <code>brew outdated</code>
                  </div>
                  <CopyButton showOpenInTerminal text="brew outdated" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

