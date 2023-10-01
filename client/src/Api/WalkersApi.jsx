import { fetchInstance,fetchUrl } from "./fetchInstance";


export const GetWalkers=async(selectedLanguage)=>{
    try {
        const response = await fetch(`${fetchUrl}/api/papigo/get-all-walkers-lang-filter?lang=${selectedLanguage}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
}
export const GetWalkersWithoutLanguage=async()=>{

    try {
        const response = await fetch(`${fetchUrl}/api/papigo/get-all-walkers`);
        const data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
}
export const GetCurrentWalker = async (selectedWalkerId, selectedLanguage) => {
    try {
      const response = await fetch(`${fetchUrl}/api/papigo/get-current-walker-lang-filter?lang=${selectedLanguage}&walkerId=${selectedWalkerId}`,
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
        const response = await fetch(`${fetchUrl}/api/papigo/get-current-walker/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
}

export const UploadWalkerImage = async (payload) => {
    try {
        const response = await fetch(`${fetchUrl}/api/papigo/upload-image-to-walker`, {
            method: "POST",
            body: payload
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
        const response = await fetch(`${fetchUrl}/api/papigo/post-walker`, {
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
export const UpdateWalker = async (id, payload) => {
    try {
        const response = await fetch(`${fetchUrl}/api/papigo/update-walker/${id}`, {
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
export const DeleteWalker= async (id) => {
    console.log("DeleteWalker")
    try {
        const request = await fetch(`${fetchUrl}/api/papigo/delete-walker/${id}`, {
            method: "DELETE",
            headers: {
                ...fetchInstance().headers,
                'Content-Type': 'application/json'
            },
        })
        const data = await request.json()
        return data
    } catch (error) {
        return error.message
    }
}


