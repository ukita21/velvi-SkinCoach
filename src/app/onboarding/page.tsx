'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QuizData } from '@/lib/types';
import { Sparkles } from 'lucide-react';

const questions = [
  {
    id: 'experience',
    title: 'Have you used skincare products before?',
    options: ['Yes, I have used skincare before', 'No, this is my first approach to skincare'],
    type: 'single' as const,
  },
  {
    id: 'skinGoals',
    title: 'What are your main skin goals?',
    options: ['Hydration', 'Acne', 'Glow', 'Even tone', 'Smoother texture', 'Anti-aging', 'Redness', 'Not sure'],
    type: 'multiple' as const,
  },
  {
    id: 'skinType',
    title: 'What is your skin type?',
    options: ['Oily', 'Dry', 'Combination', 'Normal', 'Sensitive', 'Not sure'],
    type: 'single' as const,
  },
  {
    id: 'skinConcerns',
    title: 'What are your current skin concerns?',
    options: ['Breakouts', 'Dullness', 'Redness', 'Dark spots', 'Dry patches', 'Fine lines'],
    type: 'multiple' as const,
  },
  {
    id: 'comfortLevel',
    title: 'How comfortable are you with skincare routines?',
    options: ['Beginner', 'Basics', 'Experienced', 'Enthusiast'],
    type: 'single' as const,
  },
  {
    id: 'lifestyleHabits',
    title: 'Which of these affect your daily life?',
    options: ['High stress', 'Low hydration', 'Both', 'Neither'],
    type: 'single' as const,
  },
  {
    id: 'productPreferences',
    title: 'What are your product preferences?',
    options: ['Fragrance-free', 'Vegan', 'Cruelty-free', 'Clean', 'Dermatologist-tested'],
    type: 'multiple' as const,
  },
  {
    id: 'budget',
    title: 'What is your preferred product budget?',
    options: ['$', '$$', '$$$', 'Mixed'],
    type: 'single' as const,
  },
  {
    id: 'sensitivities',
    title: 'Do you have any sensitivities or allergies?',
    options: ['Fragrance', 'Essential oils', 'Retinol', 'Vitamin C', 'Eczema', 'None'],
    type: 'multiple' as const,
  },
];

export default function OnboardingQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizData>({
    experience: '',
    skinGoals: [],
    skinType: '',
    skinConcerns: [],
    comfortLevel: '',
    lifestyleHabits: [],
    productPreferences: [],
    budget: '',
    sensitivities: [],
  });
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('userAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Check if quiz already completed
    const completed = localStorage.getItem('onboardingCompleted');
    if (completed) {
      router.push('/');
    }
  }, [mounted, router]);

  const handleAnswer = (option: string, type: 'single' | 'multiple') => {
    const questionId = questions[currentQuestion].id as keyof QuizData;
    if (type === 'single') {
      setAnswers(prev => ({ ...prev, [questionId]: option }));
    } else {
      const currentAnswers = answers[questionId] as string[];
      const newAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter(a => a !== option)
        : [...currentAnswers, option];
      setAnswers(prev => ({ ...prev, [questionId]: newAnswers }));
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed
      localStorage.setItem('onboardingData', JSON.stringify(answers));
      localStorage.setItem('onboardingCompleted', 'true');
      router.push('/');
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (!mounted) {
    return null;
  }

  const question = questions[currentQuestion];
  const currentAnswer = answers[question.id as keyof QuizData];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 max-w-md w-full">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-gradient-to-br from-[#e8dff5] to-[#f5f0fa] p-3 rounded-2xl">
            <Sparkles className="w-6 h-6 text-[#b8a4d9]" />
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-gray-500 font-light">Question {currentQuestion + 1} of {questions.length}</span>
            <div className="w-32 bg-gray-100 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-[#b8a4d9] to-[#9b87c6] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <h2 className="text-2xl font-light text-gray-800 mb-2 leading-snug">{question.title}</h2>
          <p className="text-sm text-gray-500 font-light">
            {question.type === 'multiple' ? 'Select all that apply' : 'Choose one option'}
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => {
            const isSelected = question.type === 'single'
              ? currentAnswer === option
              : (currentAnswer as string[]).includes(option);

            return (
              <button
                key={index}
                onClick={() => handleAnswer(option, question.type)}
                className={`w-full p-4 rounded-2xl border transition-all duration-200 text-left font-light ${
                  isSelected
                    ? 'border-[#b8a4d9] bg-gradient-to-br from-[#e8dff5]/50 to-[#f5f0fa]/30 text-[#7a6ba0] shadow-sm'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50/50'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between gap-3">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-gray-100 text-gray-600 rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed font-light hover:bg-gray-200 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={nextQuestion}
            disabled={
              question.type === 'single'
                ? !currentAnswer
                : (currentAnswer as string[]).length === 0
            }
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#b8a4d9] to-[#9b87c6] text-white rounded-2xl hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed font-light transition-all"
          >
            {currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next'}
          </button>
        </div>
      </div>

      {/* Bottom hint */}
      <p className="text-center text-gray-400 text-sm font-light mt-6">
        Takes less than 60 seconds
      </p>
    </div>
  );
}
