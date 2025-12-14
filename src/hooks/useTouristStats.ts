import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface TouristStat {
  id: string;
  date: string;
  domestic_count: number;
  international_count: number;
  created_at: string;
}

export const useTouristStats = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['tourist-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tourist_stats')
        .select('*')
        .order('date', { ascending: false })
        .limit(7);
      
      if (error) throw error;
      return data as TouristStat[];
    },
  });

  const addStatMutation = useMutation({
    mutationFn: async (newStat: { date: string; domestic_count: number; international_count: number }) => {
      const { data, error } = await supabase
        .from('tourist_stats')
        .upsert(newStat, { onConflict: 'date' })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tourist-stats'] });
      toast({
        title: "Success",
        description: "Tourist statistics added successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return { stats, isLoading, addStat: addStatMutation.mutate, isAdding: addStatMutation.isPending };
};
