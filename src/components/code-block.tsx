"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "bash", className = "" }: CodeBlockProps) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const effectiveTheme = theme === "system" ? systemTheme : theme;
    setCurrentTheme(effectiveTheme === "dark" ? "dark" : "light");
  }, [theme, systemTheme, mounted]);

  if (!mounted) {
    return (
      <pre className={`bg-muted p-4 rounded-lg text-xs overflow-x-auto ${className}`}>
        <code>{code}</code>
      </pre>
    );
  }

  const style = currentTheme === "dark" ? vscDarkPlus : oneLight;

  return (
    <div className={`rounded-lg overflow-hidden ${className}`}>
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

