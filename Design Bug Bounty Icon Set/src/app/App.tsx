import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Shield, Search, Globe, Code2, Hash, Key } from "lucide-react";

// ─── Marketing tokens ─────────────────────────────────────────────────────────
const CY   = "#06B6D4";
const GR   = "#22C55E";
const PU   = "#A855F7";
const INTER = "'Inter', system-ui, sans-serif";
const MONO  = "'JetBrains Mono', 'Courier New', monospace";
const W = 1280, H = 800;

// ─── Extension UI tokens (matched from screenshots) ───────────────────────────
const E = {
  bg:    "#0B1017",   // popup background
  surf:  "#131B27",   // card / panel surface
  surf2: "#1B2639",   // input / field surface
  bd:    "rgba(255,255,255,0.08)",
  bd2:   "rgba(255,255,255,0.14)",
  text:  "rgba(255,255,255,0.90)",
  muted: "rgba(255,255,255,0.42)",
  dim:   "rgba(255,255,255,0.22)",
  blue:  "#4775FF",   // primary action button
  cyan:  "#06B6D4",
  green: "#22C55E",
};

// ─── Branding logo ────────────────────────────────────────────────────────────
function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" fill="none">
      <rect width="128" height="128" rx="28" fill="#0F172A"/>
      <path d="M64 64 L64 18 A46 46 0 0 1 99.24 34.43Z" fill="#22C55E" fillOpacity="0.12"/>
      <line x1="24.16" y1="64" x2="103.84" y2="64" stroke="#06B6D4" strokeOpacity="0.22" strokeWidth="1"/>
      <line x1="64"    y1="18" x2="64"     y2="110" stroke="#06B6D4" strokeOpacity="0.22" strokeWidth="1"/>
      <polygon points="64,18 103.84,41 103.84,87 64,110 24.16,87 24.16,41"
        stroke="#06B6D4" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
      <line x1="64" y1="64" x2="99.24" y2="34.43" stroke="#22C55E" strokeWidth="1.25" strokeOpacity="0.85"/>
      <circle cx="64" cy="64" r="2.5" fill="#06B6D4"/>
      <line x1="64" y1="18" x2="56" y2="8" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="64" y1="18" x2="72" y2="8" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="56" cy="8" r="2.5" fill="#A855F7"/>
      <circle cx="72" cy="8" r="2.5" fill="#A855F7"/>
    </svg>
  );
}

// ─── Marketing atoms ──────────────────────────────────────────────────────────
type PV = "cyan"|"green"|"purple"|"white"|"dim";
function Pill({ children, v = "cyan" }: { children: React.ReactNode; v?: PV }) {
  const s: Record<PV, { bg: string; bd: string; c: string }> = {
    cyan:   { bg: "rgba(6,182,212,0.1)",   bd: "rgba(6,182,212,0.28)",  c: CY },
    green:  { bg: "rgba(34,197,94,0.1)",   bd: "rgba(34,197,94,0.28)",  c: GR },
    purple: { bg: "rgba(168,85,247,0.1)",  bd: "rgba(168,85,247,0.28)", c: PU },
    white:  { bg: "rgba(255,255,255,0.06)",bd: "rgba(255,255,255,0.14)",c: "rgba(255,255,255,0.62)" },
    dim:    { bg: "rgba(255,255,255,0.03)",bd: "rgba(255,255,255,0.08)",c: "rgba(255,255,255,0.38)" },
  };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "5px 14px", borderRadius: 999,
      fontSize: 12, fontWeight: 500, letterSpacing: "0.01em",
      background: s[v].bg, border: `1px solid ${s[v].bd}`, color: s[v].c,
      fontFamily: INTER, whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

function CkItem({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 11 }}>
      <div style={{
        width: 18, height: 18, borderRadius: 999, flexShrink: 0,
        background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.5 6.5L9 1" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, fontFamily: INTER, lineHeight: 1.4 }}>
        {label}
      </span>
    </div>
  );
}

// floating glass overlay card (positioned absolute within Canvas)
function FC({ x, y, w, z = 10, accent = CY, children }: {
  x: number; y: number; w: number; z?: number; accent?: string; children: React.ReactNode;
}) {
  const [r, g, b] = [accent.slice(1,3), accent.slice(3,5), accent.slice(5,7)].map(h => parseInt(h,16));
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: w, zIndex: z,
      background: "rgba(4,8,18,0.92)",
      backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
      border: `1px solid rgba(${r},${g},${b},0.24)`,
      borderRadius: 12, padding: "14px 18px",
      boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(${r},${g},${b},0.07)`,
    }}>{children}</div>
  );
}

function NavBar({ step }: { step: string }) {
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: 64, zIndex: 20,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 56px", borderBottom: "1px solid rgba(255,255,255,0.04)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Logo size={28}/>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontFamily: MONO, letterSpacing: "0.03em" }}>
          Bug Bounty Companion
        </span>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Pill v="white">Chrome Extension</Pill>
        <Pill v="green">Free Forever</Pill>
      </div>
      <div style={{ position: "absolute", bottom: 12, right: 56, fontFamily: MONO, fontSize: 10, color: "rgba(255,255,255,0.16)", letterSpacing: "0.12em" }}>
        {step}
      </div>
    </div>
  );
}

function Canvas({ accent = CY, children }: { accent?: string; children: React.ReactNode }) {
  const [r, g, b] = [accent.slice(1,3), accent.slice(3,5), accent.slice(5,7)].map(h => parseInt(h,16));
  return (
    <div style={{ position: "relative", width: W, height: H, background: "#060D1B", overflow: "hidden", fontFamily: INTER }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.030) 1px, transparent 1px)", backgroundSize: "32px 32px" }}/>
      <div style={{ position: "absolute", left: -250, top: -250, width: 1000, height: 1000, background: `radial-gradient(circle, rgba(${r},${g},${b},0.062) 0%, transparent 58%)`, pointerEvents: "none" }}/>
      <div style={{ position: "absolute", right: -100, bottom: -100, width: 550, height: 550, background: "radial-gradient(circle, rgba(3,7,18,0.65) 0%, transparent 60%)", pointerEvents: "none" }}/>
      {children}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, rgba(${r},${g},${b},0.28) 0%, transparent 42%)` }}/>
    </div>
  );
}

