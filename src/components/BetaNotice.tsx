import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const BetaNotice = () => {
  return (
    <Alert variant="default" className="bg-[#1d283a] border-blue-900 mt-4">
      <AlertCircle className="h-4 w-4 text-blue-400" />
      <AlertDescription className="text-sm text-muted-foreground ml-2">
        Please Note: AI21 Blackjack Team is in beta testing. All blackjack agents run in simulation mode, analyzing strategies and simulating plays without using real funds. Your understanding and feedback are greatly valued.
      </AlertDescription>
    </Alert>
  );
};

export default BetaNotice; 