import { Link, useLocation } from 'react-router-dom';
import { Map, Building2, Car, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: Map, label: 'Map', emoji: '🗺️' },
  { path: '/hotels', icon: Building2, label: 'Hotels', emoji: '🏨' },
  { path: '/verify-transport', icon: Car, label: 'Transport', emoji: '🚕' },
  { path: '/scam-alerts', icon: ShieldAlert, label: 'Scams', emoji: '🛡️' },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className={cn(
      "fixed bottom-4 left-4 right-4 z-50",
      "backdrop-blur-xl bg-black/40 border border-white/20",
      "rounded-2xl shadow-2xl",
      "md:left-1/2 md:-translate-x-1/2 md:right-auto md:w-auto md:px-2"
    )}>
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all duration-200',
                isActive
                  ? 'bg-white/20 text-white scale-105'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              <span className="text-lg mb-0.5">{item.emoji}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
