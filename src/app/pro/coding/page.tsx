import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function CodingPage() {
  const sess = await getSession();
  if (!sess.isPro) {
    redirect("/");
  }

  const problems = [
    {
      id: "data-pipeline-optimization",
      title: "Data Pipeline Optimization",
      difficulty: "Medium",
      category: "Data Processing",
      description: "Optimize a data processing pipeline for maximum throughput",
      mlopsContext: "Critical for batch processing and real-time feature engineering"
    },
    {
      id: "model-versioning-system",
      title: "Model Versioning System",
      difficulty: "Hard",
      category: "System Design",
      description: "Design a system to track and manage model versions",
      mlopsContext: "Foundation of model registry and experiment tracking"
    },
    {
      id: "feature-store-caching",
      title: "Feature Store Caching",
      difficulty: "Medium",
      category: "Caching",
      description: "Implement efficient caching for feature lookups",
      mlopsContext: "Essential for low-latency online serving"
    },
    {
      id: "anomaly-detection-algorithm",
      title: "Anomaly Detection Algorithm",
      difficulty: "Easy",
      category: "Algorithms",
      description: "Implement statistical anomaly detection for model monitoring",
      mlopsContext: "Core component of model drift detection systems"
    },
    {
      id: "distributed-training-coordinator",
      title: "Distributed Training Coordinator",
      difficulty: "Hard",
      category: "Concurrency",
      description: "Coordinate multiple training processes across nodes",
      mlopsContext: "Required for large-scale model training orchestration"
    },
    {
      id: "model-serving-load-balancer",
      title: "Model Serving Load Balancer",
      difficulty: "Medium",
      category: "System Design",
      description: "Design load balancing for model inference endpoints",
      mlopsContext: "Critical for high-availability model serving"
    }
  ];

  return (
    <div className="container mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold tracking-tight">Coding Exercises</h1>
        <p className="text-muted-foreground mt-2">
          LeetCode-style problems with MLOps context. Master the programming skills that matter in production ML systems.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem) => (
          <Link key={problem.id} href={`/pro/coding/${problem.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{problem.title}</CardTitle>
                  <Badge variant={problem.difficulty === "Easy" ? "default" : problem.difficulty === "Medium" ? "secondary" : "destructive"}>
                    {problem.difficulty}
                  </Badge>
                </div>
                <Badge variant="outline" className="w-fit">{problem.category}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{problem.description}</p>
                <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md">
                  <p className="text-xs text-blue-800 dark:text-blue-200 font-medium">MLOps Context:</p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">{problem.mlopsContext}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
