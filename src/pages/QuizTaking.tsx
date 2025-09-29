import { useState, useEffect } from "react";
import { ArrowLeft, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuizQuestion } from "@/components/QuizQuestion";
import { Quiz, QuizState } from "@/types/quiz";

interface QuizTakingProps {
  quiz: Quiz;
  onBack: () => void;
  onComplete: (score: number, totalQuestions: number, answers: { [questionId: number]: string }) => void;
}

export const QuizTaking = ({ quiz, onBack, onComplete }: QuizTakingProps) => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    userAnswers: {},
    isCompleted: false,
    startTime: new Date(),
  });

  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - quizState.startTime.getTime()) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState.startTime]);

  const currentQuestion = quiz.questions[quizState.currentQuestionIndex];
  const progress = ((quizState.currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    setQuizState(prev => ({
      ...prev,
      userAnswers: {
        ...prev.userAnswers,
        [currentQuestion.id]: answer
      }
    }));
  };

  const handleNext = () => {
    if (quizState.currentQuestionIndex === quiz.questions.length - 1) {
      // Quiz completed
      const score = calculateScore();
      setQuizState(prev => ({ ...prev, isCompleted: true, endTime: new Date() }));
      onComplete(score, quiz.questions.length, quizState.userAnswers);
    } else {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }
  };

  const handlePrevious = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    }
  };

  const calculateScore = () => {
    return quiz.questions.reduce((score, question) => {
      const userAnswer = quizState.userAnswers[question.id];
      return userAnswer === question.correctAnswer ? score + 1 : score;
    }, 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Exit Quiz
              </Button>
              
              <div>
                <h1 className="text-lg font-bold">{quiz.title}</h1>
                <p className="text-sm text-muted-foreground">{quiz.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {formatTime(timeElapsed)}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="h-4 w-4" />
                {Object.keys(quizState.userAnswers).length}/{quiz.questions.length}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-background/50 p-4">
        <div className="container mx-auto">
          <Progress 
            value={progress} 
            variant={quiz.category === 'frontend' ? 'frontend' : 'backend'}
            className="h-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Progress: {Math.round(progress)}%</span>
            <span>Question {quizState.currentQuestionIndex + 1} of {quiz.questions.length}</span>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <QuizQuestion
          question={currentQuestion}
          questionNumber={quizState.currentQuestionIndex + 1}
          totalQuestions={quiz.questions.length}
          selectedAnswer={quizState.userAnswers[currentQuestion.id]}
          onAnswerSelect={handleAnswerSelect}
          onNext={handleNext}
          onPrevious={quizState.currentQuestionIndex > 0 ? handlePrevious : undefined}
          isLastQuestion={quizState.currentQuestionIndex === quiz.questions.length - 1}
          category={quiz.category}
        />
      </div>
    </div>
  );
};