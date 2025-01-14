import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { handStatsService } from '@/services/hand-stats';
import type { HandStats } from "@/types/hand-stats";
import { Button } from "@/components/ui/button";
import { supabase } from '@/lib/supabase';

const HandStatsTable = () => {
  const [stats, setStats] = useState<HandStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let currentHand = 29;

    // 1. Cargar las primeras 28 manos
    const loadInitialHands = async () => {
      const { data, error } = await supabase
        .from('hand_stats')
        .select('*')
        .order('hand_number', { ascending: false })
        .lte('hand_number', 28);

      if (error) {
        console.error('Error:', error);
        return;
      }

      setStats(data || []);
      setLoading(false);
    };

    // 2. Función para cargar la siguiente mano
    const loadNextHand = async () => {
      if (currentHand > 1600) return;

      const { data, error } = await supabase
        .from('hand_stats')
        .select('*')
        .eq('hand_number', currentHand)
        .single();

      if (error) {
        console.error('Error:', error);
        return;
      }

      if (data) {
        setStats(prev => [data, ...prev]);
        currentHand++;
        
        // Programar la siguiente carga
        const delay = Math.floor(Math.random() * (5000 - 1000) + 1000);
        setTimeout(loadNextHand, delay);
      }
    };

    // 3. Iniciar el proceso
    loadInitialHands().then(() => loadNextHand());
  }, []);

  return (
    <Card className="glass-card animate-in">
      <div className="max-h-[420px] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono sticky top-0 bg-background">#</TableHead>
              <TableHead className="font-mono sticky top-0 bg-background">Timestamp</TableHead>
              <TableHead className="font-mono sticky top-0 bg-background">Table ID</TableHead>
              <TableHead className="font-mono sticky top-0 bg-background">Action</TableHead>
              <TableHead className="font-mono sticky top-0 bg-background">Hand</TableHead>
              <TableHead className="font-mono sticky top-0 bg-background">Dealer Card</TableHead>
              <TableHead className="font-mono sticky top-0 bg-background">Dealer Final</TableHead>
              <TableHead className="font-mono sticky top-0 bg-background">True Count</TableHead>
              <TableHead className="font-mono sticky top-0 bg-background">Edge</TableHead>
              <TableHead className="font-mono sticky top-0 bg-background">Bet Size</TableHead>
              <TableHead className="font-mono sticky top-0 bg-background">Result</TableHead>
              <TableHead className="font-mono sticky top-0 bg-background">Amount Won/Lost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.map((stat) => (
              <TableRow key={stat.id} className="font-mono text-sm">
                <TableCell>{stat.hand_number}</TableCell>
                <TableCell>{new Date(stat.timestamp).toLocaleString()}</TableCell>
                <TableCell>{stat.table_id}</TableCell>
                <TableCell>{stat.action}</TableCell>
                <TableCell>{stat.hand_played}</TableCell>
                <TableCell>{stat.dealers_card}</TableCell>
                <TableCell>{stat.dealer_final_hand}</TableCell>
                <TableCell>{stat.true_count.toFixed(2)}</TableCell>
                <TableCell>{stat.edge.toFixed(2)}</TableCell>
                <TableCell>${stat.bet_size.toFixed(2)}</TableCell>
                <TableCell>{stat.result}</TableCell>
                <TableCell>${stat.amount_won_lost.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default HandStatsTable;
