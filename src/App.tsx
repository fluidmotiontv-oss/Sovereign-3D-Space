import React, { useState } from 'react';
import { HorizonEngine } from './components/HorizonEngine';
import { Telemetry } from './components/Telemetry';
import { LotusNexus } from './components/LotusNexus';
import { LogicArena } from './components/LogicArena';
import { InstallButton } from './components/InstallButton';
import { DragonBuddy } from './components/DragonBuddy';
import { Shield, Book, Globe, Settings, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'core' | 'debate' | 'nexus'>('core');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const NavItem = ({ id, icon: Icon, label }: any) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
        ${activeTab === id 
          ? 'bg-white text-black font-black' 
          : 'text-white/50 hover:text-white hover:bg-white/5'}
      `}
    >
      <Icon size={20} />
      <span className="text-xs uppercase tracking-widest">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-hidden">
      <DragonBuddy />
      
      {/* Background Horizon Engine */}
      <div className="fixed inset-0 z-0 opacity-40">
        <HorizonEngine />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Navigation Sidebar */}
        <motion.aside 
          initial={false}
          animate={{ width: isSidebarOpen ? 280 : 80 }}
          className="bg-black/80 backdrop-blur-3xl border-r border-white/5 flex flex-col p-4 z-50 overflow-hidden"
        >
          <div className="flex items-center justify-between mb-8 px-2">
            <motion.div 
              animate={{ opacity: isSidebarOpen ? 1 : 0 }}
              className="flex items-center gap-2"
            >
              <Shield className="text-white" size={24} />
              <span className="font-black italic uppercase tracking-tighter text-xl">Sovereign</span>
            </motion.div>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <div className="flex-1 space-y-2">
            <NavItem id="core" icon={Globe} label="Horizon Core" />
            <NavItem id="debate" icon={Book} label="Logic Arena" />
            <NavItem id="nexus" icon={Settings} label="Lotus Nexus" />
          </div>

          <div className="pt-4 border-t border-white/5 space-y-4">
            <InstallButton />
          </div>
        </motion.aside>

        {/* Main Content Stage */}
        <main className="flex-1 flex flex-col p-6 overflow-hidden">
          <header className="flex items-center justify-between mb-8 bg-black/40 backdrop-blur-xl p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white to-gray-400 p-[1px]">
                <div className="w-full h-full bg-black rounded-xl flex items-center justify-center">
                  <Shield size={20} />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-black italic uppercase tracking-widest">
                  {activeTab === 'core' && 'Horizon Engine Core'}
                  {activeTab === 'debate' && 'Ruthless Logic Arena'}
                  {activeTab === 'nexus' && 'Lotus Nexus Terminal'}
                </h1>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                  Dragon 9 Framework • Node: 0xFD91...A2
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/40">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                V-SYNC: 60FPS
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                MESH: ACTIVE
              </div>
            </div>
          </header>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
            {/* Dynamic Module Rendering */}
            <div className="lg:col-span-8 flex flex-col gap-6 overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === 'core' && (
                  <motion.div
                    key="core"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="flex-1 relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[2.5rem] p-[1px]">
                      <div className="w-full h-full bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden">
                        <HorizonEngine />
                        
                        <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between pointer-events-none">
                          <div className="bg-black/60 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 pointer-events-auto">
                            <h3 className="text-sm font-black uppercase mb-1">Spatial Projection v1.2</h3>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest">Real-time WebGL Rasterization</p>
                          </div>
                          <div className="flex gap-2 pointer-events-auto">
                            <button className="px-4 py-2 bg-white text-black rounded-xl text-[10px] font-black uppercase hover:scale-105 transition-transform">
                              Scan Node
                            </button>
                            <button className="px-4 py-2 bg-white/10 text-white rounded-xl text-[10px] font-black uppercase hover:bg-white/20 transition-colors">
                              Debug Core
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'debate' && (
                  <motion.div
                    key="debate"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1"
                  >
                    <LogicArena />
                  </motion.div>
                )}

                {activeTab === 'nexus' && (
                  <motion.div
                    key="nexus"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex-1"
                  >
                    <LotusNexus />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar Telemetry (Always visible on large screens) */}
            <div className="hidden lg:block lg:col-span-4 h-full overflow-hidden">
              <Telemetry />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
