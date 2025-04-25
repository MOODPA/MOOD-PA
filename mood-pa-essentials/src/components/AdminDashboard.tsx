import { FC, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { db, Usuario, Projeto } from '@/utils/localStorageDB';
import { Users, FileText, Trash2, Edit, Search, UserPlus, RefreshCw } from 'lucide-react';

interface AdminDashboardProps {}

const AdminDashboard: FC<AdminDashboardProps> = () => {
  const { usuario } = useAuth();
  const [activeTab, setActiveTab] = useState<'usuarios' | 'projetos'>('usuarios');
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Carregar dados
  useEffect(() => {
    const carregarDados = async () => {
      try {
        setIsLoading(true);
        
        if (activeTab === 'usuarios') {
          const listaUsuarios = await db.getUsuarios();
          setUsuarios(listaUsuarios);
        } else {
          const listaProjetos = await db.getProjetos();
          setProjetos(listaProjetos);
        }
      } catch (error) {
        console.error(`Erro ao carregar ${activeTab}:`, error);
      } finally {
        setIsLoading(false);
      }
    };
    
    carregarDados();
  }, [activeTab]);
  
  // Filtrar dados com base no termo de busca
  const usuariosFiltrados = usuarios.filter(user => 
    user.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const projetosFiltrados = projetos.filter(projeto => 
    projeto.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    projeto.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Remover usuário
  const removerUsuario = async (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este usuário?')) {
      try {
        await db.removerUsuario(id);
        setUsuarios(prev => prev.filter(user => user.id !== id));
      } catch (error) {
        console.error('Erro ao remover usuário:', error);
      }
    }
  };
  
  // Remover projeto
  const removerProjeto = async (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este projeto?')) {
      try {
        await db.removerProjeto(id);
        setProjetos(prev => prev.filter(projeto => projeto.id !== id));
      } catch (error) {
        console.error('Erro ao remover projeto:', error);
      }
    }
  };
  
  // Atualizar lista
  const atualizarLista = async () => {
    try {
      setIsLoading(true);
      
      if (activeTab === 'usuarios') {
        const listaUsuarios = await db.getUsuarios();
        setUsuarios(listaUsuarios);
      } else {
        const listaProjetos = await db.getProjetos();
        setProjetos(listaProjetos);
      }
    } catch (error) {
      console.error(`Erro ao atualizar ${activeTab}:`, error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Verificar se o usuário é administrador
  if (!usuario || usuario.tipo !== 'administrador') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Acesso Negado</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Você não tem permissão para acessar esta área. Esta seção é restrita a administradores.
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex">
          <button
            className={`px-4 py-3 text-sm font-medium flex items-center ${
              activeTab === 'usuarios'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('usuarios')}
          >
            <Users className="h-4 w-4 mr-2" />
            Usuários
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium flex items-center ${
              activeTab === 'projetos'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('projetos')}
          >
            <FileText className="h-4 w-4 mr-2" />
            Projetos
          </button>
        </nav>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {activeTab === 'usuarios' ? 'Gerenciar Usuários' : 'Gerenciar Projetos'}
          </h2>
          
          <div className="flex space-x-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={`Buscar ${activeTab === 'usuarios' ? 'usuários' : 'projetos'}...`}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button
              onClick={atualizarLista}
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              title="Atualizar lista"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
            
            {activeTab === 'usuarios' && (
              <button
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                onClick={() => {/* Implementar adição de usuário */}}
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Novo Usuário
              </button>
            )}
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
              Carregando dados...
            </p>
          </div>
        ) : (
          <>
            {activeTab === 'usuarios' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Nome
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Data de Criação
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {usuariosFiltrados.length > 0 ? (
                      usuariosFiltrados.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.nome}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {user.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.tipo === 'administrador' 
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
                                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            }`}>
                              {user.tipo === 'administrador' ? 'Administrador' : 'Profissional'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(user.dataCriacao).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-3"
                              onClick={() => {/* Implementar edição de usuário */}}
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                              onClick={() => removerUsuario(user.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                          Nenhum usuário encontrado
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            
            {activeTab === 'projetos' && (
              <div className="overflow-x-auto">
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
                    {projetosFiltrados.length > 0 ? (
                      projetosFiltrados.map((projeto) => (
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
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              projeto.status === 'aprovado' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                : projeto.status === 'reprovado'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                : projeto.status === 'aprovado_com_ressalvas'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                : projeto.status === 'analisado'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                            }`}>
                              {projeto.status === 'aprovado' ? 'Aprovado' : 
                               projeto.status === 'reprovado' ? 'Reprovado' :
                               projeto.status === 'aprovado_com_ressalvas' ? 'Aprovado com Ressalvas' :
                               projeto.status === 'analisado' ? 'Analisado' : 'Pendente'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(projeto.dataEnvio).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-3"
                              onClick={() => {/* Implementar visualização de projeto */}}
                            >
                              <FileText className="h-4 w-4" />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                              onClick={() => removerProjeto(projeto.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                          Nenhum projeto encontrado
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
