import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Waves, Shield, Heart, Zap, Infinity, Anchor } from 'lucide-react';
import { SOLFEGGIO_FREQUENCIES } from '../types';

export const LotusNexus: React.FC = () => {
  const [activeFreq, setActiveFreq] = useState<number | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const oscillator = useRef<OscillatorNode | null>(null);
  const gainNode = useRef<GainNode | null>(null);

  const initAudio = () => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      gainNode.current = audioContext.current.createGain();
      gainNode.current.connect(audioContext.current.destination);
      gainNode.current.gain.setValueAtTime(0, audioContext.current.currentTime);
    }
  };

  const toggleFrequency = (hz: number) => {
    initAudio();
    if (activeFreq === hz) {
      stopTone();
    } else {
      playTone(hz);
    }
  };

  const playTone = (hz: number) => {
    if (!audioContext.current || !gainNode.current) return;
    
    if (oscillator.current) {
      oscillator.current.stop();
    }

    oscillator.current = audioContext.current.createOscillator();
    oscillator.current.type = 'sine';
    oscillator.current.frequency.setValueAtTime(hz, audioContext.current.currentTime);
    oscillator.current.connect(gainNode.current);
    oscillator.current.start();

    gainNode.current.gain.cancelScheduledValues(audioContext.current.currentTime);
    gainNode.current.gain.linearRampToValueAtTime(0.1, audioContext.current.currentTime + 0.5);
    
    setActiveFreq(hz);
  };

  const stopTone = () => {
    if (!audioContext.current || !gainNode.current) return;
    
    gainNode.current.gain.cancelScheduledValues(audioContext.current.currentTime);
    gainNode.current.gain.linearRampToValueAtTime(0, audioContext.current.currentTime + 0.5);
    
    setTimeout(() => {
      if (oscillator.current) {
        oscillator.current.stop();
        oscillator.current = null;
      }
      setActiveFreq(null);
    }, 500);
  };

  const frequencies = [
    { name: 'Grounding', hz: SOLFEGGIO_FREQUENCIES.GROUNDING, icon: Anchor, color: 'text-gray-400' },
    { name: 'Liberation', hz: SOLFEGGIO_FREQUENCIES.UT, icon: Zap, color: 'text-red-400' },
    { name: 'Change', hz: SOLFEGGIO_FREQUENCIES.RE, icon: Infinity, iconColor: 'text-orange-400' },
    { name: 'Restoration', hz: SOLFEGGIO_FREQUENCIES.MI, icon: Heart, color: 'text-green-400' },
    { name: 'Universal', hz: SOLFEGGIO_FREQUENCIES.UNIVERSAL, icon: Waves, color: 'text-blue-400' },
  ];

  return (
    <div className="flex flex-col gap-8 p-8 bg-black/40 backdrop-blur-xl rounded-[2rem] border border-white/5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black italic uppercase tracking-widest text-white">Lotus Nexus</h2>
        <div className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase">
          <div className={`w-2 h-2 rounded-full ${activeFreq ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          {activeFreq ? `${activeFreq}Hz ACTIVE` : 'ENGINE IDLE'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {frequencies.map((f) => (
          <motion.button
            key={f.hz}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleFrequency(f.hz)}
            className={`
              relative group p-6 rounded-2xl border transition-all duration-500
              ${activeFreq === f.hz 
                ? 'bg-white border-white' 
                : 'bg-white/5 border-white/10 hover:border-white/30'}
            `}
          >
            <div className={`mb-4 ${activeFreq === f.hz ? 'text-black' : 'text-white/60'}`}>
              <f.icon size={24} />
            </div>
            <div className={`text-left ${activeFreq === f.hz ? 'text-black' : 'text-white'}`}>
              <div className="text-[10px] font-black uppercase tracking-tighter opacity-50">{f.name}</div>
              <div className="text-xl font-black">{f.hz}Hz</div>
            </div>

            {activeFreq === f.hz && (
              <motion.div
                layoutId="active-ring"
                className="absolute inset-0 rounded-2xl border-4 border-white/20 animate-ping"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Visualizer Placeholder */}
      <div className="h-32 flex items-end justify-center gap-1">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              height: activeFreq ? [20, Math.random() * 80 + 20, 20] : 4
            }}
            transition={{
              duration: 0.5 + Math.random(),
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`w-1 rounded-full ${activeFreq ? 'bg-white' : 'bg-white/10'}`}
          />
        ))}
      </div>
    </div>
  );
};