// extension popup frame wrapper (absolute positioned, clips its child)
function MockupFrame({ x, y, width, maxH, glow = "rgba(6,182,212,0.12)", children }: {
  x: number; y: number; width: number; maxH?: number; glow?: string; children: React.ReactNode;
}) {
  return (
    <div style={{
      position: "absolute", left: x, top: y, width, zIndex: 2,
      maxHeight: maxH, overflow: "hidden",
      borderRadius: 14,
      border: "1px solid rgba(255,255,255,0.10)",
      boxShadow: `0 4px 8px rgba(0,0,0,0.2), 0 28px 72px rgba(0,0,0,0.75), 0 0 80px ${glow}`,
    }}>
      {children}
      {/* fade-out gradient at the bottom edge if content is clipped */}
      {maxH && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 40, background: `linear-gradient(to bottom, transparent, ${E.bg})`, pointerEvents: "none" }}/>
      )}
    </div>
  );
}

// ─── Extension UI: shared components ─────────────────────────────────────────

const R1 = ["RECON", "DISCOVERY", "JWT", "SCOPE", "EVIDENCE", "HASH ID"] as const;
const R2 = ["ENDPOINTS", "JS MINER", "CHECKLIST", "HTML CODEC", "HISTORY"] as const;

function ETabBar({ a1 = "", a2 = "" }: { a1?: string; a2?: string }) {
  const tab = (label: string, active: boolean) => (
    <span key={label} style={{
      padding: "5px 9px", borderRadius: 5, fontSize: 11, letterSpacing: "0.01em",
      fontWeight: active ? 600 : 400, cursor: "pointer",
      color: active ? "rgba(255,255,255,0.92)" : E.muted,
      background: active ? "rgba(6,182,212,0.18)" : "transparent",
      border: active ? "1px solid rgba(6,182,212,0.28)" : "1px solid transparent",
    }}>{label}</span>
  );

  return (
    <div style={{ background: E.bg }}>
      {/* Row 1 */}
      <div style={{ display: "flex", alignItems: "center", gap: 2, padding: "6px 10px", borderBottom: `1px solid ${E.bd}`, flexWrap: "wrap" as const }}>
        {R1.map(t => tab(t, t === a1))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 2 }}>
          {["↻","⚙"].map(ic => (
            <span key={ic} style={{ padding: "5px 7px", borderRadius: 5, fontSize: 12, color: E.dim, cursor: "pointer" }}>{ic}</span>
          ))}
        </div>
      </div>
      {/* Row 2 */}
      <div style={{ display: "flex", alignItems: "center", gap: 2, padding: "5px 10px", borderBottom: `1px solid ${E.bd}`, flexWrap: "wrap" as const }}>
        <span style={{ padding: "4px 8px", borderRadius: 5, fontSize: 10, fontWeight: 600, cursor: "pointer", color: PU, background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.22)" }}>PRO</span>
        {R2.map(t => tab(t, t === a2))}
        <span style={{ marginLeft: "auto", padding: "4px 8px", borderRadius: 5, fontSize: 10, fontWeight: 600, cursor: "pointer", color: PU, background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.22)" }}>PRO</span>
      </div>
    </div>
  );
}

function EBreadcrumb({ section, domain }: { section: string; domain?: string }) {
  return (
    <div style={{ background: E.surf, borderBottom: `1px solid ${E.bd}`, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="12" height="12" viewBox="0 0 128 128" fill="none">
          <polygon points="64,18 103.84,41 103.84,87 64,110 24.16,87 24.16,41" stroke="#06B6D4" strokeWidth="5" fill="none" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, color: E.cyan, letterSpacing: "0.12em" }}>COMPANION</span>
        <span style={{ color: E.dim, fontSize: 12 }}>/</span>
        <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, color: E.cyan, letterSpacing: "0.12em" }}>{section}</span>
      </div>
      {domain && (
        <span style={{ fontFamily: MONO, fontSize: 10, color: E.muted, padding: "3px 9px", borderRadius: 6, background: "rgba(255,255,255,0.05)", border: `1px solid ${E.bd}` }}>
          {domain}
        </span>
      )}
    </div>
  );
}

