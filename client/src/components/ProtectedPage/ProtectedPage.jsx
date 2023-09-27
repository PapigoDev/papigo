import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetCurrentUser } from '../../Api/usersApi'
import SpinnerContext from '../../Context/SpinnerContext/SpinnerContext';

export default function ProtectedPage({children}) {
    const navigate=useNavigate()
    const { setLogUser} = useContext(SpinnerContext);

    const validateToken = async () => {
        try {
            const response = await GetCurrentUser()
            if (response.succes) {
                setLogUser(response.data)
            }
            else {
                navigate("/login")
            }
        } catch (error) {
            navigate("/login")
        }
    }
    
    useEffect(() => {
        if (localStorage.getItem("token")) {
            validateToken()
        }
        else {
            navigate("/login")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <div>
        {children}
    </div>
  )
}
