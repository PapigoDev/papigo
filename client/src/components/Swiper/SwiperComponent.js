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
        {images?.length<1 ?
        (
          <SwiperSlide className="detail-image-container">
            <img className='detail-swiper-image' src={"https://res.cloudinary.com/dmrh8jdqv/image/upload/v1696153251/papigo/bjjgqhcqgjwr0h8oxgoh.webp"} alt={"default bg"} />
          </SwiperSlide>
        )
        :

        
        (images?.map((image, index) => (
          <SwiperSlide className="detail-image-container" key={index}>
            <img className='detail-swiper-image' src={image} alt={`Slide ${index}`} />
          </SwiperSlide>
        )))}
      </Swiper>
    </>
  );
}

