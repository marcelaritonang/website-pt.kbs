import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export function LanguageSelector() {
  const { language, changeLanguage, t } = useLanguage();
  
  return (
    <div>
      <button 
        onClick={() => changeLanguage('en')} 
        className={language === 'en' ? 'active' : ''}
      >
        {t('common.english')}
      </button>
      <button 
        onClick={() => changeLanguage('id')} 
        className={language === 'id' ? 'active' : ''}
      >
        {t('common.indonesian')}
      </button>
    </div>
  );
}
