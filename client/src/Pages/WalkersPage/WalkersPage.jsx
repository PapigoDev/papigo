import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import "./style.css";
import Walkers from '../../components/Walkers/Walkers'
import { GetWalkers } from '../../Api/WalkersApi'
import SpinnerContext from '../../Context/SpinnerContext/SpinnerContext';

export default function WalkersPage() {
  const {showSpinner,setShowSpinner } = useContext(SpinnerContext);
  console.log(setShowSpinner)
  console.log(showSpinner)
  const [walkers, setWalkersData] = useState(null);
  const { t,i18n } = useTranslation();
  const selectedLanguage = i18n.language;

  const getDataWalkers = async () => {
    // setShowSpinner(true); // SPINNERI YANDIR
    console.log(showSpinner)
    try {
      const response = await GetWalkers(selectedLanguage);
      if (response.succes) {
        setWalkersData(response.data);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setShowSpinner(false); // SPINERI SONDUR
      console.log(showSpinner)
    }
  };

  useEffect(() => {
    getDataWalkers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className='walker-container'>
      <div className='walker-title-container'>
        <p className='walker-title'>{t("service-title")}</p>
      </div>
      <Walkers walkers={walkers} />
    </div>
  )
}
