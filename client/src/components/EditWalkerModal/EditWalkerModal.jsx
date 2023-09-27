import React, { useEffect, useState } from 'react';
import { UploadImage } from '../../Api/usersApi';
import { GetCurrentServiceWithoutLanguage,  UpdateWalker } from '../../Api/Api';
import "./style.css"



export default function EditModal({ selectedWalkerId, closeModal,updateWalkers }) {

  
  const [walkers, setWalkersData] = useState()
  const [formData, setFormData] = useState({
    nameAz: (walkers && walkers.name && walkers.name.az) || "",
    nameRu: (walkers && walkers.name && walkers.name.ru) || "",
    nameEn: (walkers && walkers.name && walkers.name.en) || "",
    specialtyAz: (walkers && walkers.specialty && walkers.specialty.az) || "",
    specialtyRu: (walkers && walkers.specialty && walkers.specialty.ru) || "",
    specialtyEn: (walkers && walkers.specialty && walkers.specialty.en) || "",
    addressAz: (walkers && walkers.address.az) || "",
    addressRu: (walkers && walkers.address.ru) || "",
    addressEn: (walkers && walkers.address.en) || "",
    price: (walkers && walkers.price) || "",
    image: (walkers && walkers.image && walkers.image[0]) || "",
  });
  
  const getWalker = async () => {
    try {
      const response = await GetCurrentServiceWithoutLanguage(selectedWalkerId);
      if (response.success) {
        console.log(response.data)
        setWalkersData(response.data);
      }
    } catch (error) {
      console.log(error);
  }
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSave = async() => {
    const updatedItem = {
      name: {
        az: formData.nameAz,
        ru: formData.nameRu,
        en: formData.nameEn,
      },
      specialty: {
        az: formData.specialtyAz,
        ru: formData.specialtyRu,
        en: formData.specialtyEn,
      },
      address: {
        az: formData.addressAz,
        ru: formData.addressRu,
        en: formData.addressEn,
      },
      image: formData.image,
      price: parseFloat(formData.price),
    };
    closeModal();
    await UpdateWalker(selectedWalkerId,updatedItem)
    updateWalkers()
  };

  const handleImageUpload = async (e) => {
    const selectedFile = e.target.files[0];
    try {
        const imageFormData = new FormData(); 
        imageFormData.append("productId", selectedWalkerId);
        imageFormData.append("file", selectedFile);
        
        const response=await UploadImage(imageFormData);
        if(response.success){
          closeModal()
          updateWalkers()
        }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWalker();
  }, []);
  
  useEffect(() => {
    // После получения данных о walkers обновляем formData
    if (walkers) {
      setFormData({
        nameAz: walkers.name.az || "",
        nameRu: walkers.name.ru || "",
        nameEn: walkers.name.en || "",
        specialtyAz: walkers.specialty.az || "",
        specialtyRu: walkers.specialty.ru || "",
        specialtyEn: walkers.specialty.en || "",
        addressAz: walkers.address.az || "",
        addressRu: walkers.address.ru || "",
        addressEn: walkers.address.en || "",
        price: walkers.price || "",
        image: walkers.image && walkers.image.length > 0 ? walkers.image[0] : "",
      });
    }
  }, [walkers]);
 
  return (
    <div className="modal">
      <h1>Edit Walker</h1>
      <form className="modal-content">
        <div className='modal-image-container'>
        <img  className='modal-image'  src={formData.image} alt={formData?.nameAz} />
        </div>
        <div >
          <input type="file" onChange={handleImageUpload} />
        </div>
        <div>
          <input type="text" name="nameAz" placeholder={"name Az"} value={formData?.nameAz} onChange={handleChange} />
          <input type="text" name="nameRu" placeholder={"name Ru"} value={formData?.nameRu} onChange={handleChange} />
          <input type="text" name="nameEn" placeholder={"name En"} value={formData?.nameEn} onChange={handleChange} />
        </div>
        <div>
          <input type="text" name="specialtyAz" placeholder={"specialty Az"} value={formData?.specialtyAz} onChange={handleChange} />
          <input type="text" name="specialtyRu" placeholder={"specialty Ru"} value={formData?.specialtyRu} onChange={handleChange} />
          <input type="text" name="specialtyEn" placeholder={"specialty En"} value={formData?.specialtyEn} onChange={handleChange} />
        </div>
        <input type="text" name="addressAz" value={formData?.addressAz} onChange={handleChange} />
        <input type="text" name="addressRu" value={formData?.addressRu} onChange={handleChange} />
        <input type="text" name="addressEn" value={formData?.addressEn} onChange={handleChange} />
        <div>
        <input type="text" name="price" value={formData?.price} onChange={handleChange} />
        </div>
        <div>
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={closeModal}>Close</button>
        </div>
      </form>
    </div>
  );
}
