import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "./Container";
import { Avatar } from "../components/ui/avatar";
import { Switch } from "../components/ui/switch";
import { Input } from "../components/ui/input";
import { Sheet } from "../components/ui/sheet";
import { useStore } from "../store/useStore";

export function Header() {
  const [isDark, setIsDark] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();
  const currentUser = useStore((state) => state.currentUser);

  React.useEffect(() => {
    const dark = document.documentElement.classList.contains('dark');
    setIsDark(dark);
  }, []);

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold">
              SL
            </div>
            <span className="font-bold text-lg hidden sm:inline">Student Learning Hub</span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </form>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/ask" className="text-sm font-medium hover:text-primary transition-colors">
              Ask
            </Link>
            <Link to="/search" className="text-sm font-medium hover:text-primary transition-colors">
              Library
            </Link>
            <Link to="/profile" className="text-sm font-medium hover:text-primary transition-colors">
              Community
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground hidden sm:inline">
                {isDark ? '🌙' : '☀️'}
              </span>
              <Switch checked={isDark} onCheckedChange={toggleDarkMode} aria-label="Toggle dark mode" />
            </div>
            <Link to="/profile">
              <Avatar
                fallback={currentUser.username}
                alt={currentUser.username}
                size="sm"
              />
            </Link>
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      <Sheet open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} side="right">
        <div className="p-6 space-y-4">
          <Link
            to="/"
            className="block text-lg font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/ask"
            className="block text-lg font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Ask
          </Link>
          <Link
            to="/search"
            className="block text-lg font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Library
          </Link>
          <Link
            to="/profile"
            className="block text-lg font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Community
          </Link>
        </div>
      </Sheet>
    </header>
  );
}
