import * as React from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import type { Question } from "../types";

interface QuestionCardProps {
  question: Question;
  showSolved?: boolean;
}

export function QuestionCard({ question, showSolved = true }: QuestionCardProps) {
  return (
    <Link to={`/q/${question.id}`}>
      <Card className="card-hover p-5 cursor-pointer">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-semibold text-lg line-clamp-2 flex-1">{question.title}</h3>
          {showSolved && question.isSolved && (
            <Badge variant="secondary" className="shrink-0 text-xs">
              Solved
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {question.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline">{question.subject}</Badge>
            {question.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            <span className="font-medium">{question.upvotes}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
