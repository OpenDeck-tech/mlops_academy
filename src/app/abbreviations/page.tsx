"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, Cloud, Code, Database, Settings } from "lucide-react";
import { MLOpsSidebar } from "@/components/mlops-sidebar";
import { useState, useEffect } from "react";

interface Abbreviation {
  term: string;
  meaning: string;
  description?: string;
}

const mlopsAbbreviations: Abbreviation[] = [
  { term: "MLOps", meaning: "Machine Learning Operations", description: "The practice of deploying, monitoring, and maintaining ML models in production" },
  { term: "CI/CD", meaning: "Continuous Integration / Continuous Deployment", description: "Automated processes for building, testing, and deploying code" },
  { term: "API", meaning: "Application Programming Interface", description: "A set of protocols and tools for building software applications" },
  { term: "REST", meaning: "Representational State Transfer", description: "An architectural style for designing web services" },
  { term: "gRPC", meaning: "gRPC Remote Procedure Calls", description: "A high-performance RPC framework" },
  { term: "SDK", meaning: "Software Development Kit", description: "A collection of tools and libraries for developing software" },
  { term: "SDLC", meaning: "Software Development Life Cycle", description: "The process of planning, creating, testing, and deploying software" },
  { term: "IaC", meaning: "Infrastructure as Code", description: "Managing infrastructure through code rather than manual processes" },
  { term: "Terraform", meaning: "Infrastructure as Code tool", description: "HashiCorp's tool for building, changing, and versioning infrastructure" },
  { term: "Ansible", meaning: "Configuration management tool", description: "Automation tool for IT tasks like configuration management and application deployment" },
  { term: "Kubernetes", meaning: "Container orchestration platform", description: "Also abbreviated as K8s (K + 8 letters + s)" },
  { term: "K8s", meaning: "Kubernetes", description: "Abbreviation for Kubernetes (K + 8 letters + s)" },
  { term: "Docker", meaning: "Containerization platform", description: "Platform for developing, shipping, and running applications in containers" },
  { term: "YAML", meaning: "YAML Ain't Markup Language", description: "Human-readable data serialization standard" },
  { term: "JSON", meaning: "JavaScript Object Notation", description: "Lightweight data interchange format" },
  { term: "ETL", meaning: "Extract, Transform, Load", description: "Process of extracting data from sources, transforming it, and loading into a destination" },
  { term: "ELT", meaning: "Extract, Load, Transform", description: "Data integration process where transformation happens after loading" },
  { term: "OLTP", meaning: "Online Transaction Processing", description: "Database systems optimized for transaction-oriented applications" },
  { term: "OLAP", meaning: "Online Analytical Processing", description: "Database systems optimized for analytical queries" },
  { term: "SQL", meaning: "Structured Query Language", description: "Language for managing and querying relational databases" },
  { term: "NoSQL", meaning: "Not Only SQL", description: "Non-relational database management systems" },
  { term: "ACID", meaning: "Atomicity, Consistency, Isolation, Durability", description: "Properties that guarantee reliable database transactions" },
  { term: "CAP", meaning: "Consistency, Availability, Partition tolerance", description: "Theorem about distributed systems" },
  { term: "SLA", meaning: "Service Level Agreement", description: "Commitment between service provider and customer about service quality" },
  { term: "SLO", meaning: "Service Level Objective", description: "Target for a specific metric in an SLA" },
  { term: "SLI", meaning: "Service Level Indicator", description: "Measurable characteristic of a service's quality" },
  { term: "MTTR", meaning: "Mean Time To Recovery", description: "Average time to recover from a failure" },
  { term: "MTBF", meaning: "Mean Time Between Failures", description: "Average time between system failures" },
  { term: "RTO", meaning: "Recovery Time Objective", description: "Target time to restore service after a disaster" },
  { term: "RPO", meaning: "Recovery Point Objective", description: "Maximum acceptable data loss measured in time" },
];

