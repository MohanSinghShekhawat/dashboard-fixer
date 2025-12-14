import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Hotel {
  id: string;
  name: string;
  district: string;
  rating: number;
  total_rooms: number;
  occupied_rooms: number;
  created_at: string;
  updated_at: string;
}

export const useHotels = () => {
  const { data: hotels, isLoading } = useQuery({
    queryKey: ['hotels'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Hotel[];
    },
  });

  return { hotels, isLoading };
};
