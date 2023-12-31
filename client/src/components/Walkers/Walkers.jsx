import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style.css";
import location from "../../assets/img/location.svg"
import EditWalkerModal from '../Admin/EditWalkerModal/EditWalkerModal';
import { LiaUserEditSolid } from 'react-icons/lia';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { DeleteWalker } from "../../Api/WalkersApi"
import { DeleteDetail } from '../../Api/DetailsApi';
import { t } from 'i18next';



export default function Walkers({ walkers, userRole, updateWalkers }) {

  console.log(walkers)
  const [selectedWalker, setSelectedWalker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  document.body.classList.remove('modal-open');


  const navigate = useNavigate()

  const handleClick = (item) => {
    if (userRole === 'login') {
      navigate(`/admin/detail/${item._id}`);
    }
    else {
      navigate(`/detail/${item._id}`);
    }
  };
  const handleModalEdit = (item, event) => {
    event.stopPropagation();
    setSelectedWalker(item);
    setIsModalOpen(true);
    document.body.classList.add('modal-open');
  };
  const deleteWalker = async (item, event) => {
    event.stopPropagation();
    const response = await DeleteWalker(item._id)
    if (response.success) {
      await DeleteDetail(item._id)
      updateWalkers()
    }


  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('modal-open');
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
              <img
                  className='image'
                  src={!item?.image || item?.image.length === 0
                    ? "https://res.cloudinary.com/dmrh8jdqv/image/upload/v1696154633/papigo/a9rohersuogok1auzgob.png"
                    : item?.image
                  }
                  alt="foto"
                />
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
            <p className='walker-price'><span className='walker-azn'>₼</span>{item?.price}<span className='walket-time'>/{t('time')}</span></p>
              <div className='walker-buttons'>
                <button className="edit-button-small" onClick={(event) => handleModalEdit(item, event)}><LiaUserEditSolid /></button>
                <button className="delete-button-small" onClick={(event) => deleteWalker(item, event)} ><RiDeleteBin5Line /></button>

              </div>
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
                <img
                  className='image'
                  src={!item?.image || item?.image.length === 0
                    ? "https://res.cloudinary.com/dmrh8jdqv/image/upload/v1696154633/papigo/a9rohersuogok1auzgob.png"
                    : item?.image
                  }
                  alt="foto"
                />
              </div>
              <div className="item-details">
                <p className='walker-name'>{item?.name}</p>
                <p className='walker-speciality'>{item?.specialty}</p>
                <div className='location-container'>
                  <img src={location} alt="location" />
                  <p className='walker-address' >{item?.address}</p>
                </div>
              </div>
            </div>
            <div className="item-right">
              <p className='walker-price'><span className='walker-azn'>₼</span>{item?.price}<span className='walket-time'>/{t('time')}</span></p>
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
