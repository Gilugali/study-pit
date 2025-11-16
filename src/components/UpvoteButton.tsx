import * as React from "react";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";

interface UpvoteButtonProps {
  count: number;
  onUpvote: () => void;
  isUpvoted?: boolean;
  size?: 'sm' | 'default' | 'lg';
}

export function UpvoteButton({ count, onUpvote, isUpvoted = false, size = 'default' }: UpvoteButtonProps) {
  const [voted, setVoted] = React.useState(isUpvoted);

  const handleClick = () => {
    if (!voted) {
      onUpvote();
      setVoted(true);
    }
  };

  return (
    <Button
      variant={voted ? "default" : "outline"}
      size={size}
      onClick={handleClick}
      disabled={voted}
      className={cn("flex items-center gap-2", voted && "bg-primary")}
      aria-label={`Upvote (${count})`}
    >
      <svg
        className={size === 'sm' ? "w-4 h-4" : "w-5 h-5"}
        fill={voted ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
        />
      </svg>
      <span className="font-semibold">{count}</span>
    </Button>
  );
}