const cloudAbbreviations: Abbreviation[] = [
  { term: "AWS", meaning: "Amazon Web Services", description: "Cloud computing platform by Amazon" },
  { term: "EC2", meaning: "Elastic Compute Cloud", description: "AWS virtual servers" },
  { term: "S3", meaning: "Simple Storage Service", description: "AWS object storage service" },
  { term: "IAM", meaning: "Identity and Access Management", description: "AWS service for managing access and permissions" },
  { term: "VPC", meaning: "Virtual Private Cloud", description: "Isolated cloud network environment" },
  { term: "RDS", meaning: "Relational Database Service", description: "AWS managed relational database service" },
  { term: "Lambda", meaning: "AWS serverless compute service", description: "Run code without provisioning servers" },
  { term: "EKS", meaning: "Elastic Kubernetes Service", description: "AWS managed Kubernetes service" },
  { term: "ECS", meaning: "Elastic Container Service", description: "AWS container orchestration service" },
  { term: "CloudFormation", meaning: "AWS Infrastructure as Code", description: "AWS service for modeling and provisioning resources" },
  { term: "CDK", meaning: "Cloud Development Kit", description: "AWS framework for defining cloud infrastructure using code" },
  { term: "GCP", meaning: "Google Cloud Platform", description: "Cloud computing platform by Google" },
  { term: "GKE", meaning: "Google Kubernetes Engine", description: "GCP managed Kubernetes service" },
  { term: "Azure", meaning: "Microsoft Azure", description: "Cloud computing platform by Microsoft" },
  { term: "AKS", meaning: "Azure Kubernetes Service", description: "Azure managed Kubernetes service" },
  { term: "Terraform", meaning: "Infrastructure as Code tool", description: "Multi-cloud infrastructure provisioning tool" },
  { term: "Helm", meaning: "Kubernetes package manager", description: "Tool for managing Kubernetes applications" },
];

const dataAbbreviations: Abbreviation[] = [
  { term: "ML", meaning: "Machine Learning", description: "Subset of AI that enables systems to learn from data" },
  { term: "AI", meaning: "Artificial Intelligence", description: "Simulation of human intelligence by machines" },
  { term: "DL", meaning: "Deep Learning", description: "Subset of ML using neural networks with multiple layers" },
  { term: "NLP", meaning: "Natural Language Processing", description: "AI field focused on interaction between computers and human language" },
  { term: "CV", meaning: "Computer Vision", description: "AI field focused on enabling computers to interpret visual information" },
  { term: "LLM", meaning: "Large Language Model", description: "AI model trained on vast amounts of text data" },
  { term: "GPU", meaning: "Graphics Processing Unit", description: "Specialized processor for parallel computations" },
  { term: "TPU", meaning: "Tensor Processing Unit", description: "Google's custom ASIC for machine learning" },
  { term: "CUDA", meaning: "Compute Unified Device Architecture", description: "NVIDIA's parallel computing platform" },
  { term: "DAG", meaning: "Directed Acyclic Graph", description: "Data structure used in workflow orchestration" },
  { term: "CRUD", meaning: "Create, Read, Update, Delete", description: "Basic operations for data management" },
  { term: "ACID", meaning: "Atomicity, Consistency, Isolation, Durability", description: "Database transaction properties" },
  { term: "OLTP", meaning: "Online Transaction Processing", description: "Database systems for transaction processing" },
  { term: "OLAP", meaning: "Online Analytical Processing", description: "Database systems for analytical queries" },
  { term: "Data Lake", meaning: "Centralized repository for raw data", description: "Storage system for structured and unstructured data" },
  { term: "Data Warehouse", meaning: "Centralized repository for processed data", description: "Storage system optimized for analytical queries" },
  { term: "Feature Store", meaning: "Repository for ML features", description: "System for storing and serving features for ML models" },
  { term: "Model Registry", meaning: "Centralized model storage", description: "System for versioning and managing ML models" },
];

