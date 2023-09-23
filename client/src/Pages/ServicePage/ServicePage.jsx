import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import "./style.css";
import Items from '../../components/Items/Items'
import { GetServices } from '../../Api/Api'
import SpinnerContext from '../../Context/SpinnerContext/SpinnerContext';

export default function ServicePage() {
  const {showSpinner,setShowSpinner } = useContext(SpinnerContext);
  const [servicesData, setServicesData] = useState(null);
  const { t,i18n } = useTranslation();
  const selectedLanguage = i18n.language;


  useEffect(() => {
    const getDataServices = async () => {
      // setShowSpinner(true); // SPINNERI YANDIR
      try {
        const response = await GetServices(selectedLanguage);
        if (response.succes) {
          setServicesData(response.data);
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      } finally {
        // setShowSpinner(false); // SPINERI SONDUR
      }
    };

    getDataServices();
  }, []);

  return (
    <div className='service-container'>
      <div className='service-title-container'>
        <p className='service-title'>{t("service-title")}</p>
      </div>
      <Items servicesData={servicesData} />
    </div>
  )
}
