import { FC } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, FileText, BarChart2, CheckSquare, Users, Shield } from 'lucide-react';

const HomePage: FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage="home" />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">MOOD.PA</h1>
              <p className="text-xl md:text-2xl mb-8">
                Analisador Técnico de Projetos Arquitetônicos
              </p>
              <p className="text-lg mb-8 opacity-90">
                Simplifique a análise de conformidade dos seus projetos com a legislação municipal de Itaúna
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/projetos"
                  className="px-6 py-3 bg-white text-blue-700 rounded-md font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  Acessar Projetos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/sobre"
                  className="px-6 py-3 bg-blue-700 text-white rounded-md font-medium hover:bg-blue-600 transition-colors border border-white/30 flex items-center justify-center"
                >
                  Saiba Mais
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Principais Funcionalidades</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <FileText className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Análise de Representação Gráfica</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Verificação automática da conformidade da representação gráfica do projeto com as normas municipais.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <BarChart2 className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Cálculo de Parâmetros Urbanísticos</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Análise automática de recuos, afastamentos, taxas de ocupação, permeabilidade e outros parâmetros.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <CheckSquare className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Relatórios Detalhados</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Geração de relatórios completos com análise de conformidade e recomendações para correções.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Users className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Gerenciamento de Projetos</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Interface intuitiva para gerenciar todos os seus projetos e acompanhar o status de cada análise.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Shield className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Segurança e Privacidade</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Sistema seguro com autenticação de usuários para proteger seus projetos e informações.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <ArrowRight className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Entrada Manual de Dados</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Possibilidade de inserir manualmente informações que não foram detectadas automaticamente.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Comece a usar o MOOD.PA hoje mesmo</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Simplifique o processo de análise técnica dos seus projetos arquitetônicos e 
                aumente a conformidade com a legislação municipal de Itaúna.
              </p>
              <Link
                href="/projetos"
                className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-500 transition-colors inline-flex items-center"
              >
                Acessar Plataforma
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
