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

interface TableData {
  id: string;
  trueCount: number;
  decksRemaining: number;
  edge: number;
  status: 'ACTIVE' | 'WAITING';
}

const calculateEdge = (trueCount: number): number => {
  if (trueCount <= 0) return -0.5;
  if (trueCount <= 1) return 0;
  if (trueCount <= 2) return 1;
  if (trueCount <= 3) return 1.5;
  if (trueCount <= 4) return 2;
  return 2.5;
};

const generateTableData = (): TableData[] => {
  const tables: TableData[] = [];
  const numTables = 5; // Número fijo de mesas a mostrar

  for (let i = 0; i < numTables; i++) {
    const tableNumber = Math.floor(Math.random() * 250) + 1;
    const trueCount = Number((Math.random() * 4.8 + 0.2).toFixed(1));
    const decksRemaining = Number((Math.random() * 5.2 + 1).toFixed(1));
    
    tables.push({
      id: `T${tableNumber.toString().padStart(3, '0')}`,
      trueCount,
      decksRemaining,
      edge: Number(calculateEdge(trueCount).toFixed(2)),
      status: trueCount >= 1.5 ? 'ACTIVE' : 'WAITING'
    });
  }

  return tables;
};

const DataTable = () => {
  const [tables, setTables] = useState<TableData[]>(generateTableData());

  useEffect(() => {
    const interval = setInterval(() => {
      setTables(generateTableData());
    }, 2000); // Actualizar cada 2 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glass-card animate-in">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-mono">Table ID</TableHead>
            <TableHead className="font-mono">True count</TableHead>
            <TableHead className="font-mono">Decks Remaining</TableHead>
            <TableHead className="font-mono">Edge(%)</TableHead>
            <TableHead className="font-mono">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tables.map((table) => (
            <TableRow key={table.id} className="font-mono text-sm">
              <TableCell>{table.id}</TableCell>
              <TableCell>{table.trueCount}</TableCell>
              <TableCell>{table.decksRemaining}</TableCell>
              <TableCell>{table.edge}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded ${
                  table.status === 'ACTIVE' 
                    ? 'bg-green-500/20 text-green-500' 
                    : 'bg-yellow-500/20 text-yellow-500'
                }`}>
                  {table.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default DataTable;