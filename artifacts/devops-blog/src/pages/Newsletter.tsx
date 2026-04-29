import { Layout } from "@/components/Layout";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1000);
  };

  return (
    <Layout>
      <div className="px-6 sm:px-10 lg:px-16 py-20 md:py-32 max-w-4xl mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="inline-block border-[3px] border-primary px-4 py-2 font-mono text-sm font-bold uppercase tracking-widest text-primary mb-8">
          The Weekly Pager
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground mb-8">
          Signal / Noise
        </h1>
        
        <p className="text-xl md:text-2xl font-serif text-muted-foreground italic mb-12 max-w-2xl">
          One email a week. No vendor pitches. No thought leadership fluff. Just hard lessons learned in production and curated reading for SREs.
        </p>

        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-card border-[3px] border-primary p-8"
          >
            <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-black uppercase text-foreground mb-2">Subscription Confirmed</h3>
            <p className="font-mono text-sm text-muted-foreground">You are now on the pager rotation. Expect the first issue on Tuesday.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none font-mono text-muted-foreground">
                {">"}
              </div>
              <input 
                type="email" 
                placeholder="name@company.com" 
                className="w-full bg-background border-[3px] border-border pl-10 pr-4 py-4 font-mono text-base text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
                required
                disabled={status === 'loading'}
              />
            </div>
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full bg-primary text-background font-black uppercase tracking-widest py-4 hover:bg-white transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <span className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin"></span>
                  Processing...
                </>
              ) : (
                'Subscribe to Alerts'
              )}
            </button>
            <p className="font-mono text-[10px] text-muted-foreground uppercase pt-4">
              We respect your inbox. Unsubscribe anytime with one click.
            </p>
          </form>
        )}
      </div>
    </Layout>
  );
}
