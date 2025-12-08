"use client";

import { Quote } from "lucide-react";

const quotes = [
  "Loose-coupled systems are always mostly better",
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
    <footer className="w-full overflow-hidden border-t bg-background/50 backdrop-blur-sm">
      <div className="relative py-4">
        {/* Gradient masks for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling container */}
        <div className="flex animate-scroll hover:pause-animation">
          {duplicatedQuotes.map((quote, index) => (
            <div key={index} className="flex items-center gap-3 flex-shrink-0 mx-8 whitespace-nowrap">
              <Quote className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <p className="text-sm font-medium text-foreground">
                {quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

