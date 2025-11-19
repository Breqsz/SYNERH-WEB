import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/UI/button';
import { Card, CardContent } from '@/components/UI/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ONBOARDING_SLIDES } from '@/utils/constants';

const Onboarding: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (currentSlide < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Finalizar onboarding
      localStorage.setItem('synerh_onboarding_completed', 'true');
      navigate('/login');
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const skipOnboarding = () => {
    localStorage.setItem('synerh_onboarding_completed', 'true');
    navigate('/login');
  };

  const slide = ONBOARDING_SLIDES[currentSlide];

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <div className="flex space-x-2">
          {ONBOARDING_SLIDES.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-white'
                  : index < currentSlide
                  ? 'w-2 bg-white/60'
                  : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>
        <Button
          variant="ghost"
          className="text-white hover:bg-white/10"
          onClick={skipOnboarding}
        >
          Pular
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardContent className="p-8 text-center">
            {/* Icon/Emoji */}
            <div className={`text-8xl mb-6 bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent filter drop-shadow-lg`}>
              {slide.icon}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <h2 className="text-xl font-semibold mb-4 text-blue-100">
              {slide.subtitle}
            </h2>

            {/* Description */}
            <p className="text-white/80 leading-relaxed mb-8">
              {slide.description}
            </p>

            {/* Features específicas por slide */}
            {currentSlide === 0 && (
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl mb-1">🌐</div>
                  <p>Rede Global</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl mb-1">🔗</div>
                  <p>Descentralizada</p>
                </div>
              </div>
            )}

            {currentSlide === 1 && (
              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span>Quest Exemplo</span>
                  <span className="text-emerald-300 font-bold">+500 💎</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                  <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-2 rounded-full w-3/4"></div>
                </div>
              </div>
            )}

            {currentSlide === 2 && (
              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    🤖
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">IA Coach</p>
                    <p className="text-xs text-white/70">Recomendação personalizada</p>
                  </div>
                </div>
              </div>
            )}

            {currentSlide === 3 && (
              <div className="space-y-2 mb-6 text-sm">
                <div className="flex items-center justify-between bg-white/10 rounded p-2">
                  <span>IA Avançada</span>
                  <span className="text-emerald-300">92%</span>
                </div>
                <div className="flex items-center justify-between bg-white/10 rounded p-2">
                  <span>React Native</span>
                  <span className="text-yellow-300">78%</span>
                </div>
              </div>
            )}

            {currentSlide === 4 && (
              <div className="grid grid-cols-3 gap-3 mb-6 text-xs">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-xl mb-1">🏆</div>
                  <p>Reputação</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-xl mb-1">💎</div>
                  <p>Tokens</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-xl mb-1">⭐</div>
                  <p>Conquistas</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center p-6">
        <Button
          variant="ghost"
          className="text-white hover:bg-white/10"
          onClick={prevSlide}
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>

        <Button
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8"
          onClick={nextSlide}
        >
          {currentSlide === ONBOARDING_SLIDES.length - 1 ? 'Começar' : 'Próximo'}
          {currentSlide < ONBOARDING_SLIDES.length - 1 && (
            <ChevronRight className="h-4 w-4 ml-2" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;