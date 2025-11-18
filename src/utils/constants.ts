export const COLORS = {
  primary: {
    blue: '#3B82F6',
    purple: '#8B5CF6',
    neon: '#10B981',
  },
  gradients: {
    primary: 'from-blue-500 to-purple-600',
    secondary: 'from-purple-500 to-pink-500',
    accent: 'from-cyan-400 to-blue-500',
    neon: 'from-emerald-400 to-cyan-400',
  }
};

export const CATEGORIES = {
  quests: [
    'Desenvolvimento',
    'Data Science',
    'Design',
    'Marketing',
    'Consultoria',
    'IA & Machine Learning',
    'Sustentabilidade',
    'Blockchain'
  ],
  courses: [
    'Inteligência Artificial',
    'Desenvolvimento Web',
    'Desenvolvimento Mobile',
    'Data Science',
    'UX/UI Design',
    'Sustentabilidade',
    'Blockchain',
    'Marketing Digital'
  ]
};

export const DIFFICULTY_LEVELS = ['Iniciante', 'Intermediário', 'Avançado'] as const;

export const SKILLS_DATABASE = [
  // Desenvolvimento
  'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
  'Java', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin',
  
  // Data Science & IA
  'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas',
  'NumPy', 'Scikit-learn', 'SQL', 'MongoDB', 'PostgreSQL',
  
  // Design
  'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'UX/UI Design',
  'Design System', 'Prototipagem', 'User Research',
  
  // Outras áreas
  'Marketing Digital', 'SEO', 'Google Analytics', 'Sustentabilidade',
  'ESG', 'Blockchain', 'Ethereum', 'Smart Contracts', 'DevOps',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP'
];

export const REPUTATION_LEVELS = [
  { min: 0, max: 99, title: 'Novato', color: 'text-gray-500', badge: '🌱' },
  { min: 100, max: 299, title: 'Aprendiz', color: 'text-blue-500', badge: '📚' },
  { min: 300, max: 599, title: 'Profissional', color: 'text-purple-500', badge: '💼' },
  { min: 600, max: 999, title: 'Especialista', color: 'text-emerald-500', badge: '⭐' },
  { min: 1000, max: Infinity, title: 'Mestre', color: 'text-yellow-500', badge: '👑' }
];

export const ONBOARDING_SLIDES = [
  {
    title: 'Bem-vindo ao Synerh 2030+',
    subtitle: 'A rede profissional do futuro',
    description: 'Conecte-se, aprenda e cresça em um ecossistema descentralizado de oportunidades.',
    icon: '🚀',
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    title: 'Quests Inteligentes',
    subtitle: 'Contratos gamificados',
    description: 'Aceite desafios, complete projetos e ganhe tokens enquanto constrói sua reputação.',
    icon: '⚡',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'IA Coach Pessoal',
    subtitle: 'Recomendações personalizadas',
    description: 'Nossa IA analisa seu perfil e sugere as melhores oportunidades para seu crescimento.',
    icon: '🤖',
    gradient: 'from-cyan-400 to-blue-500'
  },
  {
    title: 'Requalificação Contínua',
    subtitle: 'Aprenda sempre',
    description: 'Acesse cursos exclusivos e mantenha-se atualizado com as tendências do mercado.',
    icon: '📈',
    gradient: 'from-emerald-400 to-cyan-400'
  },
  {
    title: 'Sistema de Reputação',
    subtitle: 'Construa sua credibilidade',
    description: 'Ganhe tokens, aumente sua reputação e desbloqueie oportunidades exclusivas.',
    icon: '💎',
    gradient: 'from-yellow-400 to-orange-500'
  }
];

export const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Home', icon: 'Home', path: '/' },
  { id: 'quests', label: 'Quests', icon: 'Zap', path: '/quests' },
  { id: 'learning', label: 'Aprender', icon: 'BookOpen', path: '/learning' },
  { id: 'profile', label: 'Perfil', icon: 'User', path: '/profile' },
  { id: 'ai-coach', label: 'IA Coach', icon: 'Bot', path: '/ai-coach' }
];