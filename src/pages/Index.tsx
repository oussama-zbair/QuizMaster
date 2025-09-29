import { useState } from "react";
import { Home } from "./Home";
import { QuizList } from "./QuizList";
import { QuizTaking } from "./QuizTaking";
import { QuizResults } from "./QuizResults";
import { Quiz } from "@/types/quiz";

type AppState = 
  | { view: 'home' }
  | { view: 'quiz-list'; categoryId: string }
  | { view: 'quiz-taking'; quiz: Quiz }
  | { view: 'quiz-results'; quiz: Quiz; score: number; totalQuestions: number; userAnswers: { [questionId: number]: string } };

const Index = () => {
  const [appState, setAppState] = useState<AppState>({ view: 'home' });

  const handleCategorySelect = (categoryId: string) => {
    setAppState({ view: 'quiz-list', categoryId });
  };

  const handleQuizSelect = (quiz: Quiz) => {
    setAppState({ view: 'quiz-taking', quiz });
  };

  const handleQuizComplete = (score: number, totalQuestions: number, userAnswers: { [questionId: number]: string }) => {
    if (appState.view === 'quiz-taking') {
      setAppState({ 
        view: 'quiz-results', 
        quiz: appState.quiz, 
        score, 
        totalQuestions, 
        userAnswers 
      });
    }
  };

  const handleRetry = () => {
    if (appState.view === 'quiz-results') {
      setAppState({ view: 'quiz-taking', quiz: appState.quiz });
    }
  };

  const handleBackToQuizList = () => {
    if (appState.view === 'quiz-taking' || appState.view === 'quiz-results') {
      const categoryId = appState.quiz.category;
      setAppState({ view: 'quiz-list', categoryId });
    }
  };

  const handleBackToHome = () => {
    setAppState({ view: 'home' });
  };

  switch (appState.view) {
    case 'home':
      return <Home onCategorySelect={handleCategorySelect} />;
      
    case 'quiz-list':
      return (
        <QuizList
          categoryId={appState.categoryId}
          onBack={handleBackToHome}
          onQuizSelect={handleQuizSelect}
        />
      );
      
    case 'quiz-taking':
      return (
        <QuizTaking
          quiz={appState.quiz}
          onBack={handleBackToQuizList}
          onComplete={handleQuizComplete}
        />
      );
      
    case 'quiz-results':
      return (
        <QuizResults
          quiz={appState.quiz}
          score={appState.score}
          totalQuestions={appState.totalQuestions}
          userAnswers={appState.userAnswers}
          onRetry={handleRetry}
          onBack={handleBackToQuizList}
          onHome={handleBackToHome}
        />
      );
  }
};

export default Index;
