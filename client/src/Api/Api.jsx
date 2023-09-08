// export const fetchUrl = "http://localhost:5001"
export const fetchUrl = "https://papigo-h5yx1wcl5-mvuqar1.vercel.app/"

export const GetServices=async()=>{
    try {
        const response = await fetch(`${fetchUrl}/api/papigo/get-all-services`);
        const data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
}
export const GetDetail=async(id)=>{
    try {
        const response = await fetch(`${fetchUrl}/api/papigo/get-current-detail/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
}