import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { Question, Answer, User, SavedItem } from '../types';

interface StoreState {
  questions: Question[];
  answers: Answer[];
  users: User[];
  savedItems: SavedItem[];
  currentUser: User;

  // Actions
  addQuestion: (question: Omit<Question, 'id' | 'createdAt' | 'upvotes' | 'answerCount' | 'isSolved'>) => string;
  upvoteQuestion: (questionId: string) => void;
  addAnswer: (answer: Omit<Answer, 'id' | 'createdAt' | 'upvotes'>) => void;
  upvoteAnswer: (answerId: string) => void;
  toggleSave: (questionId: string) => void;
  getQuestionById: (id: string) => Question | undefined;
  getAnswersByQuestionId: (questionId: string) => Answer[];
  getSimilarQuestions: (subject: string, currentId: string, limit?: number) => Question[];
  isSaved: (questionId: string) => boolean;
  getQuestionsByAuthor: (authorId: string) => Question[];
  getAnswersByAuthor: (authorId: string) => Answer[];
  getSavedQuestions: () => Question[];
}

const seedQuestions: Question[] = [
  {
    id: '1',
    title: 'How do I solve quadratic equations using the quadratic formula?',
    description: 'I understand the basic concept but I am struggling with applying the formula to real problems. Can someone explain step by step?',
    subject: 'Math',
    difficulty: 'Beginner',
    tags: ['algebra', 'equations'],
    authorId: 'user-1',
    attachments: [],
    upvotes: 42,
    answerCount: 3,
    createdAt: new Date('2024-01-15'),
    isSolved: true,
  },
  {
    id: '2',
    title: 'Understanding React hooks - useState vs useEffect',
    description: 'What is the difference between useState and useEffect? When should I use each one?',
    subject: 'Programming',
    difficulty: 'Intermediate',
    tags: ['react', 'hooks', 'javascript'],
    authorId: 'user-2',
    attachments: [],
    upvotes: 128,
    answerCount: 5,
    createdAt: new Date('2024-01-14'),
    isSolved: true,
  },
  {
    id: '3',
    title: "Newton's Third Law - Action and Reaction",
    description: 'Can someone explain why objects don\'t move when forces are equal and opposite?',
    subject: 'Physics',
    difficulty: 'Beginner',
    tags: ['mechanics', 'laws of motion'],
    authorId: 'user-1',
    attachments: [],
    upvotes: 67,
    answerCount: 2,
    createdAt: new Date('2024-01-13'),
    isSolved: true,
  },
  {
    id: '4',
    title: 'How to balance chemical equations efficiently?',
    description: 'I struggle with balancing complex chemical equations. Any tips or strategies?',
    subject: 'Chemistry',
    difficulty: 'Intermediate',
    tags: ['stoichiometry', 'equations'],
    authorId: 'user-3',
    attachments: [],
    upvotes: 89,
    answerCount: 4,
    createdAt: new Date('2024-01-12'),
    isSolved: true,
  },
  {
    id: '5',
    title: 'Writing compelling thesis statements',
    description: 'How do I create a strong thesis statement for an argumentative essay?',
    subject: 'Writing',
    difficulty: 'Intermediate',
    tags: ['essay', 'thesis', 'academic writing'],
    authorId: 'user-2',
    attachments: [],
    upvotes: 54,
    answerCount: 3,
    createdAt: new Date('2024-01-11'),
    isSolved: true,
  },
];

const seedAnswers: Answer[] = [
  {
    id: 'a1',
    questionId: '1',
    content: 'The quadratic formula is x = (-b ± √(b²-4ac)) / 2a. Let me break this down step by step.',
    steps: [
      'Identify coefficients a, b, and c from your equation ax² + bx + c = 0',
      'Calculate the discriminant: b² - 4ac',
      'Substitute values into the formula',
      'Simplify to get your two solutions',
    ],
    authorId: 'ai-tutor',
    authorName: 'Math AI',
    authorType: 'AI Tutor',
    upvotes: 35,
    createdAt: new Date('2024-01-15T10:30:00'),
  },
  {
    id: 'a2',
    questionId: '2',
    content: 'useState is for managing component state, while useEffect handles side effects.',
    steps: [
      'useState: Creates a state variable that triggers re-renders when changed',
      'useEffect: Runs code after render, like fetching data or subscribing to events',
      'useState example: const [count, setCount] = useState(0)',
      'useEffect example: useEffect(() => { fetchData(); }, [dependency])',
    ],
    authorId: 'ai-tutor',
    authorName: 'Code Helper',
    authorType: 'AI Tutor',
    upvotes: 92,
    createdAt: new Date('2024-01-14T14:20:00'),
  },
  {
    id: 'a3',
    questionId: '3',
    content: 'The forces act on DIFFERENT objects, not the same object.',
    steps: [
      'When you push a wall, you exert force on the wall',
      'The wall exerts equal and opposite force on you',
      'These forces cancel out only if they act on the same object',
      'Since they act on different objects, each object responds to its own net force',
    ],
    authorId: 'peer-1',
    authorName: 'Physics Student',
    authorType: 'Peer Helper',
    upvotes: 48,
    createdAt: new Date('2024-01-13T09:15:00'),
  },
];

