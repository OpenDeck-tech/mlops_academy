"use client";

import { Quote } from "lucide-react";

const quotes = [
  "Loose coupled systems are always mostly better",
  "Premature optimization is the root of all evil",
  "Make it work, make it right, make it fast",
  "Code is read more often than it's written",
  "Simplicity is the ultimate sophistication",
  "Check your dashboards first, in-between, and last",
];

// Duplicate quotes for seamless loop
const duplicatedQuotes = [...quotes, ...quotes];

export function ScrollingQuotes() {
  return (
    <div className="relative h-40 overflow-hidden rounded-lg border bg-card/50 backdrop-blur-sm">
      {/* Gradient masks for fade effect */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling container */}
      <div className="animate-scroll-up h-full">
        <div className="flex flex-col gap-8 p-6">
          {duplicatedQuotes.map((quote, index) => (
            <div key={index} className="flex items-start gap-3 w-full max-w-2xl mx-auto">
              <Quote className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
              <p className="text-base font-medium text-foreground leading-relaxed">
                {quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

