import { FC, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjetosList from '@/components/ProjetosList';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/hooks/useAuth';

interface ProjetosPageProps {}

const ProjetosPage: FC<ProjetosPageProps> = () => {
  const { usuario, isLoading, isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage="projetos" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 bg-blue-400 dark:bg-blue-600 rounded-full mb-4"></div>
              <div className="h-4 w-48 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Carregando...
            </p>
          </div>
        ) : isAuthenticated ? (
          <ProjetosList />
        ) : (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Acesso à Área de Projetos</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Faça login ou crie uma conta para acessar seus projetos
              </p>
            </div>
            <AuthForm />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjetosPage;