const seedUsers: User[] = [
  {
    id: 'current-user',
    username: 'Alex Johnson',
    avatar: '',
    badges: ['Top Helper', 'AI Contributor'],
  },
  {
    id: 'user-1',
    username: 'Sarah Miller',
    badges: ['Active Learner'],
  },
  {
    id: 'user-2',
    username: 'Mike Chen',
    badges: ['Top Helper'],
  },
  {
    id: 'user-3',
    username: 'Emma Davis',
    badges: [],
  },
];

export const useStore = create<StoreState>((set, get) => ({
  questions: seedQuestions,
  answers: seedAnswers,
  users: seedUsers,
  savedItems: [],
  currentUser: seedUsers[0],

  addQuestion: (question) => {
    const id = uuidv4();
    const newQuestion: Question = {
      ...question,
      id,
      createdAt: new Date(),
      upvotes: 0,
      answerCount: 0,
      isSolved: false,
    };
    set((state) => ({
      questions: [newQuestion, ...state.questions],
    }));
    return id;
  },

  upvoteQuestion: (questionId) => {
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === questionId ? { ...q, upvotes: q.upvotes + 1 } : q
      ),
    }));
  },

  addAnswer: (answer) => {
    const id = uuidv4();
    const newAnswer: Answer = {
      ...answer,
      id,
      createdAt: new Date(),
      upvotes: 0,
    };
    set((state) => ({
      answers: [...state.answers, newAnswer],
      questions: state.questions.map((q) =>
        q.id === answer.questionId
          ? { ...q, answerCount: q.answerCount + 1, isSolved: true }
          : q
      ),
    }));
  },

  upvoteAnswer: (answerId) => {
    set((state) => ({
      answers: state.answers.map((a) =>
        a.id === answerId ? { ...a, upvotes: a.upvotes + 1 } : a
      ),
    }));
  },

  toggleSave: (questionId) => {
    const { currentUser, savedItems } = get();
    const existingIndex = savedItems.findIndex(
      (item) => item.questionId === questionId && item.userId === currentUser.id
    );

    if (existingIndex >= 0) {
      set((state) => ({
        savedItems: state.savedItems.filter((_, i) => i !== existingIndex),
      }));
    } else {
      set((state) => ({
        savedItems: [
          ...state.savedItems,
          {
            userId: currentUser.id,
            questionId,
            savedAt: new Date(),
          },
        ],
      }));
    }
  },

  getQuestionById: (id) => {
    return get().questions.find((q) => q.id === id);
  },

  getAnswersByQuestionId: (questionId) => {
    return get().answers.filter((a) => a.questionId === questionId);
  },

  getSimilarQuestions: (subject, currentId, limit = 5) => {
    return get()
      .questions.filter((q) => q.subject === subject && q.id !== currentId && q.isSolved)
      .slice(0, limit);
  },

  isSaved: (questionId) => {
    const { currentUser, savedItems } = get();
    return savedItems.some(
      (item) => item.questionId === questionId && item.userId === currentUser.id
    );
  },

  getQuestionsByAuthor: (authorId) => {
    return get().questions.filter((q) => q.authorId === authorId);
  },

  getAnswersByAuthor: (authorId) => {
    return get().answers.filter((a) => a.authorId === authorId);
  },

  getSavedQuestions: () => {
    const { currentUser, savedItems, questions } = get();
    const savedIds = savedItems
      .filter((item) => item.userId === currentUser.id)
      .map((item) => item.questionId);
    return questions.filter((q) => savedIds.includes(q.id));
  },
}));
