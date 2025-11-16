export type Subject = 'Math' | 'Programming' | 'Science' | 'Writing' | 'Physics' | 'Chemistry' | 'Biology' | 'Other';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface User {
  id: string;
  username: string;
  avatar?: string;
  badges: string[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
}

export interface Answer {
  id: string;
  questionId: string;
  content: string;
  steps: string[];
  authorId: string;
  authorName: string;
  authorType: 'AI Tutor' | 'Peer Helper';
  upvotes: number;
  createdAt: Date;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  subject: Subject;
  difficulty?: Difficulty;
  tags: string[];
  authorId: string;
  attachments: Attachment[];
  upvotes: number;
  answerCount: number;
  createdAt: Date;
  isSolved: boolean;
}

export interface SavedItem {
  userId: string;
  questionId: string;
  savedAt: Date;
}

export interface FilterState {
  subjects: Subject[];
  difficulty?: Difficulty;
  recency: 'Newest' | 'Trending';
}