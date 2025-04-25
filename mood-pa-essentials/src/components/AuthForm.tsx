import { FC, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { User, Lock, Mail, UserPlus, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface AuthFormProps {}

const AuthForm: FC<AuthFormProps> = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { login, registrar } = useAuth();
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setLoading(true);
    
    try {
      let sucesso = false;
      
      if (isLogin) {
        // Login
        sucesso = await login(email, senha);
        if (!sucesso) {
          setErro('Email ou senha incorretos');
        }
      } else {
        // Registro
        if (!nome) {
          setErro('Nome é obrigatório');
          setLoading(false);
          return;
        }
        
        sucesso = await registrar(nome, email, senha);
        if (!sucesso) {
          setErro('Este email já está em uso');
        }
      }
      
      if (sucesso) {
        // Redirecionar para a página inicial
        router.push('/projetos');
      }
    } catch (error) {
      console.error('Erro na autenticação:', error);
      setErro('Ocorreu um erro durante a autenticação');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-full max-w-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">
          {isLogin ? 'Entrar no MOOD.PA' : 'Criar Conta no MOOD.PA'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {isLogin 
            ? 'Acesse sua conta para gerenciar seus projetos' 
            : 'Crie uma conta para começar a analisar seus projetos'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome Completo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Seu nome completo"
              />
            </div>
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="seu@email.com"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="senha" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Senha
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="••••••••"
              required
            />
          </div>
        </div>
        
        {erro && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md text-sm">
            {erro}
          </div>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? (
            <span>Processando...</span>
          ) : isLogin ? (
            <>
              <LogIn className="h-4 w-4 mr-2" />
              Entrar
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4 mr-2" />
              Criar Conta
            </>
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 hover:text-blue-500 text-sm"
        >
          {isLogin ? 'Não tem uma conta? Criar conta' : 'Já tem uma conta? Entrar'}
        </button>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Ao continuar, você concorda com os Termos de Serviço e Política de Privacidade do MOOD.PA.
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
