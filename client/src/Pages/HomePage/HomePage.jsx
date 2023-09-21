import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.css';
import dog from '../../asets/img/dog.png';
import CareList from '../../components/CareList/CareList';
import i18n from '../../i18n';
import LanguageLists from '../../components/LanguageLists/LanguageLists';

export default function HomePage() {
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Меняйте активный язык при нажатии на кнопки
    console.log(lng)
  };

  return (
    <div className='home-container'>
      <div className='title-container'>
        <p className='homePage-title'>{t('homePage_title')}</p>
        <div className='homePage-image'>
          <img src={dog} alt='dog' />
        </div>
      </div>
      <CareList />
      <LanguageLists changeLanguage={changeLanguage} />
    </div>
  );
}
