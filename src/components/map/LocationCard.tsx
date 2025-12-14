import { Location } from '@/hooks/useLocations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, MapPin, Users, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface LocationCardProps {
  location: Location;
  onClose: () => void;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'HIGH':
      return {
        label: 'High Crowd',
        className: 'bg-destructive text-destructive-foreground',
      };
    case 'MODERATE':
      return {
        label: 'Moderate Crowd',
        className: 'bg-warning text-warning-foreground',
      };
    case 'SAFE':
      return {
        label: 'Safe',
        className: 'bg-success text-success-foreground',
      };
    default:
      return {
        label: 'Unknown',
        className: 'bg-muted text-muted-foreground',
      };
  }
};

const LocationCard = ({ location, onClose }: LocationCardProps) => {
  const statusConfig = getStatusConfig(location.current_status);
  const timeAgo = formatDistanceToNow(new Date(location.updated_at), { addSuffix: true });

  return (
    <Card className="absolute bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-80 elevation-3 z-50 animate-in slide-in-from-bottom-4">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{location.name}</CardTitle>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Badge className={statusConfig.className}>{statusConfig.label}</Badge>
        
        {location.description && (
          <p className="text-sm text-muted-foreground">{location.description}</p>
        )}
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{location.last_count ?? 0} People</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Updated {timeAgo}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
