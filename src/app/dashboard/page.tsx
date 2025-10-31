import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/users";
import { stripe } from "@/lib/stripe";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoutButton } from "@/components/logout-button";
import { CopyButton } from "@/components/copy-button";
import Link from "next/link";
import { Calendar, Mail, CreditCard, CheckCircle2, XCircle, Terminal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Note: This page needs to be dynamic due to Stripe API calls
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const sess = await getSession();
  
  if (!sess.userId && !sess.email) {
    redirect("/login");
  }

  let user = null;
  let subscription = null;
  let customer = null;
  let hasActiveSubscription = false;

  if (sess.userId) {
    user = await getUserById(sess.userId);
  }

  // Get Stripe subscription info
  if (sess.email) {
    const customers = await stripe.customers.list({
      email: sess.email,
      limit: 1,
    });

    if (customers.data.length > 0) {
      customer = customers.data[0];
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: "all",
        limit: 1,
      });

      if (subscriptions.data.length > 0) {
        subscription = subscriptions.data[0];
        hasActiveSubscription = subscription.status === "active";
      }
    }
  }

  // If user has stripeCustomerId, try that too
  if (user?.stripeCustomerId) {
    try {
      const subscriptions = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
        status: "all",
        limit: 1,
      });
      if (subscriptions.data.length > 0 && !subscription) {
        subscription = subscriptions.data[0];
        hasActiveSubscription = subscription.status === "active";
      }
    } catch (e) {
      // Ignore
    }
  }

  const displayEmail = sess.email || user?.email || "Unknown";
  const accountCreated = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      })
    : "N/A";

  return (
    <div className="container mx-auto max-w-5xl px-6 py-16">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="mb-8">
        <h1 className="text-4xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your account and subscription</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{displayEmail}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Account Created</p>
              <p className="font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {accountCreated}
              </p>
            </div>
            {user && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Account Type</p>
                  <p className="font-medium">Password Protected</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Subscription Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Subscription Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={hasActiveSubscription ? "default" : "secondary"}>
                  {hasActiveSubscription ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      Inactive
                    </span>
                  )}
                </Badge>
              </div>
              {subscription && (
                <>
                  <Separator className="my-3" />
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Plan</p>
                      <p className="font-medium">MLOps Academy Pro</p>
                    </div>
                    {subscription && typeof subscription === "object" && "current_period_end" in subscription && typeof subscription.current_period_end === "number" && (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {hasActiveSubscription ? "Renews on" : "Expired on"}
                        </p>
                        <p className="font-medium">
                          {new Date(subscription.current_period_end * 1000).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
              {!subscription && hasActiveSubscription === false && (
                <p className="text-sm text-muted-foreground mt-3">
                  No active subscription found. Subscribe to access Pro content.
                </p>
              )}
            </div>
            {hasActiveSubscription && (
              <>
                <Separator />
                <Button variant="outline" className="w-full" asChild>
                  <a
                    href="https://billing.stripe.com/p/login/test"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Manage Subscription
                  </a>
                </Button>
              </>
            )}
            {!hasActiveSubscription && (
              <>
                <Separator />
                <Button className="w-full" asChild>
                  <Link href="/#pricing">Subscribe Now</Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Navigate to different sections of MLOps Academy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {hasActiveSubscription ? (
              <>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/pro">
                    Browse Curriculum
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/pro/coding">
                    Coding Exercises
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/">
                    Home
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/#curriculum">
                    View Curriculum
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/#pricing">
                    See Pricing
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/">
                    Home
                  </Link>
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Essential Shell Commands */}
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

      {/* Account Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/login">Change Password</Link>
            </Button>
            <LogoutButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

