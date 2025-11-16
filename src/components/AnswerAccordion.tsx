import * as React from "react";
import { AccordionItem } from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import type { Answer } from "../types";
import { useStore } from "../store/useStore";

interface AnswerAccordionProps {
  answer: Answer;
}

export function AnswerAccordion({ answer }: AnswerAccordionProps) {
  const upvoteAnswer = useStore((state) => state.upvoteAnswer);
  const [hasUpvoted, setHasUpvoted] = React.useState(false);

  const handleUpvote = () => {
    if (!hasUpvoted) {
      upvoteAnswer(answer.id);
      setHasUpvoted(true);
    }
  };

  return (
    <AccordionItem title="Step-by-Step Explanation" defaultOpen>
      <div className="space-y-4">
        <p className="text-sm text-foreground/90">{answer.content}</p>

        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Steps:</h4>
          <ol className="list-decimal list-inside space-y-2">
            {answer.steps.map((step, index) => (
              <li key={index} className="text-sm text-foreground/80">
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              by <span className="font-medium text-foreground">{answer.authorName}</span>
            </span>
            <Badge variant={answer.authorType === 'AI Tutor' ? 'default' : 'secondary'} className="text-xs">
              {answer.authorType}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleUpvote}
            disabled={hasUpvoted}
            className="flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill={hasUpvoted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span className="font-medium">{answer.upvotes}</span>
          </Button>
        </div>
      </div>
    </AccordionItem>
  );
}
