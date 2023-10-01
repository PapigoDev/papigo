import React, { useContext } from 'react';
import SpinnerContext from '../../../Context/SpinnerContext/SpinnerContext';
import "./style.css"
import { useNavigate } from 'react-router-dom';
import { BiExit } from 'react-icons/bi';

export default function UsersList({ users }) {
  const navigate = useNavigate()
  const { logUser, setLogUser } = useContext(SpinnerContext);


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
        <p className='hi'>Xoş gəldin {logUser.name}</p>
        <div className='login-exit-container'>
          <p>{logUser.email}</p>
          <button className='exit-button' onClick={() => handleExit()}><BiExit/> Exit</button>
        </div>
      </div>

      <div className='login-table-container'>

        <table>
          {users && <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>}
          <tbody>
            {users?.map((user) => {
              if (user.role === "user") {
                return (
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
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
