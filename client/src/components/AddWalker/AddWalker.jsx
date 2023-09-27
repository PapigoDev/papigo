import React, { useState } from 'react';
import { AddWalkerApi, PostDetail } from '../../Api/Api';
import "./style.css"

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
    price: 0,
    image: []
  });

  const [formDetailData, setFormDetailData] = useState({
    descriptionAz: "",
    descriptionRu: "",
    descriptionEn: "",
    service: "",
    images: [],
    paket: [
      { name: "Basic", price: 0, weekWalkerAz: "", weekWalkerRu: "", weekWalkerEn: "" },
      { name: "Standart", price: 0, weekWalkerAz: "", weekWalkerRu: "", weekWalkerEn: "" },
      { name: "Premium", price: 0, weekWalkerAz: "", weekWalkerRu: "", weekWalkerEn: "" },
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
        service: response.data,
        images: [],
        paket: paketArray,
      };
      await PostDetail(updatedDetail)
      setAddWalkerModalOpen(false);
      updateWalkers()
    }
  };

  return (
    <div className="modal">
      <form className="modal-content">
        <h1>Add Walker</h1>
        <div>
          <input type="text" name="nameAz" value={formData.nameAz} onChange={handleChange} placeholder='name Az' />
          <input type="text" name="nameRu" value={formData.nameRu} onChange={handleChange} placeholder='name Ru' />
          <input type="text" name="nameEn" value={formData.nameEn} onChange={handleChange} placeholder='name En' />
        </div>
        <div>
          <input type="text" name="specialtyAz" value={formData.specialtyAz} onChange={handleChange} placeholder='specialty Az' />
          <input type="text" name="specialtyRu" value={formData.specialtyRu} onChange={handleChange} placeholder='specialty Ru' />
          <input type="text" name="specialtyEn" value={formData.specialtyEn} onChange={handleChange} placeholder='specialty En' />
        </div>
        <input type="text" name="addressAz" value={formData.addressAz} onChange={handleChange} placeholder='address Az' />
        <input type="text" name="addressRu" value={formData.addressRu} onChange={handleChange} placeholder='address Ru' />
        <input type="text" name="addressEn" value={formData.addressEn} onChange={handleChange} placeholder='address En' />
        <div>
          <div>
        <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder='price' />
          </div>
          <div>
            <input type="text" name="descriptionAz" value={formDetailData.descriptionAz} onChange={(e) => handleChangeDetail(e, 0, 'descriptionAz')} placeholder='description Az' />
            <input type="text" name="descriptionRu" value={formDetailData.descriptionRu} onChange={(e) => handleChangeDetail(e, 0, 'descriptionRu')} placeholder='description Ru' />
            <input type="text" name="descriptionEn" value={formDetailData.descriptionEn} onChange={(e) => handleChangeDetail(e, 0, 'descriptionEn')} placeholder='description En' />
          </div>

          {formDetailData.paket.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                name={`paket[${index}].name`}
                value={item.name}
                onChange={(e) => handleChangeDetail(e, index, "name")}
                placeholder={`Paket ${index + 1} Name`}
              />
              <input
                type="text"
                name={`paket[${index}].price`}
                value={item.price}
                onChange={(e) => handleChangeDetail(e, index, "price")}
                placeholder={`Paket ${index + 1} Price`}
              />
              <input
                type="text"
                name={`paket[${index}].weekWalkerAz`}
                value={item.weekWalkerAz}
                onChange={(e) => handleChangeDetail(e, index, "weekWalkerAz")}
                placeholder={`Paket ${index + 1} WeekWalker (Az)`}
              />
              <input
                type="text"
                name={`paket[${index}].weekWalkerRu`}
                value={item.weekWalkerRu}
                onChange={(e) => handleChangeDetail(e, index, "weekWalkerRu")}
                placeholder={`Paket ${index + 1} WeekWalker (Ru)`}
              />
              <input
                type="text"
                name={`paket[${index}].weekWalkerEn`}
                value={item.weekWalkerEn}
                onChange={(e) => handleChangeDetail(e, index, "weekWalkerEn")}
                placeholder={`Paket ${index + 1} WeekWalker (En)`}
              />
            </div>
          ))}

          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={handleCloseModal}>Close</button>
        </div>
      </form>
    </div>
  );
}