// labeled text field (Host / Page Title style)
function EField({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ fontFamily: MONO, fontSize: 9, color: E.dim, letterSpacing: "0.08em", marginBottom: 5 }}>{label}</div>
      <div style={{ background: E.surf2, border: `1px solid ${E.bd}`, borderRadius: 8, padding: "9px 12px", fontFamily: MONO, fontSize: 12.5, color: E.text }}>
        {value}
      </div>
    </div>
  );
}

function EServiceBtn({ label }: { label: string }) {
  return (
    <div style={{ padding: "7px 12px", marginBottom: 5, borderRadius: 8, border: `1px solid ${E.bd}`, background: "rgba(255,255,255,0.025)", color: E.text, fontSize: 12.5, textAlign: "center" as const, cursor: "pointer" }}>
      {label}
    </div>
  );
}

function ESection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: E.surf, border: `1px solid ${E.bd}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontWeight: 600, fontSize: 13, color: E.text }}>{title}</span>
        <span style={{ fontSize: 11, color: E.muted, padding: "3px 10px", borderRadius: 999, border: `1px solid ${E.bd}`, background: "rgba(255,255,255,0.04)", cursor: "pointer" }}>
          Open All
        </span>
      </div>
      {children}
    </div>
  );
}

function EFilterInput({ placeholder }: { placeholder: string }) {
  return (
    <div style={{ padding: "9px 12px", borderRadius: 8, border: `1px solid ${E.bd}`, background: E.surf2, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <circle cx="5" cy="5" r="4" stroke={E.dim} strokeWidth="1.25"/>
        <line x1="8.1" y1="8.1" x2="10.5" y2="10.5" stroke={E.dim} strokeWidth="1.25" strokeLinecap="round"/>
      </svg>
      <span style={{ fontSize: 12, color: E.dim, fontFamily: MONO }}>{placeholder}</span>
    </div>
  );
}

function EOutlineBtn({ label }: { label: string }) {
  return (
    <span style={{ display: "inline-block", padding: "5px 13px", borderRadius: 7, fontSize: 12, fontWeight: 500, border: `1px solid ${E.bd2}`, color: E.muted, background: "rgba(255,255,255,0.04)", cursor: "pointer", marginBottom: 8 }}>
      {label}
    </span>
  );
}

function EPrimaryBtn({ label, color = E.blue }: { label: string; color?: string }) {
  return (
    <button style={{ padding: "7px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: color, color: "#fff", border: "none", cursor: "pointer", whiteSpace: "nowrap" as const, flexShrink: 0 }}>
      {label}
    </button>
  );
}

// domain/status badge chip
function EBadge({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <span style={{
      fontFamily: MONO, fontSize: 11, padding: "3px 10px", borderRadius: 6, cursor: "default",
      color: accent ? E.green : E.muted,
      background: accent ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.05)",
      border: `1px solid ${accent ? "rgba(34,197,94,0.28)" : E.bd}`,
    }}>
      {label}
    </span>
  );
}

// path/subdomain result row
function EResultItem({ primary, secondary }: { primary: string; secondary?: string }) {
  return (
    <div style={{ padding: "9px 12px", borderRadius: 8, border: `1px solid ${E.bd}`, background: E.surf, marginBottom: 5 }}>
      <div style={{ fontFamily: MONO, fontSize: 12, color: E.text }}>{primary}</div>
      {secondary && <div style={{ fontFamily: MONO, fontSize: 9.5, color: E.dim, marginTop: 2 }}>{secondary}</div>}
    </div>
  );
}

// ─── Extension popup views ────────────────────────────────────────────────────

function ReconMockup() {
  return (
    <div style={{ background: E.bg, fontFamily: INTER }}>
      <ETabBar a1="RECON"/>
      <EBreadcrumb section="RECON" domain="www.shopify.com"/>
      <div style={{ padding: "10px" }}>
        {/* Recon Launcher header card */}
        <div style={{ background: E.surf, border: `1px solid ${E.bd}`, borderRadius: 10, padding: "14px 16px", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: E.text, marginBottom: 5 }}>Recon Launcher</div>
              <div style={{ fontSize: 12, color: E.muted, lineHeight: 1.55 }}>
                Automatically detects the active domain and opens grouped OSINT services.
              </div>
            </div>
            <EBadge label="shopify.com"/>
          </div>
          <EField label="Host" value="www.shopify.com"/>
          <EField label="Page Title" value="Shopify Türkiye"/>
        </div>
        {/* Passive Recon section preview */}
        <ESection title="Passive Recon">
          {["crt.sh", "Wayback Machine", "SecurityTrails", "VirusTotal", "Shodan"].map(s => (
            <EServiceBtn key={s} label={s}/>
          ))}
        </ESection>
        <ESection title="DNS">
          {["DNSDumpster", "WHOIS"].map(s => <EServiceBtn key={s} label={s}/>)}
        </ESection>
      </div>
    </div>
  );
}

function DiscoveryMockup() {
  const results = ["api.shopify.com", "admin.shopify.com", "partners.shopify.com", "cdn.shopify.com"];
  return (
    <div style={{ background: E.bg, fontFamily: INTER }}>
      <ETabBar a1="DISCOVERY"/>
      <EBreadcrumb section="DISCOVERY" domain="shopify.com"/>
      <div style={{ padding: "10px" }}>
        {/* Live Discovery card */}
        <div style={{ background: E.surf, border: `1px solid ${E.bd}`, borderRadius: 10, padding: "14px 16px", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: E.text, marginBottom: 5 }}>Live Discovery</div>
              <div style={{ fontSize: 12, color: E.muted, lineHeight: 1.55 }}>
                Passive subdomain enumeration (crt.sh, OTX, HackerTarget).
              </div>
            </div>
            <EPrimaryBtn label="Scan Subdomains"/>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <EBadge label="shopify.com"/>
            <EBadge label="Scan complete" accent/>
          </div>
        </div>
        <EFilterInput placeholder="Filter results..."/>
        <EOutlineBtn label="Open Top 10"/>
        {results.map(d => <EResultItem key={d} primary={d}/>)}
      </div>
    </div>
  );
}

function JsMinerMockup() {
  const paths = [
    { path: "/api/v1",        via: "via main.bundle.js" },
    { path: "/graphql",       via: "via app.chunk.js" },
    { path: "/config",        via: "via vendor.js" },
    { path: "/api/webhook",   via: "via main.bundle.js" },
    { path: "/assets/fonts",  via: "via app.chunk.js" },
  ];
  return (
    <div style={{ background: E.bg, fontFamily: INTER }}>
      <ETabBar a2="JS MINER"/>
      <EBreadcrumb section="JS MINER" domain="shopify.com"/>
      <div style={{ padding: "10px" }}>
        {/* JS Path Miner card */}
        <div style={{ background: E.surf, border: `1px solid ${E.bd}`, borderRadius: 10, padding: "14px 16px", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: E.text, marginBottom: 5 }}>JS Path Miner</div>
              <div style={{ fontSize: 12, color: E.muted, lineHeight: 1.55 }}>
                Scans active scripts for hidden API endpoints and local paths.
              </div>
            </div>
            <EPrimaryBtn label="Mine JS Files"/>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <EBadge label="shopify.com"/>
            <EBadge label="Paths extracted" accent/>
          </div>
        </div>
        <EFilterInput placeholder="Filter paths (e.g. /v1, config, graphql)..."/>
        {paths.map(p => <EResultItem key={p.path} primary={p.path} secondary={p.via}/>)}
      </div>
    </div>
  );
}

function HashIdMockup() {
  const hash = "c2VjcmV0X3Rva2VuX2V4YW1wbGVf\naGFzaF9zdHJpbmdfaGVyZQ==";
  return (
    <div style={{ background: E.bg, fontFamily: INTER }}>
      <ETabBar a1="HASH ID"/>
      <EBreadcrumb section="HASH ID"/>
      <div style={{ padding: "10px" }}>
        {/* Hash Identifier card */}
        <div style={{ background: E.surf, border: `1px solid ${E.bd}`, borderRadius: 10, padding: "14px 16px", marginBottom: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: E.text, marginBottom: 5 }}>Hash Identifier</div>
          <div style={{ fontSize: 12, color: E.muted, lineHeight: 1.55, marginBottom: 14 }}>
            Input hashes to identify their encryption algorithms.
          </div>
          <div style={{ fontSize: 9, fontFamily: MONO, color: E.dim, letterSpacing: "0.1em", marginBottom: 7 }}>
            HASHES (MAX. 25, NEWLINE SEPARATED, FORMAT "HASH[:SALT]")
          </div>
          <div style={{
            background: E.surf2, border: `1px solid ${E.bd}`, borderRadius: 8, padding: "10px 12px",
            marginBottom: 12, minHeight: 68, fontFamily: MONO, fontSize: 11,
            color: "rgba(255,255,255,0.6)", lineHeight: 1.6, wordBreak: "break-all" as const,
          }}>
            {hash}
          </div>
          <button style={{ width: "100%", padding: "9px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: "#5C7DFF", color: "#fff", border: "1px solid rgba(92,125,255,0.4)", cursor: "pointer", boxShadow: "0 0 20px rgba(92,125,255,0.25)" }}>
            Identify Hashes
          </button>
        </div>
        {/* Result card */}
        <div style={{ background: E.surf, border: `1px solid ${E.bd}`, borderRadius: 10, padding: "12px 14px" }}>
          <div style={{ fontFamily: MONO, fontSize: 10.5, color: E.muted, marginBottom: 9, wordBreak: "break-all" as const, lineHeight: 1.5 }}>
            c2VjcmV0X3Rva2VuX2V4YW1wbGVf...
          </div>
          <span style={{ padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600, background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.32)", color: E.green }}>
            Base64
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Slide 1 — Recon Launcher ─────────────────────────────────────────────────
function Slide1() {
  return (
    <Canvas accent={CY}>
      <NavBar step="01 / 04"/>

      {/* Right accent glow */}
      <div style={{ position: "absolute", left: 580, top: 0, width: 700, height: H, background: "radial-gradient(ellipse at 55% 42%, rgba(6,182,212,0.062) 0%, transparent 60%)", pointerEvents: "none" }}/>

      {/* ── Left copy ── */}
      <div style={{ position: "absolute", left: 80, top: 108, width: 516 }}>
        <div style={{ fontFamily: MONO, fontSize: 11, color: CY, letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: 18, opacity: 0.9 }}>
          Recon Launcher
        </div>
        <h1 style={{ fontSize: 62, fontWeight: 700, color: "#fff", lineHeight: 1.06, margin: 0, marginBottom: 22, letterSpacing: "-0.02em" }}>
          Launch Every<br/>OSINT Tool.<br/>
          <span style={{ color: CY }}>Instantly.</span>
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.44)", lineHeight: 1.72, margin: 0, marginBottom: 30, maxWidth: 455 }}>
          Auto-detects the active domain and opens Shodan, crt.sh, VirusTotal, Censys, and Wayback Machine — grouped by category, zero configuration.
        </p>
        <div style={{ marginBottom: 30 }}>
          <CkItem label="Automatic target detection"/>
          <CkItem label="Multiple grouped OSINT sources"/>
          <CkItem label="One-click bulk launch per category"/>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
          <Pill v="cyan">🛡 Privacy First</Pill>
          <Pill v="white">⚡ Browser Native</Pill>
          <Pill v="green">∞ Free Forever</Pill>
        </div>
      </div>

      {/* ── Extension mockup ── */}
      <MockupFrame x={646} y={70} width={434} glow="rgba(6,182,212,0.15)">
        <ReconMockup/>
      </MockupFrame>

      {/* FC — auto-detected domain (overlaps mockup top-right + extends beyond) */}
      <FC x={1044} y={66} w={228} z={8} accent={CY}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: 999, background: GR, flexShrink: 0 }}/>
          <span style={{ fontFamily: MONO, fontSize: 9.5, color: "rgba(255,255,255,0.3)", letterSpacing: "0.14em", textTransform: "uppercase" as const }}>
            Auto-detected
          </span>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 14, color: CY, fontWeight: 600, marginBottom: 3 }}>shopify.com</div>
        <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.28)" }}>Active tab · instant detection</div>
      </FC>

      {/* FC — feature callout bottom */}
      <FC x={650} y={628} w={224} z={8} accent={GR}>
        <div style={{ fontSize: 12, fontWeight: 600, color: GR, marginBottom: 3 }}>Multiple OSINT Sources</div>
        <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.32)" }}>Passive Recon · DNS · Threat Intel</div>
      </FC>
    </Canvas>
  );
}

// ─── Slide 2 — Live Discovery ─────────────────────────────────────────────────
function Slide2() {
  return (
    <Canvas accent={GR}>
      <NavBar step="02 / 04"/>

      <div style={{ position: "absolute", left: 556, top: 0, width: 724, height: H, background: "radial-gradient(ellipse at 54% 42%, rgba(34,197,94,0.052) 0%, transparent 60%)", pointerEvents: "none" }}/>

      {/* ── Left copy ── */}
      <div style={{ position: "absolute", left: 80, top: 108, width: 508 }}>
        <div style={{ fontFamily: MONO, fontSize: 11, color: GR, letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: 18, opacity: 0.9 }}>
          Live Discovery
        </div>
        <h1 style={{ fontSize: 62, fontWeight: 700, color: "#fff", lineHeight: 1.06, margin: 0, marginBottom: 22, letterSpacing: "-0.02em" }}>
          Enumerate<br/>Every<br/>
          <span style={{ color: GR }}>Subdomain.</span>
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.44)", lineHeight: 1.72, margin: 0, marginBottom: 30, maxWidth: 452 }}>
          Passive enumeration powered by crt.sh, OTX, and HackerTarget. Filter results, open top findings instantly — no active scanning.
        </p>

        {/* Stat trio */}
        <div style={{ display: "flex", gap: 14, marginBottom: 28 }}>
          {[
            { label: "Passive Enumeration", accent: GR },
            { label: "Multi-Source",        accent: CY },
            { label: "Zero Active Probes",  accent: PU },
          ].map(({ label, accent }) => (
            <div key={label} style={{ flex: 1, padding: "12px 14px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ width: 6, height: 6, borderRadius: 999, background: accent, marginBottom: 8 }}/>
              <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.72)", lineHeight: 1.35 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 26 }}>
          <CkItem label="Passively safe — no active scanning"/>
          <CkItem label="Filter results by keyword or pattern"/>
          <CkItem label="Open top results in one click"/>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Pill v="green">🔍 Multi-Source</Pill>
          <Pill v="white">🔒 Passive Only</Pill>
        </div>
      </div>

      {/* ── Extension mockup ── */}
      <MockupFrame x={644} y={70} width={452} glow="rgba(34,197,94,0.12)">
        <DiscoveryMockup/>
      </MockupFrame>

      {/* FC — scan status */}
      <FC x={1054} y={66} w={218} z={8} accent={GR}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: 999, background: GR, flexShrink: 0 }}/>
          <span style={{ fontFamily: MONO, fontSize: 9.5, color: "rgba(255,255,255,0.3)", letterSpacing: "0.14em", textTransform: "uppercase" as const }}>
            Scan complete
          </span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: GR, marginBottom: 3 }}>Live Discovery</div>
        <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.28)" }}>crt.sh · OTX · HackerTarget</div>
      </FC>

      {/* FC — open top 10 */}
      <FC x={648} y={608} w={220} z={8} accent={CY}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.82)", marginBottom: 2 }}>Open Top 10</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Launch highest-ranked results</div>
          </div>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: CY + "20", border: `1px solid ${CY}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6H10M7 3L10 6L7 9" stroke={CY} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </FC>
    </Canvas>
  );
}

