import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Mail, ShieldCheck, ArrowRight, Zap, Coffee } from 'lucide-react';
import { Logo } from '../App';

export default function Success() {
  return (
    <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center p-6 selection:bg-cyan/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan/10 blur-[120px] rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full glass p-8 md:p-12 rounded-3xl border-white/10 text-center shadow-2xl relative overflow-hidden"
      >
        {/* Animated Background Element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan/10 blur-3xl rounded-full" />

        <div className="flex justify-center mb-8">
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, delay: 0.2 }}
              className="w-24 h-24 rounded-full bg-cyan/20 border border-cyan/30 flex items-center justify-center text-cyan shadow-[0_0_40px_rgba(6,182,212,0.3)]"
            >
              <CheckCircle2 className="w-12 h-12" />
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-2 border-2 border-dashed border-cyan/20 rounded-full"
            />
          </div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
        >
          Target Neutralized! <br/>
          <span className="text-cyan">Payment Confirmed.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/40 text-lg mb-8 leading-relaxed"
        >
          Great choice! You're now officially better equipped than 99% of the internet.
          While you were clicking 'Buy', our bots already started forging your digital key.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left space-y-4"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 shrink-0 rounded-lg bg-purple/10 border border-purple/20 flex items-center justify-center text-purple">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1">Check Your Inbox</h4>
              <p className="text-white/40 text-xs leading-relaxed">
                Your License Key is currently flying through the pipes. Check your spam if it doesn't arrive in the next 2 minutes. (Our bots are fast, but the internet is old).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 border-t border-white/5 pt-4">
            <div className="w-10 h-10 shrink-0 rounded-lg bg-green/10 border border-green/20 flex items-center justify-center text-green">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1">Activate Pro Features</h4>
              <p className="text-white/40 text-xs leading-relaxed">
                Open the extension, go to settings, and paste your key. Boom. You're now a Recon God.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="/"
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-bold transition-all flex items-center justify-center gap-2"
          >
            Back to Base
          </a>
          <a
            href="https://github.com/mert-erkoc"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-cyan text-background font-bold hover:bg-cyan/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan/20"
          >
            Start Hunting
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex items-center justify-center gap-2 text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]"
        >
          <Coffee className="w-3 h-3" />
          <span>Go grab a coffee, you've earned it.</span>
        </motion.div>
      </motion.div>

      <div className="mt-8">
        <Logo className="w-8 h-8 opacity-20" />
      </div>
    </div>
  );
}
