import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Location {
  id: string;
  name: string;
  description: string | null;
  latitude: number;
  longitude: number;
  current_status: 'HIGH' | 'MODERATE' | 'SAFE';
  last_count: number | null;
  updated_at: string;
}

export const useLocations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = async () => {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .order('name');

    if (error) {
      setError(error.message);
    } else {
      setLocations(data as Location[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLocations();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('locations-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'locations',
        },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            setLocations((prev) =>
              prev.map((loc) =>
                loc.id === payload.new.id ? (payload.new as Location) : loc
              )
            );
          } else if (payload.eventType === 'INSERT') {
            setLocations((prev) => [...prev, payload.new as Location]);
          } else if (payload.eventType === 'DELETE') {
            setLocations((prev) =>
              prev.filter((loc) => loc.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { locations, isLoading, error, refetch: fetchLocations };
};
