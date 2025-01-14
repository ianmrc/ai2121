import { supabase } from '@/lib/supabase';
import type { HandStats } from '@/types/hand-stats';

export const handStatsService = {
  async loadHandsSequentially(
    onHandLoaded: (hand: HandStats) => void
  ) {
    const { data: hands, error } = await supabase
      .from('hand_stats')
      .select('*')
      .order('hand_number', { ascending: true });

    if (error || !hands) {
      console.error('Error cargando manos:', error);
      return;
    }

    for (let i = 0; i < hands.length; i++) {
      const delay = Math.floor(Math.random() * (3000 - 1000 + 1) + 1000);
      await new Promise(resolve => setTimeout(resolve, delay));
      onHandLoaded(hands[i]);
    }
  }
}; 