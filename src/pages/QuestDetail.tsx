// src/pages/QuestDetail.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/UI/card';
import { Badge } from '@/components/UI/badge';
import { Button } from '@/components/UI/button';
import { ArrowLeft, Building2, Clock, Zap, Sparkles } from 'lucide-react';

const QuestDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { quests, acceptQuest } = useApp();
  const navigate = useNavigate();

  const quest = quests.find((q) => q.id === id);

  if (!quest) {
    return (
      <div className="p-4 space-y-4">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </Button>
        <p className="text-sm text-blue-100">Quest não encontrada.</p>
      </div>
    );
  }

  const handleAccept = () => {
    acceptQuest(quest.id);
    navigate('/quests');
  };

  return (
    <div className="p-4 space-y-4">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4 mr-1" />
        Voltar
      </Button>

      <Card className="bg-white/10 border-white/10 text-white">
        <CardHeader>
          <CardTitle className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wide text-blue-200">
              Quest #{quest.id}
            </span>
            <span className="text-xl font-bold">{quest.title}</span>
          </CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="border-blue-300/50">
              {quest.category}
            </Badge>
            <Badge variant="outline" className="border-purple-300/50">
              {quest.difficulty}
            </Badge>
            <Badge variant="outline" className="border-emerald-300/50 flex items-center gap-1">
              <Zap className="h-3 w-3" />
              {quest.reward} RSK
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-blue-100">{quest.description}</p>

          <div className="flex flex-col gap-2 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>Empresa: {quest.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Duração estimada: {quest.duration}</span>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-blue-200 mb-1">
              Skills envolvidas
            </p>
            <div className="flex flex-wrap gap-2">
              {quest.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-white/10 text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-3 text-sm text-blue-100 flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-emerald-300 mt-0.5" />
            <p>
              Essa quest faz parte da visão de{' '}
              <span className="font-semibold text-white">Empregabilidade 2030+</span>, conectando
              desafios reais com trilhas de aprendizado.
            </p>
          </div>

          <Button
            className="w-full mt-2 bg-gradient-to-r from-emerald-500 to-cyan-500"
            onClick={handleAccept}
            disabled={quest.isAccepted}
          >
            {quest.isAccepted ? 'Quest já aceita' : 'Aceitar quest'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestDetail;
