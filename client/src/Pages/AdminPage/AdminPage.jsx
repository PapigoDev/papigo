import React, { useEffect, useState } from 'react'
import { GetAllUsers } from '../../Api/usersApi'
import UsersList from '../../components/UsersList/UsersList'
import Walkers from '../../components/Walkers/Walkers'
import { GetServices } from '../../Api/Api'
import { useTranslation } from 'react-i18next'
import AddWalker from '../../components/AddWalker/AddWalker'

export default function AdminPage() {
  const { i18n } = useTranslation();
  const selectedLanguage = i18n.language;

  const [users, setUsers] = useState()
  const [walkers, setWalkersData] = useState()

  //for modal Page data
  const [updateFlag, setUpdateFlag] = useState(false);
  const [addWalkerModalOpen, setAddWalkerModalOpen] = useState(false);

  const getAllUsers = async () => {
    try {
      const response = await GetAllUsers()
      if (response.success) {
        setUsers(response.data)
      }

    } catch (error) {
      console.log(error)
    }
  }
  const getDataWalkers = async () => {
    // setShowSpinner(true); // SPINNERI YANDIR
    try {
      const response = await GetServices(selectedLanguage);
      if (response.succes) {
        setWalkersData(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setShowSpinner(false); // SPINERI SONDUR
    }
  };

  //for modal Page functions
  const updateWalkers = async () => {
    setUpdateFlag(!updateFlag);
  };
  const openAddWalkerModal = () => {
    setAddWalkerModalOpen(true);
  };

  useEffect(() => {
    getAllUsers()
    getDataWalkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAllUsers()
    getDataWalkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateFlag]);


  return (
    <div>
      <UsersList users={users} />
      <Walkers walkers={walkers} userRole={"login"} updateWalkers={updateWalkers} />
      <button onClick={openAddWalkerModal}>
        {addWalkerModalOpen ? 'Close Modal' : 'Add Walker'}
      </button>
      {addWalkerModalOpen && <AddWalker setAddWalkerModalOpen={setAddWalkerModalOpen} updateWalkers={updateWalkers} />}

    </div>
  )
}