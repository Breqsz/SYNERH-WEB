// src/services/aiService.ts

interface AIResponse {
  message: string;
  recommendations?: {
    quests?: string[];
    courses?: string[];
    skills?: string[];
  };
}

interface UserProfile {
  name?: string;
  skills?: string[];
  experience?: string | string[];
  reputation?: number;
  tokens?: number;
  [key: string]: unknown;
}

class AIService {
  private apiKey: string | undefined;
  private model: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
    this.model =
      (import.meta.env.VITE_GEMINI_MODEL as string | undefined) ||
      'gemini-2.5-flash'; // modelos 1.0/1.5 estão aposentados
  }

  async getChatResponse(
    message: string,
    userProfile?: UserProfile
  ): Promise<AIResponse> {
    if (!message.trim()) {
      return {
        message:
          'Me manda uma dúvida ou contexto sobre sua carreira, quests ou trilhas que eu te ajudo 😉',
      };
    }

    if (!this.apiKey) {
      console.error('[AIService] VITE_GEMINI_API_KEY não configurada.');
      return {
        message:
          'A IA ainda não foi configurada no ambiente. Peça para o time do projeto adicionar a chave da Gemini API.',
      };
    }

    const prompt = `
Você é um AI Coach da plataforma Synerh Mobile 2030+.

Ajude o usuário com:
- carreira,
- quests profissionais,
- trilhas de requalificação,
- uso estratégico de reputação e tokens RSK.

Responda em tom amigável, direto, e conectado ao contexto da Synerh.

Perfil do usuário (JSON): ${JSON.stringify(userProfile || {})}

Pergunta do usuário: ${message}
    `.trim();

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // forma recomendada hoje: header x-goog-api-key
            'x-goog-api-key': this.apiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        console.error(
          '[AIService] Erro na chamada Gemini:',
          response.status,
          response.statusText
        );

        return {
          message:
            'Tive um problema técnico ao falar com a IA da Gemini (erro ' +
            response.status +
            '). Tenta de novo em alguns instantes ou verifica a configuração da chave/modelo.',
        };
      }

      const data = await response.json();

      const text: string =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ??
        'Não consegui gerar uma resposta agora. Pode tentar perguntar de outro jeito?';

      return {
        message: text,
        recommendations: this.extractRecommendations(text),
      };
    } catch (error) {
      console.error('[AIService] Exceção ao chamar Gemini:', error);
      return {
        message:
          'Deu uma exceção na comunicação com a Gemini. Verifica sua conexão ou configuração do projeto e tenta novamente.',
      };
    }
  }

  private extractRecommendations(
    text: string
  ): AIResponse['recommendations'] {
    const lower = text.toLowerCase();
    const rec: AIResponse['recommendations'] = {};

    if (lower.includes('quest')) {
      rec.quests = ['1', '2'];
    }

    if (lower.includes('trilha') || lower.includes('curso')) {
      rec.courses = ['1', '2'];
    }

    if (lower.includes('skill') || lower.includes('skills')) {
      rec.skills = ['Programação', 'Comunicação', 'Resolução de problemas'];
    }

    return rec;
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }
}

export const aiService = new AIService();