// ─── Slide 3 — JS Miner + Hash Identifier ────────────────────────────────────
function Slide3() {
  return (
    <Canvas accent={PU}>
      <NavBar step="03 / 04"/>

      {/* Center glow behind mockups */}
      <div style={{ position: "absolute", left: 0, top: 220, right: 0, height: 580, background: "radial-gradient(ellipse at 50% 40%, rgba(168,85,247,0.048) 0%, transparent 55%)", pointerEvents: "none" }}/>

      {/* ── Centered headline ── */}
      <div style={{ position: "absolute", left: "50%", top: 78, transform: "translateX(-50%)", textAlign: "center" as const, width: 820 }}>
        <div style={{ fontFamily: MONO, fontSize: 11, color: PU, letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: 16, opacity: 0.9 }}>
          Developer Tools
        </div>
        <h1 style={{ fontSize: 50, fontWeight: 700, color: "#fff", lineHeight: 1.07, margin: 0, marginBottom: 14, letterSpacing: "-0.02em" }}>
          Mine. Enumerate.<br/>
          <span style={{ color: PU }}>Identify.</span>
        </h1>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, margin: "0 auto", maxWidth: 660 }}>
          Extract hidden API endpoints from live JavaScript files. Identify hash algorithms from any string. All in-browser, no account required.
        </p>
      </div>

      {/* ── Left mockup: JS Miner ── */}
      <MockupFrame x={64} y={278} width={484} glow="rgba(168,85,247,0.14)">
        <JsMinerMockup/>
      </MockupFrame>

      {/* Feature label over JS Miner (top-right overlap) */}
      <FC x={374} y={270} w={166} z={8} accent={PU}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 24, height: 24, borderRadius: 7, background: PU + "18", border: `1px solid ${PU}35`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Code2 size={12} color={PU}/>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.78)" }}>Endpoint Discovery</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)" }}>JavaScript Analysis</div>
          </div>
        </div>
      </FC>

      {/* ── Right mockup: Hash ID ── */}
      <MockupFrame x={676} y={278} width={472} glow="rgba(6,182,212,0.13)">
        <HashIdMockup/>
      </MockupFrame>

      {/* Feature label over Hash ID (top overlap) */}
      <FC x={898} y={270} w={162} z={8} accent={CY}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 24, height: 24, borderRadius: 7, background: CY + "18", border: `1px solid ${CY}35`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Hash size={12} color={CY}/>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.78)" }}>Hash Recognition</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)" }}>Algorithm Detection</div>
          </div>
        </div>
      </FC>
    </Canvas>
  );
}

