import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  reward: number;
  duration: string;
  skills: string[];
  company: string;
  isAccepted: boolean;
  completedBy?: string;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  progress: number;
  isEnrolled: boolean;
  skills: string[];
  instructor: string;
}

interface AppContextType {
  quests: Quest[];
  courses: Course[];
  darkMode: boolean;
  toggleDarkMode: () => void;
  acceptQuest: (questId: string) => void;
  enrollCourse: (courseId: string) => void;
  updateCourseProgress: (courseId: string, progress: number) => void;
  getRecommendedQuests: () => Quest[];
  getRecommendedCourses: () => Course[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Inicializar dados mock
    initializeMockData();
    
    // Carregar preferência de tema
    const savedTheme = localStorage.getItem('synerh_theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const initializeMockData = () => {
    const mockQuests: Quest[] = [
      {
        id: '1',
        title: 'Desenvolvimento de Dashboard IA',
        description: 'Criar dashboard interativo com visualizações de dados usando React e D3.js',
        category: 'Desenvolvimento',
        difficulty: 'Avançado',
        reward: 500,
        duration: '2 semanas',
        skills: ['React', 'D3.js', 'TypeScript', 'IA'],
        company: 'TechCorp',
        isAccepted: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Análise de Dados Sustentabilidade',
        description: 'Analisar dados de consumo energético e propor soluções sustentáveis',
        category: 'Data Science',
        difficulty: 'Intermediário',
        reward: 300,
        duration: '1 semana',
        skills: ['Python', 'Pandas', 'Sustentabilidade'],
        company: 'GreenTech',
        isAccepted: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'UX/UI Design Mobile',
        description: 'Redesign de aplicativo mobile com foco em acessibilidade',
        category: 'Design',
        difficulty: 'Intermediário',
        reward: 400,
        duration: '10 dias',
        skills: ['Figma', 'UX/UI', 'Mobile Design'],
        company: 'DesignStudio',
        isAccepted: false,
        createdAt: new Date().toISOString()
      }
    ];

    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'IA Generativa para Negócios',
        description: 'Aprenda a implementar soluções de IA generativa em contextos empresariais',
        category: 'Inteligência Artificial',
        duration: '40 horas',
        level: 'Intermediário',
        progress: 0,
        isEnrolled: false,
        skills: ['IA', 'Machine Learning', 'Negócios'],
        instructor: 'Dr. Ana Silva'
      },
      {
        id: '2',
        title: 'Desenvolvimento Sustentável',
        description: 'Tecnologias verdes e práticas de desenvolvimento sustentável',
        category: 'Sustentabilidade',
        duration: '30 horas',
        level: 'Iniciante',
        progress: 0,
        isEnrolled: false,
        skills: ['Sustentabilidade', 'Green Tech', 'ESG'],
        instructor: 'Prof. Carlos Green'
      },
      {
        id: '3',
        title: 'React Native Avançado',
        description: 'Desenvolvimento mobile multiplataforma com React Native',
        category: 'Desenvolvimento Mobile',
        duration: '50 horas',
        level: 'Avançado',
        progress: 0,
        isEnrolled: false,
        skills: ['React Native', 'Mobile', 'JavaScript'],
        instructor: 'Maria Santos'
      }
    ];

    setQuests(mockQuests);
    setCourses(mockCourses);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('synerh_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('synerh_theme', 'light');
    }
  };

  const acceptQuest = (questId: string) => {
    setQuests(prev => prev.map(quest => 
      quest.id === questId 
        ? { ...quest, isAccepted: true }
        : quest
    ));
  };

  const enrollCourse = (courseId: string) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, isEnrolled: true }
        : course
    ));
  };

  const updateCourseProgress = (courseId: string, progress: number) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, progress }
        : course
    ));
  };

  const getRecommendedQuests = (): Quest[] => {
    // Lógica simples de recomendação baseada em não aceitas
    return quests.filter(quest => !quest.isAccepted).slice(0, 3);
  };

  const getRecommendedCourses = (): Course[] => {
    // Lógica simples de recomendação baseada em não matriculados
    return courses.filter(course => !course.isEnrolled).slice(0, 3);
  };

  const value: AppContextType = {
    quests,
    courses,
    darkMode,
    toggleDarkMode,
    acceptQuest,
    enrollCourse,
    updateCourseProgress,
    getRecommendedQuests,
    getRecommendedCourses
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};