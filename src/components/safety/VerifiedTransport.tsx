import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTransport } from '@/hooks/useTransport';
import { Search, ShieldCheck, AlertTriangle, Loader2, Phone, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const VerifiedTransport = () => {
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Verify Transport
        </CardTitle>
        <CardDescription>
          Check if a vehicle is registered with Rajasthan Tourism
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Enter Vehicle Number (e.g., RJ-14-PA-1234)"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
            className="flex-1 font-mono"
          />
          <Button type="submit" disabled={isSearching || !vehicleNumber.trim()}>
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </Button>
          {(result || notFound) && (
            <Button type="button" variant="outline" onClick={handleClear}>
              Clear
            </Button>
          )}
        </form>

        {/* Result Display */}
        {result && result.is_verified && (
          <div className={cn(
            "p-4 rounded-lg border-2 animate-fade-in",
            "bg-green-50 border-green-500 dark:bg-green-950/30"
          )}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-full bg-green-500 text-white">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-green-700 dark:text-green-400">Official Verified Vehicle</h4>
                <p className="text-sm text-green-600 dark:text-green-500">Registered with Rajasthan Tourism</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Provider:</span> {result.provider_name}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded">
                  {result.vehicle_number}
                </span>
              </div>
              {result.contact && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Contact:</span>
                  <a href={`tel:${result.contact}`} className="text-primary hover:underline">
                    {result.contact}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {result && !result.is_verified && (
          <div className={cn(
            "p-4 rounded-lg border-2 animate-fade-in",
            "bg-yellow-50 border-yellow-500 dark:bg-yellow-950/30"
          )}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-yellow-500 text-white">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-yellow-700 dark:text-yellow-400">Vehicle Found - Not Verified</h4>
                <p className="text-sm text-yellow-600 dark:text-yellow-500">
                  This vehicle is registered but not officially verified
                </p>
              </div>
            </div>
          </div>
        )}

        {notFound && (
          <div className={cn(
            "p-4 rounded-lg border-2 animate-fade-in",
            "bg-yellow-50 border-yellow-500 dark:bg-yellow-950/30"
          )}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-yellow-500 text-white">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-yellow-700 dark:text-yellow-400">Unregistered Vehicle</h4>
                <p className="text-sm text-yellow-600 dark:text-yellow-500">
                  This vehicle is not in our database. Exercise caution.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VerifiedTransport;
