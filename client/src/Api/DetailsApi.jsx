import { fetchUrl,fetchInstance } from "./fetchInstance";



export const GetDetailWithoutLanguage=async(id)=>{
    console.log(id)
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
            ...fetchInstance().headers,
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
    try {
        const response = await fetch(`${fetchUrl}/api/papigo/post-detail`, {
            method: "POST",
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

export const UploadImageDetails = async (payload) => {
    console.log("UploadImageDetails API")
    try {
        const response = await fetch(`${fetchUrl}/api/papigo/upload-image-to-walker-detail`, {
            method: "POST",
            body: payload
        })
        const data = await response.json()
        return data
    } catch (error) {
        return error.message
    }
}

export const DeleteDetail= async (id) => {
    try {
        const request = await fetch(`${fetchUrl}/api/papigo/delete-detail/${id}`, {
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