const devOpsAbbreviations: Abbreviation[] = [
  { term: "DevOps", meaning: "Development and Operations", description: "Cultural movement combining software development and IT operations" },
  { term: "Git", meaning: "Version control system", description: "Distributed version control system" },
  { term: "GitHub", meaning: "Git hosting and collaboration platform", description: "Web-based platform for version control" },
  { term: "GitLab", meaning: "DevOps platform", description: "Complete DevOps lifecycle platform" },
  { term: "CI", meaning: "Continuous Integration", description: "Practice of merging code changes frequently" },
  { term: "CD", meaning: "Continuous Deployment", description: "Practice of automatically deploying code changes" },
  { term: "CD", meaning: "Continuous Delivery", description: "Practice of keeping code deployable at all times" },
  { term: "IaC", meaning: "Infrastructure as Code", description: "Managing infrastructure through code" },
  { term: "Terraform", meaning: "Infrastructure as Code tool", description: "HashiCorp's IaC tool" },
  { term: "Ansible", meaning: "Configuration management tool", description: "Automation platform for IT tasks" },
  { term: "Puppet", meaning: "Configuration management tool", description: "Infrastructure automation platform" },
  { term: "Chef", meaning: "Configuration management tool", description: "Infrastructure automation platform" },
  { term: "Jenkins", meaning: "CI/CD automation server", description: "Open-source automation server" },
  { term: "GitHub Actions", meaning: "CI/CD platform", description: "GitHub's integrated CI/CD solution" },
  { term: "GitLab CI", meaning: "GitLab Continuous Integration", description: "GitLab's integrated CI/CD solution" },
  { term: "Docker", meaning: "Containerization platform", description: "Platform for containerizing applications" },
  { term: "Kubernetes", meaning: "Container orchestration", description: "Also known as K8s" },
  { term: "Helm", meaning: "Kubernetes package manager", description: "Package manager for Kubernetes" },
  { term: "Prometheus", meaning: "Monitoring and alerting toolkit", description: "Open-source monitoring solution" },
  { term: "Grafana", meaning: "Analytics and monitoring platform", description: "Open-source analytics platform" },
  { term: "ELK", meaning: "Elasticsearch, Logstash, Kibana", description: "Stack for log management and analysis" },
  { term: "APM", meaning: "Application Performance Monitoring", description: "Monitoring application performance" },
];

export default function AbbreviationsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen">
      <MLOpsSidebar />
      <div className="flex-1 min-h-screen container mx-auto max-w-7xl px-6 py-12 transition-all duration-300" style={{ marginLeft: "var(--sidebar-width)" }}>
        <Link 
          href="/blank" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors cursor-pointer relative z-10 px-2 py-1 -ml-2 rounded hover:bg-accent/50"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Environments</span>
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-semibold">Abbreviations & Acronyms</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Common abbreviations and their meanings in MLOps, cloud computing, and software engineering
          </p>
        </div>

        <Tabs defaultValue="mlops" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="mlops" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              MLOps
            </TabsTrigger>
            <TabsTrigger value="cloud" className="flex items-center gap-2">
              <Cloud className="h-4 w-4" />
              Cloud
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Data & ML
            </TabsTrigger>
            <TabsTrigger value="devops" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              DevOps
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mlops" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mlopsAbbreviations.map((abbr, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold">{abbr.term}</CardTitle>
                    <CardDescription className="font-semibold text-foreground">{abbr.meaning}</CardDescription>
                  </CardHeader>
                  {abbr.description && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{abbr.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cloud" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cloudAbbreviations.map((abbr, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold">{abbr.term}</CardTitle>
                    <CardDescription className="font-semibold text-foreground">{abbr.meaning}</CardDescription>
                  </CardHeader>
                  {abbr.description && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{abbr.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dataAbbreviations.map((abbr, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold">{abbr.term}</CardTitle>
                    <CardDescription className="font-semibold text-foreground">{abbr.meaning}</CardDescription>
                  </CardHeader>
                  {abbr.description && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{abbr.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="devops" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {devOpsAbbreviations.map((abbr, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold">{abbr.term}</CardTitle>
                    <CardDescription className="font-semibold text-foreground">{abbr.meaning}</CardDescription>
                  </CardHeader>
                  {abbr.description && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{abbr.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

