import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/card';
import { Button } from '@/components/UI/button';
import { Badge } from '@/components/UI/badge';
import QuestCard from '@/components/UI/QuestCard';
import CourseCard from '@/components/UI/CourseCard';
import { 
  TrendingUp, 
  Zap, 
  BookOpen, 
  Users, 
  Trophy, 
  Star,
  ChevronRight,
  Bot,
  Target,
  Coins
} from 'lucide-react';
import { REPUTATION_LEVELS } from '@/utils/constants';

const Home: React.FC = () => {
  const { user } = useAuth();
  const { getRecommendedQuests, getRecommendedCourses, acceptQuest, enrollCourse } = useApp();
  const navigate = useNavigate();

  const recommendedQuests = getRecommendedQuests();
  const recommendedCourses = getRecommendedCourses();

  const getUserLevel = () => {
    if (!user) return REPUTATION_LEVELS[0];
    return REPUTATION_LEVELS.find(level => 
      user.reputation >= level.min && user.reputation <= level.max
    ) || REPUTATION_LEVELS[0];
  };

  const userLevel = getUserLevel();
  const nextLevel = REPUTATION_LEVELS.find(level => level.min > (user?.reputation || 0));
  const progressToNext = nextLevel ? 
    ((user?.reputation || 0) - userLevel.min) / (nextLevel.min - userLevel.min) * 100 : 100;

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative">
          <h2 className="text-2xl font-bold mb-2">
            Olá, {user?.name.split(' ')[0]}! 👋
          </h2>
          <p className="text-blue-100 mb-4">
            Pronto para conquistar novas oportunidades hoje?
          </p>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
              <span className="text-lg">{userLevel.badge}</span>
              <span className="font-medium">{userLevel.title}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
              <Coins className="h-4 w-4" />
              <span className="font-bold">{user?.tokens}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 border-emerald-200 dark:border-emerald-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                  {user?.reputation || 0}
                </p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Reputação
                </p>
              </div>
            </div>
            {nextLevel && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-emerald-600 dark:text-emerald-400 mb-1">
                  <span>Próximo: {nextLevel.title}</span>
                  <span>{Math.round(progressToNext)}%</span>
                </div>
                <div className="w-full bg-emerald-200 dark:bg-emerald-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressToNext}%` }}
                  ></div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  {recommendedQuests.length}
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Quests Disponíveis
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* IA Recommendations */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-blue-700 dark:text-blue-300">
                Recomendações da IA
              </CardTitle>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/ai-coach')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
              🎯 <strong>Dica do dia:</strong> Com suas skills em {user?.skills?.[0] || 'desenvolvimento'}, 
              você tem 85% de chance de sucesso nas quests de IA. Que tal aceitar uma hoje?
            </p>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-blue-500 to-purple-500"
              onClick={() => navigate('/ai-coach')}
            >
              Conversar com IA Coach
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Quests */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Quests Recomendadas
          </h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/quests')}
          >
            Ver todas
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="space-y-4">
          {recommendedQuests.slice(0, 2).map(quest => (
            <QuestCard
              key={quest.id}
              quest={quest}
              onAccept={acceptQuest}
              onViewDetails={(id) => navigate(`/quests/${id}`)}
              compact
            />
          ))}
        </div>
      </div>

      {/* Recommended Courses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-500" />
            Cursos Recomendados
          </h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/learning')}
          >
            Ver todos
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="space-y-4">
          {recommendedCourses.slice(0, 2).map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onEnroll={enrollCourse}
              onContinue={(id) => navigate(`/learning/${id}`)}
              compact
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          className="h-20 flex flex-col gap-2"
          onClick={() => navigate('/quests')}
        >
          <Zap className="h-6 w-6 text-blue-500" />
          <span className="text-sm font-medium">Explorar Quests</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-20 flex flex-col gap-2"
          onClick={() => navigate('/profile')}
        >
          <Users className="h-6 w-6 text-purple-500" />
          <span className="text-sm font-medium">Meu Perfil</span>
        </Button>
      </div>

      {/* Community Highlights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            Destaques da Comunidade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                M
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Maria Silva</p>
                <p className="text-xs text-muted-foreground">Completou 5 quests esta semana! 🔥</p>
              </div>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                <Star className="h-3 w-3 mr-1" />
                Top Performer
              </Badge>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                J
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">João Santos</p>
                <p className="text-xs text-muted-foreground">Novo curso de IA disponível!</p>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Novidade
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;