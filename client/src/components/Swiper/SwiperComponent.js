import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import "./style.css"
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';



export default function SwiperComponent({ images }) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
        loop={true}
      >
        {images?.map((image, index) => (
          <SwiperSlide className="detail-image-container" key={index}>
            <img className='detail-swiper-image' src={image} alt={`Slide ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

