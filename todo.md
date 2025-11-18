Synerh Mobile 2030+ - MVP Development Plan
Project Overview
Aplicativo mobile web responsivo simulando uma rede profissional descentralizada com gamificação, IA e contratos automatizados.

Tech Stack
React + TypeScript + Vite
shadcn/ui components
Tailwind CSS
Context API para estado global
localStorage para persistência (simulando Firebase)
OpenAI API para IA Coach
Files to Create/Modify
1. Core Configuration & Context
[ ] src/contexts/AuthContext.tsx - Sistema de autenticação
[ ] src/contexts/AppContext.tsx - Estado global da aplicação
[ ] src/hooks/useAuth.tsx - Hook personalizado para auth
[ ] src/hooks/useLocalStorage.tsx - Hook para persistência
2. Services & API
[ ] src/services/authService.ts - Serviços de autenticação
[ ] src/services/questService.ts - Gerenciamento de quests
[ ] src/services/aiService.ts - Integração com IA
[ ] src/services/profileService.ts - Gerenciamento de perfis
[ ] src/utils/constants.ts - Constantes da aplicação
3. Components
[ ] src/components/Layout/MobileLayout.tsx - Layout principal mobile
[ ] src/components/Navigation/TabNavigation.tsx - Navegação inferior
[ ] src/components/Navigation/DrawerMenu.tsx - Menu lateral
[ ] src/components/UI/QuestCard.tsx - Card de quest
[ ] src/components/UI/CourseCard.tsx - Card de curso
[ ] src/components/UI/ProfileCard.tsx - Card de perfil
4. Screens/Pages
[ ] src/pages/Onboarding.tsx - Onboarding futurista
[ ] src/pages/Login.tsx - Tela de login
[ ] src/pages/Register.tsx - Tela de registro
[ ] src/pages/Home.tsx - Dashboard principal
[ ] src/pages/Quests.tsx - Lista de quests
[ ] src/pages/QuestDetail.tsx - Detalhes da quest
[ ] src/pages/Profile.tsx - Perfil do usuário
[ ] src/pages/Learning.tsx - Requalificação/cursos
[ ] src/pages/AICoach.tsx - Chat com IA
[ ] src/pages/Settings.tsx - Configurações
5. Theme & Styling
[ ] src/styles/theme.ts - Tema futurista (azul/roxo/neon)
[ ] Modificar index.html - Título e meta tags
[ ] Modificar App.tsx - Estrutura principal com contextos
Implementation Order
Configurar contextos e serviços base
Criar layout e navegação mobile
Implementar autenticação (Login/Register)
Desenvolver onboarding
Criar dashboard Home
Implementar sistema de Quests
Desenvolver perfil e learning
Integrar IA Coach
Finalizar com configurações e polish
Design Guidelines
Mobile-first responsive design
Tema futurista: azul (#3B82F6), roxo (#8B5CF6), neon (#10B981)
Animações suaves e componentes modernos
Cards para quests, cursos e perfis
Navegação híbrida (tabs + drawer)
Editor
