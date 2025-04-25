import { FC } from 'react';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentPage?: string;
}

const Header: FC<HeaderProps> = ({ currentPage = 'home' }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="mood-header text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link href="/" className="mood-logo text-2xl font-bold">
              MOOD.PA
            </Link>
            <span className="text-xs bg-white bg-opacity-20 px-2 py-0.5 rounded">
              Beta
            </span>
          </div>

          {/* Menu para desktop */}
          <nav className="hidden md:flex space-x-6">
            <Link 
              href="/" 
              className={`hover:text-gray-200 transition-colors ${
                currentPage === 'home' ? 'font-bold' : ''
              }`}
            >
              Início
            </Link>
            <Link 
              href="/projetos" 
              className={`hover:text-gray-200 transition-colors ${
                currentPage === 'projetos' ? 'font-bold' : ''
              }`}
            >
              Projetos
            </Link>
            <Link 
              href="/sobre" 
              className={`hover:text-gray-200 transition-colors ${
                currentPage === 'sobre' ? 'font-bold' : ''
              }`}
            >
              Sobre
            </Link>
            <button
              onClick={toggleTheme}
              className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
              aria-label={isDarkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>

          {/* Botão de menu para mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-1 mr-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
              aria-label={isDarkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2 animate-fadeIn">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className={`hover:text-gray-200 transition-colors ${
                  currentPage === 'home' ? 'font-bold' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link 
                href="/projetos" 
                className={`hover:text-gray-200 transition-colors ${
                  currentPage === 'projetos' ? 'font-bold' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Projetos
              </Link>
              <Link 
                href="/sobre" 
                className={`hover:text-gray-200 transition-colors ${
                  currentPage === 'sobre' ? 'font-bold' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
