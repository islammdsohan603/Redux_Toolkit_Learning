import axios from "axios";

const UNSPLAS_KYE = import.meta.env.VITE_UNSPLASH_KEY;
const PEXELS_KYE = import.meta.env.VITE_PEXELS_KEY;

export async function fetchPhotos(query, page = 1, per_page = 20) {
  try {
    const res = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query, page, per_page },
      headers: {
        Authorization: `Client-ID ${UNSPLAS_KYE}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchVideos(query, page = 1, per_page = 15) {
  try {
    const res = await axios.get("https://api.pexels.com/videos/search", {
      params: { query, page, per_page },
      headers: { Authorization: `Bearer ${PEXELS_KYE}` },
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
}
