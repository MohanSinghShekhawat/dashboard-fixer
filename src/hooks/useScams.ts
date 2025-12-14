import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Scam {
  id: string;
  title: string;
  description: string;
  risk_level: 'HIGH' | 'MEDIUM' | 'LOW';
  how_to_avoid: string;
  location: string | null;
  created_at: string;
}

export const useScams = () => {
  const { data: scams, isLoading } = useQuery({
    queryKey: ['scams'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('scams')
        .select('*')
        .order('risk_level', { ascending: true });
      
      if (error) throw error;
      return data as Scam[];
    },
  });

  return { scams, isLoading };
};
