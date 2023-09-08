import React, { useEffect, useState } from 'react'
import "./style.css"
import Item from '../../components/Item/Item'
import { useLocation, useParams } from 'react-router-dom';
import { GetDetail } from '../../Api/Api';
import SwiperComponent from '../../components/Swiper/SwiperComponent';

export default function DetailPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const item = state.item;

  const [detailsData, setDetailsData] = useState(null)

  const getDataDetail = async (id) => {
    try {
      const response = await GetDetail(id)
      if(response.success){
        setDetailsData(response.data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDataDetail(id)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='detail-container'>
      <SwiperComponent images={detailsData?.images} />
      <Item serviceData={item} detailsData={detailsData} />
    </div>
  )
}
