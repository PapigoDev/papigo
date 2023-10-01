import React, { useState } from 'react';
import "./style.css";
import location from "../../assets/img/location.svg"
import ModalPage from '../Admin/ModalPage/ModalPage';
import { useTranslation } from 'react-i18next';


export default function Item({ walkerData, detailsData, userRole }) {
    const { t } = useTranslation();
    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = (item) => {
        setSelectedItem(item);
    };
    const closeModal = () => {
        setSelectedItem(null);
    };
    const handleModalClick = (e) => {
        if (e.target.classList.contains("modal-container")) {
            closeModal();
        }
    };

    return (
        <div className='item-detail-container'>

            {userRole ?
                (
                    <div>
                        <div className='item-detail'>
                            <div className="item-detail-image">
                                <img
                                    className='detail-image'
                                    src={!walkerData?.image || walkerData?.image.length === 0
                                        ? "https://res.cloudinary.com/dmrh8jdqv/image/upload/v1696154633/papigo/a9rohersuogok1auzgob.png"
                                        : walkerData?.image
                                    }
                                    alt="foto"
                                />
                            </div>
                            <div className="item-detail-details">
                                <p className='item-detail-name'>{walkerData?.name}</p>
                                <p className='item-detail-speciality'>{walkerData?.specialty}</p>
                                <div className='detail-location-container'>
                                    <img src={location} alt="location" />
                                    <p>{walkerData?.address}</p>
                                </div>
                            </div>
                        </div>
                        <div className="item-detail-description">
                            <p>{detailsData?.description}</p>
                        </div>
                        <div className="detail-price">
                            <div className='detail-price-left'>
                                <p className='detail-price-time'>{t('hourly')}</p>
                                <p className='detail-price-title'>{walkerData?.specialty}</p>
                            </div>
                            <div className="pakets-right">
                                <p>
                                    <span>₼</span>{walkerData?.price}
                                </p>
                            </div>
                        </div>
                        <div className='pakets-container'>
                            <p className='paket-title'>{t('monthly_packages')}</p>

                            {detailsData && detailsData.paket.map((item) => (
                                <div
                                    key={item.name}
                                    className='pakets-items'
                                    onClick={() => openModal(item)}
                                >
                                    <div className="pakets-left">
                                        <p className="paket-left-title">{item.name}</p>
                                        <p className="paket-left-service">{walkerData?.specialty}</p>
                                        <p className="paket-left-week">{item.weekWalker}</p>
                                    </div>
                                    <div className="pakets-right">
                                        <p>
                                            <span>₼</span>{item.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {selectedItem && (<ModalPage selectedItem={selectedItem} handleModalClick={handleModalClick} />
                            )}
                        </div>
                    </div>
                )
                :
                (
                    <div>
                        <div className='item-detail'>
                            <div className="item-detail-image">
                                <img
                                    className='detail-image'
                                    src={!walkerData?.image || walkerData?.image.length === 0
                                        ? "https://res.cloudinary.com/dmrh8jdqv/image/upload/v1696154633/papigo/a9rohersuogok1auzgob.png"
                                        : walkerData?.image
                                    }
                                    alt="foto"
                                />
                            </div>
                            <div className="item-detail-details">
                                <p className='item-detail-name'>{walkerData?.name}</p>
                                <p className='item-detail-speciality'>{walkerData?.specialty}</p>
                                <div className='detail-location-container'>
                                    <img src={location} alt="location" />
                                    <p>{walkerData?.address}</p>
                                </div>
                            </div>
                        </div>
                        <div className="item-detail-description">
                            <p>{detailsData?.description}</p>
                        </div>
                        <div className="detail-price">
                            <div className='detail-price-left'>
                                <p className='detail-price-time'>{t('hourly')}</p>
                                <p className='detail-price-title'>{walkerData?.specialty}</p>
                            </div>
                            <div className="pakets-right">
                                <p>
                                    <span>₼</span>{walkerData?.price}
                                </p>
                            </div>
                        </div>
                        <div className='pakets-container'>
                            <p className='paket-title'>{t('monthly_packages')}</p>
                            {detailsData && detailsData.paket.map((item) => (
                                <div
                                    key={item.name}
                                    className='pakets-items'
                                    onClick={() => openModal(item)}
                                >
                                    <div className="pakets-left">
                                        <p className="paket-left-title">{item.name}</p>
                                        <p className="paket-left-service">{walkerData?.specialty}</p>
                                        <p className="paket-left-week">{item.weekWalker}</p>
                                    </div>
                                    <div className="pakets-right">
                                        <p>
                                            <span>₼</span>{item.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {selectedItem && (<ModalPage selectedItem={selectedItem} handleModalClick={handleModalClick} />
                            )}
                        </div>
                    </div>
                )
            }
        </div>
    );
}
