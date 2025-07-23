import React, { useEffect, useState, useRef, Fragment } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Bookmark, Sun, Moon, Settings, HelpCircle, User, X, ChevronDown, CheckCircle, AlertCircle, Info, Calendar, PlusCircle, LogOut, UserCircle, Sliders, Command, Clock, Pin, DollarSign, BarChart2, TrendingUp } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { useTheme } from '../contexts/ThemeContext';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { useOverlay, OverlayKey } from '../contexts/OverlayContext';
import TopBarButton from './ui/TopBarButton';
import Skeleton from './ui/Skeleton';
import SearchPanel from './navigation/SearchPanel';
import NotificationsPanel from './navigation/NotificationsPanel';
import BookmarksPanel from './navigation/BookmarksPanel';
import SettingsPanel from './navigation/SettingsPanel';
import HelpPanel from './navigation/HelpPanel';
import EmptyState from './ui/EmptyState';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
// Types for Notification and Bookmark
interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}
interface Bookmark {
  id: number;
  type: string;
  title: string;
  description: string;
  path: string;
  pinned: boolean;
}
const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const {
    darkMode,
    toggleDarkMode
  } = useTheme();
  const {
    t
  } = useLanguage();
  const {
    open,
    setOpen,
    toggleOverlay,
    closeAll
  } = useOverlay();
  const navigate = useNavigate();
  const { user } = useUser();
  // Refs for button focus management
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const notifButtonRef = useRef<HTMLButtonElement>(null);
  const savedButtonRef = useRef<HTMLButtonElement>(null);
  const themeButtonRef = useRef<HTMLButtonElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const helpButtonRef = useRef<HTMLButtonElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  // Handle overlay closing and focus return
  const handleCloseOverlay = (buttonRef: React.RefObject<HTMLButtonElement>) => {
    closeAll();
    setTimeout(() => {
      buttonRef.current?.focus();
    }, 10);
  };
  // Set focus to search input when search overlay opens
  useEffect(() => {
    if (open === 'search') {
      const searchInput = document.getElementById('global-search-input');
      if (searchInput) {
        setTimeout(() => {
          searchInput.focus();
        }, 100);
      }
    }
  }, [open]);
  // Panel states
  const [activePanel, setActivePanel] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [activeHelpTab, setActiveHelpTab] = useState('faq');
  const [isBookmarkDrawerOpen, setIsBookmarkDrawerOpen] = useState(false);
  // Notifications data
  const [unreadNotifications, setUnreadNotifications] = useState<Notification[]>([]); // TODO: Fetch from Supabase
  const [readNotifications, setReadNotifications] = useState<Notification[]>([]); // TODO: Fetch from Supabase
  // Recent searches
  const [recentSearches, setRecentSearches] = useState<string[]>([]); // TODO: Fetch from Supabase or user context
  // Bookmarks data
  const [pinnedBookmarks, setPinnedBookmarks] = useState<Bookmark[]>([]); // TODO: Fetch from Supabase
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]); // TODO: Fetch from Supabase
  // Bookmark search query
  const [bookmarkSearchQuery, setBookmarkSearchQuery] = useState('');
  // Filter bookmarks based on search query
  const filteredBookmarks = bookmarkSearchQuery ? [...pinnedBookmarks, ...bookmarks].filter(b => b.title.toLowerCase().includes(bookmarkSearchQuery.toLowerCase()) || b.description.toLowerCase().includes(bookmarkSearchQuery.toLowerCase())) : [...pinnedBookmarks, ...bookmarks];
  // Toggle panel function
  const togglePanel = (panel: any) => {
    setActivePanel(activePanel === panel ? null : panel);
  };
  // Close panel function
  const closePanel = () => {
    setActivePanel(null);
  };
  // Mark all notifications as read
  const markAllAsRead = () => {
    setReadNotifications([...readNotifications, ...unreadNotifications]);
    setUnreadNotifications([]);
  };
  // Toggle bookmark pin status
  const toggleBookmarkPin = (id: number) => {
    const allBookmarks = [...pinnedBookmarks, ...bookmarks];
    const updatedBookmarks = allBookmarks.map(bookmark => {
      if (bookmark.id === id) {
        return {
          ...bookmark,
          pinned: !bookmark.pinned
        };
      }
      return bookmark;
    });
    setPinnedBookmarks(updatedBookmarks.filter(b => b.pinned));
    setBookmarks(updatedBookmarks.filter(b => !b.pinned));
  };
  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSearchOpen) {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsHelpOpen(false);
        setIsBookmarkDrawerOpen(false);
        setActivePanel(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen]);
  // Button base styles
  const baseButtonStyle = 'p-2 rounded-full transition-colors hover:bg-neutral-200/60 dark:hover:bg-neutral-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500';
  const activeButtonStyle = 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30';
  return <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img src="/arkusnexus-logo.png" alt="ArkusNexus Logo" className="h-8 w-auto" />
            </div>
            <div className="ml-2 font-bold text-lg text-gray-800 dark:text-white transition-colors duration-300">
              ArkusNexus
            </div>
          </div>
          <nav className="flex space-x-1">
            <NavItem to="/dashboard" active={currentPath === '/dashboard'}>
              {t('dashboard')}
            </NavItem>
            <NavItem to="/hotels" active={currentPath === '/hotels'}>
              {t('hotels')}
            </NavItem>
            <NavItem to="/estrategias" active={currentPath === '/estrategias'}>
              {t('strategies')}
            </NavItem>
            <NavItem to="/precios" active={currentPath === '/precios'}>
              {t('prices')}
            </NavItem>
            <NavItem to="/rendimiento" active={currentPath === '/rendimiento'}>
              {t('performance')}
            </NavItem>
            <NavItem to="/mercado" active={currentPath === '/mercado'}>
              {t('market')}
            </NavItem>
          </nav>
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <TopBarButton ref={searchButtonRef} data-testid="icon-search" active={open === 'search'} onClick={() => toggleOverlay('search')} aria-label="Buscar" ariaControls="search-dialog" title="Buscar (Presiona / para abrir)">
              <Search size={20} />
            </TopBarButton>

            {/* Notifications Button */}
            <TopBarButton ref={notifButtonRef} data-testid="icon-notif" active={open === 'notif'} onClick={() => toggleOverlay('notif')} aria-label="Notificaciones" ariaControls="notifications-menu" className="relative">
              <Bell size={20} />
              {unreadNotifications.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" data-bind="notifUnread">
                  {unreadNotifications.length}
                </span>}
            </TopBarButton>

            {/* Bookmarks Button */}
            <TopBarButton ref={savedButtonRef} data-testid="icon-saved" active={open === 'saved'} onClick={() => toggleOverlay('saved')} aria-label="Guardados" ariaControls="bookmarks-drawer">
              <Bookmark size={20} />
            </TopBarButton>

            {/* Theme Toggle Button */}
            <TopBarButton ref={themeButtonRef} data-testid="icon-theme" onClick={toggleDarkMode} aria-label={darkMode ? 'Desactivar modo oscuro' : 'Activar modo oscuro'} title={darkMode ? 'Desactivar modo oscuro' : 'Activar modo oscuro'}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </TopBarButton>

            {/* Settings Button */}
            <TopBarButton ref={settingsButtonRef} data-testid="icon-settings" active={open === 'settings'} onClick={() => toggleOverlay('settings')} aria-label="Configuración" ariaControls="settings-drawer">
              <Settings size={20} />
            </TopBarButton>

            {/* Help Button */}
            <TopBarButton ref={helpButtonRef} data-testid="icon-help" active={open === 'help'} onClick={() => toggleOverlay('help')} aria-label="Ayuda" ariaControls="help-dialog">
              <HelpCircle size={20} />
            </TopBarButton>

            {/* User Profile Button */}
            <TopBarButton ref={profileButtonRef} data-testid="icon-profile" active={open === 'profile'} onClick={() => toggleOverlay('profile')} aria-label="Perfil de usuario" ariaControls="profile-menu">
              <User size={20} />
            </TopBarButton>
          </div>
        </div>
      </div>

      {/* Global Search Dialog */}
      <Transition appear show={open === 'search'} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => handleCloseOverlay(searchButtonRef)} id="search-dialog">
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-start justify-center p-4 pt-16 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400 dark:text-gray-500" />
                    </div>
                    <input id="global-search-input" type="text" placeholder="Buscar hoteles, métricas o ayuda…" className="pl-10 pr-4 py-3 w-full border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300 text-lg" autoFocus />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <kbd className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 rounded">
                        ESC
                      </kbd>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-300">
                      Búsquedas recientes
                    </h4>
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => <div key={index} className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer" onClick={() => {
                      // Navigate to search results
                      handleCloseOverlay(searchButtonRef);
                    }}>
                          <Clock size={16} className="text-gray-400 dark:text-gray-500 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {search}
                          </span>
                        </div>)}
                    </div>
                    <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
                      <div className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Command size={16} className="mr-2" />
                        Consejo: escribe '/' para abrir búsqueda
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Notifications Dropdown */}
      <Transition show={open === 'notif'} as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
        <div className="absolute right-0 mt-2 w-80 max-h-[400px] overflow-y-auto origin-top-right bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-200 dark:divide-gray-700 z-50" style={{
        top: '64px',
        right: '16px'
      }} role="menu" aria-modal="true" id="notifications-menu">
          <div className="p-4 flex justify-between items-center">
            <h3 className="font-medium text-gray-800 dark:text-white">
              Notificaciones
            </h3>
            <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/70" onClick={markAllAsRead}>
              Marcar todas como leídas
            </button>
          </div>
          {/* Unread notifications */}
          {unreadNotifications.length > 0 && <div>
              <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Nuevas
              </div>
              {unreadNotifications.map(notification => <NotificationItem key={notification.id} notification={notification} onClick={() => {
            // Mark this notification as read
            const updatedUnread = unreadNotifications.filter(n => n.id !== notification.id);
            setUnreadNotifications(updatedUnread);
            setReadNotifications([...readNotifications, {
              ...notification,
              read: true
            }]);
          }} />)}
            </div>}
          {/* Read notifications */}
          {readNotifications.length > 0 && <div>
              <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Anteriores
              </div>
              {readNotifications.map(notification => <NotificationItem key={notification.id} notification={notification} />)}
            </div>}
          <div className="p-3 bg-gray-50 dark:bg-gray-700 text-center">
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/70" onClick={() => handleCloseOverlay(notifButtonRef)}>
              Ver todas las notificaciones
            </button>
          </div>
        </div>
      </Transition>

      {/* Bookmarks Drawer */}
      <Transition show={open === 'saved'} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => handleCloseOverlay(savedButtonRef)} id="bookmarks-drawer">
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 flex max-w-full">
            <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-300" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-300" leaveFrom="translate-x-0" leaveTo="translate-x-full">
              <Dialog.Panel className="w-screen max-w-[360px] h-full overflow-y-auto bg-white dark:bg-gray-800 shadow-xl">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <Dialog.Title as="h3" className="font-medium text-gray-800 dark:text-white flex items-center">
                    <Bookmark size={18} className="text-blue-500 dark:text-blue-400 mr-2" />
                    Elementos guardados
                  </Dialog.Title>
                  <button onClick={() => handleCloseOverlay(savedButtonRef)} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/70">
                    <X size={20} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={16} className="text-gray-400 dark:text-gray-500" />
                    </div>
                    <input type="text" placeholder="Buscar en guardados..." className="pl-10 pr-4 py-2 w-full border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300" value={bookmarkSearchQuery} onChange={e => setBookmarkSearchQuery(e.target.value)} />
                  </div>
                  {filteredBookmarks.length === 0 ? <div className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 mb-4 transition-colors duration-300">
                        <Bookmark size={24} className="text-gray-400 dark:text-gray-500" />
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 transition-colors duration-300">
                        No tienes elementos guardados
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 transition-colors duration-300">
                        Usa el ícono de marcador para guardar elementos
                      </p>
                    </div> : <>
                      {/* Pinned Bookmarks */}
                      {!bookmarkSearchQuery && pinnedBookmarks.length > 0 && <div>
                          <div className="py-2 mb-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Fijados
                          </div>
                          <div className="space-y-3 mb-6">
                            {pinnedBookmarks.map(bookmark => <BookmarkItem key={bookmark.id} bookmark={bookmark} onTogglePin={() => toggleBookmarkPin(bookmark.id)} />)}
                          </div>
                        </div>}
                      {/* All Bookmarks */}
                      <div>
                        <div className="py-2 mb-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          {bookmarkSearchQuery ? 'Resultados' : 'Todos los guardados'}
                        </div>
                        <div className="space-y-3">
                          {(bookmarkSearchQuery ? filteredBookmarks : bookmarks).map(bookmark => <BookmarkItem key={bookmark.id} bookmark={bookmark} onTogglePin={() => toggleBookmarkPin(bookmark.id)} />)}
                        </div>
                      </div>
                    </>}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Help Center Dialog */}
      <Transition appear show={open === 'help'} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => handleCloseOverlay(helpButtonRef)} id="help-dialog">
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center mb-6">
                    <Dialog.Title as="h3" className="text-lg font-medium text-gray-900 dark:text-white">
                      Centro de Ayuda
                    </Dialog.Title>
                    <button onClick={() => handleCloseOverlay(helpButtonRef)} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/70">
                      <X size={20} />
                    </button>
                  </div>
                  <HelpPanel />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Settings Panel */}
      <Transition show={open === 'settings'} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => handleCloseOverlay(settingsButtonRef)} id="settings-drawer">
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 flex max-w-full">
            <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-300" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-300" leaveFrom="translate-x-0" leaveTo="translate-x-full">
              <Dialog.Panel className="w-screen max-w-md h-full overflow-y-auto bg-white dark:bg-gray-800 shadow-xl">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <Dialog.Title as="h3" className="font-medium text-gray-800 dark:text-white flex items-center">
                    <Settings size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
                    Configuración
                  </Dialog.Title>
                  <button onClick={() => handleCloseOverlay(settingsButtonRef)} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/70">
                    <X size={20} />
                  </button>
                </div>
                <SettingsPanel />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* User Profile Menu */}
      <Transition show={open === 'profile'} as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
        <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50" style={{
        top: '64px',
        right: '16px'
      }} role="menu" aria-modal="true" id="profile-menu">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <img src={user?.user_metadata?.avatar_url || '/arkusnexus-logo.png'} alt="Avatar" className="h-10 w-10 rounded-full mr-3" />
              <div>
                <div className="font-medium text-gray-800 dark:text-white" data-bind="userName">
                  {user?.user_metadata?.display_name || user?.email || 'Usuario'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email}
                </div>
              </div>
            </div>
          </div>
          <div className="py-1">
            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={e => {
            e.preventDefault();
            handleCloseOverlay(profileButtonRef);
          }}>
              <UserCircle size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
              Mi perfil
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={e => {
            e.preventDefault();
            handleCloseOverlay(profileButtonRef);
            toggleOverlay('settings');
          }}>
              <Sliders size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
              Preferencias
            </a>
            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={async e => {
              e.preventDefault();
              handleCloseOverlay(profileButtonRef);
              await supabase.auth.signOut();
              navigate('/auth');
            }}>
              <LogOut size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
              Cerrar sesión
            </a>
          </div>
        </div>
      </Transition>
    </header>;
};
// Notification Item Component
interface NotificationItemProps {
  notification: Notification;
  onClick?: () => void;
}
const NotificationItem = ({
  notification,
  onClick
}: NotificationItemProps) => {
  const getIconByType = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertCircle size={16} className="text-amber-500 dark:text-amber-400" />;
      case 'success':
        return <CheckCircle size={16} className="text-green-500 dark:text-green-400" />;
      case 'price':
        return <DollarSign size={16} className="text-blue-500 dark:text-blue-400" />;
      case 'info':
      default:
        return <Info size={16} className="text-blue-500 dark:text-blue-400" />;
    }
  };
  return <div className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-300 ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`} onClick={onClick}>
      <div className="flex">
        <div className="mr-3 mt-0.5">{getIconByType(notification.type)}</div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div className="font-medium text-gray-800 dark:text-white transition-colors duration-300">
              {notification.title}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
              {notification.time}
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 transition-colors duration-300">
            {notification.message}
          </p>
        </div>
      </div>
    </div>;
};
// Bookmark Item Component
interface BookmarkItemProps {
  bookmark: Bookmark;
  onTogglePin: () => void;
}
const BookmarkItem = ({
  bookmark,
  onTogglePin
}: BookmarkItemProps) => {
  const getIconByType = (type: string) => {
    switch (type) {
      case 'hotel':
        return <User size={16} className="text-blue-500 dark:text-blue-400" />;
      case 'report':
        return <BarChart2 size={16} className="text-amber-500 dark:text-amber-400" />;
      case 'strategy':
        return <TrendingUp size={16} className="text-green-500 dark:text-green-400" />;
      case 'calendar':
        return <Calendar size={16} className="text-purple-500 dark:text-purple-400" />;
      default:
        return <Bookmark size={16} className="text-gray-500 dark:text-gray-400" />;
    }
  };
  return <div className="group relative p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
      <Link to={bookmark.path} className="flex items-start">
        <div className="mr-3 mt-0.5">{getIconByType(bookmark.type)}</div>
        <div>
          <div className="font-medium text-gray-800 dark:text-white transition-colors duration-300">
            {bookmark.title}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
            {bookmark.description}
          </div>
        </div>
      </Link>
      <button className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400" onClick={e => {
      e.preventDefault();
      e.stopPropagation();
      onTogglePin();
    }} title={bookmark.pinned ? 'Desfijar' : 'Fijar'}>
        <Pin size={16} className={bookmark.pinned ? 'text-blue-500 dark:text-blue-400' : ''} />
      </button>
    </div>;
};
interface NavItemProps {
  children: React.ReactNode;
  active?: boolean;
  to: string;
}
const NavItem: React.FC<NavItemProps> = ({
  children,
  active = false,
  to
}) => {
  return <Link to={to} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${active ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}>
      {children}
    </Link>;
};
export default Navigation;