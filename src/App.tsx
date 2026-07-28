import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Search, Globe, Code2, Hash, Key,
  CheckCircle2, Github, Download, Zap, Lock,
  Layout, MousePointer2, ChevronDown, Star,
  MessageSquare, Terminal, Activity, Eye,
  ClipboardCheck, History, Share2, Cpu
} from 'lucide-react';
import {
  MockupFrame, ReconMockup, DiscoveryMockup,
  JsMinerMockup, JwtMockup, HashIdMockup
} from './components/Mockups';

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <img src="/logo.svg" alt="Bug Bounty Companion Logo" className={className} />
);

const Section = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-24 px-6 md:px-12 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

const Nav = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <Logo className="w-7 h-7" />
        <span className="font-bold tracking-tight text-white hidden sm:block">Bug Bounty Companion</span>
      </div>
      <div className="flex items-center gap-6">
        <a href="#features" className="text-sm text-white/60 hover:text-white transition-colors">Features</a>
        <a href="#why" className="text-sm text-white/60 hover:text-white transition-colors hidden md:block">Why BB Companion</a>
        <a href="#faq" className="text-sm text-white/60 hover:text-white transition-colors hidden md:block">FAQ</a>
        <a
          href="https://github.com/mert-erkoc/bug-bounty-companion"
          target="_blank"
          className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-1.5 text-sm font-medium transition-all flex items-center gap-2"
        >
          <Github className="w-4 h-4" />
          GitHub
        </a>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <Section className="pt-40 pb-32 text-center relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan/5 blur-[120px] rounded-full -z-10" />
    <FadeIn>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-semibold mb-8">
        <Star className="w-3 h-3 fill-cyan" />
        <span>Free Forever — 2026 Edition</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
        The Browser-Native <br />
        <span className="text-cyan">Bug Bounty Toolkit.</span>
      </h1>
      <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed">
        A premium, local-first toolkit for recon, discovery, and endpoint enumeration.
        Built for hunters who demand speed and privacy.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="#"
          className="w-full sm:w-auto bg-cyan hover:bg-cyan/90 text-background px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan/20"
        >
          <Download className="w-5 h-5" />
          Add to Chrome
        </a>
        <a
          href="#features"
          className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
        >
          View Full Toolkit
        </a>
      </div>
    </FadeIn>

    <FadeIn delay={0.2}>
      <div className="mt-20 relative max-w-5xl mx-auto">
        <div className="absolute inset-0 bg-cyan/10 blur-[100px] rounded-full -z-10" />
        <MockupFrame className="shadow-[0_0_50px_rgba(6,182,212,0.15)]">
          <ReconMockup />
        </MockupFrame>
      </div>
    </FadeIn>
  </Section>
);

