import * as React from "react";
import { useParams, Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Container } from "../components/Container";
import { AnswerAccordion } from "../components/AnswerAccordion";
import { UpvoteButton } from "../components/UpvoteButton";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import { Accordion } from "../components/ui/accordion";
import { Separator } from "../components/ui/separator";
import { useStore } from "../store/useStore";

export function QuestionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const getQuestionById = useStore((state) => state.getQuestionById);
  const getAnswersByQuestionId = useStore((state) => state.getAnswersByQuestionId);
  const getSimilarQuestions = useStore((state) => state.getSimilarQuestions);
  const upvoteQuestion = useStore((state) => state.upvoteQuestion);
  const addAnswer = useStore((state) => state.addAnswer);
  const isSaved = useStore((state) => state.isSaved);
  const toggleSave = useStore((state) => state.toggleSave);

  const question = id ? getQuestionById(id) : undefined;
  const answers = id ? getAnswersByQuestionId(id) : [];
  const similarQuestions = question ? getSimilarQuestions(question.subject, question.id) : [];
  const saved = question ? isSaved(question.id) : false;

  React.useEffect(() => {
    if (question && answers.length === 0) {
      const mockAnswers = [
        {
          questionId: question.id,
          content: `Here's a comprehensive solution to your ${question.subject} question.`,
          steps: [
            'First, identify the key components of the problem',
            'Apply the relevant formula or concept',
            'Work through the calculation step by step',
            'Verify your answer makes sense in context',
          ],
          authorId: 'ai-tutor',
          authorName: 'AI Tutor',
          authorType: 'AI Tutor' as const,
        },
        {
          questionId: question.id,
          content: `Let me provide an alternative approach to this problem.`,
          steps: [
            'Consider the problem from a different angle',
            'Use a visualization or diagram if helpful',
            'Break down complex steps into simpler ones',
            'Double-check your work at each stage',
          ],
          authorId: 'peer-helper',
          authorName: 'Study Helper',
          authorType: 'Peer Helper' as const,
        },
      ];

      mockAnswers.forEach((answer) => addAnswer(answer));
    }
  }, [question, answers.length, addAnswer]);

  if (!question) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Question not found</h1>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <Container>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h1 className="text-3xl font-bold">{question.title}</h1>
                    <Button
                      variant={saved ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleSave(question.id)}
                    >
                      {saved ? '⭐ Saved' : '☆ Save'}
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <Badge>{question.subject}</Badge>
                    {question.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                    <span className="text-sm text-muted-foreground">
                      Asked {formatDistanceToNow(question.createdAt, { addSuffix: true })}
                    </span>
                  </div>

                  <p className="text-foreground/90 whitespace-pre-wrap mb-6">
                    {question.description}
                  </p>

                  {question.attachments.length > 0 && (
                    <div className="space-y-2 mb-6">
                      <h3 className="font-semibold text-sm">Attachments:</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {question.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="border border-border rounded-lg overflow-hidden"
                          >
                            {attachment.type.startsWith('image/') ? (
                              <img
                                src={attachment.url}
                                alt={attachment.name}
                                className="w-full h-32 object-cover"
                              />
                            ) : (
                              <div className="p-4 flex items-center gap-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="text-sm">{attachment.name}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Separator className="my-6" />

                  <div className="flex items-center gap-3">
                    <UpvoteButton
                      count={question.upvotes}
                      onUpvote={() => upvoteQuestion(question.id)}
                    />
                    <Button variant="outline" size="sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      Comment
                    </Button>
                    <Button variant="ghost" size="sm">
                      Report
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
              </h2>
              <Accordion>
                {answers.map((answer) => (
                  <AnswerAccordion key={answer.id} answer={answer} />
                ))}
              </Accordion>
              {answers.length === 0 && (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">
                    No answers yet. Be the first to help!
                  </p>
                </Card>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Similar Questions</h3>
              {similarQuestions.length > 0 ? (
                <div className="space-y-3">
                  {similarQuestions.map((q) => (
                    <Link
                      key={q.id}
                      to={`/q/${q.id}`}
                      className="block p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <h4 className="font-medium text-sm line-clamp-2 mb-1">
                        {q.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{q.upvotes} upvotes</span>
                        <span>•</span>
                        <span>{q.answerCount} answers</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No similar questions found
                </p>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Need More Help?</h3>
              <div className="space-y-3">
                <Link to="/ask">
                  <Button variant="outline" className="w-full justify-start">
                    Ask a New Question
                  </Button>
                </Link>
                <Link to="/search">
                  <Button variant="outline" className="w-full justify-start">
                    Browse Library
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
