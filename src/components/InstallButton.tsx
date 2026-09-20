import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Monitor, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const InstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 backdrop-blur-md">
        <CheckCircle2 size={16} />
        <span className="text-xs font-bold tracking-widest uppercase">System Installed</span>
      </div>
    );
  }

  if (isInstallable) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={install}
        className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow group"
      >
        <Download size={18} className="group-hover:bounce" />
        <span className="text-sm tracking-tighter">INSTALL TO PC</span>
      </motion.button>
    );
  }

  if (isIOS) {
    return (
      <>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full font-bold shadow-lg"
        >
          <Monitor size={18} />
          <span className="text-sm tracking-tighter">INSTALL TO DEVICE</span>
        </motion.button>

        <AnimatePresence>
          {showIOSGuide && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-6"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-sm rounded-3xl bg-[#0a0a0a] border border-white/10 p-8 shadow-2xl"
              >
                <h3 className="text-2xl font-black text-white mb-4 italic uppercase">Sovereign Link</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  1. Tap the <span className="text-white font-bold">Share</span> button in Safari.<br />
                  2. Scroll and select <span className="text-white font-bold">Add to Home Screen</span>.<br />
                  3. Launch from your sovereign springboard.
                </p>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:bg-gray-200 transition-colors"
                >
                  Understood
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return null;
};