const FeatureCard = ({ icon: Icon, title, description, accent = "cyan" }: { icon: any, title: string, description: string, accent?: "cyan" | "green" | "purple" }) => {
  const colors = {
    cyan: "text-cyan bg-cyan/10 border-cyan/20",
    green: "text-green bg-green/10 border-green/30",
    purple: "text-purple bg-purple/10 border-purple/20",
  };

  return (
    <div className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${colors[accent]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-white/40 leading-relaxed text-sm">{description}</p>
    </div>
  );
};

const Features = () => {
  const allFeatures = [
    { icon: Shield, title: "Recon Launcher", desc: "One-click access to OSINT tools grouped by category with auto-detected domain context.", accent: "cyan" },
    { icon: Search, title: "Live Discovery", desc: "Passive subdomain enumeration via crt.sh, OTX, and HackerTarget without active scanning.", accent: "green" },
    { icon: Globe, title: "Endpoint Enumeration", desc: "Discover hidden paths and historical URLs via Wayback Machine and AlienVault OTX integration.", accent: "cyan" },
    { icon: Code2, title: "JS Path Miner", desc: "Extract hidden API endpoints and local paths from active JavaScript files on any page.", accent: "purple" },
    { icon: Key, title: "JWT Toolkit", desc: "Decode, inspect, and analyze JWT tokens in-browser. Fast header and payload inspection.", accent: "green" },
    { icon: Hash, title: "Hash Identifier", desc: "Instantly identify hash algorithms including MD5, SHA-1, SHA-256, bcrypt, and more.", accent: "cyan" },
    { icon: Layout, title: "Scope Checker", desc: "Quickly verify if the current domain or URL is within your defined engagement scope.", accent: "purple" },
    { icon: MousePointer2, title: "Screenshot Collector", desc: "Capture and organize screenshots for evidence directly from your browsing session.", accent: "cyan" },
    { icon: Cpu, title: "Technology Detection", desc: "Fingerprint CMS, frameworks, and libraries used by the target application instantly.", accent: "cyan" },
    { icon: Terminal, title: "HTML Codec", desc: "Advanced entity encoding and decoding for security researchers and XSS testing.", accent: "purple" },
    { icon: ClipboardCheck, title: "AI Security Checklist", desc: "Dynamic test cases based on detected technology stacks and application profile.", accent: "purple" },
    { icon: Eye, title: "Request Inspector", desc: "Real-time HTTP traffic monitoring and header inspection directly in your browser.", accent: "purple" },
    { icon: History, title: "Hunting History", desc: "Keep track of every target, finding, and screenshot in a searchable timeline.", accent: "purple" },
    { icon: Share2, title: "Export & Sync", desc: "Sync your recon data across devices securely with multiple export formats.", accent: "purple" }
  ];

  return (
    <Section id="features">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Powerful Features. Built Locally.</h2>
        <p className="text-white/40 max-w-xl mx-auto">Every tool you need for a fast recon workflow, directly in your browser sidebar or popup.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allFeatures.map((f, i) => (
          <FeatureCard key={i} icon={f.icon} title={f.title} description={f.desc} accent={f.accent as any} />
        ))}
      </div>
    </Section>
  );
};

