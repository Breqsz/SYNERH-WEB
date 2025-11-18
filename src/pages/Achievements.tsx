// src/pages/Achievements.tsx
import React from 'react';
import { Trophy, Star, Target, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Achievements: React.FC = () => {
  const badges = [
    {
      id: 1,
      title: 'Primeira Quest',
      desc: 'Você concluiu sua primeira quest na Synerh.',
      icon: Trophy,
      tag: 'Iniciante',
    },
    {
      id: 2,
      title: 'Explorador 2030+',
      desc: 'Você navegou por várias trilhas de aprendizado.',
      icon: Sparkles,
      tag: 'Carreira',
    },
    {
      id: 3,
      title: 'Foco em Skills',
      desc: 'Você está construindo um perfil profissional consistente.',
      icon: Target,
      tag: 'Skills',
    },
    {
      id: 4,
      title: 'Reputação em crescimento',
      desc: 'Sua reputação está evoluindo na rede Synerh.',
      icon: Star,
      tag: 'Reputação',
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Conquistas</h1>
        <p className="text-sm text-blue-100">
          Badges simbólicas para deixar o dashboard mais bonito no GS.
        </p>
      </div>

      <div className="space-y-3">
        {badges.map((badge) => (
          <Card key={badge.id} className="bg-white/10 border-white/10 text-white">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <badge.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-base">{badge.title}</CardTitle>
                <Badge variant="outline" className="border-white/30 text-xs mt-1">
                  {badge.tag}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-100">{badge.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
