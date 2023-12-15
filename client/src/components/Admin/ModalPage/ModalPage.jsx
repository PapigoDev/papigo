import React from 'react'
import "./style.css"
import span from "../../../assets/img/span.png"
import whatsapp from "../../../assets/img/whatsapp.png"
import { t } from 'i18next';

const data = [
    {
        id: 1,
        content: "professionalDogWalking",
    },
    {
        id: 2,
        content: "theNaturalNeedsOfTheDog",
    },
    {
        id: 3,
        content: "realTimeNotification",
    },
];
const data1 = [
    {
        id: 1,
        content: "dogWalking2aWeek",
    },
    {
        id: 2,
        content: "theNaturalNeedsOfTheDog",
    },
    {
        id: 3,
        content: "realTimeNotification",
    },
];
const data2 = [
    {
        id: 1,
        content: "dogWalking4aWeek",
    },
    {
        id: 2,
        content: "theNaturalNeedsOfTheDog",
    },
    {
        id: 3,
        content: "realTimeNotification",
    },
];
const data3 = [
    {
        id: 1,
        content:"dogWalking4aWeek",
    },
    {
        id: 2,
        content: "theNaturalNeedsOfTheDog",
    },
    {
        id: 3,
        content:"realTimeNotification",
    },
];


export default function ModalPage({ walkerData,selectedItem, handleModalClick }) {
    console.log(walkerData)
    console.log(selectedItem)

    const handleWhatsAppClick = () => {
        const phoneNumber = `+994${walkerData?.mobile}`;
        const message = `${walkerData?.name} ${selectedItem?.name}`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    let dataToShow = [];
    switch (selectedItem.name) {
        case 'hourly':
            dataToShow = data;
            break;
        case 'Basic':
            dataToShow = data1;
            break;
        case 'Standart':
            dataToShow = data2;
            break;
        case 'Premium':
            dataToShow = data3;
            break;
        default:
            // Если selectedItem.name не соответствует ни одному из кейсов
            dataToShow = [];
    }

    return (
        <div className="modal-container" onClick={handleModalClick}>
            <div className="modal">
                <p className='modat-title'>{selectedItem?.name === "hourly" ? t('hourly') : selectedItem?.name}</p>
                <div className='modal-price'>
                    <div className='modal-price-items'>
                        <span>₼</span><p>{selectedItem?.price}</p>
                    </div>
                    <div>
                        <span className='modal-month'>{selectedItem?.name === "hourly" ? t('hourly') : t("monthly")}</span>
                    </div>
                </div>
                <div className='modal-datas'>
                    {dataToShow.map((item) => (
                        <div
                            key={item?.id}
                            className='modal-data'
                            onClick={() => handleModalClick(item)}
                        >
                            <div><img src={span} alt="span" />
                            </div>
                            <p>{t(item?.content)}</p>
                        </div>
                    ))}
                </div>
                <div className='modal-description'>
                    <p>{t("warning")}</p>
                </div>

                <div 
                className="modal-whatsapp-container"
                onClick={handleWhatsAppClick}
                >
                    <div><img src={whatsapp} alt="" />
                    </div>
                    <p >{t("whatsapp")}</p>
                </div>
            </div>
        </div>
    )
}