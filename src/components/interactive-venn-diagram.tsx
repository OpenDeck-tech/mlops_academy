"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Code, Brain, Rocket } from "lucide-react";

type SectionType = 
  | "infrastructure" 
  | "software" 
  | "machine-learning"
  | "mlops-engineer"
  | null;

interface SectionInfo {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  topics: string[];
}

const sectionInfo: Record<Exclude<SectionType, null>, SectionInfo> = {
  infrastructure: {
    title: "Infrastructure in MLOps",
    description: "MLOps infrastructure: cloud platforms, containers, orchestration, and ML-specific infrastructure management",
    icon: Server,
    color: "text-blue-600 dark:text-blue-400",
    topics: [
      "ML Infrastructure on Cloud (AWS SageMaker, GCP Vertex AI, Azure ML)",
      "Containerization for ML (Docker, ML containers)",
      "Kubernetes for ML workloads and model serving",
      "Infrastructure as Code for ML (Terraform, CloudFormation)",
      "ML Pipeline Infrastructure (Airflow, Kubeflow)",
      "Model Serving Infrastructure (KServe, Seldon, Triton)"
    ]
  },
  software: {
    title: "Software Engineering in MLOps",
    description: "Software engineering practices applied to ML systems: APIs, versioning, testing, and deployment",
    icon: Code,
    color: "text-green-600 dark:text-green-400",
    topics: [
      "ML Model APIs (REST, gRPC for model serving)",
      "Model Versioning Systems (MLflow, DVC, Weights & Biases)",
      "CI/CD for ML Pipelines",
      "Testing ML Systems (model tests, integration tests)",
      "Feature Stores and Data Engineering",
      "ML System Architecture and Design Patterns"
    ]
  },
  "machine-learning": {
    title: "Machine Learning in MLOps",
    description: "MLOps-focused machine learning: model development, training, monitoring, and operations",
    icon: Brain,
    color: "text-purple-600 dark:text-purple-400",
    topics: [
      "ML Frameworks for Production (TensorFlow, PyTorch)",
      "Model Training Pipelines and Experiment Tracking",
      "Model Monitoring and Drift Detection",
      "Model Deployment and A/B Testing",
      "ML Model Lifecycle Management",
      "Production ML Best Practices"
    ]
  },
  "mlops-engineer": {
    title: "MLOps Engineer",
    description: "The complete intersection: Combining Infrastructure + Software Engineering + Machine Learning for production ML systems",
    icon: Rocket,
    color: "text-orange-600 dark:text-orange-400",
    topics: [
      "End-to-end ML Lifecycle Management",
      "Production ML Systems Architecture",
      "Model Operations (ModelOps)",
      "ML Observability and Monitoring",
      "Scalable ML Infrastructure Design",
      "MLOps Best Practices and Patterns"
    ]
  }
};

