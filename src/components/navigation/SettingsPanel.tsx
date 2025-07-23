import React, { useState } from 'react';
import { User, Bell, Shield, Languages, Monitor, Moon, Sun, ToggleLeft, ToggleRight, ChevronDown, ChevronUp, Smartphone } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useUser } from '../../contexts/UserContext';
const SettingsPanel = () => {
  const {
    darkMode,
    toggleDarkMode,
    setDarkMode,
    systemPreference,
    useSystemPreference
  } = useTheme();
  const {
    language,
    setLanguage,
    t
  } = useLanguage();
  const { userId } = useUser();
  const [expandedSection, setExpandedSection] = useState<string | null>('apariencia');
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  // Toggle notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [scrapingPeriod, setScrapingPeriod] = useState<number | undefined>(undefined);

  // Handler para ejecutar scraping manualmente
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  const handleManualScraping = async () => {
    if (!userId) {
      alert('No hay usuario autenticado.');
      return;
    }
    try {
      const response = await fetch(`${backendUrl}/run-all-scrapings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Scraping ejecutado:\n' + data.results.map((r: any) => `${r.script}: ${r.returncode === 0 ? 'OK' : 'Error'}\n${r.stdout || r.stderr}`).join('\n\n'));
      } else {
        alert('Error: ' + data.error);
      }
    } catch (err) {
      alert('Error de red o servidor');
    }
  };
  return <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[80vh] overflow-y-auto transition-colors duration-300">
      {/* Account Settings */}
      <div className="p-4">
        <button className="w-full flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/70 rounded-md p-1" onClick={() => toggleSection('cuenta')}>
          <div className="flex items-center">
            <User size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
            <h4 className="font-medium text-gray-800 dark:text-white transition-colors duration-300">
              {t('account')}
            </h4>
          </div>
          {expandedSection === 'cuenta' ? <ChevronUp size={18} className="text-gray-500 dark:text-gray-400" /> : <ChevronDown size={18} className="text-gray-500 dark:text-gray-400" />}
        </button>
        {expandedSection === 'cuenta' && <div className="pl-7 space-y-3 mt-3">
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/70 rounded-md p-1">
              {t('edit_profile')}
            </button>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/70 rounded-md p-1">
              {t('change_password')}
            </button>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/70 rounded-md p-1">
              {t('account_preferences')}
            </button>
          </div>}
      </div>

      {/* Notification Settings */}
      <div className="p-4">
        <button className="w-full flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/70 rounded-md p-1" onClick={() => toggleSection('notificaciones')}>
          <div className="flex items-center">
            <Bell size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
            <h4 className="font-medium text-gray-800 dark:text-white transition-colors duration-300">
              {t('notifications')}
            </h4>
          </div>
          {expandedSection === 'notificaciones' ? <ChevronUp size={18} className="text-gray-500 dark:text-gray-400" /> : <ChevronDown size={18} className="text-gray-500 dark:text-gray-400" />}
        </button>
        {expandedSection === 'notificaciones' && <div className="pl-7 space-y-4 mt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                {t('email_notifications')}
              </span>
              <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/70 rounded-md p-1" onClick={() => setEmailNotifications(!emailNotifications)}>
                {emailNotifications ? <ToggleRight size={20} className="text-blue-500 dark:text-blue-400" /> : <ToggleLeft size={20} className="text-gray-400 dark:text-gray-500" />}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                {t('push_notifications')}
              </span>
              <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/70 rounded-md p-1" onClick={() => setPushNotifications(!pushNotifications)}>
                {pushNotifications ? <ToggleRight size={20} className="text-blue-500 dark:text-blue-400" /> : <ToggleLeft size={20} className="text-gray-400 dark:text-gray-500" />}
              </button>
            </div>
          </div>}
      </div>

      {/* Language Settings */}
      <div className="p-4">
        <button className="w-full flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/70 rounded-md p-1" onClick={() => toggleSection('idioma')}>
          <div className="flex items-center">
            <Languages size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
            <h4 className="font-medium text-gray-800 dark:text-white transition-colors duration-300">
              {t('language')}
            </h4>
          </div>
          {expandedSection === 'idioma' ? <ChevronUp size={18} className="text-gray-500 dark:text-gray-400" /> : <ChevronDown size={18} className="text-gray-500 dark:text-gray-400" />}
        </button>
        {expandedSection === 'idioma' && <div className="pl-7 mt-3">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button className={`p-3 rounded-md flex items-center justify-center cursor-pointer ${language === 'es' ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 dark:border-blue-400' : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600'} transition-colors duration-300`} onClick={() => setLanguage('es')}>
                <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  Español
                </span>
              </button>
              <button className={`p-3 rounded-md flex items-center justify-center cursor-pointer ${language === 'en' ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 dark:border-blue-400' : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600'} transition-colors duration-300`} onClick={() => setLanguage('en')}>
                <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  English
                </span>
              </button>
            </div>
          </div>}
      </div>

      {/* Appearance Settings */}
      <div className="p-4">
        <button className="w-full flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/70 rounded-md p-1" onClick={() => toggleSection('apariencia')}>
          <div className="flex items-center">
            <Monitor size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
            <h4 className="font-medium text-gray-800 dark:text-white transition-colors duration-300">
              {t('appearance')}
            </h4>
          </div>
          {expandedSection === 'apariencia' ? <ChevronUp size={18} className="text-gray-500 dark:text-gray-400" /> : <ChevronDown size={18} className="text-gray-500 dark:text-gray-400" />}
        </button>
        {expandedSection === 'apariencia' && <div className="pl-7 space-y-4 mt-3">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {t('dark_mode')}
              </p>
              <div className="grid grid-cols-3 gap-2">
                <label className={`p-3 rounded-md flex flex-col items-center cursor-pointer ${!darkMode && !systemPreference ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 dark:border-blue-400' : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600'} transition-colors duration-300`}>
                  <input type="radio" name="theme" className="sr-only" checked={!darkMode && !systemPreference} onChange={() => {
                setDarkMode(false);
              }} />
                  <Sun size={18} className="text-gray-700 dark:text-gray-300 mb-1" />
                  <span className="text-xs text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    {t('light')}
                  </span>
                </label>
                <label className={`p-3 rounded-md flex flex-col items-center cursor-pointer ${darkMode && !systemPreference ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 dark:border-blue-400' : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600'} transition-colors duration-300`}>
                  <input type="radio" name="theme" className="sr-only" checked={darkMode && !systemPreference} onChange={() => {
                setDarkMode(true);
              }} />
                  <Moon size={18} className="text-gray-700 dark:text-gray-300 mb-1" />
                  <span className="text-xs text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    {t('dark')}
                  </span>
                </label>
                <label className={`p-3 rounded-md flex flex-col items-center cursor-pointer ${systemPreference ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 dark:border-blue-400' : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600'} transition-colors duration-300`}>
                  <input type="radio" name="theme" className="sr-only" checked={systemPreference} onChange={useSystemPreference} />
                  <Smartphone size={18} className="text-gray-700 dark:text-gray-300 mb-1" />
                  <span className="text-xs text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    {t('system')}
                  </span>
                </label>
              </div>
            </div>
          </div>}
      </div>

      {/* Security Settings */}
      <div className="p-4">
        <button className="w-full flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/70 rounded-md p-1" onClick={() => toggleSection('seguridad')}>
          <div className="flex items-center">
            <Shield size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
            <h4 className="font-medium text-gray-800 dark:text-white transition-colors duration-300">
              {t('security')}
            </h4>
          </div>
          {expandedSection === 'seguridad' ? <ChevronUp size={18} className="text-gray-500 dark:text-gray-400" /> : <ChevronDown size={18} className="text-gray-500 dark:text-gray-400" />}
        </button>
        {expandedSection === 'seguridad' && <div className="pl-7 space-y-4 mt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                {t('two_factor_auth')}
              </span>
              <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/70 rounded-md p-1" onClick={() => setTwoFactorAuth(!twoFactorAuth)}>
                {twoFactorAuth ? <ToggleRight size={20} className="text-blue-500 dark:text-blue-400" /> : <ToggleLeft size={20} className="text-gray-400 dark:text-gray-500" />}
              </button>
            </div>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/70 rounded-md p-1">
              {t('change_password')}
            </button>
          </div>}
      </div>

      {/* Scraping Settings */}
      <div className="p-4">
        <button className="w-full flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400/70 rounded-md p-1" onClick={() => toggleSection('scraping')}>
          <div className="flex items-center">
            {/* Puedes cambiar el ícono por uno más representativo si lo deseas */}
            <Monitor size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
            <h4 className="font-medium text-gray-800 dark:text-white transition-colors duration-300">
              Scraping
            </h4>
          </div>
          {expandedSection === 'scraping' ? <ChevronUp size={18} className="text-gray-500 dark:text-gray-400" /> : <ChevronDown size={18} className="text-gray-500 dark:text-gray-400" />}
        </button>
        {expandedSection === 'scraping' && <div className="pl-7 space-y-4 mt-3">
          <form className="space-y-3" onSubmit={e => { e.preventDefault(); /* Aquí puedes manejar el submit */ }}>
            <label className="block">
              <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">Periodo de scraping (días):</span>
              <input
                type="number"
                min="1"
                className="mt-1 block w-32 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                value={scrapingPeriod || ''}
                onChange={e => setScrapingPeriod(Number(e.target.value))}
                placeholder="Ej: 7"
                required
              />
            </label>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Guardar periodo
            </button>
          </form>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            onClick={handleManualScraping}
          >
            Ejecutar scraping manualmente
            </button>
          </div>}
      </div>
    </div>;
};
export default SettingsPanel;