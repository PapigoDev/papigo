import React from 'react';
import "./style.css";
import location from "../../asets/img/location.svg"

export default function Item({ serviceData, detailsData }) {
    
    return (
        <div className='item-detail-container'>
            <div className='item-detail'>
                <div className="item-detail-image">
                    <img className='detail-image' src={serviceData?.image} alt="foto" />
                </div>
                <div className="item-detail-details">
                    <p className='item-detail-name'>{serviceData?.name}</p>
                    <p className='item-detail-speciality'>{serviceData?.specialty}</p>
                    <div className='detail-location-container'>
                        <img src={location} alt="location" />
                        <p>{serviceData?.adress}</p>
                    </div>
                </div>
            </div>
            <div className="item-detail-description">
                <p>{detailsData?.description}</p>
            </div>
            <div className="detail-price">
                <div className='detail-price-left'>
                    <p className='detail-price-time'>Saatlıq</p>
                    <p className='detail-price-title'>İt gəzdirmə</p>
                </div>
                <div className="pakets-right">
                    <p>
                        <span>₼</span>{serviceData?.price}
                    </p>
                </div>

            </div>
            <div className='pakets-container'>
                <p className='paket-title'>Aylıq Paketlər</p>

                {detailsData && detailsData.paket.map((item) => (

                    <div key={item.name} className='pakets-items'>
                        <div className="pakets-left">
                            <p className="paket-left-title">{item.name}</p>
                            <p className="paket-left-service">İt gəzdirmə</p>
                            <p className="paket-left-week">Həftədə 2 dəfə 1 saat</p>
                        </div>
                        <div className="pakets-right">
                            <p>
                                <span>₼</span>{item.price}
                            </p>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
}
