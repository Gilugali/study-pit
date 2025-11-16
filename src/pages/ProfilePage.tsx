
import { Link } from "react-router-dom";
import { Container } from "../components/Container";
import { Avatar } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { useStore } from "../store/useStore";

export function ProfilePage() {
  const currentUser = useStore((state) => state.currentUser);
  const getQuestionsByAuthor = useStore((state) => state.getQuestionsByAuthor);
  const getAnswersByAuthor = useStore((state) => state.getAnswersByAuthor);
  const getSavedQuestions = useStore((state) => state.getSavedQuestions);
  const getQuestionById = useStore((state) => state.getQuestionById);

  const myQuestions = getQuestionsByAuthor(currentUser.id);
  const myAnswers = getAnswersByAuthor(currentUser.id);
  const savedQuestions = getSavedQuestions();

  return (
    <div className="min-h-screen py-8">
      <Container>
        <Card className="p-8 mb-8">
          <div className="flex items-start gap-6">
            <Avatar
              fallback={currentUser.username}
              size="lg"
              className="w-24 h-24 text-2xl"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{currentUser.username}</h1>
                  <div className="flex items-center gap-2">
                    {currentUser.badges.map((badge) => (
                      <Badge key={badge} variant="secondary">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button variant="outline">Edit Profile</Button>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-6">
                <div>
                  <div className="text-3xl font-bold text-primary">{myQuestions.length}</div>
                  <div className="text-sm text-muted-foreground">Questions Asked</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">{myAnswers.length}</div>
                  <div className="text-sm text-muted-foreground">Answers Given</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">{savedQuestions.length}</div>
                  <div className="text-sm text-muted-foreground">Saved Problems</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="questions">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="questions">My Questions</TabsTrigger>
            <TabsTrigger value="answers">My Answers</TabsTrigger>
            <TabsTrigger value="saved">Saved Problems</TabsTrigger>
          </TabsList>

          <TabsContent value="questions">
            {myQuestions.length > 0 ? (
              <div className="space-y-4">
                {myQuestions.map((question) => (
                  <Card key={question.id} className="p-5">
                    <Link to={`/q/${question.id}`}>
                      <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                        {question.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-3">
                      <Badge>{question.subject}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {question.upvotes} upvotes
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {question.answerCount} answers
                      </span>
                      {question.isSolved && (
                        <Badge variant="secondary" className="text-xs">
                          Solved
                        </Badge>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
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
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold mb-2">No questions yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start your learning journey by asking your first question
                </p>
                <Link to="/ask">
                  <Button>Ask a Question</Button>
                </Link>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="answers">
            {myAnswers.length > 0 ? (
              <div className="space-y-4">
                {myAnswers.map((answer) => {
                  const question = getQuestionById(answer.questionId);
                  return (
                    <Card key={answer.id} className="p-5">
                      <div className="mb-3">
                        <span className="text-sm text-muted-foreground">Answer to:</span>
                        <Link to={`/q/${answer.questionId}`}>
                          <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                            {question?.title}
                          </h3>
                        </Link>
                      </div>
                      <p className="text-sm text-foreground/80 mb-3 line-clamp-2">
                        {answer.content}
                      </p>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{answer.authorType}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {answer.upvotes} upvotes
                        </span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="p-12 text-center">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="text-xl font-semibold mb-2">No answers yet</h3>
                <p className="text-muted-foreground">
                  Help others by answering questions in the community
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="saved">
            {savedQuestions.length > 0 ? (
              <div className="space-y-4">
                {savedQuestions.map((question) => (
                  <Card key={question.id} className="p-5">
                    <Link to={`/q/${question.id}`}>
                      <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                        {question.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {question.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <Badge>{question.subject}</Badge>
                      {question.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      <span className="text-sm text-muted-foreground ml-auto">
                        {question.upvotes} upvotes
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
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
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                <h3 className="text-xl font-semibold mb-2">No saved problems</h3>
                <p className="text-muted-foreground mb-4">
                  Save questions to review them later
                </p>
                <Link to="/search">
                  <Button>Browse Questions</Button>
                </Link>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
}
