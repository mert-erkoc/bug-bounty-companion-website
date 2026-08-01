import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, EyeOff, ServerOff, ArrowLeft } from 'lucide-react';
import { Logo } from '../App';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-white p-6 md:p-12 selection:bg-cyan/30">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <a href="/" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Base</span>
          </a>
          <Logo className="w-8 h-8" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Privacy Policy</h1>
          <p className="text-white/40 text-lg mb-12 leading-relaxed">
            Last updated: July 2026. <br/>
            At Bug Bounty Companion, we believe that your data is your business.
            Our privacy policy is simple: We don't want your data, and we don't collect it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="glass p-6 rounded-2xl border-white/5">
              <div className="w-10 h-10 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold mb-2">100% Local-First</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                All data, including targets, findings, and screenshots, is stored locally in your browser's storage. It never leaves your machine unless you explicitly export it.
              </p>
            </div>
            <div className="glass p-6 rounded-2xl border-white/5">
              <div className="w-10 h-10 rounded-lg bg-purple/10 border border-purple/20 flex items-center justify-center text-purple mb-4">
                <EyeOff className="w-5 h-5" />
              </div>
              <h3 className="font-bold mb-2">Zero Tracking</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                We do not use trackers, cookies, or any form of telemetry. We don't know who you are, what you're hunting, or how often you use the extension.
              </p>
            </div>
            <div className="glass p-6 rounded-2xl border-white/5">
              <div className="w-10 h-10 rounded-lg bg-green/10 border border-green/20 flex items-center justify-center text-green mb-4">
                <ServerOff className="w-5 h-5" />
              </div>
              <h3 className="font-bold mb-2">No Account Required</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                There is no sign-up process. No email addresses are collected by the extension. Your identity remains completely anonymous.
              </p>
            </div>
            <div className="glass p-6 rounded-2xl border-white/5">
              <div className="w-10 h-10 rounded-lg bg-orange/10 border border-orange/20 flex items-center justify-center text-orange mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold mb-2">Third-Party OSINT</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                The extension contacts third-party OSINT services (like crt.sh, VirusTotal, etc.) only when you trigger a lookup. These requests are direct and we do not proxy or log them.
              </p>
            </div>
          </div>

          <div className="space-y-8 prose prose-invert max-w-none text-white/60 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-4">Data Collection</h2>
              <p>
                Bug Bounty Companion does not collect personal information, usage data, or any other metadata. The extension requires certain permissions (like "activeTab" and "storage") strictly to perform its core functions locally.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">External Services</h2>
              <p>
                When using features like "Live Discovery" or "Recon Launcher", the extension may open or fetch data from external websites. These services have their own privacy policies. We recommend reviewing them, as they will see your IP address when you interact with them.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">Pro Edition & Licensing</h2>
              <p>
                If you purchase a Pro license, our payment processor (Polar.sh) collects billing information necessary for the transaction. Bug Bounty Companion itself does not store this information. The extension only validates your license key locally or via a minimal API call to the license server.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">Security</h2>
              <p>
                We use industry-standard practices to ensure the code of the extension is secure. Since everything is local, the security of your data depends on the security of your machine and browser profile.
              </p>
            </section>

            <section className="pt-8 border-t border-white/5">
              <p>
                If you have any questions about this Privacy Policy, feel free to contact us at <a href="mailto:bugbountycompanion@gmail.com" className="text-cyan hover:underline">bugbountycompanion@gmail.com</a>.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
