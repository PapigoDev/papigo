import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import image1 from '../../assets/img/walking.png';
import image2 from '../../assets/img/grooming.png';
import image3 from '../../assets/img/kinoloq.png';
import image4 from '../../assets/img/hotel.png';
import "./style.css"

const itemsData = [
  {
    id: 1,
    title: "walking_title",
    imageUrl: image1,
  },
  {
    id: 2,
    title: "grooming",
    imageUrl: image2,
  },
  {
    id: 3,
    title: "cynologist",
    imageUrl: image3,
  },
  {
    id: 4,
    title: "pet-hotel",
    imageUrl: image4,
  },
];

export default function CareList() {
  const navigate=useNavigate()
  const { t } = useTranslation();
  const handleItemClick = (id) => {
    if (id === 1) {
      navigate('/walkers');
    }
  };
  return (
    <div className="care-lists">
      {itemsData.map((item) => (
        <div className="care-list" key={item.id} onClick={() => handleItemClick(item.id)}> 
          <p>{t(item.title)}</p>
          <img src={item.imageUrl} alt={item.title} />
        </div>
      ))}
    </div>
  );
}