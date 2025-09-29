import { ArrowLeft, Code2, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizCard } from "@/components/QuizCard";
import { Quiz, QuizCategory } from "@/types/quiz";
import quizData from "@/data/quizzes.json";

interface QuizListProps {
  categoryId: string;
  onBack: () => void;
  onQuizSelect: (quiz: Quiz) => void;
}

export const QuizList = ({ categoryId, onBack, onQuizSelect }: QuizListProps) => {
  const categories = quizData.categories as QuizCategory[];
  const category = categories.find(c => c.id === categoryId);
  
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Category not found</p>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  const Icon = category.icon === 'Code2' ? Code2 : Server;
  const isFrontend = category.id === 'frontend';

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            <div className="flex items-center gap-3">
              <div 
                className={`p-2 rounded-xl ${
                  isFrontend 
                    ? 'bg-gradient-frontend text-frontend-foreground' 
                    : 'bg-gradient-backend text-backend-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold">{category.name}</h1>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Available Quizzes
          </h2>
          <p className="text-muted-foreground">
            Choose a quiz to test your knowledge and track your progress
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {category.quizzes.map((quiz, index) => (
            <div 
              key={quiz.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <QuizCard
                quiz={quiz}
                onClick={() => onQuizSelect(quiz)}
              />
            </div>
          ))}
        </div>

        {category.quizzes.length === 0 && (
          <div className="text-center py-16">
            <Icon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No quizzes available</h3>
            <p className="text-muted-foreground">
              Check back later for new quizzes in this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
};