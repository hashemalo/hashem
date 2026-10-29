export default function About() {
  return (
    <main className="max-w-2xl mx-auto px-6 pb-24">
      <section className="space-y-4 text-neutral-700 leading-relaxed">
        <p>
          I&apos;m an undergraduate studying Computer Science and Mathematics
          at the University of Maryland, College Park. I am currently doing
          research exploring how monitorable Chain of Thought is under
          fine-tuning pressure. I am generally interested in AI safety, and
          more specifically how we can find more robust model monitors that
          survive RL pressure.
        </p>
        <p>
          Previously, I interned at Stripe as a software engineering intern
          on their Change Data Capture team within Core Infra. I am also the
          co-founder of Project LIFT, an organisation at UMD that helps small
          businesses save $100K+ yearly. I used to do research under Dr.
          Shabnam Jabeen working on QLSTMs, and I was also a part of the
          founding team of GeneticFit Labs, a genetically enhanced training
          startup that raised a $150K seed round valued at $3M.
        </p>
        <p>
          In my freetime, I like to rock climb, go on hikes, read{" "}
          <a
            href="https://www.lesswrong.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-900/80 underline decoration-amber-900/30 underline-offset-2 hover:decoration-amber-900/70 transition-colors"
          >
            blog posts
          </a>
          , and try new food!
        </p>
      </section>
    </main>
  );
}
