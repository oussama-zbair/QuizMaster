import { Code2, Server, Trophy, Users, GraduationCap, Brain, Palette, Shield } from "lucide-react";
import { CategoryCard } from "@/components/CategoryCard";
import { QuizCategory } from "@/types/quiz";
import quizData from "@/data/quizzes.json";

interface HomeProps {
  onCategorySelect: (categoryId: string) => void;
}

export const Home = ({ onCategorySelect }: HomeProps) => {
  const categories = quizData.categories as QuizCategory[];
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return Code2;
      case 'Server':
        return Server;
      default:
        return Code2;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-xl">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">QuizMaster</h1>
                <p className="text-sm text-muted-foreground">Interactive Learning Platform</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Master Your Skills
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Test your knowledge in front-end and back-end development with our interactive quiz platform.
            </p>
            
            <div className="flex items-center justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="h-5 w-5" />
                <span>Interactive Learning</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Trophy className="h-5 w-5" />
                <span>Progress Tracking</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-5 w-5" />
                <span>For Students</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Choose Your Learning Path</h3>
            <p className="text-muted-foreground">
              Select a category to start your quiz journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {categories.map((category) => {
              const IconComponent = getIcon(category.icon);
              return (
                <div key={category.id} className="animate-scale-in">
                  <CategoryCard
                    category={category}
                    Icon={IconComponent}
                    onClick={() => onCategorySelect(category.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-primary">
                {categories.reduce((total, cat) => total + cat.quizzes.length, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Total Quizzes</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-frontend">
                {categories.find(c => c.id === 'frontend')?.quizzes.length || 0}
              </div>
              <p className="text-sm text-muted-foreground">Front-end</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-backend">
                {categories.find(c => c.id === 'backend')?.quizzes.length || 0}
              </div>
              <p className="text-sm text-muted-foreground">Back-end</p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-success">
                ∞
              </div>
              <p className="text-sm text-muted-foreground">Possibilities</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};