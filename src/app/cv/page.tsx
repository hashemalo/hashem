const experience = [
  {
    role: "Research Assistant",
    org: "University of Maryland — Furong Lab",
    period: "August 2026 – Present",
    note: "Finding more efficient model steering methods",
  },
  {
    role: "Software Engineering Intern",
    org: "Stripe",
    period: "May 2026 – August 2026",
    note: "Core Infra: Change Data Capture",
  },
  {
    role: "Founder",
    org: "Project LIFT",
    period: "August 2025 – Present",
    note: "Saving thousands for small business owners",
  },
  {
    role: "Research Assistant — Quantum Machine Learning",
    org: "University of Maryland",
    period: "January 2025 – May 2026",
    note: "Quantum LSTMs under Dr. Shabnam Jabeen",
  },
  {
    role: "Co-founder",
    org: "GeneticFit Labs",
    period: "September 2024 – March 2025",
    note: "Raised a $150K seed round at a $3M valuation before deferring funding, as the genetic research wasn't producing amicable results.",
  },
];

export default function CV() {
  return (
    <main className="max-w-2xl mx-auto px-6 pb-24">
      <ul className="divide-y divide-neutral-200">
        {experience.map((item) => (
          <li
            key={item.role + item.org}
            className="py-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"
          >
            <div>
              <p className="text-neutral-900 font-medium">{item.org}</p>
              <p className="text-sm text-neutral-500">{item.role}</p>
              <p className="text-xs text-neutral-400 mt-0.5">{item.note}</p>
            </div>
            <p className="text-sm text-neutral-400 whitespace-nowrap">
              {item.period}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
