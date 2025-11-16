
import { Link } from "react-router-dom";
import { Container } from "../components/Container";
import { SearchBar } from "../components/SearchBar";
import { CategoryCard } from "../components/CategoryCard";
import { Button } from "../components/ui/button";
import { QuestionCard } from "../components/QuestionCard";
import { useStore } from "../store/useStore";
import type { Subject } from "../types";

const categories: Array<{ title: Subject; icon: string }> = [
  { title: 'Math', icon: '🔢' },
  { title: 'Programming', icon: '💻' },
  { title: 'Science', icon: '🔬' },
  { title: 'Writing', icon: '✍️' },
  { title: 'Physics', icon: '⚛️' },
  { title: 'Chemistry', icon: '🧪' },
];

export function HomePage() {
  const questions = useStore((state) => state.questions);
  const sampleQuestions = questions.filter((q) => q.isSolved).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <section className="gradient-hero py-20 md:py-32">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Learn Smarter, Together
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Get instant help with homework, explore thousands of solved problems, and connect with a community of learners and AI tutors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ask">
                <Button size="lg" className="gradient-primary text-white w-full sm:w-auto">
                  Ask a Question
                </Button>
              </Link>
              <Link to="/search">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Explore Solutions
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <section className="py-12">
          <SearchBar large className="max-w-3xl mx-auto" />
        </section>

        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Browse by Subject</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </section>

        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Recently Solved Problems</h2>
            <Link to="/search">
              <Button variant="ghost">View All →</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}