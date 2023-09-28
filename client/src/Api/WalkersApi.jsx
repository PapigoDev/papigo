import { fetchInstance,fetchUrl } from "./fetchInstance";


export const GetWalkers=async(selectedLanguage)=>{
    try {
        const response = await fetch(`${fetchUrl}/api/papigo/get-all-services-lang-filter?lang=${selectedLanguage}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
}
export const GetWalkersWithoutLanguage=async()=>{

    try {
        const response = await fetch(`${fetchUrl}/api/papigo/get-all-services`);
        const data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
}
export const GetCurrentWalker = async (selectedWalkerId, selectedLanguage) => {
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
export const GetCurrentWalkerWithoutLanguage=async(id)=>{
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
        const response = await fetch(`${fetchUrl}/api/papigo/update-service/${id}`, {
            method: "PUT",
            headers: {
                ...fetchInstance().headers,
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


