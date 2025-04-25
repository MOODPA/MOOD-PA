import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definir o tipo para o contexto de tema
type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

// Criar o contexto com valores padrão
const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

// Props para o provedor de tema
type ThemeProviderProps = {
  children: ReactNode;
};

// Componente provedor de tema
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Estado para controlar o modo escuro
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Efeito para carregar a preferência de tema do localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('mood-pa-theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Função para alternar entre os temas
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('mood-pa-theme', newMode ? 'dark' : 'light');
      
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return newMode;
    });
  };

  // Retornar o provedor com o valor do contexto
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar o contexto de tema
export const useTheme = () => useContext(ThemeContext);
