import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Textarea } from '@/components/UI/textarea';
import { Label } from '@/components/UI/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/card';
import { Badge } from '@/components/UI/badge';
import { Progress } from '@/components/UI/progress';
import { 
  Edit, 
  Save, 
  X, 
  Trophy, 
  Star, 
  Calendar,
  Coins,
  Award,
  Plus,
  Trash2
} from 'lucide-react';
import { REPUTATION_LEVELS, SKILLS_DATABASE } from '@/utils/constants';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    experience: user?.experience || '',
    skills: Array.isArray(user?.skills) ? (user!.skills as string[]) : [],
  });
  const [newSkill, setNewSkill] = useState('');

  if (!user) return null;

  // Garantir que skills e certifications sempre sejam arrays
  const userSkills = Array.isArray(user.skills) ? user.skills : [];
  const userCertifications = Array.isArray(user.certifications)
    ? user.certifications
    : [];

  const getUserLevel = () => {
    return (
      REPUTATION_LEVELS.find(
        (level) =>
          user.reputation >= level.min && user.reputation <= level.max
      ) || REPUTATION_LEVELS[0]
    );
  };

  const userLevel = getUserLevel();
  const nextLevel = REPUTATION_LEVELS.find(
    (level) => level.min > user.reputation
  );
  const progressToNext = nextLevel
    ? ((user.reputation - userLevel.min) /
        (nextLevel.min - userLevel.min)) *
      100
    : 100;

  const handleSave = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user.name,
      bio: user.bio || '',
      experience: user.experience || '',
      skills: userSkills,
    });
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill && !editForm.skills.includes(newSkill)) {
      setEditForm((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setEditForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-blue-100">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl">{userLevel.badge}</span>
                  <span className="font-semibold">{userLevel.title}</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="text-white hover:bg-white/20"
            >
              {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center bg-white/10 rounded-lg p-3">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Trophy className="h-5 w-5" />
                <span className="text-xl font-bold">{user.reputation}</span>
              </div>
              <p className="text-sm text-blue-100">Reputação</p>
            </div>
            <div className="text-center bg-white/10 rounded-lg p-3">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Coins className="h-5 w-5" />
                <span className="text-xl font-bold">{user.tokens}</span>
              </div>
              <p className="text-sm text-blue-100">Tokens</p>
            </div>
            <div className="text-center bg-white/10 rounded-lg p-3">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Award className="h-5 w-5" />
                <span className="font-bold">
                  {userCertifications.length}
                </span>
              </div>
              <p className="text-sm text-blue-100">Certificados</p>
            </div>
          </div>

          {/* Progress to next level */}
          {nextLevel && (
            <div className="mt-4 bg-white/10 rounded-lg p-3">
              <div className="flex justify-between text-sm mb-2">
                <span>Progresso para {nextLevel.title}</span>
                <span>{Math.round(progressToNext)}%</span>
              </div>
              <Progress value={progressToNext} className="h-2 bg-white/20" />
              <p className="text-xs text-blue-100 mt-1">
                Faltam {nextLevel.min - user.reputation} pontos
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bio Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Sobre mim
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Adicione uma bio para contar mais sobre você..."
                  value={editForm.bio}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Salvar
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-muted-foreground mb-4">
                {user.bio || 'Adicione uma bio para contar mais sobre você...'}
              </p>
              {user.joinDate && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Membro desde{' '}
                  {new Date(user.joinDate).toLocaleDateString('pt-BR')}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card>
        <CardHeader>
          <CardTitle>Skills & Competências</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="skills">Skills</Label>
                <div className="flex gap-2">
                  <Input
                    id="skills"
                    placeholder="Adicione suas skills para receber recomendações personalizadas"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button onClick={addSkill} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {editForm.skills.length > 0 ? (
                  editForm.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:bg-red-200 rounded-full p-0.5"
                        type="button"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Nenhuma skill adicionada ainda. Adicione suas skills para contar mais sobre você e receber recomendações personalizadas.
                  </p>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                Sugestões: {SKILLS_DATABASE.slice(0, 10).join(', ')}...
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {userSkills.length > 0 ? (
                userSkills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-blue-50 dark:bg-blue-900/20"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-muted-foreground">
                  Adicione suas skills para contar mais sobre você e receber recomendações personalizadas.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Experience Section */}
      <Card>
        <CardHeader>
          <CardTitle>Experiência Profissional</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea
              placeholder="Adicione sua experiência profissional para contar mais sobre você..."
              value={editForm.experience}
              onChange={(e) =>
                setEditForm((prev) => ({
                  ...prev,
                  experience: e.target.value,
                }))
              }
              rows={4}
            />
          ) : (
            <p className="text-muted-foreground">
              {user.experience ||
                'Adicione sua experiência profissional para contar mais sobre você...'}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-emerald-500" />
            Certificações
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userCertifications.length > 0 ? (
            <div className="space-y-3">
              {userCertifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{cert}</p>
                    <p className="text-sm text-muted-foreground">
                      Synerh Platform
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Award className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-muted-foreground">
                Complete quests e cursos para ganhar certificações
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;