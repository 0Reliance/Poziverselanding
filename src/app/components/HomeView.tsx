import { motion } from 'motion/react';
import { ArrowRight, Book, Code, Layers, Rocket, Shield, Terminal, Zap } from 'lucide-react';

export function HomeView({ onNavigate }: { onNavigate: (navItem: string) => void }) {
  return (
    <div className="h-full w-full overflow-y-auto bg-black/20 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto p-8 md:p-12 space-y-12">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            System Online v1.0.0
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Poziverse</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            Your centralized workspace orchestrator. Manage projects, resources, and deployments from a single glassmorphic interface.
          </p>
        </motion.div>

        {/* Quick Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickLinkCard 
            icon={Layers}
            title="Projects"
            description="Manage your active development projects and assets."
            color="blue"
            onClick={() => onNavigate('projects')}
            delay={0.1}
          />
          <QuickLinkCard 
            icon={Code}
            title="Resources"
            description="Access snippets, API keys, and documentation bookmarks."
            color="emerald"
            onClick={() => onNavigate('resources')}
            delay={0.2}
          />
          <QuickLinkCard 
            icon={Rocket}
            title="Launchpad"
            description="Deploy and monitor your applications."
            color="orange"
            onClick={() => onNavigate('launchpad')}
            delay={0.3}
          />
        </div>

        {/* Documentation & Instructions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Getting Started */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                <Zap className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-white">Getting Started</h2>
            </div>
            
            <div className="space-y-4">
              <InstructionStep number="01" title="Explore Resources" text="Check the Resources tab to find API keys and code snippets for your development." />
              <InstructionStep number="02" title="Manage Projects" text="Use the Projects view to organize your ongoing work and assets." />
              <InstructionStep number="03" title="Deploy" text="Ready to ship? Head to the Launchpad to manage your deployments." />
            </div>
          </div>

          {/* System Info */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Terminal className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-white">System Information</h2>
            </div>
            
            <div className="space-y-4">
              <InfoRow label="Environment" value="Development" />
              <InfoRow label="Version" value="1.0.0-alpha" />
              <InfoRow label="Region" value="us-east-1" />
              <InfoRow label="Last Sync" value="Just now" />
              
              <div className="pt-4 mt-4 border-t border-white/10">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Active Services</h3>
                <div className="flex gap-2">
                  <ServiceBadge name="Auth" status="online" />
                  <ServiceBadge name="Database" status="online" />
                  <ServiceBadge name="Storage" status="online" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap gap-6 pt-8 border-t border-white/10"
        >
          <FooterLink icon={Book} label="Documentation" href="#" />
          <FooterLink icon={Shield} label="Security Policy" href="#" />
          <FooterLink icon={Code} label="API Reference" href="#" />
        </motion.div>

      </div>
    </div>
  );
}

function QuickLinkCard({ icon: Icon, title, description, color, onClick, delay }: any) {
  const colors: any = {
    blue: "group-hover:border-blue-500/50 group-hover:shadow-blue-500/20 text-blue-400",
    emerald: "group-hover:border-emerald-500/50 group-hover:shadow-emerald-500/20 text-emerald-400",
    orange: "group-hover:border-orange-500/50 group-hover:shadow-orange-500/20 text-orange-400",
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      onClick={onClick}
      className={`group text-left p-6 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 ${colors[color].split(' ')[0]} ${colors[color].split(' ')[1]}`}
    >
      <div className={`mb-4 p-3 rounded-xl bg-white/5 w-fit ${colors[color].split(' ').pop()}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
        {title}
        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed">
        {description}
      </p>
    </motion.button>
  );
}

function InstructionStep({ number, title, text }: any) {
  return (
    <div className="flex gap-4">
      <span className="text-xs font-mono text-gray-500 pt-1">{number}</span>
      <div>
        <h4 className="text-sm font-medium text-white mb-1">{title}</h4>
        <p className="text-sm text-gray-400 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: any) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm text-gray-300 font-mono">{value}</span>
    </div>
  );
}

function ServiceBadge({ name, status }: any) {
  return (
    <div className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 flex items-center gap-2">
      <div className={`w-1.5 h-1.5 rounded-full ${status === 'online' ? 'bg-emerald-500' : 'bg-red-500'}`} />
      <span className="text-xs text-gray-300">{name}</span>
    </div>
  );
}

function FooterLink({ icon: Icon, label, href }: any) {
  return (
    <a href={href} className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
      <Icon className="w-4 h-4" />
      {label}
    </a>
  );
}
