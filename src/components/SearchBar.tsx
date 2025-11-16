import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  large?: boolean;
}

export function SearchBar({ placeholder = "Ask or browse any question...", className, large }: SearchBarProps) {
  const [query, setQuery] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative flex items-center">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={large ? "h-14 pl-12 pr-4 text-lg rounded-2xl" : "pl-10"}
          />
          <svg
            className={`absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground ${large ? 'w-6 h-6' : 'w-5 h-5'}`}
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
        {large && (
          <Button type="submit" className="ml-2 h-14 px-8" size="lg">
            Search
          </Button>
        )}
      </div>
    </form>
  );
}
