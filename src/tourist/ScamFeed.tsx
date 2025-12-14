import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useScams } from '@/hooks/useScams';
import { ShieldAlert, MapPin, Loader2, AlertTriangle } from 'lucide-react';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import { cn } from '@/lib/utils';

const ScamFeed = () => {
  const { scams, isLoading } = useScams();

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'HIGH':
        return <Badge variant="destructive">🔴 High Risk</Badge>;
      case 'MEDIUM':
        return <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400">🟡 Medium</Badge>;
      case 'LOW':
        return <Badge variant="outline">🟢 Low Risk</Badge>;
      default:
        return null;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'HIGH':
        return 'border-l-red-500';
      case 'MEDIUM':
        return 'border-l-yellow-500';
      case 'LOW':
        return 'border-l-green-500';
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container max-w-2xl mx-auto p-4 pb-24">
        <div className="flex items-center gap-2 mb-4">
          <ShieldAlert className="h-5 w-5 text-destructive" />
          <h1 className="text-xl font-bold">Scam Alerts</h1>
        </div>

        <Card className="mb-4 bg-destructive/5 border-destructive/20">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
            <p className="text-sm text-muted-foreground">
              Stay informed about common tourist scams in Rajasthan. Knowledge is your best protection!
            </p>
          </CardContent>
        </Card>

        {/* Scam Cards */}
        <div className="space-y-3">
          {scams?.map((scam) => (
            <Card 
              key={scam.id} 
              className={cn(
                "border-l-4 overflow-hidden",
                getRiskColor(scam.risk_level)
              )}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{scam.title}</CardTitle>
                  {getRiskBadge(scam.risk_level)}
                </div>
                {scam.location && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {scam.location}
                  </div>
                )}
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3">
                  {scam.description}
                </p>
                <Accordion type="single" collapsible>
                  <AccordionItem value="avoid" className="border-none">
                    <AccordionTrigger className="py-2 text-sm font-medium text-primary hover:no-underline">
                      🛡️ How to Avoid
                    </AccordionTrigger>
                    <AccordionContent className="text-sm bg-muted/50 rounded-lg p-3">
                      {scam.how_to_avoid}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {scams?.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No scam alerts available.
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
};

export default ScamFeed;