// ─── Slide 4 — Full Feature Overview ─────────────────────────────────────────
const FEATURES = [
  { icon: Shield, label: "Recon Launcher",       tag: "OSINT",    desc: "One-click access to OSINT tools grouped by category — auto domain detection.",     accent: CY },
  { icon: Search, label: "Live Discovery",        tag: "RECON",    desc: "Passive subdomain enumeration from crt.sh, OTX, and HackerTarget.",               accent: GR },
  { icon: Globe,  label: "Endpoint Enumeration",  tag: "MAPPING",  desc: "Discover hidden paths and historical URLs via Wayback Machine & OTX.",            accent: CY },
  { icon: Code2,  label: "JS Path Miner",         tag: "ANALYSIS", desc: "Scan active JavaScript files and extract hidden API endpoints and local paths.",  accent: PU },
  { icon: Hash,   label: "Hash Identifier",       tag: "CRYPTO",   desc: "Identify hash algorithms instantly — Base64, MD5, SHA-1, SHA-256, bcrypt.",       accent: CY },
  { icon: Key,    label: "JWT Toolkit",           tag: "AUTH",     desc: "Decode and inspect JWT tokens in-browser. Analyze headers and payloads.",         accent: GR },
];

function Slide4() {
  const CW = 330, CH = 158, GAP = 24, COLS = 3;
  const GW = COLS * CW + (COLS - 1) * GAP;
  const GX = (W - GW) / 2;
  const GY = 270;

  return (
    <Canvas accent={CY}>
      <NavBar step="04 / 04"/>

      {/* ── Centered headline ── */}
      <div style={{ position: "absolute", left: "50%", top: 80, transform: "translateX(-50%)", textAlign: "center" as const, width: 700 }}>
        <div style={{ fontFamily: MONO, fontSize: 11, color: CY, letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: 16, opacity: 0.9 }}>
          Complete Toolkit
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 700, color: "#fff", lineHeight: 1.07, margin: 0, marginBottom: 14, letterSpacing: "-0.02em" }}>
          Every Recon Tool You Need.<br/>
          <span style={{ color: CY }}>Free. No Signup.</span>
        </h1>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, margin: 0 }}>
          A complete bug bounty toolkit inside your browser. No tracking. No telemetry. No account required.
        </p>
      </div>

      {/* ── Feature grid ── */}
      {FEATURES.map((f, i) => {
        const col = i % COLS, row = Math.floor(i / COLS);
        const x = GX + col * (CW + GAP), y = GY + row * (CH + GAP);
        const Icon = f.icon;
        const [r, g, b] = [f.accent.slice(1,3), f.accent.slice(3,5), f.accent.slice(5,7)].map(h => parseInt(h,16));
        return (
          <div key={f.label} style={{
            position: "absolute", left: x, top: y, width: CW, height: CH,
            background: "rgba(7,13,26,0.8)", border: "1px solid rgba(255,255,255,0.065)",
            borderRadius: 16, padding: "22px 24px", boxSizing: "border-box" as const,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.3)",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", background: `rgba(${r},${g},${b},0.12)`, border: `1px solid rgba(${r},${g},${b},0.25)` }}>
                <Icon size={16} color={f.accent}/>
              </div>
              <span style={{ fontFamily: MONO, fontSize: 10, color: f.accent, letterSpacing: "0.16em", opacity: 0.72 }}>{f.tag}</span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.88)", marginBottom: 7, letterSpacing: "-0.01em" }}>
              {f.label}
            </div>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.34)", lineHeight: 1.6 }}>
              {f.desc}
            </div>
          </div>
        );
      })}

      {/* ── Bottom badges ── */}
      <div style={{ position: "absolute", bottom: 34, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, alignItems: "center" }}>
        <Pill v="dim">🔒 Privacy First</Pill>
        <Pill v="dim">⚡ Lightweight</Pill>
        <Pill v="dim">🌐 Browser Native</Pill>
        <Pill v="dim">🎯 Fast Recon</Pill>
        <Pill v="green">∞ Free Forever</Pill>
        <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)", margin: "0 4px" }}/>
        <Pill v="purple">✦ Pro Features — Coming Soon</Pill>
      </div>
    </Canvas>
  );
}

