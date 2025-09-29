export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: 'frontend' | 'backend' | 'algorithms' | 'design-patterns' | 'security';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  questions: QuizQuestion[];
}

export interface QuizCategory {
  id: 'frontend' | 'backend' | 'algorithms' | 'design-patterns' | 'security';
  name: string;
  description: string;
  icon: string;
  quizzes: Quiz[];
}

export interface QuizAttempt {
  quizId: string;
  userAnswers: { [questionId: number]: string };
  score: number;
  totalQuestions: number;
  completedAt: Date;
}



export interface QuizState {
  currentQuestionIndex: number;
  userAnswers: { [questionId: number]: string };
  isCompleted: boolean;
  startTime: Date;
  endTime?: Date;
}