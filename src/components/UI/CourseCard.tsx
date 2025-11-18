import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Course } from '@/contexts/AppContext';
import { Clock, User, BookOpen, Play, CheckCircle } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
  onContinue?: (courseId: string) => void;
  compact?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onEnroll, 
  onContinue, 
  compact = false 
}) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Avançado': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'Inteligência Artificial': return 'from-purple-500 to-pink-500';
      case 'Desenvolvimento Web': return 'from-blue-500 to-cyan-500';
      case 'Desenvolvimento Mobile': return 'from-emerald-500 to-teal-500';
      case 'Data Science': return 'from-orange-500 to-red-500';
      case 'UX/UI Design': return 'from-pink-500 to-rose-500';
      case 'Sustentabilidade': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  if (compact) {
    return (
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-200">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h4 className="font-semibold text-sm mb-1 line-clamp-1">{course.title}</h4>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {course.description}
              </p>
              <div className="flex items-center gap-2 text-xs">
                <Badge variant="secondary" className={getLevelColor(course.level)}>
                  {course.level}
                </Badge>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {course.duration}
                </span>
              </div>
            </div>
          </div>
          
          {course.isEnrolled && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Progresso</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Header com gradiente */}
      <div className={`h-2 bg-gradient-to-r ${getCategoryGradient(course.category)}`}></div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold mb-2 group-hover:text-purple-600 transition-colors">
              {course.title}
            </CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className={getLevelColor(course.level)}>
                {course.level}
              </Badge>
              <Badge variant="outline">{course.category}</Badge>
            </div>
          </div>
          {course.isEnrolled && (
            <div className="flex items-center gap-1 text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full">
              <BookOpen className="h-4 w-4" />
              <span className="text-xs font-medium">Matriculado</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {course.description}
        </p>

        {/* Informações do curso */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-purple-500" />
            <span className="font-medium">{course.instructor}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-blue-500" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Progresso (se matriculado) */}
        {course.isEnrolled && (
          <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Seu Progresso</span>
              <span className="text-sm font-bold text-blue-600">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
            {course.progress === 100 && (
              <div className="flex items-center gap-1 mt-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-xs font-medium">Curso Concluído!</span>
              </div>
            )}
          </div>
        )}

        {/* Skills que serão aprendidas */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Você vai aprender:</p>
          <div className="flex flex-wrap gap-1">
            {course.skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-2">
          {!course.isEnrolled && onEnroll && (
            <Button 
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={() => onEnroll(course.id)}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Matricular-se
            </Button>
          )}
          
          {course.isEnrolled && onContinue && (
            <Button 
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              onClick={() => onContinue(course.id)}
            >
              <Play className="h-4 w-4 mr-2" />
              {course.progress === 0 ? 'Começar' : 'Continuar'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;