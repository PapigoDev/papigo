import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import "./style.css";
import Walkers from '../../components/Walkers/Walkers'
import { GetServices } from '../../Api/Api'
import SpinnerContext from '../../Context/SpinnerContext/SpinnerContext';

export default function ServicePage() {
  const {showSpinner,setShowSpinner } = useContext(SpinnerContext);
  const [walkers, setWalkersData] = useState(null);
  const { t,i18n } = useTranslation();
  const selectedLanguage = i18n.language;

  const getDataWalkers = async () => {
    // setShowSpinner(true); // SPINNERI YANDIR
    try {
      const response = await GetServices(selectedLanguage);
      if (response.succes) {
        setWalkersData(response.data);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setShowSpinner(false); // SPINERI SONDUR
    }
  };

  useEffect(() => {
    getDataWalkers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='service-container'>
      <div className='service-title-container'>
        <p className='service-title'>{t("service-title")}</p>
      </div>
      <Walkers walkers={walkers} />
    </div>
  )
}
