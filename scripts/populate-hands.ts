import { supabase } from '@/lib/supabase';

const populateHandStats = async () => {
  const totalHands = 1600;
  
  for (let i = 1; i <= totalHands; i++) {
    const hand = {
      hand_number: i,
      timestamp: new Date(2025, 0, 11, Math.floor(i / 100), i % 60).toISOString(),
      table_id: `T${Math.floor(Math.random() * 250 + 1).toString().padStart(3, '0')}`,
      action: ['HIT', 'STAND', 'DOUBLE', 'SPLIT'][Math.floor(Math.random() * 4)],
      hand_played: ['A,9', '7,8', '9,9', '2,3', 'Q,K'][Math.floor(Math.random() * 5)],
      dealers_card: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'].at(Math.floor(Math.random() * 10)),
      dealer_final_hand: ['17', '18', '19', '20', '21', 'BUST'].at(Math.floor(Math.random() * 6)),
      true_count: Number((Math.random() * 6 - 1).toFixed(2)),
      edge: Number((Math.random() * 4 - 1).toFixed(2)),
      bet_size: Number((Math.random() * 90 + 10).toFixed(2)),
      result: Math.random() > 0.5 ? 'WIN' : 'LOSS',
      amount_won_lost: 0 // Se calcula después
    };

    // Calcular amount_won_lost basado en result y bet_size
    hand.amount_won_lost = hand.result === 'WIN' ? hand.bet_size : -hand.bet_size;

    const { error } = await supabase
      .from('hand_stats')
      .insert([hand]);

    if (error) {
      console.error(`Error inserting hand ${i}:`, error);
      break;
    }

    console.log(`Inserted hand ${i}`);
  }
};

populateHandStats(); 