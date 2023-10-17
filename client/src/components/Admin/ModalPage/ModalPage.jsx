import React from 'react'
import "./style.css"
import span from "../../../assets/img/span.png"
import whatsapp from "../../../assets/img/whatsapp.png"
import { t } from 'i18next';

const data = [
    {
        id: 1,
        content: t("professionalDogWalking"),
    },
    {
        id: 2,
        content: t("theNaturalNeedsOfTheDog"),
    },
    {
        id: 3,
        content: t("realTimeNotification"),
    },
];
const data1 = [
    {
        id: 1,
        content: t("dogWalking2aWeek"),
    },
    {
        id: 2,
        content: t("theNaturalNeedsOfTheDog"),
    },
    {
        id: 3,
        content: t("realTimeNotification"),
    },
];
const data2 = [
    {
        id: 1,
        content: t("dogWalking4aWeek"),
    },
    {
        id: 2,
        content: t("theNaturalNeedsOfTheDog"),
    },
    {
        id: 3,
        content: t("realTimeNotification"),
    },
];
const data3 = [
    {
        id: 1,
        content: t("dogWalking4aWeek"),
    },
    {
        id: 2,
        content: t("theNaturalNeedsOfTheDog"),
    },
    {
        id: 3,
        content: t("realTimeNotification"),
    },
];


export default function ModalPage({ selectedItem, handleModalClick }) {
    const handleWhatsAppClick = () => {
        const phoneNumber = '+994518305100';
        const message = 'Salam!'; // Ваше сообщение
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    // Определите, какие данные (data1, data2, data3) использовать на основе selectedItem.name
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
                <p className='modat-title'>{selectedItem.name === "hourly" ? t('hourly') : selectedItem.name}</p>
                <div className='modal-price'>
                    <div className='modal-price-items'>
                        <span>₼</span><p>{selectedItem.price}</p>
                    </div>
                    <div>
                        <span className='modal-month'>{selectedItem.name === "hourly" ? t('hourly') : t("monthly")}</span>
                    </div>
                </div>
                <div className='modal-datas'>
                    {dataToShow.map((item) => (
                        <div
                            key={item.id}
                            className='modal-data'
                            onClick={() => handleModalClick(item)}
                        >
                            <div><img src={span} alt="span" />
                            </div>
                            <p>{item.content}</p>
                        </div>
                    ))}
                </div>
                <div className='modal-description'>
                    <p>{t("warning")}</p>
                </div>

                <div className="modal-whatsapp-container">
                    <div><img src={whatsapp} alt="" />
                    </div>
                    <p onClick={handleWhatsAppClick}>{t("whatsapp")}</p>
                </div>
            </div>
        </div>
    )
}