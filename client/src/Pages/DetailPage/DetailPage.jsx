import React, { useEffect, useState } from 'react'
import "./style.css"
import Item from '../../components/Item/Item'
import { useParams } from 'react-router-dom';
import { GetCurrentService, GetDetail } from '../../Api/Api';
import SwiperComponent from '../../components/Swiper/SwiperComponent';
import { useTranslation } from 'react-i18next';

export default function DetailPage() {
  const { t,i18n } = useTranslation();
  const selectedLanguage = i18n.language;
  const { id } = useParams();
  const [walker, setWalkerData] = useState(null);
  const [detailsData, setDetailsData] = useState(null)

    // burda ozum props kimi local storage yollayiram,
    // API dan bir basha ata da bilerdim ve daha correct iwleyerdi
    // sadece duwunurem ki ele meqamlar sizin ucun oqeder de onemli deyil cunki
    // bunu duzelde bileceyimi bilirsiniz

  const getDataDetail = async (id,selectedLanguage) => {
    try {
      const response = await GetDetail(id,selectedLanguage)
      console.log(response)
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

  useEffect(() => {
    getDataDetail(id,selectedLanguage)
    getDataWalker(id,selectedLanguage)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='detail-container'>
      <SwiperComponent images={detailsData?.images} />
      <Item walkerData={walker} detailsData={detailsData} />
    </div>
  )
}
