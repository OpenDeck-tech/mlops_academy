import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default async function DataPipelineOptimizationPage() {
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
          <h1 className="text-3xl font-semibold tracking-tight">Data Pipeline Optimization</h1>
          <Badge variant="secondary">Medium</Badge>
          <Badge variant="outline">Data Processing</Badge>
        </div>
        <p className="text-muted-foreground">
          Optimize a data processing pipeline for maximum throughput. This problem tests your understanding of 
          concurrent processing, memory management, and system optimization - all critical skills for MLOps engineers.
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
                  You&apos;re working on a data pipeline that processes large datasets for machine learning training. 
                  The pipeline reads data from multiple sources, applies transformations, and writes to a destination. 
                  Currently, it&apos;s processing data sequentially, which is too slow for your production requirements.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Task</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Implement a concurrent data processing pipeline that can handle multiple data sources simultaneously 
                  while respecting memory constraints and maintaining data integrity.
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Requirements:</h4>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    <li>Process multiple data sources concurrently (max 5 workers)</li>
                    <li>Each worker should process data in chunks to manage memory</li>
                    <li>Implement proper error handling and retry logic</li>
                    <li>Ensure data ordering is maintained for each source</li>
                    <li>Add progress tracking and logging</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Input Format</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                  <pre className="text-sm">
{`interface DataSource {
  id: string;
  url: string;
  chunkSize: number;
  totalRecords: number;
}

interface ProcessedChunk {
  sourceId: string;
  chunkIndex: number;
  data: any[];
  processedAt: Date;
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Expected Output</h3>
                <p className="text-sm text-muted-foreground">
                  A function that processes all data sources concurrently and returns a summary of the processing results, 
                  including total records processed, processing time, and any errors encountered.
                </p>
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
{`import { EventEmitter } from &apos;events&apos;;

interface DataSource {
  id: string;
  url: string;
  chunkSize: number;
  totalRecords: number;
}

interface ProcessedChunk {
  sourceId: string;
  chunkIndex: number;
  data: any[];
  processedAt: Date;
}

interface ProcessingResult {
  sourceId: string;
  totalProcessed: number;
  processingTime: number;
  errors: string[];
}

class DataPipelineProcessor extends EventEmitter {
  private maxWorkers: number;
  private activeWorkers: number = 0;
  private results: ProcessingResult[] = [];

  constructor(maxWorkers: number = 5) {
    super();
    this.maxWorkers = maxWorkers;
  }

  async processDataSources(sources: DataSource[]): Promise<ProcessingResult[]> {
    const queue = [...sources];
    const promises: Promise<void>[] = [];

    while (queue.length > 0 || this.activeWorkers > 0) {
      // Start new workers if we have capacity and work
      while (this.activeWorkers < this.maxWorkers && queue.length > 0) {
        const source = queue.shift()!;
        this.activeWorkers++;
        
        const workerPromise = this.processDataSource(source)
          .finally(() => {
            this.activeWorkers--;
            this.emit(&apos;workerComplete&apos;);
          });
        
        promises.push(workerPromise);
      }

      // Wait for at least one worker to complete
      if (this.activeWorkers >= this.maxWorkers) {
        await new Promise(resolve => this.once(&apos;workerComplete&apos;, resolve));
      }
    }

    await Promise.all(promises);
    return this.results;
  }

  private async processDataSource(source: DataSource): Promise<void> {
    const startTime = Date.now();
    const errors: string[] = [];
    let totalProcessed = 0;

    try {
      const totalChunks = Math.ceil(source.totalRecords / source.chunkSize);
      
      for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        try {
          const chunk = await this.fetchChunk(source, chunkIndex);
          const processedChunk = await this.processChunk(chunk, source.id, chunkIndex);
          totalProcessed += processedChunk.data.length;
          
          this.emit(&apos;chunkProcessed&apos;, {
            sourceId: source.id,
            chunkIndex,
            progress: ((chunkIndex + 1) / totalChunks) * 100
          });
          
        } catch (error) {
          const errorMsg = \`Chunk \${chunkIndex} failed: \${error}\`;
          errors.push(errorMsg);
          console.error(\`[Source \${source.id}] \${errorMsg}\`);
          
          // Implement retry logic
          if (errors.length <= 3) {
            await this.delay(1000 * errors.length); // Exponential backoff
            chunkIndex--; // Retry this chunk
          }
        }
      }
    } catch (error) {
      errors.push(\`Source processing failed: \${error}\`);
    }

    const processingTime = Date.now() - startTime;
    this.results.push({
      sourceId: source.id,
      totalProcessed,
      processingTime,
      errors
    });
  }

  private async fetchChunk(source: DataSource, chunkIndex: number): Promise<any[]> {
    // Simulate API call with chunking
    const offset = chunkIndex * source.chunkSize;
    const limit = Math.min(source.chunkSize, source.totalRecords - offset);
    
    // In real implementation, this would be an actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Array.from({ length: limit }, (_, i) => ({
          id: offset + i,
          data: \`record_\${offset + i}\`
        })));
      }, Math.random() * 100); // Simulate network latency
    });
  }

  private async processChunk(chunk: any[], sourceId: string, chunkIndex: number): Promise<ProcessedChunk> {
    // Simulate data transformation
    await this.delay(50);
    
    return {
      sourceId,
      chunkIndex,
      data: chunk.map(record => ({
        ...record,
        processed: true,
        timestamp: new Date()
      })),
      processedAt: new Date()
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Usage example
async function main() {
  const processor = new DataPipelineProcessor(5);
  
  // Add progress tracking
  processor.on(&apos;chunkProcessed&apos;, (data) => {
    console.log(\`[Progress] Source \${data.sourceId}: \${data.progress.toFixed(1)}%\`);
  });

  const sources: DataSource[] = [
    { id: &apos;source1&apos;, url: &apos;api/source1&apos;, chunkSize: 1000, totalRecords: 5000 },
    { id: &apos;source2&apos;, url: &apos;api/source2&apos;, chunkSize: 500, totalRecords: 3000 },
    { id: &apos;source3&apos;, url: &apos;api/source3&apos;, chunkSize: 2000, totalRecords: 8000 }
  ];

  const results = await processor.processDataSources(sources);
  console.log(&apos;Processing complete:&apos;, results);
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
                <h3 className="font-semibold mb-3 text-green-700 dark:text-green-400">Why This Matters in MLOps</h3>
                <div className="space-y-3">
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Feature Engineering Pipelines</h4>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      In production ML systems, you often need to process massive datasets for feature engineering. 
                      Sequential processing would take hours or days, making real-time or near-real-time feature 
                      computation impossible.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Model Training Data Preparation</h4>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Before training models, data needs to be cleaned, transformed, and validated. Concurrent 
                      processing reduces the time from raw data to training-ready datasets, enabling faster 
                      experimentation cycles.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-400">Key Programming Concepts</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Concurrency vs Parallelism</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      This solution uses concurrency (managing multiple tasks) rather than true parallelism. 
                      In Node.js, this is often more appropriate than spawning multiple processes.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md">
                      <p className="text-xs text-blue-800 dark:text-blue-200">
                        <strong>MLOps Insight:</strong> Many ML frameworks (like TensorFlow, PyTorch) handle 
                        parallelism internally. Your job is to orchestrate the data flow efficiently.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Memory Management</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Processing data in chunks prevents memory overflow when dealing with large datasets. 
                      This is crucial when working with datasets that don&apos;t fit in memory.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md">
                      <p className="text-xs text-blue-800 dark:text-blue-200">
                        <strong>MLOps Insight:</strong> In production, you might be processing terabytes of data. 
                        Chunking is not optional - it&apos;s essential for system stability.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Error Handling & Resilience</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      The retry logic with exponential backoff ensures temporary failures don&apos;t crash the entire pipeline. 
                      This is critical for production systems that run continuously.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md">
                      <p className="text-xs text-blue-800 dark:text-blue-200">
                        <strong>MLOps Insight:</strong> Data pipelines in production must be fault-tolerant. 
                        A single bad record or network hiccup shouldn&apos;t stop your entire ML pipeline.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-purple-700 dark:text-purple-400">Real-World Applications</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                    <p className="text-sm text-muted-foreground">
                      <strong>Batch Processing:</strong> Nightly ETL jobs that prepare data for model training
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                    <p className="text-sm text-muted-foreground">
                      <strong>Feature Store Updates:</strong> Concurrently updating features from multiple data sources
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                    <p className="text-sm text-muted-foreground">
                      <strong>Model Validation:</strong> Processing validation datasets across multiple model versions
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                    <p className="text-sm text-muted-foreground">
                      <strong>Data Quality Checks:</strong> Concurrently validating data quality across different sources
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-orange-700 dark:text-orange-400">Next Steps</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Once you understand this pattern, you can apply it to more complex scenarios:
                </p>
                <ul className="text-sm space-y-1 list-disc pl-5 text-muted-foreground">
                  <li>Implement backpressure to handle slow downstream systems</li>
                  <li>Add circuit breakers for external API calls</li>
                  <li>Implement checkpointing for long-running pipelines</li>
                  <li>Add monitoring and alerting for pipeline health</li>
                  <li>Consider using message queues (Kafka, RabbitMQ) for even larger scale</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
