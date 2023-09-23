import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./style.css";
import location from "../../asets/img/location.svg"

export default function Items({servicesData}) {
  const navigate=useNavigate()
  const handleClick = (item) => {
    localStorage.setItem('selectedItem', JSON.stringify(item));
    navigate(`/detail/${item._id}`);
  };

  return (
    <div className='items-container'>
      {servicesData && servicesData.map((item) => (
        <div 
        key={item._id} 
        className='item-container'
        onClick={() => handleClick(item)}
        >
          <div className='item-left'>
            <div className="item-image">
              <img className='image' src={item.image} alt="foto" />
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>{item.specialty}</p>
              <div className='location-container'>
                <img src={location} alt="location" />
                <p>{item.address}</p>
              </div>
            </div>
          </div>
          <div className="item-right">
            <p><span>₼</span>{item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
