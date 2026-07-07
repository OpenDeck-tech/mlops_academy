"use client";

const quotes = [
  "loose-coupled systems are always mostly better",
  "premature optimization is the root of all evil",
  "make it work, make it right, make it fast",
  "code is read more often than it's written",
  "simplicity is the ultimate sophistication",
  "check your dashboards first when you clock in, in-between work hours, and last when you clock out",
  "debugging mode is better than guessing mode",
  "logging is better than commenting",
  "optimize without breaking things"
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
            <div key={index} className="flex items-center flex-shrink-0 mx-8 whitespace-nowrap">
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

