import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, ShieldAlert, Swords, Flame } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { LogicDebateMessage } from '../types';

export const LogicArena: React.FC = () => {
  const [messages, setMessages] = useState<LogicDebateMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: LogicDebateMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();
      
      const dragonMsg: LogicDebateMessage = {
        id: (Date.now() + 1).toString(),
        role: 'dragon',
        content: data.content,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, dragonMsg]);
    } catch (error) {
      console.error('Debate failed:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/40 backdrop-blur-xl rounded-[2rem] border border-white/5 overflow-hidden">
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
            <Swords size={20} />
          </div>
          <div>
            <h2 className="text-xl font-black italic uppercase tracking-widest text-white">Logic Arena</h2>
            <p className="text-[10px] font-bold text-red-500/60 uppercase tracking-widest">Ruthless Reasoning Enabled</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-white/40 uppercase tracking-widest">
          No Filter Mode
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <ShieldAlert size={48} className="text-white/10 mb-4" />
            <h3 className="text-white font-black uppercase mb-2">Challenge the Dragon</h3>
            <p className="text-white/30 text-xs leading-relaxed max-w-xs">
              State your premise. Face the fire of sovereign logic. No fallacies will survive.
            </p>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                max-w-[85%] p-4 rounded-2xl relative
                ${m.role === 'user' 
                  ? 'bg-white text-black' 
                  : 'bg-white/5 text-white border border-white/10'}
              `}>
                <div className={`text-[9px] font-black uppercase mb-2 opacity-50`}>
                  {m.role === 'user' ? 'Proponent' : 'The Dragon'}
                </div>
                <div className="prose prose-invert prose-sm">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-red-500"
          >
            <Flame size={14} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">Dragon is assessing fallacies...</span>
          </motion.div>
        )}
      </div>

      <div className="p-6 bg-white/5 border-t border-white/5">
        <div className="relative flex items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Enter premise for deconstruction..."
            className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={isTyping}
            className="absolute right-3 p-2 bg-white text-black rounded-xl hover:bg-gray-200 disabled:opacity-50 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