export function InteractiveVennDiagram() {
  const [selectedSection, setSelectedSection] = useState<SectionType>(null);
  const [hoveredSection, setHoveredSection] = useState<SectionType>(null);

  const handleSectionClick = (section: SectionType) => {
    if (selectedSection === section) {
      setSelectedSection(null);
    } else {
      setSelectedSection(section);
    }
  };

  const activeSection = selectedSection || hoveredSection;
  const info = activeSection ? sectionInfo[activeSection] : null;
  const InfoIcon = info?.icon;

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">The MLOps Engineer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
            {/* SVG Venn Diagram */}
            <div className="flex-shrink-0 w-full lg:w-auto">
              <svg
                viewBox="0 0 400 400"
                className="w-full max-w-xl h-auto"
                style={{ maxHeight: "600px", minHeight: "500px" }}
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Infrastructure Circle (Blue) */}
                <circle
                  cx="150"
                  cy="150"
                  r="100"
                  fill={activeSection === "infrastructure" || activeSection === "mlops-engineer" 
                    ? "rgba(59, 130, 246, 0.3)" 
                    : "rgba(59, 130, 246, 0.1)"}
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="2"
                  className="cursor-pointer transition-all hover:opacity-80"
                  onClick={() => handleSectionClick("infrastructure")}
                  onMouseEnter={() => setHoveredSection("infrastructure")}
                  onMouseLeave={() => setHoveredSection(null)}
                />
                
                {/* Software Circle (Green) */}
                <circle
                  cx="250"
                  cy="150"
                  r="100"
                  fill={activeSection === "software" || activeSection === "mlops-engineer"
                    ? "rgba(34, 197, 94, 0.3)"
                    : "rgba(34, 197, 94, 0.1)"}
                  stroke="rgb(34, 197, 94)"
                  strokeWidth="2"
                  className="cursor-pointer transition-all hover:opacity-80"
                  onClick={() => handleSectionClick("software")}
                  onMouseEnter={() => setHoveredSection("software")}
                  onMouseLeave={() => setHoveredSection(null)}
                />
                
                {/* Machine Learning Circle (Purple) */}
                <circle
                  cx="200"
                  cy="250"
                  r="100"
                  fill={activeSection === "machine-learning" || activeSection === "mlops-engineer"
                    ? "rgba(168, 85, 247, 0.3)"
                    : "rgba(168, 85, 247, 0.1)"}
                  stroke="rgb(168, 85, 247)"
                  strokeWidth="2"
                  className="cursor-pointer transition-all hover:opacity-80"
                  onClick={() => handleSectionClick("machine-learning")}
                  onMouseEnter={() => setHoveredSection("machine-learning")}
                  onMouseLeave={() => setHoveredSection(null)}
                />

                {/* Labels */}
                <text
                  x="100"
                  y="120"
                  fontSize="16"
                  className="font-semibold fill-blue-600 dark:fill-blue-400 cursor-pointer"
                  onClick={() => handleSectionClick("infrastructure")}
                  onMouseEnter={() => setHoveredSection("infrastructure")}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  Infrastructure
                </text>
                
                <text
                  x="260"
                  y="120"
                  fontSize="16"
                  className="font-semibold fill-green-600 dark:fill-green-400 cursor-pointer"
                  onClick={() => handleSectionClick("software")}
                  onMouseEnter={() => setHoveredSection("software")}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  Software
                </text>
                
                <text
                  x="170"
                  y="320"
                  fontSize="16"
                  className="font-semibold fill-purple-600 dark:fill-purple-400 cursor-pointer"
                  onClick={() => handleSectionClick("machine-learning")}
                  onMouseEnter={() => setHoveredSection("machine-learning")}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  Machine Learning
                </text>

                {/* Center: MLOps Engineer */}
                <g
                  className="cursor-pointer"
                  onClick={() => handleSectionClick("mlops-engineer")}
                  onMouseEnter={() => setHoveredSection("mlops-engineer")}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <circle 
                    cx="200" 
                    cy="183" 
                    r="25" 
                    fill={activeSection === "mlops-engineer" 
                      ? "rgba(249, 115, 22, 0.5)" 
                      : "rgba(249, 115, 22, 0.3)"}
                    stroke="rgb(249, 115, 22)"
                    strokeWidth="2"
                    className="transition-all"
                  />
                  <text x="165" y="190" fontSize="14" className="font-bold fill-orange-600 dark:fill-orange-400">
                    MLOps Engineer
                  </text>
                </g>
              </svg>
            </div>

            {/* Information Panel */}
            <div className="flex-1 max-w-md">
              {info ? (
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {InfoIcon && <InfoIcon className={`h-6 w-6 ${info.color}`} />}
                      <CardTitle>{info.title}</CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {info.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold mb-2">Key Topics:</h4>
                      <ul className="space-y-1">
                        {info.topics.map((topic, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <span className="text-muted-foreground mt-1">•</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {selectedSection && (
                      <div className="mt-4 pt-4 border-t">
                        <button
                          onClick={() => setSelectedSection(null)}
                          className="text-xs text-muted-foreground hover:text-foreground"
                        >
                          Click to deselect
                        </button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">
                      Click or hover over any section to learn more
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

