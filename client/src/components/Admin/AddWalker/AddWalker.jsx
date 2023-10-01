import React, { useState } from 'react';

import "./style.css"
import { AddWalkerApi } from '../../../Api/WalkersApi';
import { PostDetail } from '../../../Api/DetailsApi';

export default function AddWalker({ setAddWalkerModalOpen, updateWalkers }) {
  const [formData, setFormData] = useState({
    nameAz: "",
    nameRu: "",
    nameEn: "",
    specialtyAz: "",
    specialtyRu: "",
    specialtyEn: "",
    addressAz: "",
    addressRu: "",
    addressEn: "",
    price: "",
    image: []
  });

  const [formDetailData, setFormDetailData] = useState({
    descriptionAz: "",
    descriptionRu: "",
    descriptionEn: "",
    service: "",
    images: [],
    paket: [
      { name: "Basic", price: "", weekWalkerAz: "", weekWalkerRu: "", weekWalkerEn: "" },
      { name: "Standart", price: "", weekWalkerAz: "", weekWalkerRu: "", weekWalkerEn: "" },
      { name: "Premium", price: "", weekWalkerAz: "", weekWalkerRu: "", weekWalkerEn: "" },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeDetail = (e, index, field) => {
    const { name, value } = e.target;

    const updatedPaket = [...formDetailData.paket];
    updatedPaket[index][field] = value;

    setFormDetailData({
      ...formDetailData,
      [name]: value,
      paket: updatedPaket,
    });
  };

  const handleCloseModal = () => {

    setAddWalkerModalOpen(false)
  };

  const handleSave = async () => {
    if (
      !formData.nameAz ||
      !formData.nameRu ||
      !formData.nameEn ||
      !formData.specialtyAz ||
      !formData.specialtyRu ||
      !formData.specialtyEn ||
      !formData.addressAz ||
      !formData.addressRu ||
      !formData.addressEn ||
      !formData.price ||
      !formDetailData.descriptionAz ||
      !formDetailData.descriptionRu ||
      !formDetailData.descriptionEn ||
      !formDetailData.paket.every((item) => item.name && item.price && item.weekWalkerAz && item.weekWalkerRu && item.weekWalkerEn)
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    
    const updatedWalker = {
      name: {
        en: formData.nameEn,
        ru: formData.nameRu,
        az: formData.nameAz,
      },
      specialty: {
        en: formData.specialtyEn,
        ru: formData.specialtyRu,
        az: formData.specialtyAz,
      },
      address: {
        en: formData.addressEn,
        ru: formData.addressRu,
        az: formData.addressAz,
      },
      image: formData.image,
      price: parseFloat(formData.price),
    };
    const response = await AddWalkerApi(updatedWalker)
    if (response.succes) {
      const paketArray = formDetailData.paket.map((item) => ({
        name: item.name,
        price: parseFloat(item.price),
        weekWalker: {
          az: item.weekWalkerAz,
          ru: item.weekWalkerRu,
          en: item.weekWalkerEn,
        },
      }));
      const updatedDetail = {
        description: {
          az: formDetailData.descriptionAz,
          ru: formDetailData.descriptionRu,
          en: formDetailData.descriptionEn,
        },
        walker: response.data,
        images: [],
        paket: paketArray,
      };
      await PostDetail(updatedDetail)
      setAddWalkerModalOpen(false);
      updateWalkers()
    }
  };

  return (
    <div className='modal-container' onClick={handleCloseModal} >
      <div className="add-walker-modal" onClick={(e) => e.stopPropagation()}>
        <form className="add-walker-modal-content">
          <h1>Add Walker</h1>
          <h4>Walker</h4>
          <div className='add-walker-line'>
            <input type="text" name="nameAz" value={formData.nameAz} onChange={handleChange} placeholder='name Az' required/>
            <input type="text" name="nameRu" value={formData.nameRu} onChange={handleChange} placeholder='name Ru' required/>
            <input type="text" name="nameEn" value={formData.nameEn} onChange={handleChange} placeholder='name En' required/>
          </div>
          <div className='add-walker-line'>
            <input type="text" name="specialtyAz" value={formData.specialtyAz} onChange={handleChange} placeholder='specialty Az' required/>
            <input type="text" name="specialtyRu" value={formData.specialtyRu} onChange={handleChange} placeholder='specialty Ru' required/>
            <input type="text" name="specialtyEn" value={formData.specialtyEn} onChange={handleChange} placeholder='specialty En' required/>
          </div>
          <div className='add-walker-line'>
          <input type="text" name="addressAz" value={formData.addressAz} onChange={handleChange} placeholder='address Az' required/>
          <input type="text" name="addressRu" value={formData.addressRu} onChange={handleChange} placeholder='address Ru' required/>
          <input type="text" name="addressEn" value={formData.addressEn} onChange={handleChange} placeholder='address En' required/>
          </div>
            <div className='add-walker-line'>

              <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder='price' required/>
            </div>
            <div className='add-walker-line'>
              <input type="text" name="descriptionAz" value={formDetailData.descriptionAz} onChange={(e) => handleChangeDetail(e, 0, 'descriptionAz')} placeholder='description Az' required/>
              <input type="text" name="descriptionRu" value={formDetailData.descriptionRu} onChange={(e) => handleChangeDetail(e, 0, 'descriptionRu')} placeholder='description Ru' required/>
              <input type="text" name="descriptionEn" value={formDetailData.descriptionEn} onChange={(e) => handleChangeDetail(e, 0, 'descriptionEn')} placeholder='description En' required/>
            </div>



            <h4>Details</h4>


            {formDetailData.paket.map((item, index) => (
              <div className='add-walker-pakets' key={index}>
                <div className='add-walker-line'>
                  <input
                    type="text"
                    name={`paket[${index}].name`}
                    required
                    value={item.name}
                    onChange={(e) => handleChangeDetail(e, index, "name")}
                    placeholder={`paket ${index + 1} name`}
                  />
                  <input
                    type="text"
                    name={`paket[${index}].price`}
                    required
                    value={item.price}
                    onChange={(e) => handleChangeDetail(e, index, "price")}
                    placeholder={`paket ${index + 1} price`}
                  />
                </div>

<div className='add-walker-line'>

                <input
                  type="text"
                  name={`paket[${index}].weekWalkerAz`}
                  required
                  value={item.weekWalkerAz}
                  onChange={(e) => handleChangeDetail(e, index, "weekWalkerAz")}
                  placeholder={`paket ${index + 1} weekWalker Az`}
                />
                <input
                  type="text"
                  name={`paket[${index}].weekWalkerRu`}
                  required
                  value={item.weekWalkerRu}
                  onChange={(e) => handleChangeDetail(e, index, "weekWalkerRu")}
                  placeholder={`paket ${index + 1} weekWalker Ru`}
                />
                <input
                  type="text"
                  name={`paket[${index}].weekWalkerEn`}
                  required
                  value={item.weekWalkerEn}
                  onChange={(e) => handleChangeDetail(e, index, "weekWalkerEn")}
                  placeholder={`paket ${index + 1} weekWalker En`}
                />
</div>
              </div>
            ))}

            <div className='add-walker-buttons'>
              <button type="button" className='save-button' onClick={handleSave}>Save</button>
              <button type="button" className='cancel-button' onClick={handleCloseModal}>Close</button>
            </div>
        </form>
      </div>
    </div>
  );
}
