// src/pages/Help.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, Mail, MessageCircle } from 'lucide-react';

const Help: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <HelpCircle className="h-6 w-6 text-blue-300" />
        <div>
          <h1 className="text-2xl font-bold text-white">Ajuda & Suporte</h1>
          <p className="text-sm text-blue-100">
            Central de ajuda simbólica para o protótipo da Synerh.
          </p>
        </div>
      </div>

      <Card className="bg-white/10 border-white/10 text-white">
        <CardHeader>
          <CardTitle className="text-base">Dúvidas comuns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-blue-100">
          <div>
            <p className="font-semibold text-white">Como funcionam as quests?</p>
            <p>Elas simulam contratos e desafios profissionais dentro da Synerh 2030+.</p>
          </div>
          <div>
            <p className="font-semibold text-white">O que é o IA Coach?</p>
            <p>Um assistente que sugere trilhas, quests e estratégias de carreira.</p>
          </div>
          <div>
            <p className="font-semibold text-white">Posso usar isso no mundo real?</p>
            <p>
              Esse app é um protótipo acadêmico (GS FIAP), mas a lógica pode virar produto no futuro.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 border-white/10 text-white">
        <CardHeader>
          <CardTitle className="text-base">Contato</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-blue-100">
          <p>
            Em um produto real, aqui ficariam os canais de suporte, comunidade e documentação.
          </p>
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="justify-start gap-2">
              <Mail className="h-4 w-4" />
              Enviar e-mail para o suporte
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <MessageCircle className="h-4 w-4" />
              Abrir chat com o time Synerh
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
