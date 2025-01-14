import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

const calculateEdge = (trueCount: number): number => {
  if (trueCount <= 0) return -0.5;
  if (trueCount <= 1) return 0;
  if (trueCount <= 2) return 1;
  if (trueCount <= 3) return 1.5;
  if (trueCount <= 4) return 2;
  return 2.5;
};

const generateTableData = () => {
  const tables = [];
  const numTables = 5;

  for (let i = 0; i < numTables; i++) {
    const tableNumber = Math.floor(Math.random() * 250) + 1;
    const trueCount = Number((Math.random() * 4.8 + 0.2).toFixed(1));
    const decksRemaining = Number((Math.random() * 5.2 + 1).toFixed(1));
    
    tables.push({
      id: `T${tableNumber.toString().padStart(3, '0')}`,
      true_count: trueCount,
      decks_remaining: decksRemaining,
      edge: Number(calculateEdge(trueCount).toFixed(2)),
      status: trueCount >= 1.5 ? 'ACTIVE' : 'WAITING',
      updated_at: new Date()
    });
  }

  return tables;
};

// Función que se ejecuta cada 2 segundos
Deno.cron("update-tables", "*/4 * * * * *", async () => {
  const tables = generateTableData();
  
  const { error } = await supabase
    .from('active_tables')
    .upsert(tables, { onConflict: 'id' });

  if (error) {
    console.error('Error updating tables:', error);
  }
}); 
