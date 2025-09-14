import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default async function ModelVersioningSystemPage() {
  const sess = await getSession();
  if (!sess.isPro) {
    redirect("/");
  }

  return (
    <div className="container mx-auto max-w-4xl px-6 py-16">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/pro/coding" className="text-sm text-muted-foreground hover:underline">
            ← Back to Coding Exercises
          </Link>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-semibold tracking-tight">Model Versioning System</h1>
          <Badge variant="destructive">Hard</Badge>
          <Badge variant="outline">System Design</Badge>
        </div>
        <p className="text-muted-foreground">
          Design a system to track and manage model versions. This problem tests your understanding of 
          system design, data structures, and the complexities of managing ML model lifecycles in production.
        </p>
      </div>

      <Tabs defaultValue="problem" className="space-y-6">
        <TabsList>
          <TabsTrigger value="problem">Problem</TabsTrigger>
          <TabsTrigger value="solution">Solution</TabsTrigger>
          <TabsTrigger value="explanation">MLOps Context</TabsTrigger>
        </TabsList>

        <TabsContent value="problem">
          <Card>
            <CardHeader>
              <CardTitle>Problem Statement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Background</h3>
                <p className="text-sm text-muted-foreground">
                  You need to build a model versioning system that can handle thousands of models, 
                  track their metadata, manage dependencies, and support rollbacks. This is the foundation 
                  of any serious ML platform.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Requirements</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Core Features:</h4>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    <li>Store model artifacts (files, weights, configs) with versioning</li>
                    <li>Track model metadata (training data, hyperparameters, performance metrics)</li>
                    <li>Support model lineage and dependencies</li>
                    <li>Implement tagging and labeling system</li>
                    <li>Enable model comparison and rollback</li>
                    <li>Support different model states (training, staging, production)</li>
                    <li>Handle model deletion and cleanup</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Data Models</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                  <pre className="text-sm">
{`interface Model {
  id: string;
  name: string;
  version: string;
  state: 'training' | 'staging' | 'production' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  tags: string[];
  metadata: ModelMetadata;
  artifacts: ModelArtifact[];
  dependencies: ModelDependency[];
}

interface ModelMetadata {
  algorithm: string;
  hyperparameters: Record<string, any>;
  trainingData: {
    datasetId: string;
    version: string;
    size: number;
  };
  performance: {
    accuracy?: number;
    precision?: number;
    recall?: number;
    f1Score?: number;
    customMetrics: Record<string, number>;
  };
  environment: {
    framework: string;
    version: string;
    pythonVersion: string;
    dependencies: string[];
  };
}

interface ModelArtifact {
  type: 'weights' | 'config' | 'preprocessor' | 'schema' | 'other';
  path: string;
  size: number;
  checksum: string;
  uploadedAt: Date;
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">API Requirements</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                  <pre className="text-sm">
{`// Core operations
createModel(name: string, metadata: ModelMetadata): Model
getModel(id: string): Model | null
getModelVersion(name: string, version: string): Model | null
listModels(filters?: ModelFilters): Model[]
updateModelState(id: string, state: ModelState): Model
deleteModel(id: string): boolean

// Versioning
createVersion(modelId: string, version: string, artifacts: ModelArtifact[]): Model
listVersions(modelId: string): Model[]
compareModels(modelId1: string, modelId2: string): ModelComparison
rollbackToVersion(modelId: string, version: string): Model

// Search and filtering
searchModels(query: string, filters?: ModelFilters): Model[]
getModelsByTag(tag: string): Model[]
getProductionModels(): Model[]`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="solution">
          <Card>
            <CardHeader>
              <CardTitle>Solution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                  <pre className="text-sm overflow-x-auto">
{`import { EventEmitter } from 'events';
import { createHash } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

interface Model {
  id: string;
  name: string;
  version: string;
  state: 'training' | 'staging' | 'production' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  tags: string[];
  metadata: ModelMetadata;
  artifacts: ModelArtifact[];
  dependencies: ModelDependency[];
}

interface ModelMetadata {
  algorithm: string;
  hyperparameters: Record<string, any>;
  trainingData: {
    datasetId: string;
    version: string;
    size: number;
  };
  performance: {
    accuracy?: number;
    precision?: number;
    recall?: number;
    f1Score?: number;
    customMetrics: Record<string, number>;
  };
  environment: {
    framework: string;
    version: string;
    pythonVersion: string;
    dependencies: string[];
  };
}

interface ModelArtifact {
  type: 'weights' | 'config' | 'preprocessor' | 'schema' | 'other';
  path: string;
  size: number;
  checksum: string;
  uploadedAt: Date;
}

interface ModelDependency {
  modelId: string;
  version: string;
  dependencyType: 'parent' | 'child' | 'base';
}

interface ModelFilters {
  state?: string;
  tags?: string[];
  algorithm?: string;
  createdBy?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

interface ModelComparison {
  model1: Model;
  model2: Model;
  differences: {
    metadata: string[];
    performance: string[];
    artifacts: string[];
  };
}

class ModelVersioningSystem extends EventEmitter {
  private models: Map<string, Model> = new Map();
  private modelVersions: Map<string, Map<string, Model>> = new Map();
  private storagePath: string;

  constructor(storagePath: string = './model-storage') {
    super();
    this.storagePath = storagePath;
  }

  async createModel(name: string, metadata: ModelMetadata, createdBy: string): Promise<Model> {
    const id = this.generateModelId(name);
    const model: Model = {
      id,
      name,
      version: '1.0.0',
      state: 'training',
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy,
      tags: [],
      metadata,
      artifacts: [],
      dependencies: []
    };

    this.models.set(id, model);
    this.modelVersions.set(id, new Map([[model.version, model]]));
    
    await this.persistModel(model);
    this.emit('modelCreated', model);
    
    return model;
  }

  async createVersion(
    modelId: string, 
    version: string, 
    artifacts: ModelArtifact[],
    metadata?: Partial<ModelMetadata>
  ): Promise<Model> {
    const baseModel = this.models.get(modelId);
    if (!baseModel) {
      throw new Error(\`Model \${modelId} not found\`);
    }

    // Validate version format (semantic versioning)
    if (!this.isValidVersion(version)) {
      throw new Error('Invalid version format. Use semantic versioning (e.g., 1.0.0)');
    }

    // Check if version already exists
    const versions = this.modelVersions.get(modelId);
    if (versions?.has(version)) {
      throw new Error(\`Version \${version} already exists for model \${modelId}\`);
    }

    // Create new version
    const newModel: Model = {
      ...baseModel,
      version,
      updatedAt: new Date(),
      metadata: { ...baseModel.metadata, ...metadata },
      artifacts: await this.processArtifacts(artifacts, modelId, version),
      dependencies: this.buildDependencies(baseModel, version)
    };

    this.models.set(modelId, newModel);
    versions?.set(version, newModel);
    
    await this.persistModel(newModel);
    this.emit('versionCreated', newModel);
    
    return newModel;
  }

  getModel(id: string): Model | null {
    return this.models.get(id) || null;
  }

  getModelVersion(name: string, version: string): Model | null {
    const model = this.findModelByName(name);
    if (!model) return null;
    
    const versions = this.modelVersions.get(model.id);
    return versions?.get(version) || null;
  }

  listModels(filters?: ModelFilters): Model[] {
    let models = Array.from(this.models.values());

    if (filters) {
      models = models.filter(model => {
        if (filters.state && model.state !== filters.state) return false;
        if (filters.tags && !filters.tags.every(tag => model.tags.includes(tag))) return false;
        if (filters.algorithm && model.metadata.algorithm !== filters.algorithm) return false;
        if (filters.createdBy && model.createdBy !== filters.createdBy) return false;
        if (filters.dateRange) {
          const modelDate = model.createdAt;
          if (modelDate < filters.dateRange.start || modelDate > filters.dateRange.end) return false;
        }
        return true;
      });
    }

    return models.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  async updateModelState(id: string, state: Model['state']): Promise<Model> {
    const model = this.models.get(id);
    if (!model) {
      throw new Error(\`Model \${id} not found\`);
    }

    const previousState = model.state;
    model.state = state;
    model.updatedAt = new Date();

    await this.persistModel(model);
    this.emit('stateChanged', { model, previousState, newState: state });
    
    return model;
  }

  async rollbackToVersion(modelId: string, version: string): Promise<Model> {
    const versions = this.modelVersions.get(modelId);
    if (!versions) {
      throw new Error(\`Model \${modelId} not found\`);
    }

    const targetModel = versions.get(version);
    if (!targetModel) {
      throw new Error(\`Version \${version} not found for model \${modelId}\`);
    }

    // Create a new version based on the target
    const rollbackModel = {
      ...targetModel,
      version: this.generateNextVersion(targetModel.version),
      updatedAt: new Date(),
      state: 'staging' as const
    };

    this.models.set(modelId, rollbackModel);
    versions.set(rollbackModel.version, rollbackModel);
    
    await this.persistModel(rollbackModel);
    this.emit('rollbackPerformed', { originalModel: targetModel, rollbackModel });
    
    return rollbackModel;
  }

  compareModels(modelId1: string, modelId2: string): ModelComparison {
    const model1 = this.models.get(modelId1);
    const model2 = this.models.get(modelId2);

    if (!model1 || !model2) {
      throw new Error('One or both models not found');
    }

    return {
      model1,
      model2,
      differences: {
        metadata: this.compareMetadata(model1.metadata, model2.metadata),
        performance: this.comparePerformance(model1.metadata.performance, model2.metadata.performance),
        artifacts: this.compareArtifacts(model1.artifacts, model2.artifacts)
      }
    };
  }

  searchModels(query: string, filters?: ModelFilters): Model[] {
    const models = this.listModels(filters);
    const searchTerm = query.toLowerCase();

    return models.filter(model => 
      model.name.toLowerCase().includes(searchTerm) ||
      model.metadata.algorithm.toLowerCase().includes(searchTerm) ||
      model.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      model.createdBy.toLowerCase().includes(searchTerm)
    );
  }

  getModelsByTag(tag: string): Model[] {
    return this.listModels().filter(model => model.tags.includes(tag));
  }

  getProductionModels(): Model[] {
    return this.listModels({ state: 'production' });
  }

  // Private helper methods
  private generateModelId(name: string): string {
    const timestamp = Date.now();
    const hash = createHash('md5').update(name + timestamp).digest('hex').substring(0, 8);
    return \`\${name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-\${hash}\`;
  }

  private isValidVersion(version: string): boolean {
    const semverRegex = /^\\d+\\.\\d+\\.\\d+$/;
    return semverRegex.test(version);
  }

  private generateNextVersion(currentVersion: string): string {
    const [major, minor, patch] = currentVersion.split('.').map(Number);
    return \`\${major}.\${minor}.\${patch + 1}\`;
  }

  private async processArtifacts(
    artifacts: ModelArtifact[], 
    modelId: string, 
    version: string
  ): Promise<ModelArtifact[]> {
    const processedArtifacts: ModelArtifact[] = [];

    for (const artifact of artifacts) {
      const artifactPath = path.join(this.storagePath, modelId, version, artifact.type);
      await fs.mkdir(artifactPath, { recursive: true });

      const finalPath = path.join(artifactPath, path.basename(artifact.path));
      await fs.copyFile(artifact.path, finalPath);

      const stats = await fs.stat(finalPath);
      const checksum = await this.calculateChecksum(finalPath);

      processedArtifacts.push({
        ...artifact,
        path: finalPath,
        size: stats.size,
        checksum,
        uploadedAt: new Date()
      });
    }

    return processedArtifacts;
  }

  private async calculateChecksum(filePath: string): Promise<string> {
    const data = await fs.readFile(filePath);
    return createHash('sha256').update(data).digest('hex');
  }

  private buildDependencies(baseModel: Model, version: string): ModelDependency[] {
    // In a real system, this would analyze the model to determine dependencies
    // For now, we'll just copy existing dependencies
    return baseModel.dependencies.map(dep => ({
      ...dep,
      // Update version references as needed
    }));
  }

  private findModelByName(name: string): Model | null {
    for (const model of this.models.values()) {
      if (model.name === name) return model;
    }
    return null;
  }

  private compareMetadata(meta1: ModelMetadata, meta2: ModelMetadata): string[] {
    const differences: string[] = [];
    
    if (meta1.algorithm !== meta2.algorithm) {
      differences.push(\`Algorithm: \${meta1.algorithm} vs \${meta2.algorithm}\`);
    }
    
    // Compare hyperparameters
    const keys1 = Object.keys(meta1.hyperparameters);
    const keys2 = Object.keys(meta2.hyperparameters);
    const allKeys = new Set([...keys1, ...keys2]);
    
    for (const key of allKeys) {
      if (meta1.hyperparameters[key] !== meta2.hyperparameters[key]) {
        differences.push(\`Hyperparameter \${key}: \${meta1.hyperparameters[key]} vs \${meta2.hyperparameters[key]}\`);
      }
    }
    
    return differences;
  }

  private comparePerformance(perf1: ModelMetadata['performance'], perf2: ModelMetadata['performance']): string[] {
    const differences: string[] = [];
    
    const metrics = ['accuracy', 'precision', 'recall', 'f1Score'];
    for (const metric of metrics) {
      const val1 = perf1[metric as keyof typeof perf1];
      const val2 = perf2[metric as keyof typeof perf2];
      if (val1 !== undefined && val2 !== undefined && val1 !== val2) {
        differences.push(\`\${metric}: \${val1} vs \${val2}\`);
      }
    }
    
    return differences;
  }

  private compareArtifacts(artifacts1: ModelArtifact[], artifacts2: ModelArtifact[]): string[] {
    const differences: string[] = [];
    
    const types1 = new Set(artifacts1.map(a => a.type));
    const types2 = new Set(artifacts2.map(a => a.type));
    
    for (const type of types1) {
      if (!types2.has(type)) {
        differences.push(\`Missing artifact type: \${type}\`);
      }
    }
    
    for (const type of types2) {
      if (!types1.has(type)) {
        differences.push(\`Extra artifact type: \${type}\`);
      }
    }
    
    return differences;
  }

  private async persistModel(model: Model): Promise<void> {
    const modelPath = path.join(this.storagePath, model.id, 'metadata.json');
    await fs.mkdir(path.dirname(modelPath), { recursive: true });
    await fs.writeFile(modelPath, JSON.stringify(model, null, 2));
  }
}

// Usage example
async function main() {
  const modelRegistry = new ModelVersioningSystem('./model-storage');
  
  // Add event listeners
  modelRegistry.on('modelCreated', (model) => {
    console.log(\`Model created: \${model.name} v\${model.version}\`);
  });
  
  modelRegistry.on('versionCreated', (model) => {
    console.log(\`New version: \${model.name} v\${model.version}\`);
  });

  // Create a model
  const model = await modelRegistry.createModel('sentiment-classifier', {
    algorithm: 'BERT',
    hyperparameters: { learningRate: 0.001, batchSize: 32 },
    trainingData: { datasetId: 'sentiment-v1', version: '1.0', size: 10000 },
    performance: { accuracy: 0.95, f1Score: 0.94 },
    environment: {
      framework: 'transformers',
      version: '4.21.0',
      pythonVersion: '3.9',
      dependencies: ['torch', 'numpy']
    }
  }, 'ml-engineer@company.com');

  // Create a new version
  const newVersion = await modelRegistry.createVersion(
    model.id,
    '1.1.0',
    [
      {
        type: 'weights',
        path: './model-weights.bin',
        size: 0,
        checksum: '',
        uploadedAt: new Date()
      }
    ],
    {
      performance: { accuracy: 0.96, f1Score: 0.95 }
    }
  );

  // Promote to production
  await modelRegistry.updateModelState(model.id, 'production');
  
  // Search models
  const results = modelRegistry.searchModels('sentiment');
  console.log('Search results:', results);
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="explanation">
          <Card>
            <CardHeader>
              <CardTitle>MLOps Context & Key Concepts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 text-green-700 dark:text-green-400">Why Model Versioning is Critical</h3>
                <div className="space-y-3">
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Reproducibility</h4>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      In production ML, you need to be able to reproduce any model that's currently serving traffic. 
                      This includes not just the model weights, but the exact training data, hyperparameters, 
                      and environment that created it.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Compliance & Auditing</h4>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Many industries require detailed audit trails of model decisions. Versioning enables you to 
                      track which model made which prediction, when it was trained, and what data it used.
                    </p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-md">
                    <h4 className="font-medium mb-2">A/B Testing & Rollbacks</h4>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      You need to quickly switch between model versions for testing or rollback if a new model 
                      performs poorly in production.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-400">Key Design Patterns</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Immutable Versioning</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Once a model version is created, it should never be modified. This ensures reproducibility 
                      and prevents accidental changes to production models.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md">
                      <p className="text-xs text-blue-800 dark:text-blue-200">
                        <strong>MLOps Insight:</strong> This is similar to Git's approach - you create new commits 
                        rather than modifying existing ones.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Metadata Tracking</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Store comprehensive metadata about each model version. This includes training data lineage, 
                      hyperparameters, performance metrics, and environment details.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md">
                      <p className="text-xs text-blue-800 dark:text-blue-800">
                        <strong>MLOps Insight:</strong> In production, you'll often need to debug why a model 
                        is performing poorly. Rich metadata makes this much easier.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">State Management</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Models go through different states (training → staging → production → archived). 
                      Track these states and enforce proper transitions.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md">
                      <p className="text-xs text-blue-800 dark:text-blue-200">
                        <strong>MLOps Insight:</strong> State management prevents accidentally promoting 
                        untested models to production or deleting models that are still in use.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-purple-700 dark:text-purple-400">Real-World Considerations</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                    <p className="text-sm text-muted-foreground">
                      <strong>Storage Optimization:</strong> Model artifacts can be huge (GBs). Consider compression, 
                      deduplication, and tiered storage.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                    <p className="text-sm text-muted-foreground">
                      <strong>Access Control:</strong> Different teams need different permissions (read, write, promote, delete).
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                    <p className="text-sm text-muted-foreground">
                      <strong>Integration:</strong> Connect with CI/CD pipelines, monitoring systems, and serving infrastructure.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                    <p className="text-sm text-muted-foreground">
                      <strong>Performance:</strong> Fast model retrieval is critical for serving and experimentation.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-orange-700 dark:text-orange-400">Production Tools</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  In production, you'll likely use existing tools rather than building from scratch:
                </p>
                <ul className="text-sm space-y-1 list-disc pl-5 text-muted-foreground">
                  <li><strong>MLflow:</strong> Open-source platform for managing ML lifecycle</li>
                  <li><strong>Weights & Biases:</strong> Experiment tracking and model management</li>
                  <li><strong>Neptune:</strong> MLOps platform with model registry</li>
                  <li><strong>DVC:</strong> Data version control for ML projects</li>
                  <li><strong>Custom Solutions:</strong> Built on cloud storage (S3, GCS) with metadata databases</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
