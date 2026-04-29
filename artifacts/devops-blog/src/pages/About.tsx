import { Layout } from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="px-6 sm:px-10 lg:px-16 py-16 max-w-4xl mx-auto min-h-[70vh]">
        <header className="mb-16">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-primary mb-8 border-b-[4px] border-border pb-8">
            MANIFESTO
          </h1>
          <p className="text-2xl font-serif text-muted-foreground italic leading-relaxed">
            Most tech blogs are written by marketers trying to sell you a SaaS product. SIGNAL is written by engineers trying to keep systems alive.
          </p>
        </header>

        <div className="prose prose-invert prose-xl prose-p:font-serif prose-p:leading-relaxed prose-p:text-gray-300 prose-headings:font-sans prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight">
          <p>
            We started SIGNAL because we were tired of reading sanitized case studies about "seamless migrations" and "zero-downtime deployments." Reality is messy. Production is hostile. Databases fall over, DNS is always the problem, and humans make mistakes at 3 AM.
          </p>
          
          <h2>Our Core Beliefs</h2>
          
          <ul className="not-prose space-y-6 my-10">
            <li className="flex gap-4">
              <div className="font-mono font-bold text-primary text-xl">01</div>
              <div>
                <h3 className="font-black uppercase text-xl mb-1">Toil is systemic failure.</h3>
                <p className="font-serif text-muted-foreground">If a human has to do the same task twice, the system is incomplete. Automation isn't a luxury; it's a requirement for scale.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="font-mono font-bold text-primary text-xl">02</div>
              <div>
                <h3 className="font-black uppercase text-xl mb-1">Metrics without context are noise.</h3>
                <p className="font-serif text-muted-foreground">Stop alerting on CPU spikes. Alert on user pain. Observability is about understanding the system, not hoarding data.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="font-mono font-bold text-primary text-xl">03</div>
              <div>
                <h3 className="font-black uppercase text-xl mb-1">Postmortems must be blameless.</h3>
                <p className="font-serif text-muted-foreground">If you fire the engineer who brought down production, you just fired your most expensive training investment.</p>
              </div>
            </li>
          </ul>

          <p>
            SIGNAL serves as an archive of these truths. We publish technical deep dives, postmortems, and architectural philosophy for the people who actually carry the pager.
          </p>
        </div>
        
        <div className="mt-20 pt-10 border-t-[3px] border-border">
          <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-primary mb-6">Masthead</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-sans">
            <div>
              <div className="font-bold text-lg text-foreground">Editor in Chief</div>
              <div className="text-muted-foreground font-serif italic">Maya Okonkwo</div>
            </div>
            <div>
              <div className="font-bold text-lg text-foreground">Technical Director</div>
              <div className="text-muted-foreground font-serif italic">David Chen</div>
            </div>
            <div>
              <div className="font-bold text-lg text-foreground">Senior Editor, Operations</div>
              <div className="text-muted-foreground font-serif italic">Sarah Jenkins</div>
            </div>
            <div>
              <div className="font-bold text-lg text-foreground">Contributing Architect</div>
              <div className="text-muted-foreground font-serif italic">Omar Tariq</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
