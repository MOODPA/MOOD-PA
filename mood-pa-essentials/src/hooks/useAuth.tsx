import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Usuario, db } from '@/utils/localStorageDB';

// Definir o tipo para o contexto de autenticação
type AuthContextType = {
  usuario: Usuario | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  registrar: (nome: string, email: string, senha: string) => Promise<boolean>;
};

// Criar o contexto com valores padrão
const AuthContext = createContext<AuthContextType>({
  usuario: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  registrar: async () => false,
});

// Props para o provedor de autenticação
type AuthProviderProps = {
  children: ReactNode;
};

// Componente provedor de autenticação
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se há um usuário logado ao carregar a página
  useEffect(() => {
    const verificarAutenticacao = async () => {
      try {
        const usuarioId = localStorage.getItem('mood_pa_usuario_id');
        if (usuarioId) {
          const usuarioEncontrado = await db.getUsuarioPorId(usuarioId);
          if (usuarioEncontrado) {
            setUsuario(usuarioEncontrado);
          } else {
            // Usuário não encontrado, limpar o ID armazenado
            localStorage.removeItem('mood_pa_usuario_id');
          }
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Inicializar o banco de dados com dados de exemplo
    db.inicializarComDadosExemplo().then(() => {
      verificarAutenticacao();
    });
  }, []);

  // Função para fazer login
  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      const usuarioEncontrado = await db.getUsuarioPorEmail(email);
      
      if (usuarioEncontrado && usuarioEncontrado.senha === senha) {
        // Em produção, usar bcrypt para comparar senhas
        setUsuario(usuarioEncontrado);
        localStorage.setItem('mood_pa_usuario_id', usuarioEncontrado.id);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };

  // Função para fazer logout
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('mood_pa_usuario_id');
  };

  // Função para registrar novo usuário
  const registrar = async (nome: string, email: string, senha: string): Promise<boolean> => {
    try {
      // Verificar se já existe um usuário com este email
      const usuarioExistente = await db.getUsuarioPorEmail(email);
      if (usuarioExistente) {
        return false;
      }
      
      // Criar novo usuário
      const novoUsuario: Usuario = {
        id: `user-${Date.now()}`,
        nome,
        email,
        senha, // Em produção, usar bcrypt para hash
        tipo: 'profissional',
        dataCriacao: new Date().toISOString()
      };
      
      // Salvar usuário
      await db.salvarUsuario(novoUsuario);
      
      // Fazer login automaticamente
      setUsuario(novoUsuario);
      localStorage.setItem('mood_pa_usuario_id', novoUsuario.id);
      
      return true;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isLoading,
        isAuthenticated: !!usuario,
        login,
        logout,
        registrar
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);
