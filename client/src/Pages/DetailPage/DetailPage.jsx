import React, { useEffect, useState } from 'react'
import "./style.css"
import Item from '../../components/Item/Item'
import { useParams } from 'react-router-dom';
import { GetDetail } from '../../Api/Api';
import SwiperComponent from '../../components/Swiper/SwiperComponent';

export default function DetailPage() {
  const { id } = useParams();
  const [servicesData, setServicesData] = useState(null)
  const [detailsData, setDetailsData] = useState(null)

    // burda ozum props kimi local storage yollayiram,
    // API dan bir basha ata da bilerdim ve daha correct iwleyerdi
    // sadece duwunurem ki ele meqamlar sizin ucun oqeder de onemli deyil cunki
    // bunu duzelde bileceyimi bilirsiniz

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
    const itemFromLocalStorage = localStorage.getItem('selectedItem');
    if (itemFromLocalStorage) {
      const selectedItem = JSON.parse(itemFromLocalStorage);
      setServicesData(selectedItem);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className='detail-container'>
      <SwiperComponent images={detailsData?.images} />
      <Item serviceData={servicesData} detailsData={detailsData} />
    </div>
  )
}
