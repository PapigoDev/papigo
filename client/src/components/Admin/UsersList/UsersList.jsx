import React, { useContext } from 'react';
import SpinnerContext from '../../../Context/SpinnerContext/SpinnerContext';
import "./style.css"
import { useNavigate } from 'react-router-dom';

export default function UsersList({ users }) {
  const navigate = useNavigate()
  const { logUser,setLogUser } = useContext(SpinnerContext);


  const handleCancelActive = (userId) => {

  };

  const handleCancelBlock = () => {

  };
  const handleExit = () => {
    localStorage.clear();
    setLogUser("");
    navigate('/login');
    
  };

  return (
    <div>
      <div className='login-container'>
        <h2>Xoş gəldin {logUser.name}</h2>
        <div className='login-exit-container'>
          <p>{logUser.email}</p>
          <button onClick={()=>handleExit()}>Exit</button>
        </div>
      </div>

<div className='login-table-container'>

      <table>
       {users &&  <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>}
        <tbody>
          {users?.map((user) => (
            <tr key={user?._id}>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.status}</td>
              <td>
                {user?.status === "active" ? (
                  <>
                    <button onClick={handleCancelBlock}>Block</button>
                  </>
                ) : (
                  <button onClick={() => handleCancelActive(user?._id)}>Active</button>
                )}
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
</div>
    </div>
  );
}
