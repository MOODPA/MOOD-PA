import { FC } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminDashboard from '@/components/AdminDashboard';

interface AdminPageProps {}

const AdminPage: FC<AdminPageProps> = () => {
  const { usuario, isLoading } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage="admin" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Painel de Administração</h1>
        
        {isLoading ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 bg-blue-400 dark:bg-blue-600 rounded-full mb-4"></div>
              <div className="h-4 w-48 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
              Carregando...
            </p>
          </div>
        ) : (
          <AdminDashboard />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPage;
