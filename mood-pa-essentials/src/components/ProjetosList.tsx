import { FC, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProjetos } from '@/hooks/useProjetos';
import { FileText, Filter, Plus, Search, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface ProjetosListProps {}

const ProjetosList: FC<ProjetosListProps> = () => {
  const { usuario } = useAuth();
  const { projetos, isLoading } = useProjetos();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const router = useRouter();
  
  // Filtrar projetos com base no termo de busca e filtro de status
  const projetosFiltrados = projetos.filter(projeto => {
    const matchesSearch = 
      projeto.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
      projeto.tipo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'todos' || 
      projeto.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Função para renderizar o ícone de status
  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'aprovado':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'reprovado':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'aprovado_com_ressalvas':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };
  
  // Função para formatar o status
  const formatStatus = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'Pendente';
      case 'analisado':
        return 'Analisado';
      case 'aprovado':
        return 'Aprovado';
      case 'reprovado':
        return 'Reprovado';
      case 'aprovado_com_ressalvas':
        return 'Aprovado com Ressalvas';
      default:
        return status;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h2 className="text-xl font-semibold">Meus Projetos</h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar projetos..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="todos">Todos os Status</option>
                <option value="pendente">Pendente</option>
                <option value="analisado">Analisado</option>
                <option value="aprovado">Aprovado</option>
                <option value="reprovado">Reprovado</option>
                <option value="aprovado_com_ressalvas">Aprovado com Ressalvas</option>
              </select>
            </div>
            
            <Link
              href="/projetos/novo"
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
            >
              <Plus className="h-4 w-4 mr-1" />
              Novo Projeto
            </Link>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-blue-400 dark:bg-blue-600 rounded-full mb-4"></div>
            <div className="h-4 w-48 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Carregando projetos...
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {projetosFiltrados.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Nome
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Área
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Data de Envio
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {projetosFiltrados.map((projeto) => (
                  <tr key={projeto.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {projeto.nome}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {projeto.tipo}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {projeto.area} m²
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {renderStatusIcon(projeto.status)}
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          {formatStatus(projeto.status)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(projeto.dataEnvio).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/projetos/relatorio/${projeto.id}`}
                        className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                      >
                        Ver Relatório
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                Nenhum projeto encontrado
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchTerm || statusFilter !== 'todos' 
                  ? 'Nenhum projeto corresponde aos filtros aplicados.' 
                  : 'Você ainda não tem projetos. Crie um novo projeto para começar.'}
              </p>
              {(searchTerm || statusFilter !== 'todos') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('todos');
                  }}
                  className="text-blue-600 hover:text-blue-500"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjetosList;
