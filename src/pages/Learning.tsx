import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/select';
import { Badge } from '@/components/UI/badge';
import { Progress } from '@/components/UI/progress';
import CourseCard from '@/components/UI/CourseCard';
import { Search, BookOpen, Trophy, Target, TrendingUp } from 'lucide-react';
import { CATEGORIES } from '@/utils/constants';

const Learning: React.FC = () => {
  const { courses, enrollCourse, updateCourseProgress } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const enrolledCourses = filteredCourses.filter(c => c.isEnrolled);
  const availableCourses = filteredCourses.filter(c => !c.isEnrolled);
  const completedCourses = enrolledCourses.filter(c => c.progress === 100);
  const inProgressCourses = enrolledCourses.filter(c => c.progress > 0 && c.progress < 100);

  const totalProgress = enrolledCourses.length > 0 
    ? Math.round(enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length)
    : 0;

  const handleContinueCourse = (courseId: string) => {
    // Simular progresso
    const course = courses.find(c => c.id === courseId);
    if (course) {
      const newProgress = Math.min(course.progress + 25, 100);
      updateCourseProgress(courseId, newProgress);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Centro de Aprendizagem</h1>
        <p className="text-emerald-100 mb-4">
          Desenvolva novas habilidades e mantenha-se atualizado
        </p>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center bg-white/20 rounded-lg p-3">
            <div className="text-xl font-bold">{enrolledCourses.length}</div>
            <div className="text-xs text-emerald-100">Matriculado</div>
          </div>
          <div className="text-center bg-white/20 rounded-lg p-3">
            <div className="text-xl font-bold">{completedCourses.length}</div>
            <div className="text-xs text-emerald-100">Concluído</div>
          </div>
          <div className="text-center bg-white/20 rounded-lg p-3">
            <div className="text-xl font-bold">{totalProgress}%</div>
            <div className="text-xs text-emerald-100">Progresso</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar cursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {CATEGORIES.courses.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Nível" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os níveis</SelectItem>
              <SelectItem value="Iniciante">Iniciante</SelectItem>
              <SelectItem value="Intermediário">Intermediário</SelectItem>
              <SelectItem value="Avançado">Avançado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Recomendações da IA */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
        <div className="flex items-center gap-2 mb-3">
          <Target className="h-5 w-5 text-purple-600" />
          <h3 className="font-semibold text-purple-700 dark:text-purple-300">
            Recomendado para você
          </h3>
        </div>
        <p className="text-sm text-purple-600 dark:text-purple-400 mb-3">
          Com base nas suas skills em {user?.skills?.[0] || 'desenvolvimento'}, 
          recomendamos focar em IA e sustentabilidade para 2030+
        </p>
        <Button 
          size="sm" 
          className="bg-gradient-to-r from-purple-500 to-pink-500"
          onClick={() => navigate('/ai-coach')}
        >
          Ver trilha personalizada
        </Button>
      </div>

      {/* Cursos em Progresso */}
      {inProgressCourses.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Continuar Aprendendo
          </h2>
          <div className="space-y-4">
            {inProgressCourses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onContinue={handleContinueCourse}
              />
            ))}
          </div>
        </div>
      )}

      {/* Cursos Concluídos */}
      {completedCourses.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-emerald-500" />
            Cursos Concluídos
          </h2>
          <div className="space-y-4">
            {completedCourses.map(course => (
              <div key={course.id} className="relative">
                <CourseCard course={course} />
                <div className="absolute top-4 right-4 bg-emerald-500 text-white rounded-full p-2">
                  <Trophy className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cursos Disponíveis */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-purple-500" />
          Cursos Disponíveis
          <Badge variant="outline">{availableCourses.length}</Badge>
        </h2>
        
        {availableCourses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-lg font-semibold mb-2">Nenhum curso encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar os filtros de busca
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedLevel('all');
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {availableCourses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onEnroll={enrollCourse}
              />
            ))}
          </div>
        )}
      </div>

      {/* Learning Stats */}
      {enrolledCourses.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Seu Progresso de Aprendizagem</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progresso Geral</span>
                <span className="font-medium">{totalProgress}%</span>
              </div>
              <Progress value={totalProgress} className="h-3" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3">
                <div className="font-semibold text-emerald-600">
                  {completedCourses.length} Concluídos
                </div>
                <div className="text-muted-foreground">
                  +{completedCourses.length * 50} tokens ganhos
                </div>
              </div>
              <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3">
                <div className="font-semibold text-blue-600">
                  {inProgressCourses.length} Em Progresso
                </div>
                <div className="text-muted-foreground">
                  Continue aprendendo!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Learning;