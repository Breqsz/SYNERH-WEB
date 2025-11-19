// src/pages/Analytics.tsx
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/UI/card';
import { Badge } from '@/components/UI/badge';
import { Activity, Zap, BookOpen, Clock } from 'lucide-react';

const Analytics: React.FC = () => {
  const { quests, courses } = useApp();

  const acceptedQuests = quests.filter((q) => q.isAccepted);
  const completedQuests = quests.filter((q) => q.completedBy);
  const enrolledCourses = courses.filter((c) => c.isEnrolled);

  return (
    <div className="p-4 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Meu Progresso</h1>
        <p className="text-sm text-blue-100">
          Visão geral simbólica das suas atividades na Synerh 2030+.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-white/10 border-white/10 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Quests aceitas</CardTitle>
            <Zap className="h-4 w-4 text-yellow-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{acceptedQuests.length}</div>
            <p className="text-xs text-blue-100">Você está construindo reputação.</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/10 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Quests concluídas</CardTitle>
            <Activity className="h-4 w-4 text-emerald-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedQuests.length}</div>
            <p className="text-xs text-blue-100">Meta para o futuro do app.</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/10 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cursos ativos</CardTitle>
            <BookOpen className="h-4 w-4 text-cyan-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrolledCourses.length}</div>
            <p className="text-xs text-blue-100">Trilhas de requalificação profissional.</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/10 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tempo estimado</CardTitle>
            <Clock className="h-4 w-4 text-purple-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2030+</div>
            <p className="text-xs text-blue-100">Visão de longo prazo da sua carreira.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-emerald-500/80 to-cyan-500/80 border-none text-white">
        <CardHeader>
          <CardTitle className="text-base">Insight do futuro</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Combine quests + trilhas de aprendizado para criar um portfólio forte até 2030.
          </p>
          <Badge variant="outline" className="mt-2 border-white/40">
            Synerh Analytics (mock para GS)
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
