import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../../Api/UsersApi';
import "./style.css"

function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Отправленные данные:', formData);
    try {
      const response = await LoginUser(formData)
      if (response.succes) {
        localStorage.setItem("token", response.data)
        navigate("/admin")
      }
      else {
        console.log(response.message)
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <form 
    className='login-form-container'
    onSubmit={handleSubmit}
    >
      <div className='login-labels-containers'>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className='login-labels-containers'>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </form>
  );
}

export default LoginPage;
