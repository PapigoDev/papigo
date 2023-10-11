import React from 'react'
import "./style.css"
import span from "../../../assets/img/span.png"
import whatsapp from "../../../assets/img/whatsapp.png"

const data = [
    {
        id: 1,
        content: 'Bütün padşahlardan fərqli olaraq',
    },
    {
        id: 2,
        content: 'Bu padşah olduqca adil',
    },
    {
        id: 3,
        content: 'Ağıllı padşah idi',
    },
    {
        id: 4,
        content: 'Hamı onu çox sevirdi',
    },
];


export default function ModalPage({ selectedItem, handleModalClick }) {

    const handleWhatsAppClick = () => {
        const phoneNumber = '+994518305100'; // Номер телефона для WhatsApp
        const message = 'Salam!'; // Ваше сообщение
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
      };
    return (
        <div className="modal-container" onClick={handleModalClick}>
            <div className="modal">
                <p className='modat-title'>{selectedItem.name}</p>
                <div className='modal-price'>
                    <div className='modal-price-items'>
                        <span>₼</span><p>{selectedItem.price}</p>
                    </div>
                    <div>
                        <span className='modal-month'>Aylıq</span>
                    </div>
                </div>
                <div className='modal-datas'>
                {data.map((item) => (
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
                    <p>Bütün padşahlardan fərqli olaraq, bu padşah olduqca adil və ağıllı padşah idi.</p>
                </div>

                <div className="modal-whatsapp-container">
                <div><img src={whatsapp} alt="" />
                        </div>
                        <p onClick={handleWhatsAppClick}>Whatsappdan təklif göndər</p>
                </div>

            </div>
        </div>
    )
}
