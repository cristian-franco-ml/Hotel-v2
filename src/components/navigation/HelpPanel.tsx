import React, { useState } from 'react';
import Skeleton from '../ui/Skeleton';
import { useLanguage } from '../../contexts/LanguageContext';
const HelpPanel = () => {
  const {
    t
  } = useLanguage();
  const [activeTab, setActiveTab] = useState('faq');
  // FAQ data
  const faqItems = [{
    question: t('faq_competition_question'),
    answer: t('faq_competition_answer')
  }, {
    question: t('faq_data_update_question'),
    answer: t('faq_data_update_answer')
  }, {
    question: t('faq_rules_question'),
    answer: t('faq_rules_answer')
  }];
  // Support contact info
  const supportInfo = {
    email: 'soporte@arkusnexus.com',
    phone: '+52 (664) 123-4567',
    hours: 'Lunes a Viernes, 9:00 - 18:00'
  };
  // Keyboard shortcuts
  const shortcuts = [{
    key: '/',
    action: t('open_global_search')
  }, {
    key: 'ESC',
    action: t('close_dialogs')
  }, {
    key: 'Ctrl+B',
    action: t('open_bookmarks')
  }, {
    key: 'Ctrl+H',
    action: t('open_help_center')
  }, {
    key: 'Ctrl+D',
    action: t('toggle_theme')
  }];
  return <div>
      <div className="mb-6">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button className={`px-4 py-2 text-sm font-medium ${activeTab === 'faq' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400'}`} onClick={() => setActiveTab('faq')}>
            {t('faq')}
          </button>
          <button className={`px-4 py-2 text-sm font-medium ${activeTab === 'soporte' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400'}`} onClick={() => setActiveTab('soporte')}>
            {t('support')}
          </button>
          <button className={`px-4 py-2 text-sm font-medium ${activeTab === 'atajos' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400'}`} onClick={() => setActiveTab('atajos')}>
            {t('keyboard_shortcuts')}
          </button>
        </div>
      </div>
      {activeTab === 'faq' && <div className="space-y-4">
          {faqItems.map((item, index) => <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 font-medium text-gray-800 dark:text-white">
                {item.question}
              </div>
              <div className="p-4 text-gray-600 dark:text-gray-300 text-sm">
                {item.answer}
              </div>
            </div>)}
        </div>}
      {activeTab === 'soporte' && <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('email_contact')}
            </h4>
            <a href={`mailto:${supportInfo.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
              {supportInfo.email}
            </a>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('support_phone')}
            </h4>
            <p className="text-gray-800 dark:text-gray-200">
              {supportInfo.phone}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('live_chat')}
            </h4>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              {t('start_live_chat')}
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {t('service_available')} {supportInfo.hours}
            </p>
          </div>
        </div>}
      {activeTab === 'atajos' && <div>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('shortcut')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('action')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {shortcuts.map((shortcut, index) => <tr key={index}>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    <kbd className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 rounded">
                      {shortcut.key}
                    </kbd>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {shortcut.action}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>}
    </div>;
};
export default HelpPanel;