"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({
  text,
  className,
  showOpenInTerminal = false,
}: {
  text: string;
  className?: string;
  /** Show an "Open in terminal" button that copies and prompts to paste in terminal */
  showOpenInTerminal?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [terminalCopied, setTerminalCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  async function handleOpenInTerminal() {
    try {
      await navigator.clipboard.writeText(text);
      setTerminalCopied(true);
      setTimeout(() => setTerminalCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  if (showOpenInTerminal) {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 w-8 p-0"
          title={copied ? "Copied!" : "Copy to clipboard"}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleOpenInTerminal}
          className="h-8 w-8 p-0"
          title={
            terminalCopied
              ? "Copied — paste in your terminal (⌘V / Ctrl+V)"
              : "Copy and run in terminal (paste in your terminal after clicking)"
          }
        >
          {terminalCopied ? (
            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
          ) : (
            <Terminal className="h-4 w-4" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className={cn("h-8 w-8 p-0", className)}
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
}

