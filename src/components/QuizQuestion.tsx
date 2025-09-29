import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { QuizQuestion as QuizQuestionType } from "@/types/quiz";
import { cn } from "@/lib/utils";

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: string;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
  onPrevious?: () => void;
  isLastQuestion: boolean;
  category: 'frontend' | 'backend' | 'algorithms' | 'design-patterns' | 'security';
}

export const QuizQuestion = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
  isLastQuestion,
  category
}: QuizQuestionProps) => {
  const [showExplanation, setShowExplanation] = useState(false);

  const handleNext = () => {
    if (selectedAnswer && question.explanation) {
      setShowExplanation(true);
      setTimeout(() => {
        setShowExplanation(false);
        onNext();
      }, 2000);
    } else {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {/* Question Card */}
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Question {questionNumber} of {totalQuestions}
            </span>
            <span 
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium",
                category === 'frontend' 
                  ? "bg-frontend/10 text-frontend" 
                  : "bg-backend/10 text-backend"
              )}
            >
              {category === 'frontend' ? 'Front-end' : 'Back-end'}
            </span>
          </div>
          <CardTitle className="text-xl leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <RadioGroup
            value={selectedAnswer}
            onValueChange={onAnswerSelect}
            className="space-y-4"
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 group">
                <RadioGroupItem
                  value={option}
                  id={`option-${index}`}
                  className={cn(
                    "transition-colors",
                    category === 'frontend' ? "data-[state=checked]:border-frontend data-[state=checked]:text-frontend" : "data-[state=checked]:border-backend data-[state=checked]:text-backend"
                  )}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 p-4 rounded-lg border cursor-pointer transition-all hover:bg-muted/50 group-hover:border-primary"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Explanation */}
      {showExplanation && question.explanation && (
        <Card className="animate-bounce-in border-success bg-success/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-success flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-success-foreground text-sm font-bold">✓</span>
              </div>
              <div>
                <p className="font-medium text-success mb-2">Explanation</p>
                <p className="text-sm text-muted-foreground">{question.explanation}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!onPrevious}
          className="gap-2"
        >
          Previous
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={!selectedAnswer}
          className={cn(
            "gap-2 min-w-[120px]",
            category === 'frontend' 
              ? "bg-frontend hover:bg-frontend-dark" 
              : "bg-backend hover:bg-backend-dark"
          )}
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
        </Button>
      </div>
    </div>
  );
};