// ─── Slide viewer ─────────────────────────────────────────────────────────────
const SLIDES = [Slide1, Slide2, Slide3, Slide4] as const;
const LABELS = [
  "Recon Launcher — OSINT Suite",
  "Live Discovery — Passive Enumeration",
  "JS Miner + Hash Identifier",
  "Full Feature Overview",
];

export default function App() {
  const [idx, setIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.offsetWidth / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const Slide = SLIDES[idx];

  const NavBtn = ({ dir }: { dir: -1 | 1 }) => {
    const disabled = dir === -1 ? idx === 0 : idx === SLIDES.length - 1;
    return (
      <button onClick={() => setIdx(i => i + dir)} disabled={disabled} style={{
        width: 38, height: 38, borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)",
        color: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center", justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.28 : 1, transition: "opacity 0.15s",
      }}>
        {dir === -1 ? <ChevronLeft size={18}/> : <ChevronRight size={18}/>}
      </button>
    );
  };

  return (
    <div style={{ background: "#040A14", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: INTER }}>

      {/* Meta label */}
      <div style={{ padding: "20px 0 14px", textAlign: "center" as const }}>
        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, fontFamily: MONO, letterSpacing: "0.18em", textTransform: "uppercase" as const }}>
          Chrome Web Store · 1280 × 800 · Screenshot {idx + 1} of {SLIDES.length}
        </span>
      </div>

      {/* Slide area */}
      <div style={{ width: "100%", maxWidth: W + 80, padding: "0 40px", boxSizing: "border-box" as const }}>
        <div ref={containerRef} style={{ width: "100%", aspectRatio: `${W} / ${H}`, position: "relative", overflow: "hidden", borderRadius: 4, boxShadow: "0 0 0 1px rgba(255,255,255,0.05), 0 32px 80px rgba(0,0,0,0.6)" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
            <Slide/>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, paddingTop: 20, paddingBottom: 8 }}>
        <NavBtn dir={-1}/>
        <div style={{ display: "flex", gap: 8 }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{ height: 8, width: i === idx ? 28 : 8, borderRadius: 999, background: i === idx ? CY : "rgba(255,255,255,0.14)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.2s ease" }}/>
          ))}
        </div>
        <NavBtn dir={1}/>
      </div>

      {/* Slide label */}
      <div style={{ paddingBottom: 32, textAlign: "center" as const }}>
        <p style={{ color: "rgba(255,255,255,0.24)", fontSize: 13, margin: 0 }}>
          <span style={{ color: CY, fontFamily: MONO, fontSize: 12 }}>
            {String(idx + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
          {"  —  "}
          {LABELS[idx]}
        </p>
        <p style={{ color: "rgba(255,255,255,0.09)", fontSize: 11, fontFamily: MONO, marginTop: 6 }}>
          Navigate with arrows · Screenshot each slide for Chrome Web Store upload
        </p>
      </div>

    </div>
  );
}
