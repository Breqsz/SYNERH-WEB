// src/pages/Login.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Label } from '@/components/UI/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/card';
import { Alert, AlertDescription } from '@/components/UI/alert';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  // Onboarding antes do login
  useEffect(() => {
    const done = localStorage.getItem('synerh_onboarding_completed') === 'true';
    if (!done) navigate('/onboarding', { replace: true });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      console.error('Erro de login:', err);

      const code = err?.code;
      let msg = 'Erro ao fazer login. Verifique os dados digitados.';

      if (code === 'auth/user-not-found') msg = 'E-mail não cadastrado.';
      else if (
        code === 'auth/wrong-password' ||
        code === 'auth/invalid-credential'
      ) msg = 'Senha incorreta.';
      else if (code === 'auth/invalid-email') msg = 'Formato de e-mail inválido.';
      else if (code === 'auth/missing-password') msg = 'Digite sua senha.';

      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4">
            <span className="text-2xl font-bold text-white">S</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Synerh 2030+</h1>
          <p className="text-blue-100">Sua rede profissional do futuro</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-center">Entrar na sua conta</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {error && (
                <Alert className="bg-red-500/10 border-red-500/20 text-red-100">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-white/10 border-white/20 text-white"
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Entrando...
                  </>
                ) : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-blue-100 mb-2 text-center">Contas de demonstração:</p>
              <p className="text-xs text-white/70">📧 demo@synerh.com | 🔑 demo123</p>
              <p className="text-xs text-white/70 mt-1">📧 ana@synerh.com | 🔑 ana123</p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-white/70 text-sm">
                Não tem uma conta?{' '}
                <Link to="/register" className="text-blue-300 hover:text-blue-200 font-medium">
                  Cadastre-se
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-white/50 text-xs">
          <p>Synerh Mobile 2030+ • FIAP Global Solution</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
