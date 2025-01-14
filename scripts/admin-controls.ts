import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const FUNCTION_URL = `${process.env.SUPABASE_URL}/functions/v1/load-hands`;

const adminControls = {
  async start() {
    const response = await fetch(FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action: 'start' })
    });
    
    const data = await response.json();
    console.log('Start response:', data);
  },

  async stop() {
    const response = await fetch(FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action: 'stop' })
    });
    
    const data = await response.json();
    console.log('Stop response:', data);
  },

  async status() {
    const response = await fetch(FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action: 'status' })
    });
    
    const data = await response.json();
    console.log('Status:', data);
  }
};

// Ejecutar basado en argumentos de línea de comandos
const action = process.argv[2];
if (action && adminControls[action]) {
  adminControls[action]();
} else {
  console.log('Usage: npm run admin [start|stop|status]');
} 

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const startHandProgression = async () => {
  let currentHand = 29;
  
  while (currentHand <= 1600) {
    try {
      const response = await fetch('https://[PROJECT_REF].supabase.co/functions/v1/load-hands', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ handNumber: currentHand })
      });

      if (!response.ok) throw new Error('Failed to insert hand');
      
      currentHand++;
      const waitTime = Math.floor(Math.random() * (28000 - 8000) + 8000);
      await delay(waitTime);
    } catch (error) {
      console.error('Error:', error);
      break;
    }
  }
};

startHandProgression(); 