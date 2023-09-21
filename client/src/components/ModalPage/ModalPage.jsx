import React from 'react'
import "./style.css"
import span from "../../asets/img/span.png"
import whatsapp from "../../asets/img/whatsapp.png"

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
                        <div><img src={span} alt="" />
                        </div>
                        <p>{item.content}</p>
                    </div>
                ))}
                </div>
                <div>
                    <p>Bütün padşahlardan fərqli olaraq, bu padşah olduqca adil və ağıllı padşah idi.</p>
                </div>

                <div className="modal-whatsapp-container">
                <div><img src={whatsapp} alt="" />
                        </div>
                        <p>Whatsappdan təklif göndər</p>
                </div>

            </div>
        </div>
    )
}
