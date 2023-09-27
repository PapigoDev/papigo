import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style.css";
import location from "../../asets/img/location.svg"
import EditWalkerModal from '../EditWalkerModal/EditWalkerModal';

export default function Walkers({ walkers, userRole,updateWalkers }) {
  const [selectedWalker, setSelectedWalker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const navigate = useNavigate()

  const handleClick = (item) => {
    if (userRole === 'login'){
      // localStorage.setItem('selectedItem', JSON.stringify(item));
      navigate(`/admin/detail/${item._id}`);
    }
    else{
      // localStorage.setItem('selectedItem', JSON.stringify(item));
      navigate(`/detail/${item._id}`);
    }
  };
  const handleModal = (item, event) => {
    if (userRole === 'login') {
      event.stopPropagation();
      setSelectedWalker(item);
      setIsModalOpen(true);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWalker(null);
  };

  return (
    <div className='items-container'>
      {userRole ? (
        walkers && walkers.map((item) => (
          <div
            key={item._id}
            className='item-container'
            onClick={() => handleClick(item)}
          >
            <div className='item-left'>
              <div className="item-image">
                <img className='image' src={item?.image} alt="foto" />
              </div>
              <div className="item-details">
                <h3>{item?.name}</h3>
                <p>{item?.specialty}</p>
                <div className='location-container'>
                  <img src={location} alt="location" />
                  <p>{item?.address}</p>
                </div>
              </div>
            </div>
            <div className="item-right">
              <p><span>₼</span>{item?.price}</p>
              <button onClick={(event) => handleModal(item, event)}>Edit</button>
            </div>
          </div>
        ))) :
        (walkers && walkers.map((item) => (
          <div
            key={item._id}
            className='item-container'
            onClick={() => handleClick(item)}
          >
            <div className='item-left'>
              <div className="item-image">
                <img className='image' src={item?.image} alt="foto" />
              </div>
              <div className="item-details">
                <h3>{item?.name}</h3>
                <p>{item?.specialty}</p>
                <div className='location-container'>
                  <img src={location} alt="location" />
                  <p>{item?.address}</p>
                </div>
              </div>
            </div>
            <div className="item-right">
              <p><span>₼</span>{item?.price}</p>
            </div>
          </div>
        )))
      }

      {isModalOpen && selectedWalker && (
        <EditWalkerModal selectedWalkerId={selectedWalker._id} closeModal={closeModal} updateWalkers={updateWalkers} />
      )}

    </div>
  );
}
