import React, { useContext } from 'react';
import logo from "../../asets/img/logo.svg";
import "./style.css";
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spiner/Spiner';
import SpinnerContext from '../../Context/SpinnerContext/SpinnerContext';

export default function LoyautPage({ children,backgroundClass }) {
  const { showSpinner} = useContext(SpinnerContext);
  const navigate=useNavigate()
  
  
  return (
    <div className={`loyaut-container ${backgroundClass}`}>
      <div className='logo-container'>
        <img className='logo-image' src={logo} alt="logo" />
        <p onClick={()=>navigate("/")} className='logo-title'>Papigo</p>
      </div>
      {showSpinner? <Spinner/> : <div className='children-container'>{children}</div>}
      
    </div>
  );
}