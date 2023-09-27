import { fetchInstance,fetchUrl } from "./fetchInstance";


export const GetServices=async(selectedLanguage)=>{
    try {
        const response = await fetch(`${fetchUrl}/api/papigo/get-all-services-lang-filter?lang=${selectedLanguage}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
}
export const GetServicesWithoutLanguage=async()=>{

    try {
        const response = await fetch(`${fetchUrl}/api/papigo/get-all-services`);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        return error.message;
    }
}
export const GetCurrentService = async (selectedWalkerId, selectedLanguage) => {
    try {
      const response = await fetch(`${fetchUrl}/api/papigo/get-current-service-lang-filter?lang=${selectedLanguage}&walkerId=${selectedWalkerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return error.message;
    }
};
export const GetCurrentServiceWithoutLanguage=async(id)=>{
    try {
        const response = await fetch(`${fetchUrl}/api/papigo/get-current-service/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
}


export const UpdateWalker = async (id, payload) => {
    try {
        const fetchHeaders = fetchInstance().headers;
        const response = await fetch(`${fetchUrl}/api/papigo/update-service/${id}`, {
            method: "PUT",
            headers: {
                ...fetchHeaders,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await response.json()
        return data
    } catch (error) {
        return error.message
    }
}
export const AddWalkerApi = async (payload) => {
    try {
        const fetchHeaders = fetchInstance().headers;
        const response = await fetch(`${fetchUrl}/api/papigo/post-service`, {
            method: "POST",
            headers: {
                ...fetchHeaders,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await response.json()
        return data
    } catch (error) {
        return error.message
    }
}


export const GetDetailWithoutLanguage=async(id)=>{
    try {
        const response = await fetch(`${fetchUrl}/api/papigo/get-current-detail/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
}
export const UpdateDetail = async (payload, id) => {
    try {
      const response = await fetch(`${fetchUrl}/api/papigo/update-detail/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(payload), 
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      return error.message;
    }
  };
  
export const GetDetail=async(selectedWalkerId, selectedLanguage)=>{
    try {
        const response = await fetch(`${fetchUrl}/api/papigo/get-current-detail-lang-filter?lang=${selectedLanguage}&walkerId=${selectedWalkerId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
}

export const PostDetail=async(payload)=>{
    console.log(JSON.stringify(payload))
    console.log(payload)
    try {
        const response = await fetch(`${fetchUrl}/api/papigo/post-detail`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await response.json()
        return data
    } catch (error) {
        return error.message
    }
}
