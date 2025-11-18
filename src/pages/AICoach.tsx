import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { aiService } from '@/services/aiService';
import { Send, Bot, User, Loader2, Lightbulb, Target, BookOpen, Zap } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  recommendations?: {
    quests?: string[];
    courses?: string[];
    skills?: string[];
  };
}

const AICoach: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Mensagem de boas-vindas
    const welcomeMessage: Message = {
      id: '1',
      type: 'ai',
      content: `Olá, ${user?.name.split(' ')[0]}! 👋 

Sou seu AI Coach pessoal na Synerh 2030+. Estou aqui para te ajudar a acelerar sua carreira com recomendações personalizadas.

Posso te ajudar com:
• 🎯 Recomendações de quests baseadas no seu perfil
• 📚 Sugestões de cursos e trilhas de aprendizado
• 🚀 Estratégias de crescimento profissional
• 📊 Análise do seu progresso e reputação

O que você gostaria de saber hoje?`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [user]);

  const quickActions = [
    {
      icon: Target,
      label: 'Recomendar Quests',
      message: 'Quais quests você recomenda para meu perfil?'
    },
    {
      icon: BookOpen,
      label: 'Sugerir Cursos',
      message: 'Que cursos devo fazer para crescer na carreira?'
    },
    {
      icon: Lightbulb,
      label: 'Analisar Perfil',
      message: 'Como posso melhorar meu perfil e reputação?'
    },
    {
      icon: Zap,
      label: 'Estratégia 2030+',
      message: 'Qual estratégia de carreira para 2030?'
    }
  ];

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await aiService.getChatResponse(messageText, user);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.message,
        timestamp: new Date(),
        recommendations: response.recommendations
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Desculpe, ocorreu um erro. Tente novamente em alguns instantes.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (message: string) => {
    sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">IA Coach</h1>
            <p className="text-purple-100 text-sm">Seu mentor pessoal para crescimento profissional</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'ai' && (
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}
            
            <Card className={`max-w-[80%] ${
              message.type === 'user' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                : 'bg-white dark:bg-slate-800'
            }`}>
              <CardContent className="p-3">
                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                  {message.content}
                </p>
                
                {/* Recommendations */}
                {message.recommendations && (
                  <div className="mt-3 space-y-2">
                    {message.recommendations.quests && (
                      <div>
                        <p className="text-xs font-medium mb-1">Quests recomendadas:</p>
                        <div className="flex flex-wrap gap-1">
                          {message.recommendations.quests.map((questId, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              Quest #{questId}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {message.recommendations.courses && (
                      <div>
                        <p className="text-xs font-medium mb-1">Cursos recomendados:</p>
                        <div className="flex flex-wrap gap-1">
                          {message.recommendations.courses.map((courseId, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              Curso #{courseId}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {message.recommendations.skills && (
                      <div>
                        <p className="text-xs font-medium mb-1">Skills sugeridas:</p>
                        <div className="flex flex-wrap gap-1">
                          {message.recommendations.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </CardContent>
            </Card>
            
            {message.type === 'user' && (
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <Card className="bg-white dark:bg-slate-800">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">IA Coach está pensando...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="p-4 border-t">
          <p className="text-sm font-medium mb-3 text-center">Sugestões rápidas:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="h-auto p-3 text-left justify-start"
                  onClick={() => handleQuickAction(action.message)}
                >
                  <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-xs">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t bg-white dark:bg-slate-900">
        <div className="flex gap-2">
          <Input
            placeholder="Digite sua pergunta..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={() => sendMessage(inputMessage)}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          A IA Coach usa seus dados do perfil para dar recomendações personalizadas
        </p>
      </div>
    </div>
  );
};

export default AICoach;