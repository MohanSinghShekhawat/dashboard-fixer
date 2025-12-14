import { useState, useCallback } from 'react';
import { useLocations, Location } from '@/hooks/useLocations';
import LocationMap from '@/components/map/LocationMap';
import LocationCard from '@/components/map/LocationCard';
import SOSButton from '@/components/safety/SOSButton';
import BottomNav from '@/components/layout/BottomNav';
import Header from '@/components/layout/Header';
import { Loader2 } from 'lucide-react';

const UserDashboard = () => {
  const { locations, isLoading, error } = useLocations();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const handleMarkerClick = useCallback((location: Location) => {
    setSelectedLocation(location);
  }, []);

  const handleCloseCard = useCallback(() => {
    setSelectedLocation(null);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading map...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-4">
          <p className="text-destructive font-medium">Error loading locations</p>
          <p className="text-sm text-muted-foreground mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 relative">
        <div className="absolute inset-0">
          <LocationMap
            locations={locations}
            onMarkerClick={handleMarkerClick}
            selectedLocation={selectedLocation}
          />
        </div>

        {selectedLocation && (
          <LocationCard location={selectedLocation} onClose={handleCloseCard} />
        )}

        <SOSButton />
      </main>

      <BottomNav />
    </div>
  );
};

export default UserDashboard;
