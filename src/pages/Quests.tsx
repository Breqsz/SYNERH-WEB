import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/select';
import { Badge } from '@/components/UI/badge';
import QuestCard from '@/components/UI/QuestCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '@/utils/constants';

const Quests: React.FC = () => {
  const { quests, acceptQuest } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredQuests = quests.filter(quest => {
    const matchesSearch = quest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quest.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || quest.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || quest.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const acceptedQuests = filteredQuests.filter(q => q.isAccepted);
  const availableQuests = filteredQuests.filter(q => !q.isAccepted);

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Quests Disponíveis</h1>
        <p className="text-blue-100">
          Aceite desafios, complete projetos e ganhe tokens!
        </p>
        <div className="flex items-center gap-4 mt-4">
          <div className="bg-white/20 rounded-full px-3 py-1">
            <span className="text-sm font-medium">
              {availableQuests.length} disponíveis
            </span>
          </div>
          <div className="bg-white/20 rounded-full px-3 py-1">
            <span className="text-sm font-medium">
              {acceptedQuests.length} aceitas
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar quests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="px-3"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <label className="text-sm font-medium mb-2 block">Categoria</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {CATEGORIES.quests.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Dificuldade</label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as dificuldades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as dificuldades</SelectItem>
                  <SelectItem value="Iniciante">Iniciante</SelectItem>
                  <SelectItem value="Intermediário">Intermediário</SelectItem>
                  <SelectItem value="Avançado">Avançado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Active filters */}
      {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchTerm) && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Busca: "{searchTerm}"
              <button onClick={() => setSearchTerm('')} className="ml-1 hover:bg-gray-300 rounded-full">
                ×
              </button>
            </Badge>
          )}
          {selectedCategory !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {selectedCategory}
              <button onClick={() => setSelectedCategory('all')} className="ml-1 hover:bg-gray-300 rounded-full">
                ×
              </button>
            </Badge>
          )}
          {selectedDifficulty !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {selectedDifficulty}
              <button onClick={() => setSelectedDifficulty('all')} className="ml-1 hover:bg-gray-300 rounded-full">
                ×
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Minhas Quests Aceitas */}
      {acceptedQuests.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            🎯 Minhas Quests Aceitas
          </h2>
          <div className="space-y-4">
            {acceptedQuests.map(quest => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onViewDetails={(id) => navigate(`/quests/${id}`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quests Disponíveis */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          ⚡ Quests Disponíveis
          <Badge variant="outline">{availableQuests.length}</Badge>
        </h2>
        
        {availableQuests.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold mb-2">Nenhuma quest encontrada</h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar os filtros ou buscar por outros termos
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {availableQuests.map(quest => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onAccept={acceptQuest}
                onViewDetails={(id) => navigate(`/quests/${id}`)}
              />
            ))}
          </div>
        )}
      </div>

      {/* CTA para mais quests */}
      <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-lg p-6 text-center border border-emerald-200 dark:border-emerald-800">
        <h3 className="text-lg font-bold mb-2">Não encontrou a quest ideal?</h3>
        <p className="text-muted-foreground mb-4">
          Converse com nossa IA Coach para receber recomendações personalizadas
        </p>
        <Button 
          className="bg-gradient-to-r from-emerald-500 to-cyan-500"
          onClick={() => navigate('/ai-coach')}
        >
          Falar com IA Coach
        </Button>
      </div>
    </div>
  );
};

export default Quests;