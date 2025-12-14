import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { MapPin, Radio, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const BuddyWatch = () => {
  const [isSharing, setIsSharing] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Buddy Watch
        </CardTitle>
        <CardDescription>
          Share your live location with your emergency contact
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="location-share" className="flex items-center gap-2 cursor-pointer">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Share Live Location
          </Label>
          <Switch
            id="location-share"
            checked={isSharing}
            onCheckedChange={setIsSharing}
          />
        </div>

        {isSharing && (
          <div className={cn(
            "p-4 rounded-lg border animate-fade-in",
            "bg-primary/5 border-primary/20"
          )}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="p-2 rounded-full bg-primary text-primary-foreground">
                  <Radio className="h-5 w-5" />
                </div>
                {/* Pulsing animation */}
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-primary">Broadcasting Location</p>
                <p className="text-sm text-muted-foreground">
                  Sharing with: <span className="font-medium">Emergency Contact</span>
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Live</span>
              </div>
              <span>•</span>
              <span>Updates every 30 seconds</span>
            </div>
          </div>
        )}

        {!isSharing && (
          <p className="text-sm text-muted-foreground">
            When enabled, your location will be shared in real-time with your designated emergency contact for added safety during travel.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default BuddyWatch;
