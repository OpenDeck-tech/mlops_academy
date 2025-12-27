import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Sparkles, Brain, Zap, Shield, Rocket, BookOpen } from "lucide-react";

export default function MLOpsForKidsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ThemeToggle />
      </div>

      <div className="container mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            <Sparkles className="h-3 w-3 mr-1" />
            Free Content
          </Badge>
          <h1 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            MLOps for Starters! 
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn how AI models work in the real world! Just like training a pet, we need to teach computers to be smart and helpful.
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8 border-2 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Brain className="h-6 w-6 text-purple-600" />
              What is MLOps?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">
              Imagine you have a robot friend that can recognize cats in pictures. MLOps is like having a special system that:
            </p>
            <ul className="space-y-2 list-disc pl-6 text-muted-foreground">
              <li>Teaches your robot friend new tricks (training models)</li>
              <li>Makes sure your robot friend works correctly (testing)</li>
              <li>Helps your robot friend get better over time (monitoring)</li>
              <li>Fixes problems when your robot friend makes mistakes (updating)</li>
            </ul>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg mt-4">
              <p className="text-sm font-medium">
                💡 <strong>Fun Fact:</strong> Just like you practice math problems to get better, AI models practice with lots of examples to learn!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main Concepts */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Training Models (Learning)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                Think of training a model like teaching a dog new tricks:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li>You show the dog many examples (data)</li>
                <li>The dog practices and learns patterns (training)</li>
                <li>You reward good behavior (optimization)</li>
                <li>Eventually, the dog knows the trick! (model ready)</li>
              </ul>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded">
                <p className="text-xs">
                  <strong>Example:</strong> To teach a computer to recognize cats, we show it thousands of cat pictures!
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-green-600" />
                Deploying Models (Going Live)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                Deploying is like putting your art project on display:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li>You finish your project (model is trained)</li>
                <li>You check it looks good (testing)</li>
                <li>You put it on the wall (deploy to production)</li>
                <li>People can now see and use it! (users interact)</li>
              </ul>
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 rounded">
                <p className="text-xs">
                  <strong>Example:</strong> A recommendation system goes live so people can get movie suggestions!
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-200 dark:border-yellow-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                Monitoring (Watching)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                Monitoring is like having a health checkup:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li>You check if everything works well (performance metrics)</li>
                <li>You notice if something changes (drift detection)</li>
                <li>You fix problems before they get big (alerting)</li>
                <li>You keep things running smoothly (maintenance)</li>
              </ul>
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950 rounded">
                <p className="text-xs">
                  <strong>Example:</strong> We watch if a translation app starts making mistakes and fix it quickly!
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                Version Control (Remembering)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">
                Version control is like keeping a photo album:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li>You save different versions (model versions)</li>
                <li>You can go back to old photos (rollback)</li>
                <li>You know which version is best (tracking)</li>
                <li>You can share with friends (collaboration)</li>
              </ul>
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-950 rounded">
                <p className="text-xs">
                  <strong>Example:</strong> If a new model version doesn&apos;t work, we can go back to the old one!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-World Examples */}
        <Card className="mb-8 border-2 border-indigo-200 dark:border-indigo-800">
          <CardHeader>
            <CardTitle className="text-2xl">Real-World Examples</CardTitle>
            <CardDescription>MLOps in action! Where you see it every day.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                <h4 className="font-semibold mb-2">🎬 Netflix Recommendations</h4>
                <p className="text-sm text-muted-foreground">
                  Netflix uses MLOps to suggest shows you might like. They train models, deploy them, and monitor if you&apos;re enjoying the suggestions!
                </p>
              </div>
              <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                <h4 className="font-semibold mb-2">📸 Instagram Filters</h4>
                <p className="text-sm text-muted-foreground">
                  Instagram uses MLOps to make sure their filters work on all phones. They test, deploy, and update filters regularly!
                </p>
              </div>
              <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                <h4 className="font-semibold mb-2">🗣️ Voice Assistants</h4>
                <p className="text-sm text-muted-foreground">
                  Siri and Alexa use MLOps to understand what you say. They&apos;re constantly learning and getting better!
                </p>
              </div>
              <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                <h4 className="font-semibold mb-2">🚗 Self-Driving Cars</h4>
                <p className="text-sm text-muted-foreground">
                  Self-driving cars use MLOps to recognize traffic signs and pedestrians. Safety monitoring is super important here!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Path */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Your Learning Journey</CardTitle>
            <CardDescription>Steps to become an MLOps expert!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Learn the Basics</h4>
                  <p className="text-sm text-muted-foreground">
                    Start with understanding what AI and machine learning are. Practice with simple projects!
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Build Your First Model</h4>
                  <p className="text-sm text-muted-foreground">
                    Create a simple model that can recognize something (like cats vs dogs). Use tools like Teachable Machine!
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">Learn About Deployment</h4>
                  <p className="text-sm text-muted-foreground">
                    Learn how to put your model online so others can use it. Start with simple platforms!
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-600 text-white flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold">Practice MLOps</h4>
                  <p className="text-sm text-muted-foreground">
                    Learn about monitoring, version control, and keeping models working well. This is where the magic happens!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fun Activities */}
        <Card className="mb-8 border-2 border-pink-200 dark:border-pink-800">
          <CardHeader>
            <CardTitle className="text-2xl">Try This at Home! 🏠</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                <h4 className="font-semibold mb-2">Activity 1: Train a Simple Model</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Use <strong>Google Teachable Machine</strong> to create a model that recognizes objects in your room. Take pictures of different items and train your model!
                </p>
                <Button size="sm" variant="outline" asChild>
                  <a href="https://teachablemachine.withgoogle.com/" target="_blank" rel="noopener noreferrer">
                    Try Teachable Machine →
                  </a>
                </Button>
              </div>
              <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                <h4 className="font-semibold mb-2">Activity 2: Monitor Your Model</h4>
                <p className="text-sm text-muted-foreground">
                  After training, test your model with new pictures. Keep track of how many it gets right and wrong. This is like monitoring in MLOps!
                </p>
              </div>
              <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                <h4 className="font-semibold mb-2">Activity 3: Version Your Model</h4>
                <p className="text-sm text-muted-foreground">
                  Train your model again with more examples. Compare the old version with the new one. Which works better? This is version control!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Ready to Learn More?</CardTitle>
            <CardDescription className="text-purple-100">
              When you&apos;re ready for advanced MLOps, check out our Pro content!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/">Explore MLOps Academy</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20" asChild>
                <Link href="/signup">Sign Up Free</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

