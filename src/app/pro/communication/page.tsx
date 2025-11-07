import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, LightbulbIcon, UsersIcon, PresentationIcon } from "lucide-react";

export default async function CommunicationPage() {
  const sess = await getSession();
  if (!sess.isPro) {
    redirect("/");
  }

  return (
    <div className="container mx-auto max-w-5xl px-6 py-16">
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
          Dashboard
        </Link>
        <Link href="/pro" className="text-sm text-muted-foreground hover:text-foreground">
          Pro Home
        </Link>
        <ThemeToggle />
      </div>

      <h1 className="text-4xl font-semibold tracking-tight">Communicating MLOps to Stakeholders</h1>
      <p className="text-muted-foreground mt-2">
        Master the art of explaining MLOps concepts clearly and persuasively in meetings, conferences, and presentations.
      </p>
      <Separator className="my-8" />

      <Alert className="mb-8">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Why This Matters</AlertTitle>
        <AlertDescription>
          Your technical skills are only as valuable as your ability to communicate them. Great MLOps engineers can explain complex systems in ways that drive decisions, secure budgets, and align teams.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="stakeholders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="conferences">Conferences</TabsTrigger>
        </TabsList>

        <TabsContent value="stakeholders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5" />
                Stakeholder-Specific Communication
              </CardTitle>
              <CardDescription>
                Tailor your message to your audience. Different stakeholders need different information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Executives & C-Suite</h3>
                <div className="space-y-3">
                  <div className="bg-muted/50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">What They Care About:</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Business impact and ROI</li>
                      <li>Risk mitigation and compliance</li>
                      <li>Competitive advantage</li>
                      <li>Resource requirements (budget, headcount)</li>
                      <li>Timeline and milestones</li>
                    </ul>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">How to Communicate:</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li><strong>Lead with outcomes:</strong> &quot;This MLOps platform will reduce model deployment time by 80%, enabling us to ship 5x more models per quarter.&quot;</li>
                      <li><strong>Use business metrics:</strong> Revenue impact, cost savings, customer satisfaction scores</li>
                      <li><strong>Avoid jargon:</strong> Say &quot;automated testing&quot; not &quot;CI/CD pipeline&quot;</li>
                      <li><strong>Visualize the value:</strong> Use charts showing before/after metrics</li>
                      <li><strong>Address risks upfront:</strong> &quot;We&apos;re implementing monitoring to catch model degradation before it impacts customers.&quot;</li>
                    </ul>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Example Pitch:</h4>
                    <p className="text-sm italic">
                      &quot;We&apos;re building an MLOps platform that will transform how we deploy AI. Currently, it takes 3 weeks to get a model to production. With this platform, we&apos;ll reduce that to 2 days. This means we can respond to market changes faster, test more ideas, and ultimately deliver better products to our customers. The investment is $500K, but we&apos;ll see $2M in additional revenue in year one from faster time-to-market.&quot;
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3">Product Managers</h3>
                <div className="space-y-3">
                  <div className="bg-muted/50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">What They Care About:</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Feature velocity and delivery timelines</li>
                      <li>User experience and product quality</li>
                      <li>Technical debt and maintainability</li>
                      <li>Resource allocation and trade-offs</li>
                      <li>How MLOps enables product features</li>
                    </ul>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">How to Communicate:</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li><strong>Connect to product goals:</strong> &quot;This monitoring system will let us A/B test models in production, so we can ship the best recommendation algorithm.&quot;</li>
                      <li><strong>Show the user impact:</strong> &quot;With model versioning, we can roll back to a previous model if the new one performs worse.&quot;</li>
                      <li><strong>Explain trade-offs clearly:</strong> &quot;We can ship faster if we skip monitoring, but we&apos;ll catch issues too late.&quot;</li>
                      <li><strong>Use product language:</strong> Frame MLOps as &quot;infrastructure for AI features&quot;</li>
                      <li><strong>Provide timelines:</strong> &quot;This will take 2 sprints, but will save us 1 sprint per model going forward.&quot;</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3">Software Engineers</h3>
                <div className="space-y-3">
                  <div className="bg-muted/50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">What They Care About:</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>System architecture and design patterns</li>
                      <li>Code quality and best practices</li>
                      <li>Performance and scalability</li>
                      <li>Developer experience and tooling</li>
                      <li>Integration with existing systems</li>
                    </ul>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">How to Communicate:</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li><strong>Show the architecture:</strong> Use diagrams, code examples, and system designs</li>
                      <li><strong>Explain the &quot;why&quot;:</strong> &quot;We use feature stores to avoid recomputing features across teams, reducing compute costs by 40%.&quot;</li>
                      <li><strong>Provide concrete examples:</strong> Show actual code, API designs, and data flows</li>
                      <li><strong>Discuss trade-offs:</strong> &quot;We chose Airflow over Prefect because it integrates better with our existing Kubernetes setup.&quot;</li>
                      <li><strong>Address concerns:</strong> &quot;Yes, this adds complexity, but here&apos;s how we&apos;ll manage it...&quot;</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3">Data Scientists</h3>
                <div className="space-y-3">
                  <div className="bg-muted/50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">What They Care About:</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Experiment tracking and reproducibility</li>
                      <li>Model performance and metrics</li>
                      <li>Data quality and feature engineering</li>
                      <li>How MLOps helps their workflow</li>
                      <li>Time saved vs. time invested</li>
                    </ul>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">How to Communicate:</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li><strong>Focus on their workflow:</strong> &quot;With experiment tracking, you can compare 50 experiments side-by-side instead of managing spreadsheets.&quot;</li>
                      <li><strong>Show time savings:</strong> &quot;This will save you 2 hours per week on model deployment.&quot;</li>
                      <li><strong>Emphasize reproducibility:</strong> &quot;You&apos;ll never lose track of which data version produced your best model.&quot;</li>
                      <li><strong>Address skepticism:</strong> &quot;I know this seems like overhead, but here&apos;s how it actually makes your life easier...&quot;</li>
                      <li><strong>Provide training:</strong> Offer workshops and documentation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frameworks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LightbulbIcon className="h-5 w-5" />
                Communication Frameworks
              </CardTitle>
              <CardDescription>
                Proven frameworks for structuring your MLOps communications effectively.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">The Problem-Solution-Impact Framework</h3>
                <div className="bg-muted/50 p-4 rounded-md space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">1. Problem (The Pain)</h4>
                    <p className="text-sm">
                      Start by clearly articulating the problem your audience faces. Use data and concrete examples.
                    </p>
                    <p className="text-sm italic mt-2">
                      Example: &quot;Our data scientists spend 40% of their time manually deploying models. Last quarter, we had 3 production incidents because models were deployed with the wrong dependencies.&quot;
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">2. Solution (The Approach)</h4>
                    <p className="text-sm">
                      Present your MLOps solution in clear, non-technical terms. Focus on what it does, not how it works.
                    </p>
                    <p className="text-sm italic mt-2">
                      Example: &quot;We&apos;re building an automated deployment pipeline that tests models, manages dependencies, and deploys to production with one click.&quot;
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">3. Impact (The Value)</h4>
                    <p className="text-sm">
                      Quantify the benefits. Use metrics that matter to your audience.
                    </p>
                    <p className="text-sm italic mt-2">
                      Example: &quot;This will reduce deployment time from 2 days to 2 hours, eliminate deployment errors, and free up 20 hours per week for our data science team.&quot;
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3">The Technical-to-Business Translation Framework</h3>
                <div className="bg-muted/50 p-4 rounded-md">
                  <p className="text-sm mb-3">
                    When explaining technical concepts, always provide three levels of detail:
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-1">Business Level (What)</h4>
                      <p className="text-sm text-muted-foreground">
                        What does this do for the business? What problem does it solve?
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Conceptual Level (Why)</h4>
                      <p className="text-sm text-muted-foreground">
                        Why is this important? What&apos;s the principle behind it?
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Technical Level (How)</h4>
                      <p className="text-sm text-muted-foreground">
                        How does it work technically? (Only if your audience needs this level)
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-background rounded border">
                    <p className="text-sm font-medium mb-2">Example: Explaining Model Monitoring</p>
                    <ul className="text-sm space-y-2">
                      <li><strong>Business:</strong> &quot;We track model performance in production to catch issues before they impact customers.&quot;</li>
                      <li><strong>Conceptual:</strong> &quot;Models can degrade over time as data changes. Monitoring alerts us when performance drops.&quot;</li>
                      <li><strong>Technical:</strong> &quot;We compute prediction distributions, track feature drift using KL divergence, and alert when metrics exceed thresholds.&quot;</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3">The Story Arc Framework</h3>
                <div className="bg-muted/50 p-4 rounded-md space-y-3">
                  <p className="text-sm">
                    Structure your communication as a story with a clear narrative arc:
                  </p>
                  <ol className="text-sm space-y-2 list-decimal pl-5">
                    <li><strong>Setting:</strong> Where are we now? What&apos;s the current state?</li>
                    <li><strong>Conflict:</strong> What challenges are we facing?</li>
                    <li><strong>Rising Action:</strong> What have we tried? What options do we have?</li>
                    <li><strong>Climax:</strong> What&apos;s our proposed solution?</li>
                    <li><strong>Resolution:</strong> What will success look like? How will we measure it?</li>
                  </ol>
                  <div className="mt-4 p-3 bg-background rounded border">
                    <p className="text-sm font-medium mb-2">Example Story Arc:</p>
                    <p className="text-sm">
                      &quot;We&apos;ve grown from 5 models to 50 models in production. [Setting] Our manual deployment process is breaking down—we&apos;re seeing more errors and slower releases. [Conflict] We&apos;ve tried adding more process and documentation, but it&apos;s not scaling. [Rising Action] We need to automate our MLOps pipeline. [Climax] With this platform, we&apos;ll deploy models 10x faster with zero errors, enabling us to scale to 500 models. [Resolution]&quot;
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3">The Analogy Framework</h3>
                <div className="bg-muted/50 p-4 rounded-md">
                  <p className="text-sm mb-3">
                    Use analogies to make complex MLOps concepts accessible. Here are powerful analogies:
                  </p>
                  <div className="space-y-3">
                    <div className="p-3 bg-background rounded border">
                      <p className="text-sm font-medium mb-1">Model Registry = Version Control for ML</p>
                      <p className="text-sm text-muted-foreground">
                        &quot;Just like Git tracks code versions, a model registry tracks model versions, so you can see what changed, roll back if needed, and collaborate safely.&quot;
                      </p>
                    </div>
                    <div className="p-3 bg-background rounded border">
                      <p className="text-sm font-medium mb-1">Feature Store = Shared Database for Features</p>
                      <p className="text-sm text-muted-foreground">
                        &quot;Instead of each team recomputing the same features, a feature store is like a shared database where everyone can access pre-computed features, saving time and ensuring consistency.&quot;
                      </p>
                    </div>
                    <div className="p-3 bg-background rounded border">
                      <p className="text-sm font-medium mb-1">MLOps Pipeline = Assembly Line for Models</p>
                      <p className="text-sm text-muted-foreground">
                        &quot;Just like an assembly line automates car production, an MLOps pipeline automates model production—testing, packaging, and deploying models consistently.&quot;
                      </p>
                    </div>
                    <div className="p-3 bg-background rounded border">
                      <p className="text-sm font-medium mb-1">Model Monitoring = Health Check for Models</p>
                      <p className="text-sm text-muted-foreground">
                        &quot;Like a doctor monitors vital signs, model monitoring tracks performance metrics to catch problems before they become critical.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PresentationIcon className="h-5 w-5" />
                Meeting Preparation & Execution
              </CardTitle>
              <CardDescription>
                Strategies for effective MLOps presentations in meetings and stakeholder discussions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Before the Meeting</h3>
                <div className="bg-muted/50 p-4 rounded-md space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">1. Know Your Audience</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Who will be in the room? What&apos;s their technical background?</li>
                      <li>What are their goals and concerns?</li>
                      <li>What decisions do they need to make?</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">2. Define Your Objective</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>What do you want them to understand?</li>
                      <li>What decision do you need from them?</li>
                      <li>What action should they take after the meeting?</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">3. Prepare Your Materials</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Create slides with clear visuals (diagrams, charts, not walls of text)</li>
                      <li>Prepare a one-pager summary for executives</li>
                      <li>Have detailed technical docs ready for engineers</li>
                      <li>Practice your key points (aim for 3-5 main points max)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">4. Anticipate Questions</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>What are the obvious concerns? (cost, timeline, risk)</li>
                      <li>What technical questions might come up?</li>
                      <li>Prepare data-backed answers</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3">During the Meeting</h3>
                <div className="bg-muted/50 p-4 rounded-md space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Opening (First 2 Minutes)</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>State the purpose clearly: &quot;I&apos;m here to propose an MLOps platform that will reduce deployment time by 80%.&quot;</li>
                      <li>Set expectations: &quot;I&apos;ll cover the problem, solution, and impact in 15 minutes, then we&apos;ll discuss.&quot;</li>
                      <li>Hook them with a compelling stat or story</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Body (Main Content)</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Use the Problem-Solution-Impact framework</li>
                      <li>Show, don&apos;t just tell (use visuals, demos, examples)</li>
                      <li>Check for understanding: &quot;Does this make sense?&quot; or &quot;Any questions so far?&quot;</li>
                      <li>Pause after key points to let them process</li>
                      <li>Watch body language—if they look confused, slow down and clarify</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Closing (Last 2 Minutes)</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Summarize the key points: &quot;To recap, we need this platform because...&quot;</li>
                      <li>State the ask clearly: &quot;I&apos;m asking for approval to proceed with Phase 1.&quot;</li>
                      <li>Define next steps: &quot;If approved, we&apos;ll start next week and have a prototype in 4 weeks.&quot;</li>
                      <li>Open for questions: &quot;What questions do you have?&quot;</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3">Handling Difficult Questions</h3>
                <div className="bg-muted/50 p-4 rounded-md space-y-3">
                  <div className="p-3 bg-background rounded border">
                    <p className="text-sm font-medium mb-1">Question: &quot;Why do we need this? Can&apos;t we just deploy models manually?&quot;</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      <strong>Response:</strong> &quot;We can, but we&apos;re already seeing the limits. Last quarter, manual deployments caused 3 production incidents. As we scale to 100+ models, this will become unmanageable. The platform pays for itself by preventing just one major incident.&quot;
                    </p>
                  </div>
                  <div className="p-3 bg-background rounded border">
                    <p className="text-sm font-medium mb-1">Question: &quot;This seems expensive. What&apos;s the ROI?&quot;</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      <strong>Response:</strong> &quot;Great question. The platform costs $200K/year, but it saves our data science team 20 hours per week. At $150/hour, that&apos;s $156K/year in time savings. Plus, faster deployments mean we can test more models, leading to better products and higher revenue. We estimate $500K in additional revenue from faster iteration.&quot;
                    </p>
                  </div>
                  <div className="p-3 bg-background rounded border">
                    <p className="text-sm font-medium mb-1">Question: &quot;How long will this take to build?&quot;</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      <strong>Response:</strong> &quot;We&apos;ll use a phased approach. Phase 1 (basic CI/CD) takes 6 weeks and gives us 60% of the value. Phase 2 (monitoring) takes another 4 weeks. We&apos;ll start seeing benefits after Phase 1.&quot;
                    </p>
                  </div>
                  <div className="p-3 bg-background rounded border">
                    <p className="text-sm font-medium mb-1">Question: &quot;What if it doesn&apos;t work?&quot;</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      <strong>Response:</strong> &quot;That&apos;s why we&apos;re starting with a pilot. We&apos;ll test it with one team for 4 weeks. If it doesn&apos;t deliver value, we can pivot. But based on industry benchmarks and our analysis, we&apos;re confident it will work.&quot;
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3">Meeting Templates</h3>
                <div className="bg-muted/50 p-4 rounded-md space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Executive Briefing (15 minutes)</h4>
                    <ol className="text-sm space-y-1 list-decimal pl-5">
                      <li>Problem statement (2 min) - Use data</li>
                      <li>Solution overview (3 min) - High-level, business-focused</li>
                      <li>ROI and impact (5 min) - Numbers, charts, timelines</li>
                      <li>Risks and mitigation (2 min) - Address concerns proactively</li>
                      <li>Ask and next steps (3 min) - Clear decision point</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Technical Deep-Dive (45 minutes)</h4>
                    <ol className="text-sm space-y-1 list-decimal pl-5">
                      <li>Architecture overview (10 min) - Diagrams and system design</li>
                      <li>Technical details (20 min) - Implementation, tools, patterns</li>
                      <li>Demo or walkthrough (10 min) - Show it working</li>
                      <li>Q&A and discussion (5 min) - Address technical concerns</li>
                    </ol>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PresentationIcon className="h-5 w-5" />
                Conference Presentations
              </CardTitle>
              <CardDescription>
                Strategies for delivering compelling MLOps talks at conferences and technical events.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Crafting Your Talk</h3>
                <div className="bg-muted/50 p-4 rounded-md space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">1. Choose a Compelling Title</h4>
                    <ul className="text-sm space-y-1">
                      <li>❌ &quot;Building an MLOps Platform&quot; (too generic)</li>
                      <li>✅ &quot;How We Reduced Model Deployment Time by 90%&quot; (specific, outcome-focused)</li>
                      <li>✅ &quot;Scaling to 1000 Models: Lessons from Production&quot; (specific, experience-based)</li>
                      <li>✅ &quot;MLOps at Scale: What We Learned Building a Feature Store&quot; (specific, lesson-focused)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">2. Structure Your Talk</h4>
                    <div className="p-3 bg-background rounded border">
                      <p className="text-sm font-medium mb-2">The Classic Structure (30-45 min talk):</p>
                      <ol className="text-sm space-y-2 list-decimal pl-5">
                        <li><strong>Hook (2 min):</strong> Start with a compelling story, surprising stat, or relatable problem</li>
                        <li><strong>Context (5 min):</strong> Set the stage. What company/team? What problem were you solving?</li>
                        <li><strong>Journey (15-20 min):</strong> What did you try? What worked? What didn&apos;t? Show the evolution.</li>
                        <li><strong>Solution (10 min):</strong> What did you build? How does it work? (Use diagrams, code, demos)</li>
                        <li><strong>Lessons Learned (5 min):</strong> What would you do differently? What advice do you have?</li>
                        <li><strong>Q&A (5-10 min):</strong> Answer questions</li>
                      </ol>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">3. Make It Visual</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Use diagrams to explain architecture (not paragraphs of text)</li>
                      <li>Show before/after metrics with charts</li>
                      <li>Include code snippets (but keep them short and readable)</li>
                      <li>Use screenshots or demos when possible</li>
                      <li>Follow the &quot;one idea per slide&quot; rule</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3">Engaging Your Audience</h3>
                <div className="bg-muted/50 p-4 rounded-md space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Storytelling Techniques</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li><strong>Start with a problem:</strong> &quot;We had 50 models in production and no way to track which version was deployed. One day, we deployed the wrong model and lost $50K in revenue.&quot;</li>
                      <li><strong>Show the struggle:</strong> Don&apos;t make it look easy. Share failures and pivots.</li>
                      <li><strong>Use specific examples:</strong> &quot;Model X improved click-through rate by 15%&quot; not &quot;models improved performance.&quot;</li>
                      <li><strong>End with impact:</strong> What changed? What did you learn? What can others take away?</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Interactive Elements</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Ask questions: &quot;How many of you have faced this problem?&quot;</li>
                      <li>Use polls (if the platform supports it)</li>
                      <li>Pause for questions throughout (not just at the end)</li>
                      <li>Encourage discussion: &quot;What would you do differently?&quot;</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3">Common Pitfalls to Avoid</h3>
                <div className="bg-muted/50 p-4 rounded-md space-y-2">
                  <div className="p-3 bg-background rounded border">
                    <p className="text-sm font-medium mb-1">❌ Too Much Background</p>
                    <p className="text-sm text-muted-foreground">
                      Don&apos;t spend 10 minutes explaining what MLOps is. Assume your audience knows the basics. Jump into your specific story.
                    </p>
                  </div>
                  <div className="p-3 bg-background rounded border">
                    <p className="text-sm font-medium mb-1">❌ Reading Slides</p>
                    <p className="text-sm text-muted-foreground">
                      Slides should support your talk, not be your talk. Use them for visuals, not paragraphs of text.
                    </p>
                  </div>
                  <div className="p-3 bg-background rounded border">
                    <p className="text-sm font-medium mb-1">❌ No Clear Takeaway</p>
                    <p className="text-sm text-muted-foreground">
                      Your audience should leave with something actionable. What can they apply to their work?
                    </p>
                  </div>
                  <div className="p-3 bg-background rounded border">
                    <p className="text-sm font-medium mb-1">❌ Ignoring Time Limits</p>
                    <p className="text-sm text-muted-foreground">
                      Practice your talk and time it. It&apos;s better to cover less content well than rush through everything.
                    </p>
                  </div>
                  <div className="p-3 bg-background rounded border">
                    <p className="text-sm font-medium mb-1">❌ No Demo or Examples</p>
                    <p className="text-sm text-muted-foreground">
                      Abstract concepts are hard to grasp. Show real code, real metrics, real systems.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3">Practice & Delivery</h3>
                <div className="bg-muted/50 p-4 rounded-md space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Practice Tips</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Practice out loud at least 3 times</li>
                      <li>Time yourself (aim for 80% of your allocated time to leave room for Q&A)</li>
                      <li>Practice in front of colleagues and get feedback</li>
                      <li>Record yourself and watch it back</li>
                      <li>Prepare answers to likely questions</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Delivery Tips</h4>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Speak slowly and clearly (nerves make us talk fast)</li>
                      <li>Make eye contact with your audience</li>
                      <li>Use gestures to emphasize points</li>
                      <li>Pause after key points to let them sink in</li>
                      <li>If you make a mistake, acknowledge it and move on</li>
                      <li>Have water nearby</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3">Example Talk Outline</h3>
                <div className="bg-muted/50 p-4 rounded-md">
                  <p className="text-sm font-medium mb-3">Title: &quot;Building a Feature Store: What We Learned Scaling to 100 Models&quot;</p>
                  <ol className="text-sm space-y-2 list-decimal pl-5">
                    <li><strong>Hook (2 min):</strong> &quot;We went from 5 models to 100 in 6 months. Our feature engineering became a bottleneck.&quot;</li>
                    <li><strong>Context (5 min):</strong> Company background, ML use cases, why features became a problem</li>
                    <li><strong>Journey (15 min):</strong>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>First attempt: Shared library (failed—too slow)</li>
                        <li>Second attempt: Feature API (failed—inconsistent)</li>
                        <li>Third attempt: Feature store (success)</li>
                      </ul>
                    </li>
                    <li><strong>Solution (10 min):</strong> Architecture diagram, how it works, key design decisions</li>
                    <li><strong>Results (5 min):</strong> Metrics: 80% reduction in feature compute time, 100% consistency</li>
                    <li><strong>Lessons (5 min):</strong> What we&apos;d do differently, advice for others</li>
                    <li><strong>Q&A (10 min):</strong> Answer questions</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

