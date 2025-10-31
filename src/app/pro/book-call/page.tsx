import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Calendar, Video, Clock, CheckCircle2 } from "lucide-react";
import Script from "next/script";

export default async function BookCallPage() {
  const sess = await getSession();
  if (!sess.isPro) {
    redirect("/");
  }

  // You can replace this with your actual Calendly link or other booking service
  const calendlyUrl = process.env.CALENDLY_URL || "https://calendly.com/your-username/30min";

  return (
    <div className="container mx-auto max-w-5xl px-6 py-16">
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
          Dashboard
        </Link>
        <ThemeToggle />
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-semibold tracking-tight">Book a 1:1 Call</h1>
        <p className="text-muted-foreground mt-2">
          Get personalized guidance on your MLOps journey
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              What You&apos;ll Get
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Architecture Review</p>
                <p className="text-sm text-muted-foreground">
                  Review your MLOps system design and get expert feedback
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Career Guidance</p>
                <p className="text-sm text-muted-foreground">
                  Get advice on advancing your MLOps career
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Technical Deep Dive</p>
                <p className="text-sm text-muted-foreground">
                  Discuss specific technical challenges you&apos;re facing
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Best Practices</p>
                <p className="text-sm text-muted-foreground">
                  Learn industry best practices from 4+ years of experience
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Session Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-medium">Duration</p>
              <p className="text-sm text-muted-foreground">30 minutes</p>
            </div>
            <div>
              <p className="font-medium">Format</p>
              <p className="text-sm text-muted-foreground">Video call (Google Meet / Zoom)</p>
            </div>
            <div>
              <p className="font-medium">Preparation</p>
              <p className="text-sm text-muted-foreground">
                Come with specific questions or topics you&apos;d like to discuss
              </p>
            </div>
            <div>
              <p className="font-medium">Cancellation</p>
              <p className="text-sm text-muted-foreground">
                You can reschedule or cancel up to 24 hours before your session
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Select a Time
          </CardTitle>
          <CardDescription>
            Choose a time that works best for you. All times are shown in your local timezone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="calendly-inline-widget"
            data-url={calendlyUrl}
            style={{ minWidth: "320px", height: "700px" }}
          />
          <Script
            src="https://assets.calendly.com/assets/external/widget.js"
            strategy="lazyOnload"
          />
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>
          Having trouble booking? <Link href="/dashboard" className="text-primary hover:underline">Contact support</Link>
        </p>
      </div>
    </div>
  );
}

