"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Code2, Database, Lightbulb } from "lucide-react";
import { useState, useEffect } from "react";
import { CodeBlock } from "@/components/code-block";

interface LeetCodeQuestion {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  problem: string;
  solution: string;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  concepts: string[];
}

const dataStructureQuestions: LeetCodeQuestion[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: "Find two numbers that add up to a target value",
    problem: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`,
    solution: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}`,
    explanation: `This solution uses a hash map (Map) to store each number and its index as we iterate through the array. For each number, we calculate its complement (target - current number). If the complement exists in the map, we've found our pair. Otherwise, we add the current number to the map and continue.

Key concepts:
- Hash map for O(1) lookup
- Single pass through the array
- Trade space for time complexity`,
    timeComplexity: "O(n) - single pass through the array",
    spaceComplexity: "O(n) - hash map storage",
    concepts: ["Hash Map", "Array", "Two Pointers Alternative"]
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    description: "Check if parentheses are properly matched",
    problem: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Example:
Input: s = "()[]{}"
Output: true`,
    solution: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const pairs: { [key: string]: string } = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (const char of s) {
    if (char in pairs) {
      // Closing bracket
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    } else {
      // Opening bracket
      stack.push(char);
    }
  }
  
  return stack.length === 0;
}`,
    explanation: `This solution uses a stack data structure to track opening brackets. When we encounter an opening bracket, we push it onto the stack. When we encounter a closing bracket, we check if it matches the most recent opening bracket (top of stack). If the stack is empty or doesn't match, the string is invalid.

Key concepts:
- Stack (LIFO) for matching pairs
- Hash map for bracket pairs lookup
- Edge case: unmatched opening brackets`,
    timeComplexity: "O(n) - single pass through the string",
    spaceComplexity: "O(n) - stack storage in worst case",
    concepts: ["Stack", "String", "Hash Map"]
  },
  {
    id: 3,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    description: "Merge two sorted linked lists",
    problem: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

Example:
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]`,
    solution: `class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  const dummy = new ListNode(0);
  let current = dummy;
  
  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }
  
  // Append remaining nodes
  current.next = list1 !== null ? list1 : list2;
  
  return dummy.next;
}`,
    explanation: `This solution uses a dummy node to simplify edge cases and pointer manipulation. We compare nodes from both lists and link the smaller one to our result. We continue until one list is exhausted, then append the remaining nodes.

Key concepts:
- Dummy node pattern for cleaner code
- Two-pointer technique
- Linked list manipulation
- Handling edge cases (empty lists, different lengths)`,
    timeComplexity: "O(n + m) - where n and m are lengths of both lists",
    spaceComplexity: "O(1) - only using a constant amount of extra space",
    concepts: ["Linked List", "Two Pointers", "Merge Algorithm"]
  }
];

const softwareEngineeringQuestions: LeetCodeQuestion[] = [
  {
    id: 4,
    title: "Design a Stack with Min Operation",
    difficulty: "Medium",
    description: "Implement a stack that supports getMin() in O(1) time",
    problem: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the MinStack class:
- MinStack() initializes the stack object.
- void push(int val) pushes the element val onto the stack.
- void pop() removes the element on the top of the stack.
- int top() gets the top element of the stack.
- int getMin() retrieves the minimum element in the stack.

You must implement a solution with O(1) time complexity for each function.`,
    solution: `class MinStack {
  private stack: number[] = [];
  private minStack: number[] = [];
  
  push(val: number): void {
    this.stack.push(val);
    
    if (this.minStack.length === 0 || val <= this.getMin()) {
      this.minStack.push(val);
    }
  }
  
  pop(): void {
    const val = this.stack.pop();
    
    if (val === this.getMin()) {
      this.minStack.pop();
    }
  }
  
  top(): number {
    return this.stack[this.stack.length - 1];
  }
  
  getMin(): number {
    return this.minStack[this.minStack.length - 1];
  }
}`,
    explanation: `This solution uses an auxiliary stack to track minimum values. When pushing, if the new value is less than or equal to the current minimum, we also push it to the min stack. When popping, if we're removing the current minimum, we also pop from the min stack.

Key software engineering principles:
- Separation of concerns (two stacks for different purposes)
- Trade space for time complexity
- Maintain invariants (min stack always has current minimum)
- Clear API design with O(1) guarantees`,
    timeComplexity: "O(1) for all operations",
    spaceComplexity: "O(n) - auxiliary stack for minimum tracking",
    concepts: ["Stack", "Design Pattern", "Space-Time Tradeoff", "API Design"]
  },
  {
    id: 5,
    title: "LRU Cache",
    difficulty: "Medium",
    description: "Design and implement a data structure for Least Recently Used (LRU) cache",
    problem: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:
- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
- int get(int key) Return the value of the key if the key exists, otherwise return -1.
- void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.`,
    solution: `class LRUCache {
  private capacity: number;
  private cache: Map<number, number>;
  
  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  
  get(key: number): number {
    if (!this.cache.has(key)) {
      return -1;
    }
    
    // Move to end (most recently used)
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);
    
    return value;
  }
  
  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      // Update existing key
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Evict least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    // Add/update at end (most recently used)
    this.cache.set(key, value);
  }
}`,
    explanation: `This solution uses JavaScript's Map which maintains insertion order. The most recently used items are at the end, and the least recently used are at the beginning. When accessing an item, we delete and re-insert it to move it to the end.

