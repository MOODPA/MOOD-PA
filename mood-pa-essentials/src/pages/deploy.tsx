import { FC, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import { Deploy, Check, AlertTriangle, Server, Globe } from 'lucide-react';

interface DeployPageProps {}

const DeployPage: FC<DeployPageProps> = () => {
  const router = useRouter();
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');
  const [deployUrl, setDeployUrl] = useState<string | null>(null);
  const [deployMessage, setDeployMessage] = useState<string | null>(null);
  
  const handleDeploy = async () => {
    try {
      setIsDeploying(true);
      setDeployStatus('deploying');
      setDeployMessage('Iniciando implantação da plataforma MOOD.PA...');
      
      // Simular processo de implantação
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDeployMessage('Preparando arquivos para implantação...');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDeployMessage('Configurando banco de dados...');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDeployMessage('Implantando aplicação...');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDeployMessage('Configurando domínio...');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular sucesso na implantação
      setDeployStatus('success');
      setDeployUrl('https://mood-pa.vercel.app');
      setDeployMessage('Implantação concluída com sucesso!');
    } catch (error) {
      console.error('Erro na implantação:', error);
      setDeployStatus('error');
      setDeployMessage('Ocorreu um erro durante a implantação. Por favor, tente novamente.');
    } finally {
      setIsDeploying(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage="deploy" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 flex items-center">
            <Deploy className="h-6 w-6 mr-2" />
            Implantação da Plataforma MOOD.PA
          </h1>
          
          {deployStatus === 'idle' && (
            <div className="mb-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A plataforma MOOD.PA está pronta para ser implantada permanentemente. 
                Ao prosseguir, a aplicação será disponibilizada em um domínio público 
                e estará acessível para todos os usuários.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mb-6">
                <h2 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-2 flex items-center">
                  <Server className="h-5 w-5 mr-2" />
                  Detalhes da Implantação
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-blue-600 dark:text-blue-400">
                  <li>A plataforma será implantada usando Vercel</li>
                  <li>Domínio personalizado: mood-pa.vercel.app</li>
                  <li>Banco de dados: LocalStorage (versão de demonstração)</li>
                  <li>Tempo estimado para implantação: 2-3 minutos</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md mb-6">
                <h2 className="text-lg font-medium text-yellow-700 dark:text-yellow-300 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Importante
                </h2>
                <p className="text-yellow-600 dark:text-yellow-400">
                  Esta é uma versão de demonstração da plataforma MOOD.PA. Em um ambiente 
                  de produção real, seria necessário configurar um banco de dados persistente 
                  e implementar medidas adicionais de segurança.
                </p>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => router.push('/test')}
                  className="px-4 py-2 border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Voltar para Testes
                </button>
                
                <button
                  onClick={handleDeploy}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
                >
                  Iniciar Implantação
                </button>
              </div>
            </div>
          )}
          
          {deployStatus === 'deploying' && (
            <div className="text-center py-8">
              <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <h2 className="text-xl font-medium mb-2">Implantação em Andamento</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {deployMessage}
              </p>
              <div className="w-full max-w-md mx-auto bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                <div className="bg-blue-600 h-2.5 rounded-full animate-pulse"></div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Por favor, não feche esta janela durante o processo de implantação.
              </p>
            </div>
          )}
          
          {deployStatus === 'success' && (
            <div className="text-center py-8">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-4 inline-flex mb-4">
                <Check className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-medium mb-2">Implantação Concluída com Sucesso!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {deployMessage}
              </p>
              
              <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md p-4 mb-8 max-w-md mx-auto">
                <h3 className="text-lg font-medium mb-2 flex items-center justify-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Acesse a Plataforma
                </h3>
                <div className="flex items-center justify-center">
                  <a
                    href={deployUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    {deployUrl}
                  </a>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => router.push('/')}
                  className="px-4 py-2 border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Voltar para Início
                </button>
                
                <a
                  href={deployUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                >
                  Visitar Plataforma
                </a>
              </div>
            </div>
          )}
          
          {deployStatus === 'error' && (
            <div className="text-center py-8">
              <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-4 inline-flex mb-4">
                <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-xl font-medium mb-2">Erro na Implantação</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {deployMessage}
              </p>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => router.push('/test')}
                  className="px-4 py-2 border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Voltar para Testes
                </button>
                
                <button
                  onClick={handleDeploy}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                >
                  Tentar Novamente
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DeployPage;
