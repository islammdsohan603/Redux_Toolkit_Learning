import axios from "axios";

const UNSPLAS_KYE=import.meta.env.VITE_UNSPLASH_KEY;
const PEXELS_KYE=import.meta.env.VITE_PEXELS_KEY;


export function fetchPhotos(query, page=1, per_page=20) {
  const res=  axios.get("https://api.unsplash.com/search/photos",{
    params:{query,page,per_page},
    headers:{
      Authorization: `Client-ID ${UNSPLAS_KYE}`
    }
  });
    console.log(res)
}