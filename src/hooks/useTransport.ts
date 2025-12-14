import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Transport {
  id: string;
  provider_name: string;
  vehicle_number: string;
  is_verified: boolean;
  contact: string | null;
  created_at: string;
}

export const useTransport = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<Transport | null>(null);
  const [notFound, setNotFound] = useState(false);

  const searchVehicle = async (vehicleNumber: string) => {
    setIsSearching(true);
    setResult(null);
    setNotFound(false);

    try {
      const { data, error } = await supabase
        .from('transport')
        .select('*')
        .ilike('vehicle_number', `%${vehicleNumber}%`)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setResult(data as Transport);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Error searching vehicle:', error);
      setNotFound(true);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setResult(null);
    setNotFound(false);
  };

  return { searchVehicle, isSearching, result, notFound, clearSearch };
};
