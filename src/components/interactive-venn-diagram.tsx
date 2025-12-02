"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Code, Brain, Zap, Layers, Rocket, Database } from "lucide-react";

type SectionType = 
  | "infrastructure" 
  | "software" 
  | "machine-learning"
  | "infrastructure-software"
  | "software-ml"
  | "infrastructure-ml"
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
    title: "Infrastructure",
    description: "Cloud platforms, containers, orchestration, and infrastructure management",
    icon: Server,
    color: "text-blue-600 dark:text-blue-400",
    topics: [
      "Cloud Platforms (AWS, GCP, Azure)",
      "Containerization (Docker)",
      "Orchestration (Kubernetes)",
      "Infrastructure as Code (Terraform, CloudFormation)",
      "Networking & Security",
      "Monitoring & Observability"
    ]
  },
  software: {
    title: "Software Engineering",
    description: "Programming, APIs, databases, and software development practices",
    icon: Code,
    color: "text-green-600 dark:text-green-400",
    topics: [
      "Programming Languages (Python, Go, Java)",
      "API Development (REST, gRPC)",
      "Databases (SQL, NoSQL)",
      "Version Control (Git)",
      "CI/CD Pipelines",
      "Testing & Quality Assurance"
    ]
  },
  "machine-learning": {
    title: "Machine Learning",
    description: "ML models, data science, algorithms, and model training",
    icon: Brain,
    color: "text-purple-600 dark:text-purple-400",
    topics: [
      "ML Frameworks (TensorFlow, PyTorch)",
      "Model Training & Evaluation",
      "Feature Engineering",
      "Data Preprocessing",
      "Model Architecture Design",
      "Hyperparameter Tuning"
    ]
  },
  "infrastructure-software": {
    title: "DevOps",
    description: "The intersection of Infrastructure and Software Engineering",
    icon: Zap,
    color: "text-cyan-600 dark:text-cyan-400",
    topics: [
      "CI/CD Automation",
      "Infrastructure Automation",
      "Configuration Management",
      "Deployment Strategies",
      "System Reliability"
    ]
  },
  "software-ml": {
    title: "ML Engineering",
    description: "The intersection of Software Engineering and Machine Learning",
    icon: Layers,
    color: "text-yellow-600 dark:text-yellow-400",
    topics: [
      "ML Model APIs",
      "Model Serving Infrastructure",
      "Feature Stores",
      "ML Pipelines",
      "Model Versioning"
    ]
  },
  "infrastructure-ml": {
    title: "ML Infrastructure",
    description: "The intersection of Infrastructure and Machine Learning",
    icon: Database,
    color: "text-pink-600 dark:text-pink-400",
    topics: [
      "GPU/TPU Management",
      "Distributed Training",
      "Model Deployment Infrastructure",
      "ML Data Pipelines",
      "ML Monitoring Infrastructure"
    ]
  },
  "mlops-engineer": {
    title: "MLOps Engineer",
    description: "The complete intersection: Infrastructure + Software + Machine Learning",
    icon: Rocket,
    color: "text-orange-600 dark:text-orange-400",
    topics: [
      "End-to-end ML Lifecycle",
      "Production ML Systems",
      "Model Operations",
      "ML Observability",
      "Scalable ML Infrastructure",
      "ML Best Practices"
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
            <div className="flex-shrink-0">
              <svg
                viewBox="0 0 400 400"
                className="w-full max-w-md h-auto"
                style={{ maxHeight: "400px" }}
              >
                {/* Infrastructure Circle (Blue) */}
                <circle
                  cx="150"
                  cy="150"
                  r="100"
                  fill={activeSection === "infrastructure" || activeSection === "infrastructure-software" || activeSection === "infrastructure-ml" || activeSection === "mlops-engineer" 
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
                  fill={activeSection === "software" || activeSection === "infrastructure-software" || activeSection === "software-ml" || activeSection === "mlops-engineer"
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
                  fill={activeSection === "machine-learning" || activeSection === "software-ml" || activeSection === "infrastructure-ml" || activeSection === "mlops-engineer"
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
                  className="text-sm font-semibold fill-blue-600 dark:fill-blue-400 cursor-pointer"
                  onClick={() => handleSectionClick("infrastructure")}
                  onMouseEnter={() => setHoveredSection("infrastructure")}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  Infrastructure
                </text>
                
                <text
                  x="260"
                  y="120"
                  className="text-sm font-semibold fill-green-600 dark:fill-green-400 cursor-pointer"
                  onClick={() => handleSectionClick("software")}
                  onMouseEnter={() => setHoveredSection("software")}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  Software
                </text>
                
                <text
                  x="170"
                  y="320"
                  className="text-sm font-semibold fill-purple-600 dark:fill-purple-400 cursor-pointer"
                  onClick={() => handleSectionClick("machine-learning")}
                  onMouseEnter={() => setHoveredSection("machine-learning")}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  Machine Learning
                </text>

                {/* Intersection Labels - Clickable areas */}
                {/* Infrastructure + Software (DevOps) */}
                <g
                  className="cursor-pointer"
                  onClick={() => handleSectionClick("infrastructure-software")}
                  onMouseEnter={() => setHoveredSection("infrastructure-software")}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <circle cx="200" cy="150" r="15" fill="rgba(6, 182, 212, 0.2)" />
                  <text x="185" y="155" className="text-xs font-medium fill-cyan-600 dark:fill-cyan-400">
                    DevOps
                  </text>
                </g>

                {/* Software + ML (ML Engineering) */}
                <g
                  className="cursor-pointer"
                  onClick={() => handleSectionClick("software-ml")}
                  onMouseEnter={() => setHoveredSection("software-ml")}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <circle cx="250" cy="200" r="15" fill="rgba(234, 179, 8, 0.2)" />
                  <text x="220" y="205" className="text-xs font-medium fill-yellow-600 dark:fill-yellow-400">
                    ML Engineering
                  </text>
                </g>

                {/* Infrastructure + ML (ML Infrastructure) */}
                <g
                  className="cursor-pointer"
                  onClick={() => handleSectionClick("infrastructure-ml")}
                  onMouseEnter={() => setHoveredSection("infrastructure-ml")}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <circle cx="150" cy="200" r="15" fill="rgba(236, 72, 153, 0.2)" />
                  <text x="120" y="205" className="text-xs font-medium fill-pink-600 dark:fill-pink-400">
                    ML Infrastructure
                  </text>
                </g>

                {/* Center: MLOps Engineer */}
                <g
                  className="cursor-pointer"
                  onClick={() => handleSectionClick("mlops-engineer")}
                  onMouseEnter={() => setHoveredSection("mlops-engineer")}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <circle cx="200" cy="183" r="20" fill="rgba(249, 115, 22, 0.3)" />
                  <text x="170" y="190" className="text-xs font-bold fill-orange-600 dark:fill-orange-400">
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

