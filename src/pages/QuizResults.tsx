import { ArrowLeft, Trophy, RotateCcw, Home, Star, Target, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Quiz } from "@/types/quiz";
import { cn } from "@/lib/utils";

interface QuizResultsProps {
  quiz: Quiz;
  score: number;
  totalQuestions: number;
  userAnswers: { [questionId: number]: string };
  onRetry: () => void;
  onBack: () => void;
  onHome: () => void;
}

export const QuizResults = ({
  quiz,
  score,
  totalQuestions,
  userAnswers,
  onRetry,
  onBack,
  onHome
}: QuizResultsProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isHighScore = percentage >= 80;
  const isPassing = percentage >= 60;

  const getScoreStatus = () => {
    if (percentage >= 90) return { label: "Excellent!", color: "text-success", bgColor: "bg-success/10" };
    if (percentage >= 80) return { label: "Great Job!", color: "text-success", bgColor: "bg-success/10" };
    if (percentage >= 60) return { label: "Good Work!", color: "text-warning", bgColor: "bg-warning/10" };
    return { label: "Keep Learning!", color: "text-destructive", bgColor: "bg-destructive/10" };
  };

  const scoreStatus = getScoreStatus();

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Quiz
            </Button>
            
            <div>
              <h1 className="text-lg font-bold">Quiz Results</h1>
              <p className="text-sm text-muted-foreground">{quiz.title}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Score Card */}
        <Card className={cn(
          "mb-8 animate-bounce-in",
          isHighScore && "ring-2 ring-success/20 shadow-glow-frontend"
        )}>
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className={cn(
                "p-6 rounded-full",
                scoreStatus.bgColor
              )}>
                {isPassing ? (
                  <Trophy className={cn("h-12 w-12", scoreStatus.color)} />
                ) : (
                  <Target className="h-12 w-12 text-muted-foreground" />
                )}
              </div>
            </div>
            
            <CardTitle className="text-3xl font-bold mb-2">
              {score}/{totalQuestions}
            </CardTitle>
            
            <div className="space-y-2">
              <Badge 
                variant="outline" 
                className={cn("text-lg px-4 py-2", scoreStatus.bgColor, scoreStatus.color)}
              >
                {scoreStatus.label}
              </Badge>
              <p className="text-4xl font-bold text-primary">{percentage}%</p>
            </div>
          </CardHeader>
          
          <CardContent>
            <Progress 
              value={percentage} 
              variant={isPassing ? 'success' : 'default'}
              className="h-3 mb-6"
            />
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="font-semibold text-success">{score}</span>
                </div>
                <p className="text-xs text-muted-foreground">Correct</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <XCircle className="h-4 w-4 text-destructive" />
                  <span className="font-semibold text-destructive">{totalQuestions - score}</span>
                </div>
                <p className="text-xs text-muted-foreground">Incorrect</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-warning" />
                  <span className="font-semibold">{percentage}%</span>
                </div>
                <p className="text-xs text-muted-foreground">Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question Review */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Question Review
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {quiz.questions.map((question, index) => {
              const userAnswer = userAnswers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <p className="font-medium text-sm flex-1">
                      {index + 1}. {question.question}
                    </p>
                    <div className="flex items-center gap-2 ml-4">
                      {isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive" />
                      )}
                    </div>
                  </div>
                  
                  <div className="grid gap-2 text-sm">
                    <div className="flex gap-2">
                      <span className="text-muted-foreground min-w-[80px]">Your answer:</span>
                      <span className={isCorrect ? "text-success" : "text-destructive"}>
                        {userAnswer || "No answer"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground min-w-[80px]">Correct:</span>
                      <span className="text-success">{question.correctAnswer}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            onClick={onRetry} 
            className={cn(
              "gap-2",
              quiz.category === 'frontend' 
                ? "bg-frontend hover:bg-frontend-dark" 
                : "bg-backend hover:bg-backend-dark"
            )}
          >
            <RotateCcw className="h-4 w-4" />
            Retry Quiz
          </Button>
          
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Quizzes
          </Button>
          
          <Button variant="outline" onClick={onHome} className="gap-2">
            <Home className="h-4 w-4" />
            Home
          </Button>
        </div>

        {/* Encouragement Message */}
        <div className="text-center mt-8 p-6 bg-muted/30 rounded-lg">
          {isPassing ? (
            <p className="text-muted-foreground">
              🎉 Congratulations! You've demonstrated solid understanding of {quiz.title.toLowerCase()}. 
              Keep up the excellent work!
            </p>
          ) : (
            <p className="text-muted-foreground">
              📚 Don't worry! Learning is a journey. Review the concepts and try again. 
              You've got this!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};