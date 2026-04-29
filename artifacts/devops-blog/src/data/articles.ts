export type ContentBlock = 
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'code'; language: string; code: string }
  | { type: 'pullquote'; text: string };

export type Category = 'SRE' | 'DevOps' | 'Platform' | 'Observability' | 'Incidents' | 'Culture';

export interface Author {
  name: string;
  role: string;
  bio: string;
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  author: Author;
  readTime: string;
  category: Category;
  publishedAt: string;
  tags: string[];
  coverImage?: string;
  body: ContentBlock[];
}

const AUTHORS: Record<string, Author> = {
  maya: {
    name: "Maya Okonkwo",
    role: "Staff SRE",
    bio: "Maya builds resilient distributed systems and has a complicated relationship with Kubernetes."
  },
  chen: {
    name: "David Chen",
    role: "Platform Lead",
    bio: "David focuses on developer experience and making the right path the easy path."
  },
  sarah: {
    name: "Sarah Jenkins",
    role: "Principal Engineer",
    bio: "Sarah has been on call since 2012 and writes about incident response and human factors."
  },
  omar: {
    name: "Omar Tariq",
    role: "DevOps Architect",
    bio: "Omar specializes in CI/CD pipelines, automation, and reducing operational toil."
  }
};

export const ARTICLES: Article[] = [
  {
    slug: "why-your-on-call-rotation-is-burning-out-your-best-engineers",
    title: "Why Your On-Call Rotation Is Burning Out Your Best Engineers",
    subtitle: "It's not the pagers. It's the fact that you're alerting on things that aren't broken.",
    author: AUTHORS.sarah,
    readTime: "8 min read",
    category: "Culture",
    publishedAt: "2023-10-15T08:00:00Z",
    tags: ["ON-CALL", "BURNOUT", "OPERATIONS", "HUMAN-FACTORS"],
    coverImage: "/images/cover-1.png",
    body: [
      { type: "paragraph", text: "You've seen it happen. Your most capable engineer, the one who can untangle the hairiest database locks and debug network partitions in their sleep, quietly hands in their notice. During the exit interview, they mention \"seeking new challenges.\" The reality is much simpler: they were tired of waking up at 3 AM." },
      { type: "heading", text: "The Symptom-Based Alerting Trap" },
      { type: "paragraph", text: "Most organizations configure their alerting backwards. They alert on CPU spikes, memory usage, and minor network blips. These are symptoms, not diseases. If CPU is at 99% but every user request is succeeding within SLA, why are you waking a human being up?" },
      { type: "pullquote", text: "If the user isn't noticing the pain, neither should your pager." },
      { type: "paragraph", text: "We need to shift from symptom-based alerting to symptom-based metrics, but impact-based alerting. Let the metrics dashboard show the CPU spike, but only trigger the pager if the error rate breaches the acceptable threshold." },
      { type: "code", language: "yaml", code: "groups:\n- name: symptom_vs_impact\n  rules:\n  - alert: HighCPUUsage\n    expr: node_cpu_seconds_total > 90\n    labels:\n      severity: warning # Not a page\n\n  - alert: HighErrorRate\n    expr: job:request_error_rate5m > 0.05\n    labels:\n      severity: critical # Page the on-call" },
      { type: "paragraph", text: "Until we start treating engineers' sleep as a finite, rapidly depleting resource, we will continue to lose our best people to organizations that do." }
    ]
  },
  {
    slug: "slos-are-not-goals-stop-treating-them-like-quarterly-okrs",
    title: "SLOs Are Not Goals: Stop Treating Them Like Quarterly OKRs",
    subtitle: "Service Level Objectives are boundaries, not targets to hit. Aiming for 100% is mathematically dangerous.",
    author: AUTHORS.maya,
    readTime: "11 min read",
    category: "SRE",
    publishedAt: "2023-11-02T10:00:00Z",
    tags: ["SLO", "SLA", "ERROR-BUDGETS", "METRICS"],
    coverImage: "/images/cover-2.png",
    body: [
      { type: "paragraph", text: "There is a fundamental misunderstanding permeating engineering management right now. They look at a 99.9% SLO and think, \"Great, but let's try to hit 100% this quarter.\" This is a profound failure to understand what an SLO is designed to do." },
      { type: "heading", text: "The Danger of Over-Reliability" },
      { type: "paragraph", text: "When you consistently exceed your SLO, your users build a dependency on that unstated reliability. If your SLO is 99.9% (about 43 minutes of downtime a month) but you consistently deliver 99.999% (about 4 minutes a month), users will design their systems assuming you will never go down." },
      { type: "pullquote", text: "An error budget unspent is innovation unreleased." },
      { type: "paragraph", text: "When you finally do have an outage that drops you to your stated 99.9%, users will scream. They will claim you broke your promise, even though mathematically, you didn't. You conditioned them to expect perfection." },
      { type: "code", language: "typescript", code: "function calculateErrorBudget(sli: number, slo: number) {\n  const budget = 100 - slo;\n  const actual = 100 - sli;\n  const remaining = budget - actual;\n  \n  if (remaining > budget * 0.5) {\n    console.log(\"Warning: We are moving too slow. Ship more features.\");\n  }\n  return remaining;\n}" },
      { type: "paragraph", text: "Stop trying to beat your SLOs. Use them as a guardrail. If you have budget left, take more risks. Ship faster. Let things break safely." }
    ]
  },
  {
    slug: "the-quiet-death-of-the-noc",
    title: "The Quiet Death of the NOC: How Platform Teams Replaced Operations",
    subtitle: "The wall of screens is gone. It's been replaced by YAML, GitOps, and developers holding the pager.",
    author: AUTHORS.chen,
    readTime: "14 min read",
    category: "Platform",
    publishedAt: "2023-11-20T09:30:00Z",
    tags: ["NOC", "GITOPS", "OPERATIONS", "AUTOMATION"],
    coverImage: "/images/cover-3.png",
    body: [
      { type: "paragraph", text: "Ten years ago, the Network Operations Center was the beating heart of an enterprise IT organization. A dark room, banks of monitors showing green and red graphs, and operators watching lines move. Today, that room is mostly empty, or it's been converted into a ping-pong lounge." },
      { type: "heading", text: "You Can't Watch Distributed Systems" },
      { type: "paragraph", text: "The NOC model relied on humans noticing anomalies. In a microservices architecture with thousands of ephemeral containers spinning up and down every minute, human observation is impossible. The system changes state faster than a human can perceive." },
      { type: "pullquote", text: "The modern NOC isn't a room full of screens. It's a CI/CD pipeline and an automated rollback script." },
      { type: "paragraph", text: "Platform engineering teams have stepped into this void. Instead of watching the system, they build guardrails so the system can watch itself. The concept of \"operations\" has shifted from a manual task to a software engineering problem." },
      { type: "code", language: "bash", code: "# The old way:\n# Operator watches dashboard, notices spike, SSHs into box\nssh root@web-04 'service nginx restart'\n\n# The new way:\n# Kubernetes liveness probe fails, pod is automatically recycled\nkubectl get pods --field-selector=status.phase!=Running" },
      { type: "paragraph", text: "The death of the NOC should be celebrated. We shouldn't be using human brains as sophisticated cron jobs." }
    ]
  },
  {
    slug: "postmortem-on-our-47-minute-database-failover",
    title: "A Postmortem on Our 47-Minute Database Failover",
    subtitle: "We tested it in staging. We read the documentation. And yet, production found a way.",
    author: AUTHORS.sarah,
    readTime: "20 min read",
    category: "Incidents",
    publishedAt: "2023-12-05T14:15:00Z",
    tags: ["POSTMORTEM", "DATABASES", "FAILOVER", "OUTAGE"],
    coverImage: "/images/cover-4.png",
    body: [
      { type: "paragraph", text: "On Tuesday at 14:03 UTC, our primary PostgreSQL cluster experienced a hardware failure. Our automated failover mechanism, which we had confidently tested multiple times, kicked in. It was supposed to take 30 seconds. It took 47 minutes." },
      { type: "heading", text: "The Cascade" },
      { type: "paragraph", text: "The failover script worked perfectly. The secondary database was promoted to primary. The problem wasn't the database; it was the application clients. They were aggressively attempting to reconnect, creating a connection storm that instantly overwhelmed the newly promoted primary before it could warm its cache." },
      { type: "pullquote", text: "We didn't have a database problem. We had a stampeding herd problem." },
      { type: "code", language: "go", code: "// The code that killed us:\nasync function connectWithRetry() {\n  while (true) {\n    try {\n      await db.connect();\n      break;\n    } catch (e) {\n      // No backoff. Just hammer it.\n      console.error(\"Connection failed, retrying immediately\");\n    }\n  }\n}" },
      { type: "paragraph", text: "We learned a harsh lesson about exponential backoff and jitter. A failover is a delicate process. If 5,000 application instances all try to connect at the exact same millisecond, you don't have a resilient system; you have a self-inflicted DDoS attack." }
    ]
  },
  {
    slug: "kubernetes-is-not-a-platform",
    title: "Kubernetes Is Not a Platform. It's a Platform Component.",
    subtitle: "Stop exposing raw Kubernetes to your developers. They don't want to write Helm charts.",
    author: AUTHORS.chen,
    readTime: "9 min read",
    category: "Platform",
    publishedAt: "2023-12-12T11:00:00Z",
    tags: ["KUBERNETES", "K8S", "DEVEX", "PLATFORM-ENGINEERING"],
    body: [
      { type: "paragraph", text: "There is a dangerous myth that if you spin up an EKS cluster and hand out kubeconfig files, you've built an internal developer platform. You haven't. You've just outsourced your infrastructure complexity to your application developers." },
      { type: "heading", text: "The YAML Tax" },
      { type: "paragraph", text: "A product engineer should be focused on business logic, not wrestling with PodDisruptionBudgets, Ingress controllers, and affinity rules. When you expose raw Kubernetes, you force every developer to become a part-time infrastructure engineer." },
      { type: "pullquote", text: "Kubernetes is an API for building platforms, not the platform itself." },
      { type: "paragraph", text: "A real platform abstracts this away. A developer should say \"I have a container, it needs to talk to this database, and it should be exposed on this domain.\" The platform should generate the Kubernetes manifests under the hood." },
      { type: "code", language: "yaml", code: "# What devs want to write:\nname: user-service\ntype: web-service\ndependencies:\n  - postgres-db\n\n# What Kubernetes makes them write:\n# (300 lines of Deployment, Service, HPA, Ingress, NetworkPolicy...)" },
      { type: "paragraph", text: "Build a paved road. Hide the machinery. Let Kubernetes do what it does best: orchestrate containers quietly in the background." }
    ]
  },
  {
    slug: "observability-costs-more-than-aws",
    title: "Observability Costs More Than Your AWS Bill. Here's Why.",
    subtitle: "We are logging too much, tracing too deep, and gaining too little insight.",
    author: AUTHORS.maya,
    readTime: "12 min read",
    category: "Observability",
    publishedAt: "2024-01-10T09:00:00Z",
    tags: ["OBSERVABILITY", "COSTS", "DATADOG", "LOGGING"],
    body: [
      { type: "paragraph", text: "Look at your SaaS bills. For many modern engineering organizations, the cost of storing logs, metrics, and traces has eclipsed the cost of running the compute infrastructure itself. We are spending more money watching our code run than we spend actually running it." },
      { type: "heading", text: "The Hoarder Mentality" },
      { type: "paragraph", text: "Engineers are terrified of missing the one log line that will solve an incident, so they log everything. Every HTTP request, every database query, every debug statement. We pump terabytes of data into expensive indices, and 99.9% of it is never queried by a human being." },
      { type: "pullquote", text: "Logging \"just in case\" is an expensive way to calm an engineer's anxiety." },
      { type: "paragraph", text: "We need to adopt dynamic sampling. During normal operations, sample 1% of your traces. If an error occurs, dynamically increase sampling for that service to 100%. Stop indexing DEBUG level logs for healthy systems." },
      { type: "code", language: "json", code: "{\n  \"message\": \"User fetched successfully\",\n  \"userId\": \"12345\",\n  \"durationMs\": 12,\n  \"bytesRead\": 1024,\n  // Do we really need to store this 10 million times a day?\n}" },
      { type: "paragraph", text: "Observability shouldn't be an infinite sinkhole for data. It needs a retention strategy, a sampling strategy, and most importantly, a budget." }
    ]
  },
  {
    slug: "case-against-production-branches",
    title: "The Case Against Production Branches",
    subtitle: "If you have a 'master' branch and a 'production' branch, your deployment process is fundamentally broken.",
    author: AUTHORS.omar,
    readTime: "7 min read",
    category: "DevOps",
    publishedAt: "2024-01-25T13:45:00Z",
    tags: ["GIT", "DEPLOYMENTS", "CI-CD", "ANTIPATTERNS"],
    body: [
      { type: "paragraph", text: "I regularly audit deployment pipelines for enterprise teams. The most common, and most destructive anti-pattern I see is the 'production' branch. The idea that code merges to main, stews there for a while, and is then carefully merged into a separate production branch to trigger a deploy." },
      { type: "heading", text: "State Drift" },
      { type: "paragraph", text: "Branches are meant for concurrent development, not environment representation. When you map branches to environments, you guarantee drift. Hotfixes happen in production and don't make it back to main. Main gets too far ahead and the merge to production becomes terrifying." },
      { type: "pullquote", text: "Main is production. Everything else is a feature flag waiting to be toggled." },
      { type: "paragraph", text: "Trunk-based development is the only scalable way forward. Every commit to main should be deployable. If a feature isn't ready, hide it behind a flag. If it breaks, roll forward or toggle the flag. Stop managing release trains through git merges." }
    ]
  },
  {
    slug: "toil-is-a-feature-request",
    title: "Toil Is a Feature Request",
    subtitle: "If an operator has to run a script every Tuesday, the system is incomplete.",
    author: AUTHORS.omar,
    readTime: "10 min read",
    category: "SRE",
    publishedAt: "2024-02-05T08:30:00Z",
    tags: ["TOIL", "AUTOMATION", "SRE", "CULTURE"],
    body: [
      { type: "paragraph", text: "Google's SRE book defines toil as work that is manual, repetitive, automatable, and devoid of enduring value. Most organizations treat toil as a necessary evil. They allocate 50% of an engineer's time to it and shrug it off as 'keeping the lights on.'" },
      { type: "heading", text: "Listen to the Pain" },
      { type: "paragraph", text: "Toil shouldn't be accepted; it should be analyzed. Every piece of toil is a missing feature in your platform. If someone has to manually clear out a tmp directory every month, your application lacks proper log rotation. If someone has to run a database migration script by hand, your deployment pipeline is incomplete." },
      { type: "pullquote", text: "Manual intervention is a bug report from operations to development." },
      { type: "paragraph", text: "We need to stop writing runbooks for tasks that could be automated. A runbook should be for complex, nuanced decisions that require human judgment. It should not be a checklist for a robot disguised as a human." }
    ]
  },
  {
    slug: "we-replaced-ci-with-bash",
    title: "We Replaced Our CI With a 200-Line Bash Script",
    subtitle: "How we stripped away the complex YAML pipelines and went back to basics.",
    author: AUTHORS.chen,
    readTime: "15 min read",
    category: "DevOps",
    publishedAt: "2024-02-18T10:15:00Z",
    tags: ["CI-CD", "BASH", "SIMPLICITY", "PIPELINES"],
    body: [
      { type: "paragraph", text: "Our CI/CD pipeline had become a monster. Thousands of lines of proprietary YAML, custom GitHub Actions, complex dependency graphs, and a web of plugins that broke every time Node was updated. It took 3 minutes just to provision the runners before a test even executed." },
      { type: "heading", text: "The Great Simplification" },
      { type: "paragraph", text: "We deleted it all. We wrote a single `build.sh` script that runs locally, on a developer's machine, and identically in the CI runner. It lints, it tests, it builds the container." },
      { type: "pullquote", text: "If you can't run your CI pipeline locally while on an airplane, your pipeline is too complex." },
      { type: "code", language: "bash", code: "#!/usr/bin/env bash\nset -euo pipefail\n\necho \"Running lint...\"\nnpm run lint\n\necho \"Running tests...\"\ngo test ./...\n\necho \"Building image...\"\ndocker build -t my-app:${GIT_SHA} ." },
      { type: "paragraph", text: "The result? Build times dropped by 70%. Developer confusion went to zero. And we stopped vendor lock-in dead in its tracks." }
    ]
  },
  {
    slug: "what-sre-book-got-wrong",
    title: "What Google's SRE Book Got Wrong About Error Budgets",
    subtitle: "The math is sound, but the human psychology is deeply flawed.",
    author: AUTHORS.sarah,
    readTime: "13 min read",
    category: "Culture",
    publishedAt: "2024-03-01T09:00:00Z",
    tags: ["SRE", "GOOGLE", "ERROR-BUDGETS", "MANAGEMENT"],
    body: [
      { type: "paragraph", text: "The Google SRE book is the bible of our industry. It formalized practices that we all desperately needed. But in its rigid, mathematical approach to reliability, it missed a critical human element, particularly in its prescription for error budgets." },
      { type: "heading", text: "The Freeze Consequence" },
      { type: "paragraph", text: "The theory: if you burn your error budget, you freeze feature releases until it recovers. This forces development teams to prioritize reliability. In practice, at non-Google companies, this creates perverse incentives. Teams start hiding failures, redefining what counts as an 'error,' or fighting over whose code caused the drop." },
      { type: "pullquote", text: "A metric that becomes a punishment ceases to be a good metric." },
      { type: "paragraph", text: "Error budgets should trigger conversations, not automatic bureaucratic freezes. If a team burns their budget, the engineering director shouldn't lock their deployment pipeline. They should sit down with the team and ask: 'Do you need more time to pay down tech debt? Are the product managers pushing too hard?'" },
      { type: "paragraph", text: "Math cannot solve organizational dysfunction." }
    ]
  }
];
