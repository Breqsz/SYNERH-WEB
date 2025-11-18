import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Quest } from '@/contexts/AppContext';
import { Clock, Coins, Building, Zap, CheckCircle } from 'lucide-react';

interface QuestCardProps {
  quest: Quest;
  onAccept?: (questId: string) => void;
  onViewDetails?: (questId: string) => void;
  compact?: boolean;
}

const QuestCard: React.FC<QuestCardProps> = ({ 
  quest, 
  onAccept, 
  onViewDetails, 
  compact = false 
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Avançado': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'Desenvolvimento': return 'from-blue-500 to-cyan-500';
      case 'Data Science': return 'from-purple-500 to-pink-500';
      case 'Design': return 'from-pink-500 to-rose-500';
      case 'IA & Machine Learning': return 'from-emerald-500 to-teal-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  if (compact) {
    return (
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-sm mb-1 line-clamp-1">{quest.title}</h4>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {quest.description}
              </p>
              <div className="flex items-center gap-2 text-xs">
                <Badge variant="secondary" className={getDifficultyColor(quest.difficulty)}>
                  {quest.difficulty}
                </Badge>
                <span className="flex items-center gap-1 text-emerald-600">
                  <Coins className="h-3 w-3" />
                  {quest.reward}
                </span>
              </div>
            </div>
            {quest.isAccepted && (
              <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Header com gradiente */}
      <div className={`h-2 bg-gradient-to-r ${getCategoryGradient(quest.category)}`}></div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">
              {quest.title}
            </CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className={getDifficultyColor(quest.difficulty)}>
                {quest.difficulty}
              </Badge>
              <Badge variant="outline">{quest.category}</Badge>
            </div>
          </div>
          {quest.isAccepted && (
            <div className="flex items-center gap-1 text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
              <CheckCircle className="h-4 w-4" />
              <span className="text-xs font-medium">Aceita</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {quest.description}
        </p>

        {/* Informações da quest */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Building className="h-4 w-4 text-blue-500" />
            <span className="font-medium">{quest.company}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-purple-500" />
            <span>{quest.duration}</span>
          </div>
        </div>

        {/* Recompensa */}
        <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full">
              <Coins className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">Recompensa</p>
              <p className="text-xs text-muted-foreground">Por completar a quest</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-emerald-600">{quest.reward}</p>
            <p className="text-xs text-muted-foreground">tokens</p>
          </div>
        </div>

        {/* Skills necessárias */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Skills necessárias:</p>
          <div className="flex flex-wrap gap-1">
            {quest.skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-2">
          {onViewDetails && (
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => onViewDetails(quest.id)}
            >
              Ver Detalhes
            </Button>
          )}
          {!quest.isAccepted && onAccept && (
            <Button 
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              onClick={() => onAccept(quest.id)}
            >
              <Zap className="h-4 w-4 mr-2" />
              Aceitar Quest
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestCard;