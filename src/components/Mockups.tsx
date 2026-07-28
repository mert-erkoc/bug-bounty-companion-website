import React from 'react';

const E = {
  bg: "#0B1017",
  surf: "#131B27",
  surf2: "#1B2639",
  border: "rgba(255,255,255,0.08)",
  border2: "rgba(255,255,255,0.14)",
  text: "rgba(255,255,255,0.90)",
  muted: "rgba(255,255,255,0.42)",
  dim: "rgba(255,255,255,0.22)",
  blue: "#4775FF",
  cyan: "#06B6D4",
  green: "#22C55E",
  purple: "#A855F7",
};

export function MockupFrame({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-extension-bg ${className}`}>
      {children}
    </div>
  );
}

function ETabBar({ activeTab = "RECON" }: { activeTab?: string }) {
  const tabs1 = ["RECON", "DISCOVERY", "JWT", "SCOPE", "EVIDENCE", "HASH ID"];
  const tabs2 = ["ENDPOINTS", "JS MINER", "CHECKLIST", "HTML CODEC", "HISTORY"];

  const Tab = ({ label, active }: { label: string, active: boolean }) => (
    <div className={`px-2 py-1 rounded text-[10px] font-medium cursor-default ${active ? 'bg-cyan/20 border border-cyan/30 text-white' : 'text-extension-muted border border-transparent'}`}>
      {label}
    </div>
  );

  return (
    <div className="bg-extension-bg border-b border-extension-border">
      <div className="flex flex-wrap gap-1 p-2">
        {tabs1.map(t => <Tab key={t} label={t} active={t === activeTab} />)}
      </div>
      <div className="flex flex-wrap gap-1 p-2 border-t border-extension-border">
        <div className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-purple/10 border border-purple/20 text-purple uppercase">Pro</div>
        {tabs2.map(t => <Tab key={t} label={t} active={t === activeTab} />)}
      </div>
    </div>
  );
}

function EBreadcrumb({ section, domain }: { section: string, domain?: string }) {
  return (
    <div className="bg-extension-surf border-b border-extension-border px-3 py-2 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 text-cyan">
          <svg viewBox="0 0 128 128" fill="none"><polygon points="64,18 103.84,41 103.84,87 64,110 24.16,87 24.16,41" stroke="currentColor" strokeWidth="8" fill="none" /></svg>
        </div>
        <span className="font-mono text-[9px] font-bold text-cyan tracking-widest uppercase">Companion</span>
        <span className="text-extension-dim text-xs">/</span>
        <span className="font-mono text-[9px] font-bold text-cyan tracking-widest uppercase">{section}</span>
      </div>
      {domain && (
        <span className="font-mono text-[9px] text-extension-muted px-2 py-0.5 rounded bg-white/5 border border-white/5">
          {domain}
        </span>
      )}
    </div>
  );
}

export function ReconMockup() {
  return (
    <div className="w-full font-sans text-left flex flex-col md:flex-row">
      <div className="w-full md:w-[400px] shrink-0 border-r border-extension-border/50">
        <ETabBar activeTab="RECON" />
        <EBreadcrumb section="RECON" domain="shopify.com" />
        <div className="p-3 space-y-3">
          <div className="bg-extension-surf border border-extension-border rounded-lg p-3">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-bold text-sm text-white">Recon Launcher</div>
                <div className="text-[11px] text-extension-muted">Automatically detects active domain.</div>
              </div>
              <div className="text-[10px] font-mono text-extension-muted border border-extension-border rounded px-1.5 py-0.5">shopify.com</div>
            </div>
            <div className="space-y-2 mt-3">
              <div className="text-[8px] font-mono text-extension-dim uppercase tracking-wider">Host</div>
              <div className="bg-extension-surf2 border border-extension-border rounded px-2 py-1.5 font-mono text-xs text-white">www.shopify.com</div>
            </div>
          </div>
          <div className="bg-extension-surf border border-extension-border rounded-lg p-3">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-xs text-white">Passive Recon</span>
              <span className="text-[10px] text-extension-muted border border-extension-border rounded-full px-2 py-0.5">Open All</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["crt.sh", "Wayback Machine", "SecurityTrails", "VirusTotal"].map(s => (
                <div key={s} className="bg-white/5 border border-extension-border rounded p-1.5 text-center text-[10px] text-white cursor-default truncate">
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-black/20 p-6 hidden md:flex flex-col justify-center items-center text-center">
        <div className="max-w-sm">
          <div className="w-12 h-12 rounded-full bg-cyan/10 border border-cyan/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h4 className="text-white font-bold mb-2">Instant Intelligence</h4>
          <p className="text-extension-muted text-xs leading-relaxed">
            Bug Bounty Companion automatically maps the target surface and prepares your workspace. Start hunting in seconds, not minutes.
          </p>
        </div>
      </div>
    </div>
  );
}

export function DiscoveryMockup() {
  const results = ["api.shopify.com", "admin.shopify.com", "partners.shopify.com", "cdn.shopify.com"];
  return (
    <div className="w-full max-w-[400px] font-sans text-left">
      <ETabBar activeTab="DISCOVERY" />
      <EBreadcrumb section="DISCOVERY" domain="shopify.com" />
      <div className="p-3 space-y-3">
        <div className="bg-extension-surf border border-extension-border rounded-lg p-3">
          <div className="flex justify-between items-start gap-4">
            <div>
              <div className="font-bold text-sm text-white">Live Discovery</div>
              <div className="text-[11px] text-extension-muted">Passive subdomain enumeration.</div>
            </div>
            <button className="bg-cyan text-white text-[10px] font-bold px-3 py-1.5 rounded">Scan Subdomains</button>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="bg-white/5 border border-extension-border rounded px-2 py-0.5 font-mono text-[9px] text-extension-muted">shopify.com</div>
          <div className="bg-green/10 border border-green/30 rounded px-2 py-0.5 font-mono text-[9px] text-green">Scan complete</div>
        </div>
        <div className="space-y-1.5">
          {results.map(d => (
            <div key={d} className="bg-extension-surf border border-extension-border rounded p-2 font-mono text-xs text-white">
              {d}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function JsMinerMockup() {
  const paths = [
    { path: "/api/v1/auth", type: "api" },
    { path: "/admin/config.json", type: "file" },
    { path: "/graphql", type: "api" },
  ];
  return (
    <div className="w-full max-w-[400px] font-sans text-left">
      <ETabBar activeTab="JS MINER" />
      <EBreadcrumb section="JS MINER" domain="shopify.com" />
      <div className="p-3 space-y-3">
        <div className="bg-extension-surf border border-extension-border rounded-lg p-3">
          <div className="flex justify-between items-start gap-4">
            <div>
              <div className="font-bold text-sm text-white">JS Path Miner</div>
              <div className="text-[11px] text-extension-muted">Scans scripts for hidden endpoints.</div>
            </div>
            <button className="bg-purple text-white text-[10px] font-bold px-3 py-1.5 rounded">Mine JS Files</button>
          </div>
        </div>
        <div className="space-y-1.5">
          {paths.map((p, i) => (
            <div key={i} className="bg-extension-surf border border-extension-border rounded p-2 flex justify-between items-center">
              <div className="font-mono text-[11px] text-white truncate pr-2">{p.path}</div>
              <div className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${p.type === 'api' ? 'bg-cyan/10 text-cyan border border-cyan/20' : 'bg-white/10 text-extension-muted border border-white/10'}`}>
                {p.type}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function JwtMockup() {
  return (
    <div className="w-full max-w-[400px] font-sans text-left">
      <ETabBar activeTab="JWT" />
      <EBreadcrumb section="JWT" />
      <div className="p-3 space-y-3">
        <div className="bg-extension-surf border border-extension-border rounded-lg p-3">
          <div className="font-bold text-sm text-white mb-1">JWT Toolkit</div>
          <div className="text-[11px] text-extension-muted mb-3">Decode and inspect tokens instantly.</div>
          <div className="bg-extension-surf2 border border-extension-border rounded p-2 font-mono text-[10px] text-extension-muted break-all line-clamp-2">
            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoyNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
          </div>
        </div>
        <div className="bg-extension-surf border border-extension-border rounded-lg p-3">
          <div className="text-[10px] font-bold text-cyan mb-2 uppercase tracking-widest">Payload</div>
          <div className="bg-extension-surf2 border border-extension-border rounded p-2 font-mono text-[11px] text-white space-y-1">
            <div><span className="text-purple">"sub"</span>: <span className="text-green">"1234567890"</span></div>
            <div><span className="text-purple">"name"</span>: <span className="text-green">"John Doe"</span></div>
            <div><span className="text-purple">"iat"</span>: <span className="text-green">1516239022</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HashIdMockup() {
  return (
    <div className="w-full max-w-[400px] font-sans text-left">
      <ETabBar activeTab="HASH ID" />
      <EBreadcrumb section="HASH ID" />
      <div className="p-3 space-y-3">
        <div className="bg-extension-surf border border-extension-border rounded-lg p-3">
          <div className="font-bold text-sm text-white mb-1">Hash Identifier</div>
          <div className="text-[11px] text-extension-muted mb-3">Identify algorithms from any string.</div>
          <div className="bg-extension-surf2 border border-extension-border rounded p-2 font-mono text-xs text-white break-all">
            $2a$12$KIX6zS.3p...
          </div>
        </div>
        <div className="bg-green/10 border border-green/30 rounded-lg p-3 flex items-center justify-between">
          <span className="text-xs font-bold text-green uppercase tracking-widest">Result</span>
          <span className="text-xs font-mono text-white">bcrypt</span>
        </div>
      </div>
    </div>
  );
}
