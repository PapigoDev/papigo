// export const fetchUrl = "http://localhost:5001"
// export const fetchUrl = "https://papigo.onrender.com"
export const fetchUrl = "https://papigo-3qnt-git-main-mvuqar1.vercel.app"



export const fetchInstance = () => {
    const token = localStorage.getItem('token');
  
    return {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
  };