import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuizCategory } from "@/types/quiz";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: QuizCategory;
  Icon: LucideIcon;
  onClick: () => void;
}

export const CategoryCard = ({ category, Icon, onClick }: CategoryCardProps) => {
  const isFrontend = category.id === 'frontend';
  
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-500 hover:scale-105 group relative overflow-hidden",
        "hover:shadow-hover",
        isFrontend ? "hover:shadow-glow-frontend" : "hover:shadow-glow-backend"
      )}
      onClick={onClick}
    >
      <div 
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500",
          isFrontend ? "bg-gradient-frontend" : "bg-gradient-backend"
        )}
      />
      
      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-center justify-between">
          <div 
            className={cn(
              "p-3 rounded-xl transition-all duration-300 group-hover:scale-110",
              isFrontend 
                ? "bg-frontend/10 text-frontend group-hover:bg-frontend group-hover:text-frontend-foreground" 
                : "bg-backend/10 text-backend group-hover:bg-backend group-hover:text-backend-foreground"
            )}
          >
            <Icon className="h-8 w-8" />
          </div>
          <Badge 
            variant="secondary" 
            className="bg-background/50 backdrop-blur-sm"
          >
            {category.quizzes.length} quizzes
          </Badge>
        </div>
        
        <div className="space-y-2">
          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
            {category.name}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            {category.description}
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Available topics:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {category.quizzes.slice(0, 3).map((quiz) => (
              <Badge 
                key={quiz.id} 
                variant="outline" 
                className="text-xs bg-background/50 backdrop-blur-sm"
              >
                {quiz.title}
              </Badge>
            ))}
            {category.quizzes.length > 3 && (
              <Badge 
                variant="outline" 
                className="text-xs bg-background/50 backdrop-blur-sm"
              >
                +{category.quizzes.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};