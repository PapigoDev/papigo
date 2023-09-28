import React, { useState, useEffect } from 'react';
import { GetDetailWithoutLanguage, UpdateDetail } from '../../../Api/DetailsApi';
import "./style.css"
import { UploadImageDetails } from '../../../Api/DetailsApi';

export default function EditWalkerDetail({ selectedWalkerDetailId, setEditWalkerModalOpen, updateWalkerDetail }) {

  const [detailData, setDetailData] = useState(null);
  const [formData, setFormData] = useState({
    descriptionAz: "",
    descriptionRu: "",
    descriptionEn: "",
    images: [], // Изображения
    paket: [],  // Paket
  });


  const getDataDetailWithoutLanguage = async (id) => {
    try {
      const response = await GetDetailWithoutLanguage(id)
      if (response.success) {
        setDetailData(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getDataDetailWithoutLanguage(selectedWalkerDetailId);
  }, [selectedWalkerDetailId]);


  useEffect(() => {
    if (detailData) {
      setFormData({
        descriptionAz: detailData?.description?.az || '',
        descriptionRu: detailData?.description?.ru || '',
        descriptionEn: detailData?.description?.en || '',
        images: detailData?.images || [], // Изображения
        paket: detailData?.paket.map((item) => ({ name: item.name, price: item.price })) || [],   // Paket
      });
    }
  }, [detailData]);

  // eslint-disable-next-line no-unused-vars
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Индекс выбранного изображения


//description onChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  //image onChange and then delete
  const handleImageChange = (index) => {
    setSelectedImageIndex(index);
  };
  const handleImageDelete = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
    setSelectedImageIndex(0);
  };



  const handlePaketChange = (e, index, field) => {
    const { value } = e.target;
    const updatedPaket = [...formData.paket];
    updatedPaket[index][field] = value;
    setFormData({ ...formData, paket: updatedPaket });
  };



  //modul save and close
  const handleSave = async () => {
    const updatedItem = {
      description: {
        en: formData.descriptionEn,
        ru: formData.descriptionRu,
        az: formData.descriptionAz,
      },
      service:selectedWalkerDetailId,
      images: formData.images, // Передаем все изображения
      paket: formData.paket,  // Передаем все пакеты
    };
    console.log(updatedItem)
    await UpdateDetail(updatedItem, selectedWalkerDetailId)
    setEditWalkerModalOpen(false);
    updateWalkerDetail()
  };
  const handleCloseModal = () => {
    setEditWalkerModalOpen(false)
  };


  const handleImageUpload = async (e) => {
    const selectedFile = e.target.files[0];
    try {
        const imageFormData = new FormData(); 
        imageFormData.append("detailId", selectedWalkerDetailId);
        imageFormData.append("file", selectedFile);
        
        const response=await UploadImageDetails(imageFormData);
        if(response.success){
          handleCloseModal()
          updateWalkerDetail()
        }
    } catch (error) {
      console.log(error);
    }
  };


  
  return (
    <div className="modal-edit-detail">
      <h1>Edit Walker Detail</h1>
      <form className="modal-edit-content">
        <div className='edit-modal-image-container'>
          {formData.images.map((image, index) => (
            <div key={index}>
              <div className='edit-modal-image-container'>
                <img className='modal-image' src={image} alt={image} />
              </div>
              <div>
                <button type="button" onClick={() => handleImageChange(index)}>Change</button>
                <button type="button" onClick={() => handleImageDelete(index)}>Delete</button>
              </div>
            </div>
          ))}
           <div className='modal-image-container'>
        <img  className='modal-image'  src={formData.image} alt={formData?.nameAz} />
        </div>
        <div >
          <input type="file" onChange={handleImageUpload} />
        </div>
        </div>
        <div className='modal-edit-description'>
          <input type="text" name="descriptionAz" value={formData.descriptionAz} onChange={handleChange} placeholder='Description Az' />
          <input type="text" name="descriptionRu" value={formData.descriptionRu} onChange={handleChange} placeholder='Description Ru' />
          <input type="text" name="descriptionEn" value={formData.descriptionEn} onChange={handleChange} placeholder='Description En' />
        </div>
        <div>
        {formData.paket.map((item, index) => (
  <div key={index}>
    <input
      type="text"
      name={`paket[${index}].name`}
      value={item.name}
      onChange={(e) => handlePaketChange(e, index, 'name')}
      placeholder={`Paket ${index + 1} Name`}
    />
    <input
      type="text"
      name={`paket[${index}].price`}
      value={item.price}
      onChange={(e) => handlePaketChange(e, index, 'price')}
      placeholder={`Paket ${index + 1} Price`}
    />
  </div>
))}
        </div>
        <div>
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={handleCloseModal}>Close</button>
        </div>
      </form>
    </div>
  );
}
