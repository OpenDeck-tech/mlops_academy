"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Code2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "bash", className = "" }: CodeBlockProps) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const effectiveTheme = theme === "system" ? systemTheme : theme;
    setCurrentTheme(effectiveTheme === "dark" ? "dark" : "light");
  }, [theme, systemTheme, mounted]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleOpenInVSCode = async () => {
    try {
      // Create a temporary file and download it
      const blob = new Blob([code], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      
      // Determine file extension based on language
      const extensions: Record<string, string> = {
        python: "py",
        javascript: "js",
        typescript: "ts",
        bash: "sh",
        shell: "sh",
        dockerfile: "Dockerfile",
        yaml: "yml",
        json: "json",
        gitignore: "gitignore",
        text: "txt",
      };
      
      const ext = extensions[language.toLowerCase()] || "txt";
      const filename = `code.${ext}`;
      
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Try to open in VS Code using vscode:// protocol
      // This will only work if VS Code is installed and configured
      setTimeout(() => {
        const filePath = encodeURIComponent(filename);
        window.location.href = `vscode://file/${filePath}`;
      }, 100);
    } catch (err) {
      console.error("Failed to open in VS Code:", err);
      // Fallback: just copy to clipboard with a message
      await handleCopy();
      alert("Code copied to clipboard. You can paste it into VS Code manually.");
    }
  };

  const handleOpenInClaude = async () => {
    try {
      // Copy code to clipboard first
      await navigator.clipboard.writeText(code);
      
      // Open Claude in a new tab
      // Note: Claude doesn't have a direct URL parameter for code,
      // so we'll open it and the user can paste
      window.open("https://claude.ai", "_blank");
      
      // Show a notification that code is in clipboard
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to open in Claude:", err);
    }
  };

  if (!mounted) {
    return (
      <pre className={`bg-muted p-4 rounded-lg text-xs overflow-x-auto ${className}`}>
        <code>{code}</code>
      </pre>
    );
  }

  const style = currentTheme === "dark" ? vscDarkPlus : oneLight;

  return (
    <div className={cn("rounded-lg overflow-hidden relative group", className)}>
      {/* Action buttons toolbar */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 px-2 bg-background/80 backdrop-blur-sm border"
          title={copied ? "Copied!" : "Copy to clipboard"}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleOpenInVSCode}
          className="h-7 px-2 bg-background/80 backdrop-blur-sm border"
          title="Open in VS Code"
        >
          <Code2 className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleOpenInClaude}
          className="h-7 px-2 bg-background/80 backdrop-blur-sm border"
          title="Open in Claude (code copied to clipboard)"
        >
          <Sparkles className="h-3.5 w-3.5" />
        </Button>
      </div>
      
      <SyntaxHighlighter
        language={language}
        style={style}
        customStyle={{
          margin: 0,
          padding: "1rem",
          fontSize: "0.75rem",
          lineHeight: "1.5",
          borderRadius: "0.5rem",
        }}
        showLineNumbers={false}
        wrapLines={true}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

