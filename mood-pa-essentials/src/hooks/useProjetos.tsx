import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Projeto, ResultadoAnalise, db } from '@/utils/localStorageDB';
import { useAuth } from '@/hooks/useAuth';

// Definir o tipo para o contexto de projetos
type ProjetosContextType = {
  projetos: Projeto[];
  isLoading: boolean;
  criarProjeto: (projeto: Omit<Projeto, 'id' | 'usuarioId' | 'dataEnvio' | 'status'>) => Promise<Projeto>;
  atualizarProjeto: (projeto: Projeto) => Promise<Projeto>;
  removerProjeto: (id: string) => Promise<boolean>;
  getProjetoPorId: (id: string) => Promise<Projeto | null>;
  salvarResultadoAnalise: (resultado: Omit<ResultadoAnalise, 'id' | 'dataAnalise'>) => Promise<ResultadoAnalise>;
  getResultadoAnalisePorProjetoId: (projetoId: string) => Promise<ResultadoAnalise | null>;
};

// Criar o contexto com valores padrão
const ProjetosContext = createContext<ProjetosContextType>({
  projetos: [],
  isLoading: true,
  criarProjeto: async () => ({ id: '', usuarioId: '', nome: '', tipo: '', area: '', status: 'pendente', dataEnvio: '', arquivos: [] }),
  atualizarProjeto: async () => ({ id: '', usuarioId: '', nome: '', tipo: '', area: '', status: 'pendente', dataEnvio: '', arquivos: [] }),
  removerProjeto: async () => false,
  getProjetoPorId: async () => null,
  salvarResultadoAnalise: async () => ({ id: '', projetoId: '', dataAnalise: '', conformidadeGeral: 0, status: 'reprovado' }),
  getResultadoAnalisePorProjetoId: async () => null,
});

// Props para o provedor de projetos
type ProjetosProviderProps = {
  children: ReactNode;
};

// Componente provedor de projetos
export const ProjetosProvider = ({ children }: ProjetosProviderProps) => {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { usuario, isAuthenticated } = useAuth();

  // Carregar projetos do usuário quando autenticado
  useEffect(() => {
    const carregarProjetos = async () => {
      if (isAuthenticated && usuario) {
        try {
          setIsLoading(true);
          const projetosUsuario = await db.getProjetosPorUsuario(usuario.id);
          setProjetos(projetosUsuario);
        } catch (error) {
          console.error('Erro ao carregar projetos:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setProjetos([]);
        setIsLoading(false);
      }
    };

    carregarProjetos();
  }, [isAuthenticated, usuario]);

  // Função para criar um novo projeto
  const criarProjeto = async (projetoData: Omit<Projeto, 'id' | 'usuarioId' | 'dataEnvio' | 'status'>): Promise<Projeto> => {
    if (!usuario) {
      throw new Error('Usuário não autenticado');
    }

    const novoProjeto: Projeto = {
      id: `proj-${Date.now()}`,
      usuarioId: usuario.id,
      nome: projetoData.nome,
      tipo: projetoData.tipo,
      area: projetoData.area,
      status: 'pendente',
      dataEnvio: new Date().toISOString(),
      arquivos: projetoData.arquivos || [],
    };

    const projetoSalvo = await db.salvarProjeto(novoProjeto);
    setProjetos(prev => [...prev, projetoSalvo]);
    return projetoSalvo;
  };

  // Função para atualizar um projeto existente
  const atualizarProjeto = async (projeto: Projeto): Promise<Projeto> => {
    if (!usuario || projeto.usuarioId !== usuario.id) {
      throw new Error('Permissão negada');
    }

    const projetoSalvo = await db.salvarProjeto(projeto);
    setProjetos(prev => prev.map(p => p.id === projeto.id ? projetoSalvo : p));
    return projetoSalvo;
  };

  // Função para remover um projeto
  const removerProjeto = async (id: string): Promise<boolean> => {
    const projeto = await db.getProjetoPorId(id);
    if (!projeto || !usuario || projeto.usuarioId !== usuario.id) {
      throw new Error('Permissão negada');
    }

    const removido = await db.removerProjeto(id);
    if (removido) {
      setProjetos(prev => prev.filter(p => p.id !== id));
    }
    return removido;
  };

  // Função para obter um projeto por ID
  const getProjetoPorId = async (id: string): Promise<Projeto | null> => {
    const projeto = await db.getProjetoPorId(id);
    if (!projeto || !usuario || (projeto.usuarioId !== usuario.id && usuario.tipo !== 'administrador')) {
      return null;
    }
    return projeto;
  };

  // Função para salvar um resultado de análise
  const salvarResultadoAnalise = async (resultadoData: Omit<ResultadoAnalise, 'id' | 'dataAnalise'>): Promise<ResultadoAnalise> => {
    const projeto = await db.getProjetoPorId(resultadoData.projetoId);
    if (!projeto) {
      throw new Error('Projeto não encontrado');
    }

    const resultado: ResultadoAnalise = {
      id: `res-${Date.now()}`,
      projetoId: resultadoData.projetoId,
      dataAnalise: new Date().toISOString(),
      conformidadeGeral: resultadoData.conformidadeGeral,
      status: resultadoData.status,
      resultadoRepresentacao: resultadoData.resultadoRepresentacao,
      resultadoParametros: resultadoData.resultadoParametros,
    };

    return await db.salvarResultadoAnalise(resultado);
  };

  // Função para obter um resultado de análise por ID de projeto
  const getResultadoAnalisePorProjetoId = async (projetoId: string): Promise<ResultadoAnalise | null> => {
    const projeto = await db.getProjetoPorId(projetoId);
    if (!projeto || !usuario || (projeto.usuarioId !== usuario.id && usuario.tipo !== 'administrador')) {
      return null;
    }
    return await db.getResultadoAnalisePorProjetoId(projetoId);
  };

  return (
    <ProjetosContext.Provider
      value={{
        projetos,
        isLoading,
        criarProjeto,
        atualizarProjeto,
        removerProjeto,
        getProjetoPorId,
        salvarResultadoAnalise,
        getResultadoAnalisePorProjetoId,
      }}
    >
      {children}
    </ProjetosContext.Provider>
  );
};

// Hook personalizado para usar o contexto de projetos
export const useProjetos = () => useContext(ProjetosContext);
