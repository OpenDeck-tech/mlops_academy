"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

export function ShellCommandsSection() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="h-5 w-5" />
          Essential Shell Commands
        </CardTitle>
        <CardDescription>
          Quick reference for common shell commands used in MLOps workflows
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="files" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="processes">Processes</TabsTrigger>
            <TabsTrigger value="networking">Networking</TabsTrigger>
            <TabsTrigger value="mlops">MLOps</TabsTrigger>
          </TabsList>
          
          <TabsContent value="files" className="mt-4">
            <div className="space-y-3">
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">List files with details</div>
                    <code>ls -lah</code>
                  </div>
                  <CopyButton text="ls -lah" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Find files by name</div>
                    <code>find . -name &quot;*.py&quot; -type f</code>
                  </div>
                  <CopyButton text='find . -name "*.py" -type f' />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Search in files</div>
                    <code>grep -r &quot;pattern&quot; /path/to/dir</code>
                  </div>
                  <CopyButton text='grep -r "pattern" /path/to/dir' />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Watch file changes</div>
                    <code>tail -f /path/to/logfile</code>
                  </div>
                  <CopyButton text="tail -f /path/to/logfile" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Copy recursively</div>
                    <code>cp -r source/ destination/</code>
                  </div>
                  <CopyButton text="cp -r source/ destination/" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Disk usage</div>
                    <code>du -sh * | sort -h</code>
                  </div>
                  <CopyButton text="du -sh * | sort -h" />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="processes" className="mt-4">
            <div className="space-y-3">
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Running processes</div>
                    <code>ps aux | grep python</code>
                  </div>
                  <CopyButton text="ps aux | grep python" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Resource usage</div>
                    <code>top -p $(pgrep -d,&quot;,&quot; python)</code>
                  </div>
                  <CopyButton text='top -p $(pgrep -d,"," python)' />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Kill process by name</div>
                    <code>pkill -f &quot;script_name.py&quot;</code>
                  </div>
                  <CopyButton text='pkill -f "script_name.py"' />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Run in background</div>
                    <code>nohup python script.py &gt; output.log 2&gt;&amp;1 &amp;</code>
                  </div>
                  <CopyButton text="nohup python script.py > output.log 2>&1 &" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Monitor GPU usage</div>
                    <code>watch -n 1 nvidia-smi</code>
                  </div>
                  <CopyButton text="watch -n 1 nvidia-smi" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">CPU and memory</div>
                    <code>htop</code>
                  </div>
                  <CopyButton text="htop" />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="networking" className="mt-4">
            <div className="space-y-3">
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Check port in use</div>
                    <code>lsof -i :8000</code>
                  </div>
                  <CopyButton text="lsof -i :8000" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Test connection</div>
                    <code>curl -I http://localhost:8000</code>
                  </div>
                  <CopyButton text="curl -I http://localhost:8000" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Download file</div>
                    <code>wget https://example.com/file.zip</code>
                  </div>
                  <CopyButton text="wget https://example.com/file.zip" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">SSH to server</div>
                    <code>ssh user@hostname</code>
                  </div>
                  <CopyButton text="ssh user@hostname" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Copy over network</div>
                    <code>scp file.txt user@host:/path/</code>
                  </div>
                  <CopyButton text="scp file.txt user@host:/path/" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Network interfaces</div>
                    <code>ifconfig</code> or <code>ip addr</code>
                  </div>
                  <div className="flex gap-1">
                    <CopyButton text="ifconfig" />
                    <CopyButton text="ip addr" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mlops" className="mt-4">
            <div className="space-y-3">
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Activate virtual env</div>
                    <code>source venv/bin/activate</code>
                  </div>
                  <CopyButton text="source venv/bin/activate" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Install dependencies</div>
                    <code>pip install -r requirements.txt</code>
                  </div>
                  <CopyButton text="pip install -r requirements.txt" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Docker commands</div>
                    <code>docker ps -a</code> | <code>docker logs &lt;container&gt;</code>
                  </div>
                  <div className="flex gap-1">
                    <CopyButton text="docker ps -a" />
                    <CopyButton text="docker logs <container>" />
                  </div>
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Environment variables</div>
                    <code>export VAR=&quot;value&quot;</code> | <code>env | grep VAR</code>
                  </div>
                  <div className="flex gap-1">
                    <CopyButton text='export VAR="value"' />
                    <CopyButton text="env | grep VAR" />
                  </div>
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Compress directory</div>
                    <code>tar -czf archive.tar.gz directory/</code>
                  </div>
                  <CopyButton text="tar -czf archive.tar.gz directory/" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Monitor log file</div>
                    <code>tail -n 100 -f /var/log/app.log</code>
                  </div>
                  <CopyButton text="tail -n 100 -f /var/log/app.log" />
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md font-mono text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Check Python version</div>
                    <code>python --version</code> | <code>which python</code>
                  </div>
                  <div className="flex gap-1">
                    <CopyButton text="python --version" />
                    <CopyButton text="which python" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

