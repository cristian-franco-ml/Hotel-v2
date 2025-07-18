import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, Bell, Bookmark, Sun, Moon, Settings, HelpCircle, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const {
    darkMode,
    toggleDarkMode
  } = useTheme();
  return <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img src="https://via.placeholder.com/40x40/FF0000/FFFFFF?text=A" alt="ArkusNexus Logo" className="h-8 w-8" />
            </div>
            <div className="ml-2 font-bold text-lg dark:text-white">
              ArkusNexus
            </div>
          </div>
          <nav className="flex space-x-1">
            <NavItem to="/dashboard" active={currentPath === '/dashboard'}>
              Resumen
            </NavItem>
            <NavItem to="/hotels" active={currentPath === '/hotels'}>
              Hoteles
            </NavItem>
            <NavItem to="/estrategias" active={currentPath === '/estrategias'}>
              Estrategias
            </NavItem>
            <NavItem to="/precios" active={currentPath === '/precios'}>
              Precios
            </NavItem>
            <NavItem to="/rendimiento" active={currentPath === '/rendimiento'}>
              Rendimiento
            </NavItem>
            <NavItem to="/mercado" active={currentPath === '/mercado'}>
              Mercado & Análisis
            </NavItem>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <Search size={20} />
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <Bell size={20} />
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <Bookmark size={20} />
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" onClick={toggleDarkMode} aria-label="Toggle dark mode">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <Settings size={20} />
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <HelpCircle size={20} />
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>;
};
const NavItem = ({
  children,
  active = false,
  to
}) => {
  return <Link to={to} className={`px-3 py-2 rounded-md text-sm font-medium ${active ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}>
      {children}
    </Link>;
};
export default Navigation;