import { Clock, Target, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quiz } from "@/types/quiz";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  quiz: Quiz;
  onClick: () => void;
}

export const QuizCard = ({ quiz, onClick }: QuizCardProps) => {
  const difficultyColors = {
    beginner: "bg-success/10 text-success border-success/20",
    intermediate: "bg-warning/10 text-warning border-warning/20",
    advanced: "bg-destructive/10 text-destructive border-destructive/20",
  };

  const categoryGradient = quiz.category === 'frontend' 
    ? 'hover:shadow-glow-frontend' 
    : 'hover:shadow-glow-backend';

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-hover group",
        categoryGradient
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
              {quiz.title}
            </CardTitle>
            <CardDescription className="text-sm">
              {quiz.description}
            </CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className={cn("text-xs", difficultyColors[quiz.difficulty])}
          >
            {quiz.difficulty}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {quiz.estimatedTime} min
          </div>
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            {quiz.questions.length} questions
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            Quiz
          </div>
        </div>
      </CardContent>
    </Card>
  );
};