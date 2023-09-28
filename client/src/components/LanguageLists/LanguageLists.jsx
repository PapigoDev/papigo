import React from 'react'
import { useTranslation } from 'react-i18next';
import "./style.css"

import AZ from "../../assets/img/AZ.png"
import RU from "../../assets/img/RU.png"
import GB from "../../assets/img/GB.png"

const itemsData = [
  {
    id: 1,
    title: "az",
    imageUrl: AZ,
  },
  {
    id: 2,
    title: "ru",
    imageUrl: RU,
  },
  {
    id: 3,
    title: "en",
    imageUrl: GB,
  },
];

export default function LanguageLists({ changeLanguage }) {
  const { t } = useTranslation();
  return (
    <div className='language-container'>
      {itemsData.map((item) => (
        <div
          key={item.id}
          className='language-item'
          onClick={() => changeLanguage(`${item.title}`)}
        >
          <div className='language-image'>
            <img src={item.imageUrl} alt="country" />
          </div>
          <div>
            <p>{t(item.title)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
