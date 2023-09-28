import React, { useEffect, useState } from 'react'
import "./style.css"
import Detail from '../../components/Detail/Detail'
import { useParams } from 'react-router-dom';

import SwiperComponent from '../../components/Swiper/SwiperComponent';
import { useTranslation } from 'react-i18next';
import { GetDetail } from '../../Api/DetailsApi';
import { GetCurrentWalker } from '../../Api/WalkersApi';

export default function DetailPage() {
  const {i18n } = useTranslation();
  const selectedLanguage = i18n.language;
  const { id } = useParams();
  const [walker, setWalkerData] = useState(null);
  const [detailsData, setDetailsData] = useState(null)

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
      const response = await GetCurrentWalker(id,selectedLanguage)
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
      <Detail walkerData={walker} detailsData={detailsData} />
    </div>
  )
}
