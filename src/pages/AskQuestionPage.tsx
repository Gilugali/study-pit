import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Container } from "../components/Container";
import { FileDropzone } from "../components/FileDropzone";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Select } from "../components/ui/select";
import { Card } from "../components/ui/card";
import { useStore } from "../store/useStore";
import type { Subject, Attachment } from "../types";

const questionSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(200, "Title too long"),
  description: z.string().min(20, "Please provide more details (at least 20 characters)"),
  subject: z.enum(['Math', 'Programming', 'Science', 'Writing', 'Physics', 'Chemistry', 'Biology', 'Other'] as const),
});

type QuestionFormData = z.infer<typeof questionSchema>;

export function AskQuestionPage() {
  const navigate = useNavigate();
  const addQuestion = useStore((state) => state.addQuestion);
  const currentUser = useStore((state) => state.currentUser);
  const [files, setFiles] = React.useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      subject: 'Math',
    },
  });

  const selectedSubject = watch('subject');

  const onSubmit = (data: QuestionFormData) => {
    setIsSubmitting(true);

    const attachments: Attachment[] = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
    }));

    const questionId = addQuestion({
      title: data.title,
      description: data.description,
      subject: data.subject,
      tags: [data.subject.toLowerCase()],
      authorId: currentUser.id,
      attachments,
    });

    setTimeout(() => {
      navigate(`/q/${questionId}`);
    }, 500);
  };

  return (
    <div className="min-h-screen py-12">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Ask a Question</h1>
            <p className="text-muted-foreground">
              Get help from our community of learners and AI tutors
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-base font-semibold">
                  Question Title
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Be specific and clear about what you need help with
                </p>
                <Input
                  id="title"
                  placeholder="e.g., How do I solve quadratic equations using the quadratic formula?"
                  {...register('title')}
                  className={errors.title ? 'border-destructive' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description" className="text-base font-semibold">
                  Description
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Provide details about your question and what you've tried
                </p>
                <Textarea
                  id="description"
                  placeholder="Explain your question in detail. Include any work you've done or concepts you're struggling with..."
                  rows={8}
                  {...register('description')}
                  className={errors.description ? 'border-destructive' : ''}
                />
                {errors.description && (
                  <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="subject" className="text-base font-semibold">
                  Subject
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Choose the subject that best matches your question
                </p>
                <select
                  id="subject"
                  {...register('subject')}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="Math">Math</option>
                  <option value="Programming">Programming</option>
                  <option value="Science">Science</option>
                  <option value="Writing">Writing</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <Label className="text-base font-semibold">
                  Attachments (Optional)
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Upload images or files to help explain your question
                </p>
                <FileDropzone onFilesAccepted={setFiles} />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="gradient-primary text-white flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Question'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">Tips for asking great questions:</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Be specific and clear in your title</li>
              <li>Include what you've already tried</li>
              <li>Add relevant images or diagrams</li>
              <li>Use proper formatting for equations or code</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
