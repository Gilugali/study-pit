import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { Container } from "../components/Container";
import { SearchBar } from "../components/SearchBar";
import { QuestionCard } from "../components/QuestionCard";
import { Chip } from "../components/ui/chip";
import { useStore } from "../store/useStore";
import type { Subject, Difficulty } from "../types";

const subjects: Subject[] = ['Math', 'Programming', 'Science', 'Writing', 'Physics', 'Chemistry', 'Biology', 'Other'];
const difficulties: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced'];

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const questions = useStore((state) => state.questions);

  const [selectedSubjects, setSelectedSubjects] = React.useState<Subject[]>(() => {
    const subject = searchParams.get('subject');
    return subject ? [subject as Subject] : [];
  });
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<Difficulty | null>(null);
  const [recency, setRecency] = React.useState<'Newest' | 'Trending'>('Newest');
  const [searchQuery, setSearchQuery] = React.useState(() => searchParams.get('q') || '');

  React.useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
    const subject = searchParams.get('subject');
    if (subject && !selectedSubjects.includes(subject as Subject)) {
      setSelectedSubjects([subject as Subject]);
    }
  }, [searchParams]);

  const toggleSubject = (subject: Subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const filteredQuestions = React.useMemo(() => {
    let result = questions;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (q) =>
          q.title.toLowerCase().includes(query) ||
          q.description.toLowerCase().includes(query) ||
          q.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selectedSubjects.length > 0) {
      result = result.filter((q) => selectedSubjects.includes(q.subject));
    }

    if (selectedDifficulty) {
      result = result.filter((q) => q.difficulty === selectedDifficulty);
    }

    if (recency === 'Newest') {
      result = [...result].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    } else {
      result = [...result].sort((a, b) => b.upvotes - a.upvotes);
    }

    return result;
  }, [questions, searchQuery, selectedSubjects, selectedDifficulty, recency]);

  return (
    <div className="min-h-screen py-8">
      <Container>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6">Question Library</h1>
          <SearchBar placeholder="Search questions..." />
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-sm mb-3 text-muted-foreground">SUBJECTS</h3>
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <Chip
                  key={subject}
                  selected={selectedSubjects.includes(subject)}
                  onClick={() => toggleSubject(subject)}
                  variant="primary"
                >
                  {subject}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3 text-muted-foreground">DIFFICULTY</h3>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((difficulty) => (
                <Chip
                  key={difficulty}
                  selected={selectedDifficulty === difficulty}
                  onClick={() =>
                    setSelectedDifficulty(
                      selectedDifficulty === difficulty ? null : difficulty
                    )
                  }
                  variant="default"
                >
                  {difficulty}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3 text-muted-foreground">SORT BY</h3>
            <div className="flex flex-wrap gap-2">
              <Chip
                selected={recency === 'Newest'}
                onClick={() => setRecency('Newest')}
                variant="accent"
              >
                Newest
              </Chip>
              <Chip
                selected={recency === 'Trending'}
                onClick={() => setRecency('Trending')}
                variant="accent"
              >
                Trending
              </Chip>
            </div>
          </div>

          <div className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {filteredQuestions.length} {filteredQuestions.length === 1 ? 'Question' : 'Questions'}
              </h2>
              {(selectedSubjects.length > 0 || selectedDifficulty || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedSubjects([]);
                    setSelectedDifficulty(null);
                    setSearchQuery('');
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {filteredQuestions.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredQuestions.map((question) => (
                  <QuestionCard key={question.id} question={question} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold mb-2">No questions found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
