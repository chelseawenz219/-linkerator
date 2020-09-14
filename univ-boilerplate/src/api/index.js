import axios from 'axios';
const baseUrl = 'http://localhost:3000/api' || `http://localhost:${process.env.PORT}/api`;
//proper?? lol?? ^

export async function getTags() {
  try {
    const  { data } = await axios.get(`${baseUrl}/tags`);
    
    console.log(data);

    return tags;
  } catch (error) {
    console.error(error);
  }
}