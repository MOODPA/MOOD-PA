import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { useProjetos } from '@/hooks/useProjetos';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface TestPageProps {}

const TestPage: FC<TestPageProps> = () => {
  const router = useRouter();
  const { usuario, isAuthenticated, login } = useAuth();
  const { projetos, getProjetoPorId, getResultadoAnalisePorProjetoId } = useProjetos();
  
  const [testResults, setTestResults] = useState<{
    name: string;
    status: 'success' | 'error' | 'pending';
    message: string;
  }[]>([
    { name: 'Autenticação', status: 'pending', message: 'Testando autenticação...' },
    { name: 'Listagem de Projetos', status: 'pending', message: 'Testando listagem de projetos...' },
    { name: 'Visualização de Relatório', status: 'pending', message: 'Testando visualização de relatório...' },
    { name: 'Navegação', status: 'pending', message: 'Testando navegação entre páginas...' },
    { name: 'Persistência de Dados', status: 'pending', message: 'Testando persistência de dados...' }
  ]);
  
  useEffect(() => {
    const runTests = async () => {
      // Teste 1: Autenticação
      try {
        const loginSuccess = await login('joao@exemplo.com', 'senha123');
        if (loginSuccess && isAuthenticated) {
          updateTestResult(0, 'success', 'Autenticação funcionando corretamente');
        } else {
          updateTestResult(0, 'error', 'Falha na autenticação');
        }
      } catch (error) {
        updateTestResult(0, 'error', `Erro na autenticação: ${error}`);
      }
      
      // Teste 2: Listagem de Projetos
      try {
        if (projetos.length > 0) {
          updateTestResult(1, 'success', `Listagem de projetos funcionando corretamente. ${projetos.length} projetos encontrados.`);
        } else {
          updateTestResult(1, 'error', 'Nenhum projeto encontrado');
        }
      } catch (error) {
        updateTestResult(1, 'error', `Erro na listagem de projetos: ${error}`);
      }
      
      // Teste 3: Visualização de Relatório
      try {
        if (projetos.length > 0) {
          const projetoId = projetos[0].id;
          const resultado = await getResultadoAnalisePorProjetoId(projetoId);
          
          if (resultado) {
            updateTestResult(2, 'success', 'Visualização de relatório funcionando corretamente');
          } else {
            updateTestResult(2, 'error', 'Resultado de análise não encontrado');
          }
        } else {
          updateTestResult(2, 'error', 'Nenhum projeto disponível para testar relatório');
        }
      } catch (error) {
        updateTestResult(2, 'error', `Erro na visualização de relatório: ${error}`);
      }
      
      // Teste 4: Navegação
      try {
        // Simular navegação verificando se as rotas estão definidas
        const routes = ['/projetos', '/projetos/novo', '/admin', '/sobre'];
        let routesValid = true;
        
        for (const route of routes) {
          try {
            await router.prefetch(route);
          } catch (error) {
            routesValid = false;
            updateTestResult(3, 'error', `Rota ${route} não encontrada`);
            break;
          }
        }
        
        if (routesValid) {
          updateTestResult(3, 'success', 'Navegação entre páginas funcionando corretamente');
        }
      } catch (error) {
        updateTestResult(3, 'error', `Erro na navegação: ${error}`);
      }
      
      // Teste 5: Persistência de Dados
      try {
        // Verificar se os dados são persistidos no localStorage
        const usuariosStorage = localStorage.getItem('mood_pa_usuarios');
        const projetosStorage = localStorage.getItem('mood_pa_projetos');
        const resultadosStorage = localStorage.getItem('mood_pa_resultados_analise');
        
        if (usuariosStorage && projetosStorage && resultadosStorage) {
          updateTestResult(4, 'success', 'Persistência de dados funcionando corretamente');
        } else {
          updateTestResult(4, 'error', 'Dados não estão sendo persistidos corretamente');
        }
      } catch (error) {
        updateTestResult(4, 'error', `Erro na persistência de dados: ${error}`);
      }
    };
    
    runTests();
  }, []);
  
  const updateTestResult = (index: number, status: 'success' | 'error' | 'pending', message: string) => {
    setTestResults(prev => {
      const newResults = [...prev];
      newResults[index] = { ...newResults[index], status, message };
      return newResults;
    });
  };
  
  const getStatusIcon = (status: 'success' | 'error' | 'pending') => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };
  
  const allTestsCompleted = testResults.every(test => test.status !== 'pending');
  const allTestsPassed = testResults.every(test => test.status === 'success');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage="test" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Testes de Funcionalidades</h1>
          
          <div className="space-y-4 mb-8">
            {testResults.map((test, index) => (
              <div 
                key={index}
                className={`p-4 rounded-md ${
                  test.status === 'success' ? 'bg-green-50 dark:bg-green-900/20' :
                  test.status === 'error' ? 'bg-red-50 dark:bg-red-900/20' :
                  'bg-yellow-50 dark:bg-yellow-900/20'
                }`}
              >
                <div className="flex items-center">
                  {getStatusIcon(test.status)}
                  <h3 className="ml-2 font-medium">
                    Teste {index + 1}: {test.name}
                  </h3>
                </div>
                <p className={`mt-1 ml-7 text-sm ${
                  test.status === 'success' ? 'text-green-600 dark:text-green-400' :
                  test.status === 'error' ? 'text-red-600 dark:text-red-400' :
                  'text-yellow-600 dark:text-yellow-400'
                }`}>
                  {test.message}
                </p>
              </div>
            ))}
          </div>
          
          {allTestsCompleted && (
            <div className={`p-4 rounded-md ${
              allTestsPassed ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
            }`}>
              <h2 className="text-lg font-medium flex items-center">
                {allTestsPassed ? (
                  <>
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                    Todos os testes passaram com sucesso!
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 text-red-500 mr-2" />
                    Alguns testes falharam. Verifique os detalhes acima.
                  </>
                )}
              </h2>
              
              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {allTestsPassed 
                    ? 'A plataforma MOOD.PA está pronta para implantação permanente.' 
                    : 'É necessário corrigir os problemas antes de prosseguir com a implantação.'}
                </p>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => router.push('/projetos')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                  >
                    Voltar para Projetos
                  </button>
                  
                  {allTestsPassed && (
                    <button
                      onClick={() => router.push('/deploy')}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
                    >
                      Prosseguir para Implantação
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TestPage;
