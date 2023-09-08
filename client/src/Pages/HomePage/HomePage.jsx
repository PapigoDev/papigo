import React, { useEffect, useState } from 'react'
import "./style.css"
import Items from '../../components/Items/Items'
import { GetServices } from '../../Api/Api'

export default function HomePage() {


  const [servicesData, setServicesData] = useState(null)

  const getDataServices = async () => {
    try {
      const response = await GetServices()
      if(response.succes){
        setServicesData(response.data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDataServices()

  }, [])
  return (
    <div className='home-container'>
      <div className='title-container'>
        <p className='homePage-title'>İt gəzdirmə xidməti</p>
      </div>
      <Items servicesData={servicesData} />
    </div>
  )
}
