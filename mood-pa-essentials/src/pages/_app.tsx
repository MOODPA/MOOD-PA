import { FC, useEffect } from 'react';
import { AuthProvider } from '@/hooks/useAuth';
import { ProjetosProvider } from '@/hooks/useProjetos';
import { useRouter } from 'next/router';
import '@/styles/globals.css';

interface AppProps {
  Component: FC;
  pageProps: any;
}

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  
  // Efeito para inicializar a aplicação
  useEffect(() => {
    // Verificar se é a primeira visita
    const isFirstVisit = localStorage.getItem('mood_pa_first_visit') !== 'false';
    if (isFirstVisit) {
      // Marcar como não sendo mais a primeira visita
      localStorage.setItem('mood_pa_first_visit', 'false');
      
      // Inicializar o tema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
      localStorage.setItem('mood_pa_theme', prefersDark ? 'dark' : 'light');
    }
  }, []);
  
  return (
    <AuthProvider>
      <ProjetosProvider>
        <Component {...pageProps} />
      </ProjetosProvider>
    </AuthProvider>
  );
};

export default App;
