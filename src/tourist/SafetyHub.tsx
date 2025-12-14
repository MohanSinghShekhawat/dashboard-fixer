import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Car, ShieldAlert, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import { cn } from '@/lib/utils';

const safetyTools = [
  {
    path: '/hotels',
    icon: Building2,
    emoji: '🏨',
    title: 'Check Hotels',
    description: 'Find available rooms across Rajasthan',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-500',
  },
  {
    path: '/verify-transport',
    icon: Car,
    emoji: '🚕',
    title: 'Verify Taxi',
    description: 'Check if your transport is official',
    gradient: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-500',
  },
  {
    path: '/scam-alerts',
    icon: ShieldAlert,
    emoji: '🛡️',
    title: 'Scam Alerts',
    description: 'Stay safe from common tourist scams',
    gradient: 'from-red-500/20 to-orange-500/20',
    iconColor: 'text-red-500',
  },
];

const SafetyHub = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container max-w-2xl mx-auto p-4 pb-24">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Safety Hub</h1>
          <p className="text-muted-foreground">Your travel safety toolkit</p>
        </div>

        {/* Glass Buttons Grid */}
        <div className="grid gap-4">
          {safetyTools.map((tool) => (
            <Link key={tool.path} to={tool.path}>
              <Card className={cn(
                "group cursor-pointer transition-all duration-300",
                "hover:shadow-lg hover:scale-[1.02] hover:border-primary/30",
                "backdrop-blur-sm bg-gradient-to-r",
                tool.gradient,
                "border-2 border-white/20 dark:border-white/10"
              )}>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={cn(
                    "p-3 rounded-xl bg-background/80 backdrop-blur-sm",
                    "group-hover:scale-110 transition-transform duration-300"
                  )}>
                    <tool.icon className={cn("h-7 w-7", tool.iconColor)} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <span>{tool.emoji}</span>
                      {tool.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {tool.description}
                    </p>
                  </div>
                  <ArrowRight className={cn(
                    "h-5 w-5 text-muted-foreground",
                    "group-hover:translate-x-1 group-hover:text-primary transition-all"
                  )} />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default SafetyHub;
