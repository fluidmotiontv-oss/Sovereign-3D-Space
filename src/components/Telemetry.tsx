import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cpu, Activity, Database, Thermometer, ShieldCheck, Zap } from 'lucide-react';
import { TelemetryData } from '../types';

export const Telemetry: React.FC = () => {
  const [data, setData] = useState<TelemetryData>({
    cpu: 12,
    gpu: 45,
    memory: 2.4,
    temp: 38,
    nodeStatus: 'online',
    tunnelHealth: 99
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        cpu: Math.min(100, Math.max(0, prev.cpu + (Math.random() - 0.5) * 5)),
        gpu: Math.min(100, Math.max(0, prev.gpu + (Math.random() - 0.5) * 8)),
        temp: Math.min(90, Math.max(30, prev.temp + (Math.random() - 0.5) * 2)),
        tunnelHealth: Math.min(100, Math.max(90, prev.tunnelHealth + (Math.random() - 0.5) * 1))
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const Metric = ({ icon: Icon, label, value, unit, color }: any) => (
    <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/5 border border-white/10">
      <div className="flex items-center justify-between">
        <div className="text-white/40"><Icon size={16} /></div>
        <div className={`text-[10px] font-black uppercase tracking-widest ${color}`}>{label}</div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black text-white">{value.toFixed(1)}</span>
        <span className="text-[10px] font-bold text-white/30 uppercase">{unit}</span>
      </div>
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${value}%` }}
          className={`h-full ${color.replace('text', 'bg')}`}
        />
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-black/40 backdrop-blur-xl rounded-[2rem] border border-white/5 h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black italic uppercase tracking-widest text-white">Sovereign Node</h2>
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Local antiX Linux v9.42.0</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <ShieldCheck size={12} />
          <span className="text-[10px] font-black uppercase tracking-widest">Encrypted Tunnel Active</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Metric icon={Cpu} label="Compute Load" value={data.cpu} unit="%" color="text-blue-400" />
        <Metric icon={Activity} label="Neural Proxy" value={data.gpu} unit="GFLOPS" color="text-purple-400" />
        <Metric icon={Thermometer} label="Thermal Core" value={data.temp} unit="°C" color="text-orange-400" />
        <Metric icon={Zap} label="Tunnel Flux" value={data.tunnelHealth} unit="Q-STAB" color="text-emerald-400" />
      </div>

      <div className="mt-8 pt-8 border-t border-white/10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Network Topology</span>
          <span className="text-[10px] font-bold text-emerald-400 uppercase">MESH ONLINE</span>
        </div>
        <div className="space-y-2">
          {['Alpha-Node-01', 'Gamma-Relay-X', 'Deep-Core-Mesh'].map((node) => (
            <div key={node} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                <span className="text-xs font-bold text-white/80">{node}</span>
              </div>
              <span className="text-[10px] font-mono text-white/20">192.168.1.{Math.floor(Math.random() * 255)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
