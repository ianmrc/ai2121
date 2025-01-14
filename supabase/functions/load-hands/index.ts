import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

let isLoading = false;
let currentHand = 29;
const TOTAL_HANDS = 1600;

const insertNextHand = async () => {
  if (!isLoading || currentHand > TOTAL_HANDS) {
    isLoading = false;
    return;
  }

  const { error } = await supabase
    .from('hand_stats')
    .insert([{
      hand_number: currentHand,
      timestamp: new Date().toISOString(),
      table_id: `T${Math.floor(Math.random() * 250 + 1).toString().padStart(3, '0')}`,
      action: ['HIT', 'STAND', 'DOUBLE', 'SPLIT'][Math.floor(Math.random() * 4)],
      hand_played: ['A,9', '7,8', '9,9', '2,3', 'Q,K'][Math.floor(Math.random() * 5)],
      dealers_card: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'][Math.floor(Math.random() * 10)],
      dealer_final_hand: ['17', '18', '19', '20', '21', 'BUST'][Math.floor(Math.random() * 6)],
      true_count: Number((Math.random() * 6 - 1).toFixed(2)),
      edge: Number((Math.random() * 4 - 1).toFixed(2)),
      bet_size: Number((Math.random() * 90 + 10).toFixed(2)),
      result: Math.random() > 0.5 ? 'WIN' : 'LOSS'
    }]);

  if (error) {
    console.error(`Error inserting hand ${currentHand}:`, error);
    return;
  }

  currentHand++;
  const delay = Math.floor(Math.random() * (28000 - 8000) + 8000);
  setTimeout(insertNextHand, delay);
};

Deno.serve(async (req) => {
  if (req.method === 'POST') {
    const { action } = await req.json();
    
    if (action === 'start') {
      if (!isLoading) {
        isLoading = true;
        currentHand = 29;
        insertNextHand();
        return new Response(JSON.stringify({ status: 'started' }));
      }
      return new Response(JSON.stringify({ status: 'already_running' }));
    }
  }
  
  return new Response('Method not allowed', { status: 405 });
}); 