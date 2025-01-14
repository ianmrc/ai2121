import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 mt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-primary font-mono font-bold text-xl">AI</span>
            <span className="font-mono font-bold text-xl">21</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            AI-driven agent swarm optimizing bets with real-time analytics.
          </p>
        </div>
        <div>
          <h3 className="font-medium mb-4">Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Docs
              </Link>
            </li>
            <li>
              <Link to="/v2" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                V2
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-4">Contact</h3>
          <ul className="space-y-2">
            <li>
              <a href="https://t.me/ai21blackjack" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Telegram
              </a>
            </li>
            <li>
              <a href="https://twitter.com/ai21blackjack" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                X (Twitter)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;