// src/pages/Privacy.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Privacy: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Privacidade & Dados</h1>
        <p className="text-sm text-blue-100">
          Versão resumida de uma política de privacidade focada em IA e carreira.
        </p>
      </div>

      <Card className="bg-white/10 border-white/10 text-white text-sm">
        <CardHeader>
          <CardTitle className="text-base">Uso de dados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-blue-100">
          <p>
            A Synerh Mobile 2030+ é um protótipo acadêmico. Os dados aqui simulam um ambiente real,
            mas não são usados comercialmente.
          </p>
          <p>
            Em um produto real, os dados seriam tratados conforme LGPD, com transparência, base legal
            e controle pelo usuário.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/10 border-white/10 text-white text-sm">
        <CardHeader>
          <CardTitle className="text-base">IA & Transparência</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-blue-100">
          <p>
            As recomendações de carreira e quests são geradas por IA e devem ser interpretadas como
            apoio à decisão, não verdade absoluta.
          </p>
          <p>
            O usuário mantém autonomia para aceitar ou recusar qualquer sugestão.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Privacy;
