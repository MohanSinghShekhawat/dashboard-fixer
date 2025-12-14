import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHotels } from '@/hooks/useHotels';
import { Building2, Star, MapPin, Loader2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import { cn } from '@/lib/utils';

const HotelFinder = () => {
  const { hotels, isLoading } = useHotels();
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  // Get unique districts
  const districts = useMemo(() => {
    if (!hotels) return [];
    const unique = [...new Set(hotels.map(h => h.district))];
    return unique.sort();
  }, [hotels]);

  // Filter and calculate occupancy
  const filteredHotels = useMemo(() => {
    if (!hotels) return [];
    const filtered = selectedDistrict === 'all' 
      ? hotels 
      : hotels.filter(h => h.district === selectedDistrict);
    
    return filtered.map(hotel => ({
      ...hotel,
      occupancy: Math.round((hotel.occupied_rooms / hotel.total_rooms) * 100),
    }));
  }, [hotels, selectedDistrict]);

  const renderStars = (rating: number) => {
    return Array.from({ length: rating }).map((_, i) => (
      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
    ));
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
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Hotel Availability
          </h1>
        </div>

        {/* District Filter */}
        <div className="mb-4">
          <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by District" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Districts</SelectItem>
              {districts.map(district => (
                <SelectItem key={district} value={district}>{district}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Hotel List */}
        <div className="space-y-3">
          {filteredHotels.map((hotel) => (
            <Card 
              key={hotel.id} 
              className={cn(
                "transition-all",
                hotel.occupancy > 90 && "border-destructive/50 bg-destructive/5"
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold truncate">{hotel.name}</h3>
                      {hotel.occupancy > 90 ? (
                        <Badge variant="destructive" className="text-xs">
                          🔴 High Demand
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                          🟢 Available
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{hotel.district}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      {renderStars(hotel.rating)}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={cn(
                      "text-2xl font-bold",
                      hotel.occupancy > 90 ? "text-destructive" : "text-green-600"
                    )}>
                      {100 - hotel.occupancy}%
                    </div>
                    <div className="text-xs text-muted-foreground">rooms free</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No hotels found in this district.
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
};

export default HotelFinder;
