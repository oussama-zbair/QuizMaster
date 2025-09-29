# QuizMaster

> A modern, responsive quiz application built with React, TypeScript, and Tailwind CSS for mastering front-end and back-end development skills.

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Accessible-8A2BE2.svg)](https://www.radix-ui.com/)
[![Lucide React](https://img.shields.io/badge/Lucide_Icons-React-yellow.svg)](https://lucide.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-FF69B4.svg)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black.svg)](https://vercel.com/)

---

## 🚀 Live Demo
[SmartQuizzy on Vercel](https://your-vercel-app-url.vercel.app/)

---

## 📋 Overview

SmartQuizzy is an interactive learning platform designed to help developers test and improve their knowledge in web development.  
The application features a **clean, modern interface** with category-based quizzes covering both **front-end** and **back-end** technologies.  

The next step is extending the platform with a **backend API** so that teachers can create/manage quizzes and assign them to students.

---

## ✨ Key Features

### 🎯 **Interactive Quiz System**
- Multiple-choice questions with instant feedback  
- Real-time progress tracking  
- Detailed explanations for each answer  
- Score calculation with pass/fail status  

### 🎨 **Modern UI/UX Design**
- Responsive design optimized for all devices  
- Smooth animations and transitions (Framer Motion)  
- Category-specific color themes (Frontend/Backend)  
- Dark/light mode support  

### 📚 **Comprehensive Content**
- **Frontend Category**: React, TypeScript, JavaScript, CSS, Web Performance  
- **Backend Category**: Java, Git, Databases  
- Multiple difficulty levels (Beginner → Advanced)  

### 🏆 **Gamified Learning**
- Achievement badges and success animations  
- Progress indicators throughout quizzes  
- Retry functionality for failed attempts  
- Detailed results summary with question review  

---

## 🔮 Planned Improvements (Backend Extension)

- ✅ **User Roles**: Teachers, Students, Admins  
- ✅ **Quiz Management**: Teachers can create, edit, and delete quizzes  
- ✅ **Student Tracking**: Assign quizzes and track student performance  
- ✅ **Authentication & Security**: Role-based access control (future JWT integration)  
- ✅ **Database Integration**: Store quiz questions and results in PostgreSQL/MySQL  

---

## 🛠️ Technologies & Skills Demonstrated

- **React 18** (SPA, hooks, state management)  
- **TypeScript** (strong typing, interfaces)  
- **Tailwind CSS** (utility-first styling)  
- **Vite** (fast dev/build)  
- **React Router** (routing)  
- **Radix UI** (accessible components)  
- **Lucide Icons** (modern icon system)  
- **Framer Motion** (animations)  
- **Vercel** (deployment)  

---

## 📁 Project Structure

\`\`\`
src/
├── components/           # Reusable UI components
│   ├── ui/              # Radix UI/Shadcn components
│   ├── CategoryCard.tsx # Quiz category display
│   ├── QuizCard.tsx     # Individual quiz cards
│   └── QuizQuestion.tsx # Question component
├── pages/               # Application pages
│   ├── Home.tsx         # Landing page
│   ├── QuizList.tsx     # Category quiz listing
│   ├── QuizTaking.tsx   # Quiz interface
│   └── QuizResults.tsx  # Results and scoring
├── data/                # Static data (quizzes.json)
├── types/               # TypeScript definitions
├── hooks/               # Custom React hooks
└── lib/                 # Utility functions
\`\`\`

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)  
- npm or yarn  

### Installation
\`\`\`bash
git clone https://github.com/yourusername/smart-quizzy.git
cd smart-quizzy
npm install
npm run dev
\`\`\`

Then open:  
\`\`\`
http://localhost:3000
\`\`\`

### Build for Production
\`\`\`bash
npm run build
npm run preview
\`\`\`

---

## 🎮 How to Use

1. **Choose a Category** → Frontend or Backend  
2. **Pick a Quiz** → Select available quiz topic  
3. **Answer Questions** → Multiple-choice quiz flow  
4. **Review Results** → Score summary & retry option  

---

## 🌟 Featured Quizzes

- React Fundamentals  
- TypeScript Essentials  
- Advanced JavaScript  
- Java OOP Basics  
- Git Workflow Essentials  

---

## 📄 License

Licensed under the MIT License.  

---

## 🤝 Contributing

Contributions are welcome! Open an issue or PR.  

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS.**

