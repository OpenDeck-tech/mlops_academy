"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Code, FileCode, GitBranch, BookOpen, CheckCircle2, AlertCircle, Zap, Layers, Database } from "lucide-react";
import { MLOpsSidebar } from "@/components/mlops-sidebar";
import { CodeBlock } from "@/components/code-block";

export default function CodeBestPracticesPage() {
  return (
    <div className="flex min-h-screen">
      <MLOpsSidebar />
      <div className="flex-1 min-h-screen container mx-auto max-w-7xl px-6 py-12 transition-all duration-300" style={{ marginLeft: "var(--sidebar-width)" }}>
        <Link 
          href="/environments/development" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors cursor-pointer relative z-10 px-2 py-1 -ml-2 rounded hover:bg-accent/50"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Development Environment</span>
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <Code className="h-8 w-8 text-green-600 dark:text-green-400" />
            <h1 className="text-4xl font-semibold">Code Best Practices</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Development standards and practices for ML codebases
          </p>
        </div>

        <Tabs defaultValue="ml-specific" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            <TabsTrigger value="ml-specific">ML-Specific</TabsTrigger>
            <TabsTrigger value="structure">Structure</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="versioning">Versioning</TabsTrigger>
            <TabsTrigger value="reviews">Code Reviews</TabsTrigger>
          </TabsList>

          {/* ML-Specific Best Practices Tab */}
          <TabsContent value="ml-specific" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Layers className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <CardTitle>ML Code Organization</CardTitle>
                </div>
                <CardDescription>Structuring ML code for maintainability and reproducibility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">1. Separate Concerns</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Keep data processing, model training, evaluation, and inference in separate modules:
                  </p>
                  <CodeBlock 
                    code={`project/
├── data/
│   ├── preprocessing.py
│   ├── feature_engineering.py
│   └── validation.py
├── models/
│   ├── architecture.py
│   ├── training.py
│   └── inference.py
├── evaluation/
│   ├── metrics.py
│   └── validation.py
└── config/
    └── config.yaml`}
                    language="text"
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2. Configuration Management</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Use configuration files (YAML, JSON) for hyperparameters, paths, and settings:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Never hardcode hyperparameters in code</li>
                    <li className="list-disc">Use environment-specific configs (dev, staging, prod)</li>
                    <li className="list-disc">Version control all configuration files</li>
                    <li className="list-disc">Validate configs at startup with schema validation</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3. Reproducibility</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc"><strong>Set Random Seeds:</strong> Always set seeds for random number generators (NumPy, PyTorch, TensorFlow)</li>
                    <li className="list-disc"><strong>Version Dependencies:</strong> Pin exact versions in requirements.txt or poetry.lock</li>
                    <li className="list-disc"><strong>Data Versioning:</strong> Track which dataset version was used for training</li>
                    <li className="list-disc"><strong>Environment Capture:</strong> Use tools like Docker or conda to capture exact environments</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">4. Experiment Tracking</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Log all experiments with metadata:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Hyperparameters and configuration</li>
                    <li className="list-disc">Model architecture and parameters</li>
                    <li className="list-disc">Training metrics (loss, accuracy, etc.)</li>
                    <li className="list-disc">Data versions and splits</li>
                    <li className="list-disc">Code version (Git commit hash)</li>
                    <li className="list-disc">Environment details (OS, Python version, GPU info)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Database className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <CardTitle>Data Handling Best Practices</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">1. Data Validation</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Validate data schemas before processing</li>
                    <li className="list-disc">Check for missing values, outliers, and data drift</li>
                    <li className="list-disc">Implement data quality checks in pipelines</li>
                    <li className="list-disc">Fail fast on invalid data rather than silently continuing</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2. Avoid Data Leakage</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Split data before any preprocessing</li>
                    <li className="list-disc">Fit scalers/transformers only on training data</li>
                    <li className="list-disc">Never use future information to predict past events</li>
                    <li className="list-disc">Be careful with time-series cross-validation</li>
                    <li className="list-disc">Validate that test set is truly unseen</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3. Memory Efficiency</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Use generators/iterators for large datasets</li>
                    <li className="list-disc">Load data in batches rather than all at once</li>
                    <li className="list-disc">Use appropriate data types (float32 vs float64)</li>
                    <li className="list-disc">Clear intermediate variables when not needed</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <CardTitle>Model Development Practices</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">1. Model Architecture</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Keep models modular and composable</li>
                    <li className="list-disc">Separate model definition from training logic</li>
                    <li className="list-disc">Use factory patterns for model creation</li>
                    <li className="list-disc">Document architectural decisions and trade-offs</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2. Training Code</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Implement checkpointing for long-running training</li>
                    <li className="list-disc">Add early stopping to prevent overfitting</li>
                    <li className="list-disc">Log training progress and metrics regularly</li>
                    <li className="list-disc">Handle GPU/CPU fallback gracefully</li>
                    <li className="list-disc">Make training resumable from checkpoints</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3. Inference Code</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Optimize inference for production (batch processing, quantization)</li>
                    <li className="list-disc">Implement proper error handling and fallbacks</li>
                    <li className="list-disc">Add input validation and sanitization</li>
                    <li className="list-disc">Log predictions for monitoring and debugging</li>
                    <li className="list-disc">Support both batch and single predictions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Code Structure Tab */}
          <TabsContent value="structure" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <FileCode className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <CardTitle>Code Organization</CardTitle>
                </div>
                <CardDescription>Structuring code for maintainability and scalability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">1. Project Structure</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Follow a consistent project structure:
                  </p>
                  <CodeBlock 
                    code={`ml_project/
├── src/
│   ├── __init__.py
│   ├── data/
│   ├── models/
│   ├── training/
│   └── inference/
├── tests/
│   ├── unit/
│   └── integration/
├── configs/
│   ├── base.yaml
│   ├── dev.yaml
│   └── prod.yaml
├── scripts/
│   ├── train.py
│   └── evaluate.py
├── notebooks/
│   └── exploration/
├── requirements.txt
├── README.md
└── .gitignore`}
                    language="text"
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2. Function Design</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc"><strong>Single Responsibility:</strong> Each function should do one thing well</li>
                    <li className="list-disc"><strong>Pure Functions:</strong> Prefer functions without side effects when possible</li>
                    <li className="list-disc"><strong>Small Functions:</strong> Keep functions focused and under 50 lines when possible</li>
                    <li className="list-disc"><strong>Descriptive Names:</strong> Function names should clearly describe what they do</li>
                    <li className="list-disc"><strong>Type Hints:</strong> Use type annotations for better code clarity and IDE support</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3. Class Design</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Keep classes focused on a single responsibility</li>
                    <li className="list-disc">Use composition over inheritance when possible</li>
                    <li className="list-disc">Make classes immutable when appropriate</li>
                    <li className="list-disc">Use dataclasses or Pydantic models for data containers</li>
                    <li className="list-disc">Implement proper `__repr__` and `__str__` methods</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">4. Error Handling</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Use specific exception types, not generic `Exception`</li>
                    <li className="list-disc">Fail fast with clear error messages</li>
                    <li className="list-disc">Log errors with context (stack traces, inputs, state)</li>
                    <li className="list-disc">Handle expected errors gracefully</li>
                    <li className="list-disc">Use custom exceptions for domain-specific errors</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Code Quality Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Follow PEP 8:</strong> Use Python style guide for consistent formatting. Use tools like Black or autopep8 for automatic formatting.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Linting:</strong> Use pylint, flake8, or ruff to catch code quality issues early. Run linting in CI/CD pipelines.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Type Checking:</strong> Use mypy or pyright for static type checking. Catch type errors before runtime.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Complexity:</strong> Keep cyclomatic complexity low. Refactor complex functions into smaller, testable pieces.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>DRY Principle:</strong> Don't Repeat Yourself. Extract common logic into reusable functions or classes.
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documentation Tab */}
          <TabsContent value="documentation" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <CardTitle>Documentation Standards</CardTitle>
                </div>
                <CardDescription>Writing clear and maintainable documentation for ML code</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">1. Docstrings</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Use Google or NumPy style docstrings for all public functions and classes:
                  </p>
                  <CodeBlock 
                    code={`def train_model(
    data: pd.DataFrame,
    config: Dict[str, Any],
    epochs: int = 10
) -> Model:
    """Train a machine learning model.
    
    Args:
        data: Training dataset with features and target.
        config: Model configuration dictionary containing
            hyperparameters and architecture settings.
        epochs: Number of training epochs. Defaults to 10.
    
    Returns:
        Trained model object ready for inference.
    
    Raises:
        ValueError: If data is empty or config is invalid.
        RuntimeError: If training fails due to resource constraints.
    
    Example:
        >>> config = {"learning_rate": 0.001, "batch_size": 32}
        >>> model = train_model(train_data, config, epochs=20)
    """
    ...`}
                    language="python"
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2. README Files</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Every project should have a comprehensive README:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Project overview and purpose</li>
                    <li className="list-disc">Installation instructions</li>
                    <li className="list-disc">Usage examples</li>
                    <li className="list-disc">Configuration options</li>
                    <li className="list-disc">Training and inference instructions</li>
                    <li className="list-disc">Contributing guidelines</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3. Code Comments</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Explain <strong>why</strong>, not <strong>what</strong> (code should be self-explanatory)</li>
                    <li className="list-disc">Document complex algorithms and non-obvious decisions</li>
                    <li className="list-disc">Include references to papers or external resources</li>
                    <li className="list-disc">Note known limitations or future improvements</li>
                    <li className="list-disc">Keep comments up-to-date with code changes</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">4. ML-Specific Documentation</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc"><strong>Model Cards:</strong> Document model performance, limitations, and intended use cases</li>
                    <li className="list-disc"><strong>Data Cards:</strong> Describe datasets, collection methods, and potential biases</li>
                    <li className="list-disc"><strong>Experiment Logs:</strong> Document all experiments with results and learnings</li>
                    <li className="list-disc"><strong>API Documentation:</strong> Document model APIs, input/output formats, and examples</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Versioning Tab */}
          <TabsContent value="versioning" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <GitBranch className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <CardTitle>Version Control Best Practices</CardTitle>
                </div>
                <CardDescription>Managing code, models, and data versions effectively</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">1. Git Workflow</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Use meaningful commit messages following conventional commits</li>
                    <li className="list-disc">Keep commits atomic (one logical change per commit)</li>
                    <li className="list-disc">Write clear commit messages explaining what and why</li>
                    <li className="list-disc">Use feature branches for new work</li>
                    <li className="list-disc">Review code before merging to main</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2. What to Version</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc"><strong>Code:</strong> All source code, scripts, and configuration files</li>
                    <li className="list-disc"><strong>Models:</strong> Use model registries (MLflow, Weights & Biases) to version trained models</li>
                    <li className="list-disc"><strong>Data:</strong> Use DVC, Git LFS, or cloud storage with versioning</li>
                    <li className="list-disc"><strong>Dependencies:</strong> Pin exact versions in requirements.txt or poetry.lock</li>
                    <li className="list-disc"><strong>Configs:</strong> Version all configuration files used for experiments</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3. What NOT to Version</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Large binary files (use Git LFS or external storage)</li>
                    <li className="list-disc">Environment-specific secrets and API keys</li>
                    <li className="list-disc">Generated files and caches</li>
                    <li className="list-disc">IDE-specific configuration files</li>
                    <li className="list-disc">Large datasets (use data versioning tools instead)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">4. .gitignore for ML Projects</h3>
                  <CodeBlock 
                    code={`# Python
__pycache__/
*.py[cod]
*.so
.Python
venv/
env/

# ML-specific
*.pkl
*.h5
*.ckpt
*.pt
*.pth
models/checkpoints/
data/raw/
data/processed/
*.csv
*.parquet

# Experiment tracking
.mlflow/
wandb/
.neptune/

# Jupyter
.ipynb_checkpoints/
*.ipynb

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db`}
                    language="gitignore"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Code Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <CardTitle>Code Review Best Practices</CardTitle>
                </div>
                <CardDescription>Effective code review processes for ML projects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">1. What to Review</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc"><strong>Code Quality:</strong> Readability, maintainability, and adherence to standards</li>
                    <li className="list-disc"><strong>Logic Correctness:</strong> Does the code do what it's supposed to?</li>
                    <li className="list-disc"><strong>ML-Specific:</strong> Data leakage, reproducibility, model correctness</li>
                    <li className="list-disc"><strong>Performance:</strong> Efficiency, memory usage, scalability</li>
                    <li className="list-disc"><strong>Testing:</strong> Are there adequate tests? Do they pass?</li>
                    <li className="list-disc"><strong>Documentation:</strong> Is the code well-documented?</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2. ML-Specific Review Checklist</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Are random seeds set for reproducibility?</li>
                    <li className="list-disc">Is data properly split (train/val/test) before preprocessing?</li>
                    <li className="list-disc">Are hyperparameters configurable, not hardcoded?</li>
                    <li className="list-disc">Is experiment tracking implemented?</li>
                    <li className="list-disc">Are model artifacts versioned and tracked?</li>
                    <li className="list-disc">Is there proper error handling for edge cases?</li>
                    <li className="list-disc">Are data validation checks in place?</li>
                    <li className="list-disc">Is the code tested with unit and integration tests?</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3. Review Etiquette</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Be constructive and respectful in feedback</li>
                    <li className="list-disc">Explain the reasoning behind suggestions</li>
                    <li className="list-disc">Approve when code is good, don't require perfection</li>
                    <li className="list-disc">Respond to reviews promptly and professionally</li>
                    <li className="list-disc">Use PR comments to discuss, not criticize</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">4. Automated Checks</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Set up CI/CD to automatically check:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="list-disc">Code formatting (Black, autopep8)</li>
                    <li className="list-disc">Linting (pylint, flake8, ruff)</li>
                    <li className="list-disc">Type checking (mypy, pyright)</li>
                    <li className="list-disc">Unit tests (pytest)</li>
                    <li className="list-disc">Security scanning</li>
                    <li className="list-disc">Dependency vulnerability checks</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

