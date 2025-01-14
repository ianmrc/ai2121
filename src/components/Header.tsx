import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-primary font-mono font-bold text-xl">AI</span>
          <span className="font-mono font-bold text-xl">21</span>
        </Link>
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-sm hover:text-primary transition-colors">
            Home
          </Link>
          <a href="https://ai21.gitbook.io/ai21" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">
            Docs
          </a>
          <a href="https://ai21.gitbook.io/ai21" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">
            V2
          </a>
          <a href="https://ai21.gitbook.io/ai21/token/token" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">
            Token
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
