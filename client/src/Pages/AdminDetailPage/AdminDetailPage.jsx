import React, { useEffect, useState } from 'react'
import "./style.css"

import { useParams } from 'react-router-dom';
import { GetCurrentService,GetDetail, GetDetailWithoutLanguage } from '../../Api/Api';
import SwiperComponent from '../../components/Swiper/SwiperComponent';
import Item from '../../components/Item/Item';
import { useTranslation } from 'react-i18next';
import EditWalkerDetailModal from '../../components/EditWalkerDetailModal/EditWalkerDetailModal';


export default function AdminEditPage() {
  const { t,i18n } = useTranslation();
  const selectedLanguage = i18n.language;
  const { id } = useParams();
  const [walker, setWalkerData] = useState(null);
  const [detailsData, setDetailsData] = useState(null)
  

  const [editWalkerModalOpen, setEditWalkerModalOpen] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);

    const getDataDetail = async (id,selectedLanguage) => {
      try {
        const response = await GetDetail(id,selectedLanguage)
        if(response.success){
          setDetailsData(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    
    const getDataWalker = async (id,selectedLanguage) => {
      try {
        const response = await GetCurrentService(id,selectedLanguage)
        if(response.success){
          setWalkerData(response.data)
        }
  
      } catch (error) {
        console.log(error)
      }
    }
    const updateWalkers = async () => {
      setUpdateFlag(!updateFlag);
    };

    
    const openAddWalkerModal = () => {
      setEditWalkerModalOpen(true);
    };
  
    useEffect(() => {
      getDataDetail(id,selectedLanguage)
      getDataWalker(id,selectedLanguage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      getDataDetail(id,selectedLanguage)
      getDataWalker(id,selectedLanguage)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateFlag]);
  

  return (
    <div className='detail-container'>
      <SwiperComponent images={detailsData?.images} />
      <Item walkerData={walker} detailsData={detailsData} userRole={"login"}/>
      <button onClick={openAddWalkerModal}>
        {editWalkerModalOpen ? 'Cancel Detail' : 'Edit Detail'}
      </button>
      {editWalkerModalOpen && 
      <EditWalkerDetailModal 
      setEditWalkerModalOpen={setEditWalkerModalOpen} 
      updateWalkerDetail={updateWalkers}
      selectedWalkerDetailId={id} 
      />}
    </div>
  )
}
