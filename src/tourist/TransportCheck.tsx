import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTransport } from '@/hooks/useTransport';
import { Search, ShieldCheck, ShieldAlert, Loader2, Phone, User, Car } from 'lucide-react';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import { cn } from '@/lib/utils';

const TransportCheck = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const { searchVehicle, isSearching, result, notFound, clearSearch } = useTransport();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (vehicleNumber.trim()) {
      searchVehicle(vehicleNumber.trim());
    }
  };

  const handleClear = () => {
    setVehicleNumber('');
    clearSearch();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container max-w-2xl mx-auto p-4 pb-24">
        <Card className="border-2">
          <CardHeader className="text-center">
            <div className="mx-auto p-3 rounded-full bg-primary/10 w-fit mb-2">
              <Car className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-xl">Verify Your Transport</CardTitle>
            <CardDescription>
              Check if your taxi/cab is officially registered with Rajasthan Tourism
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Big Search Bar */}
            <form onSubmit={handleSearch} className="space-y-3">
              <Input
                placeholder="Enter Vehicle Number (e.g., RJ-14-PA-1234)"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                className="text-center text-lg font-mono h-14 border-2"
              />
              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  disabled={isSearching || !vehicleNumber.trim()}
                  className="flex-1 h-12 text-base"
                >
                  {isSearching ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    <Search className="h-5 w-5 mr-2" />
                  )}
                  Verify Vehicle
                </Button>
                {(result || notFound) && (
                  <Button type="button" variant="outline" onClick={handleClear} className="h-12">
                    Clear
                  </Button>
                )}
              </div>
            </form>

            {/* Result: Verified Vehicle */}
            {result && result.is_verified && (
              <div className={cn(
                "p-5 rounded-xl border-2 animate-fade-in",
                "bg-green-50 border-green-500 dark:bg-green-950/30"
              )}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-green-500 text-white shrink-0">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-green-700 dark:text-green-400">
                      ✅ Official Vehicle
                    </h4>
                    <p className="text-sm text-green-600 dark:text-green-500">
                      Verified by Rajasthan Tourism Department
                    </p>
                  </div>
                </div>
                <div className="space-y-3 text-sm bg-white/50 dark:bg-black/20 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">Provider:</span>
                    <span className="font-semibold">{result.provider_name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Car className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">Vehicle:</span>
                    <span className="font-mono font-semibold bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded">
                      {result.vehicle_number}
                    </span>
                  </div>
                  {result.contact && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-muted-foreground">Contact:</span>
                      <a href={`tel:${result.contact}`} className="font-semibold text-primary hover:underline">
                        {result.contact}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Result: Found but not verified */}
            {result && !result.is_verified && (
              <div className={cn(
                "p-5 rounded-xl border-2 animate-fade-in",
                "bg-yellow-50 border-yellow-500 dark:bg-yellow-950/30"
              )}>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-yellow-500 text-white shrink-0">
                    <ShieldAlert className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-yellow-700 dark:text-yellow-400">
                      ⚠️ Pending Verification
                    </h4>
                    <p className="text-sm text-yellow-600 dark:text-yellow-500">
                      Vehicle found but not officially verified yet
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Result: Not Found */}
            {notFound && (
              <div className={cn(
                "p-5 rounded-xl border-2 animate-fade-in",
                "bg-red-50 border-red-500 dark:bg-red-950/30"
              )}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 rounded-full bg-red-500 text-white shrink-0">
                    <ShieldAlert className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-red-700 dark:text-red-400">
                      ❌ Unregistered Vehicle
                    </h4>
                    <p className="text-sm text-red-600 dark:text-red-500">
                      This vehicle is NOT in our official database
                    </p>
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3 text-sm">
                  <p className="font-medium text-red-700 dark:text-red-400">⚠️ Safety Tips:</p>
                  <ul className="list-disc list-inside text-red-600 dark:text-red-500 mt-1 space-y-1">
                    <li>Do not share personal information</li>
                    <li>Consider using a verified transport option</li>
                    <li>Share your trip details with a friend</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <BottomNav />
    </div>
  );
};

export default TransportCheck;
