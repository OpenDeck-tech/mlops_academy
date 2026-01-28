"use client";

export function LogoCarousel() {
  const companies = [
    { name: "Seldon", logo: "Seldon" },
    { name: "Google", logo: "Google" },
    { name: "Anthropic", logo: "Anthropic" },
    { name: "OpenAI", logo: "OpenAI" },
    { name: "Instagram", logo: "Instagram" },
    { name: "Meta", logo: "Meta" },
    { name: "Netflix", logo: "Netflix" },
    { name: "Amazon", logo: "Amazon" },
  ];

  // Duplicate the array for seamless loop
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <div className="w-full overflow-hidden py-8 border-t border-border/40 bg-muted/20">
      <div className="relative">
        <div className="flex animate-scroll hover:pause-animation">
          {duplicatedCompanies.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center min-w-[120px]"
            >
              <div className="text-xl md:text-2xl font-semibold text-muted-foreground/60 hover:text-muted-foreground transition-colors whitespace-nowrap">
                {company.logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