Key software engineering principles:
- Efficient data structure selection (Map with insertion order)
- Cache eviction policy implementation
- O(1) operations for both get and put
- Clean separation of access patterns
- Real-world application: web caching, database query caching`,
    timeComplexity: "O(1) for both get and put operations",
    spaceComplexity: "O(capacity) - bounded by cache capacity",
    concepts: ["Hash Map", "Cache Design", "Eviction Policy", "System Design"]
  },
  {
    id: 6,
    title: "Implement Queue using Stacks",
    difficulty: "Easy",
    description: "Implement a queue using only stack operations",
    problem: `Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).

Implement the MyQueue class:
- void push(int x) Pushes element x to the back of the queue.
- int pop() Removes the element from the front of the queue and returns it.
- int peek() Returns the element at the front of the queue.
- boolean empty() Returns true if the queue is empty, false otherwise.`,
    solution: `class MyQueue {
  private inputStack: number[] = [];
  private outputStack: number[] = [];
  
  push(x: number): void {
    this.inputStack.push(x);
  }
  
  pop(): number {
    this.moveToOutput();
    return this.outputStack.pop()!;
  }
  
  peek(): number {
    this.moveToOutput();
    return this.outputStack[this.outputStack.length - 1];
  }
  
  empty(): boolean {
    return this.inputStack.length === 0 && this.outputStack.length === 0;
  }
  
  private moveToOutput(): void {
    if (this.outputStack.length === 0) {
      while (this.inputStack.length > 0) {
        this.outputStack.push(this.inputStack.pop()!);
      }
    }
  }
}`,
    explanation: `This solution uses two stacks: one for input and one for output. When we need to pop or peek, we transfer all elements from input to output stack (reversing the order). This allows us to simulate FIFO behavior using LIFO stacks.

Key software engineering principles:
- Abstraction: implementing one data structure using another
- Lazy evaluation: only transfer when needed
- Amortized analysis: O(1) amortized time complexity
- Clean separation of concerns (input vs output)
- Demonstrates understanding of fundamental data structures`,
    timeComplexity: "O(1) amortized - each element moved at most once",
    spaceComplexity: "O(n) - storing all elements",
    concepts: ["Stack", "Queue", "Abstraction", "Amortized Analysis"]
  }
];

export default function ProgrammingPage() {
  const [selectedQuestion, setSelectedQuestion] = useState<LeetCodeQuestion | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen container mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto max-w-7xl px-6 py-12">
      <Link href="/environments/local" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4" />
        Back to Local Environment
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <Code2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-4xl font-semibold">Programming</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          LeetCode questions and answers covering data structures and software engineering principles
        </p>
      </div>

      <Tabs defaultValue="data-structures" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="data-structures" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Data Structures
          </TabsTrigger>
          <TabsTrigger value="software-engineering" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Software Engineering
          </TabsTrigger>
        </TabsList>

        <TabsContent value="data-structures" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dataStructureQuestions.map((question) => (
              <Card
                key={question.id}
                className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
                onClick={() => setSelectedQuestion(question)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-lg">{question.title}</CardTitle>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        question.difficulty === "Easy"
                          ? "bg-green-900/40 text-green-300 dark:bg-green-900/50 dark:text-green-300"
                          : question.difficulty === "Medium"
                          ? "bg-yellow-900/40 text-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300"
                          : "bg-red-900/40 text-red-300 dark:bg-red-900/50 dark:text-red-300"
                      }`}
                    >
                      {question.difficulty}
                    </span>
                  </div>
                  <CardDescription>{question.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {question.concepts.map((concept, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 rounded"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="software-engineering" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {softwareEngineeringQuestions.map((question) => (
              <Card
                key={question.id}
                className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
                onClick={() => setSelectedQuestion(question)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-lg">{question.title}</CardTitle>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        question.difficulty === "Easy"
                          ? "bg-green-900/40 text-green-300 dark:bg-green-900/50 dark:text-green-300"
                          : question.difficulty === "Medium"
                          ? "bg-yellow-900/40 text-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300"
                          : "bg-red-900/40 text-red-300 dark:bg-red-900/50 dark:text-red-300"
                      }`}
                    >
                      {question.difficulty}
                    </span>
                  </div>
                  <CardDescription>{question.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {question.concepts.map((concept, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300 rounded"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50" onClick={() => setSelectedQuestion(null)}>
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <CardTitle className="text-2xl mb-2">{selectedQuestion.title}</CardTitle>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded ${
                        selectedQuestion.difficulty === "Easy"
                          ? "bg-green-900/40 text-green-300 dark:bg-green-900/50 dark:text-green-300"
                          : selectedQuestion.difficulty === "Medium"
                          ? "bg-yellow-900/40 text-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300"
                          : "bg-red-900/40 text-red-300 dark:bg-red-900/50 dark:text-red-300"
                      }`}
                    >
                      {selectedQuestion.difficulty}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Time: {selectedQuestion.timeComplexity}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Space: {selectedQuestion.spaceComplexity}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className="text-muted-foreground hover:text-foreground text-2xl"
                >
                  ×
                </button>
              </div>
              <CardDescription>{selectedQuestion.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Problem</h3>
                <pre className="bg-muted p-4 rounded-lg text-sm whitespace-pre-wrap overflow-x-auto">
                  {selectedQuestion.problem}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Solution</h3>
                <CodeBlock 
                  code={selectedQuestion.solution}
                  language="typescript"
                />
              </div>

              <div>
                <h3 className="font-semibold mb-2">Explanation</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{selectedQuestion.explanation}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Key Concepts</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedQuestion.concepts.map((concept, idx) => (
                    <span
                      key={idx}
                      className="text-sm px-3 py-1 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 rounded"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