const FeatureShowcase = () => (
  <div className="bg-white/[0.01] border-y border-white/5 py-24 overflow-hidden">
    <Section>
      <div className="flex flex-col lg:flex-row items-center gap-20">
        <div className="flex-1">
          <div className="inline-block px-3 py-1 rounded-full bg-green/10 border border-green/30 text-green text-[10px] font-bold uppercase tracking-wider mb-6">Discovery</div>
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">Passive Subdomain <br/>Enumeration.</h2>
          <p className="text-white/40 mb-8 leading-relaxed">
            Stop wasting time with manual queries. Bug Bounty Companion aggregates results from the most reliable passive sources instantly.
          </p>
          <ul className="space-y-4">
            {[
              "Aggregated results from crt.sh, OTX, and HackerTarget",
              "Instant filtering and export options",
              "One-click bulk opening of discovered targets",
              "Locally cached results for quick reference"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                <CheckCircle2 className="w-4 h-4 text-green" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 w-full max-w-md">
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glow-green rounded-xl"
          >
            <MockupFrame>
              <DiscoveryMockup />
            </MockupFrame>
          </motion.div>
        </div>
      </div>
    </Section>

    <Section>
      <div className="flex flex-col lg:flex-row-reverse items-center gap-20">
        <div className="flex-1">
          <div className="inline-block px-3 py-1 rounded-full bg-purple/10 border border-purple/20 text-purple text-[10px] font-bold uppercase tracking-wider mb-6">Developer Tools</div>
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">Expose Hidden <br/>API Endpoints.</h2>
          <p className="text-white/40 mb-8 leading-relaxed">
            The JS Path Miner scans all scripts loaded in the active tab to find hidden routes, internal endpoints, and sensitive paths.
          </p>
          <ul className="space-y-4">
            {[
              "Deep analysis of loaded JavaScript files",
              "Regex-based endpoint extraction",
              "Categorization by API routes vs internal files",
              "Zero network overhead — works on already loaded scripts"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                <CheckCircle2 className="w-4 h-4 text-purple" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 w-full max-w-md">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glow-purple rounded-xl"
          >
            <MockupFrame>
              <JsMinerMockup />
            </MockupFrame>
          </motion.div>
        </div>
      </div>
    </Section>

    <Section>
      <div className="flex flex-col lg:flex-row items-center gap-20">
        <div className="flex-1">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-[10px] font-bold uppercase tracking-wider mb-6">Security Tools</div>
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">Instant Hash <br/>Recognition.</h2>
          <p className="text-white/40 mb-8 leading-relaxed">
            Identify the algorithm behind any hash string. Supports MD5, SHA, bcrypt, and dozens of other formats instantly.
          </p>
          <ul className="space-y-4">
            {[
              "Automated algorithm detection",
              "Support for salted and unsalted hashes",
              "Batch identification for multiple strings",
              "Local processing for maximum privacy"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                <CheckCircle2 className="w-4 h-4 text-cyan" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 w-full max-w-md">
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glow-cyan rounded-xl"
          >
            <MockupFrame>
              <HashIdMockup />
            </MockupFrame>
          </motion.div>
        </div>
      </div>
    </Section>
  </div>
);

const WhyUs = () => (
  <Section id="why" className="text-center">
    <div className="mb-20">
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Built for Professionals.</h2>
      <p className="text-white/40 max-w-xl mx-auto">Why hunters choose Bug Bounty Companion over generic browser extensions.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="space-y-4">
        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto text-cyan">
          <Zap className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white">Browser Native</h3>
        <p className="text-white/40 text-sm leading-relaxed">No need to context switch. Your entire toolkit lives where your target is — in the browser.</p>
      </div>
      <div className="space-y-4">
        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto text-green">
          <Lock className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white">Privacy First</h3>
        <p className="text-white/40 text-sm leading-relaxed">Your data never leaves your browser. No accounts, no tracking, no telemetry. 100% local-first.</p>
      </div>
      <div className="space-y-4">
        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto text-purple">
          <MousePointer2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white">No Account Required</h3>
        <p className="text-white/40 text-sm leading-relaxed">Install and start hunting. No sign-up walls, no subscriptions, just pure productivity from day one.</p>
      </div>
    </div>
  </Section>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border-b border-white/5 py-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left group"
      >
        <span className="text-lg font-semibold text-white/80 group-hover:text-white transition-colors">{question}</span>
        <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`mt-4 text-white/40 leading-relaxed overflow-hidden transition-all ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        {answer}
      </div>
    </div>
  );
};

const FAQ = () => (
  <Section id="faq">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
      <div className="space-y-2">
        <FAQItem
          question="Is Bug Bounty Companion free?"
          answer="Yes! All core and advanced features of Bug Bounty Companion are available to the community. We believe in providing high-quality tools for hunters without barriers."
        />
        <FAQItem
          question="Does it actively scan targets?"
          answer="By default, no. Features like Live Discovery and Recon Launcher use passive OSINT sources to ensure your traffic remains indistinguishable from normal browsing. Active features are clearly labeled."
        />
        <FAQItem
          question="Which browsers are supported?"
          answer="Currently, we fully support Google Chrome, Brave, Edge, and other Chromium-based browsers. A Firefox version is on our 2026 roadmap."
        />
        <FAQItem
          question="Will more features be added?"
          answer="Absolutely. We are constantly updating the extension with new OSINT sources, better JS analysis, and community-requested features. We are also open to your suggestions—feel free to reach out via GitHub or email."
        />
      </div>
    </div>
  </Section>
);

const Footer = () => (
  <footer className="border-t border-white/5 pt-20 pb-10 bg-black/20">
    <Section className="py-0">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-2.5">
            <Logo className="w-8 h-8" />
            <span className="font-bold text-xl tracking-tight text-white">Bug Bounty Companion</span>
          </div>
          <p className="text-white/40 text-sm max-w-sm leading-relaxed">
            The browser-native toolkit for the modern bug bounty hunter.
            Fast, private, and powerful.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/mert-erkoc/bug-bounty-companion" className="text-white/40 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              <MessageSquare className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-sm">Product</h4>
          <ul className="space-y-4 text-sm text-white/40">
            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#why" className="hover:text-white transition-colors">Why BB Companion</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-sm">Links</h4>
          <ul className="space-y-4 text-sm text-white/40">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="https://github.com/mert-erkoc/bug-bounty-companion" className="hover:text-white transition-colors">GitHub</a></li>
            <li><a href="mailto:bugbountycompanion@gmail.com" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] text-white/20 font-mono uppercase tracking-widest">
        <span>© 2026 Bug Bounty Companion. All rights reserved.</span>
        <span className="mt-4 md:mt-0 italic">Designed for those who hunt.</span>
      </div>
    </Section>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-background selection:bg-cyan/30 selection:text-white">
      <Nav />
      <main>
        <Hero />
        <Features />
        <FeatureShowcase />
        <WhyUs />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
