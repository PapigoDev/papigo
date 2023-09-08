import React from 'react';
import logo from "../../asets/img/logo.svg";
import "./style.css";
import { useNavigate } from 'react-router-dom';

export default function LoyautPage({ children }) {
  const navigate=useNavigate()
  return (
    <div className='loyaut-container'>
      <div className='logo-container'>
        <img className='logo-image' src={logo} alt="logo" />
        <p onClick={()=>navigate("/")} className='logo-title'>Papigo</p>
      </div>
      <div className='children-container'>{children}</div>
    </div>
  );
}