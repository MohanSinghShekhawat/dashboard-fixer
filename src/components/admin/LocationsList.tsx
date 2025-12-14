import { useLocations } from '@/hooks/useLocations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const LocationsList = () => {
  const { locations, isLoading } = useLocations();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'HIGH':
        return <Badge className="bg-destructive text-destructive-foreground">High</Badge>;
      case 'MODERATE':
        return <Badge className="bg-warning text-warning-foreground">Moderate</Badge>;
      case 'SAFE':
        return <Badge className="bg-success text-success-foreground">Safe</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-6 bg-muted rounded w-1/3 mb-2" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <MapPin className="h-5 w-5" />
        All Locations Status
      </h2>
      
      <div className="grid gap-4">
        {locations.map((location) => (
          <Card key={location.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">{location.name}</h3>
                  {location.description && (
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {location.description}
                    </p>
                  )}
                </div>
                {getStatusBadge(location.current_status)}
              </div>
              
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{location.last_count ?? 0} people</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    {formatDistanceToNow(new Date(location.updated_at), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LocationsList;
