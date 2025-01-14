import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatsCard from "@/components/StatsCard";
import BankrollChart from "@/components/BankrollChart";
import DataTable from "@/components/DataTable";
import HandStatsTable from "@/components/HandStatsTable";
import { Button } from "@/components/ui/button";
import BetaNotice from "@/components/BetaNotice";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen grid-pattern">
      <Header />
      <main className="container mx-auto px-6 pt-24">
        <section className="space-y-8 mb-16">
          <div className="max-w-2xl animate-in">
            <h1 className="text-4xl font-bold mb-4">What is AI21?</h1>
            <p className="text-lg text-muted-foreground mb-6">
              AI21 Blackjack Team uses an advanced swarm of AI agents to dominate blackjack. The Scout Agent monitors tables and provides real-time data, 
              the Core Agent evaluates opportunities and determines bets, the Betting Agent executes plays based on optimal strategies, and the Evaluator 
              Agent continuously analyzes performance, ensuring system efficiency and identifying areas for improvement. This dynamic system fuels a 
              deflationary token model, burning $AI21 with 90% of generated profits.
            </p>
            <a href="https://ai21.gitbook.io/ai21" target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary hover:bg-primary/90">Learn More</Button>
            </a>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard 
            title="Initial Bankroll" 
            value="10,000"
            prefix="$"
          />
          <StatsCard 
            title="Total Bets Placed" 
            value="2,677"
          />
          <StatsCard 
            title="Win Rate" 
            value="54.3"
            suffix="%"
          />
          <StatsCard 
            title="Profits/Loss" 
            value="3,701.65"
            prefix="$"
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Bankroll History</h2>
          <BankrollChart />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Hand Statistics</h2>
          <HandStatsTable />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Active Tables</h2>
          <DataTable />
          <BetaNotice />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
