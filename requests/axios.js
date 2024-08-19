import axios from "axios";

const baseURL = 'https://mangaverse-api.p.rapidapi.com';

const instanceGet=axios.create({
    baseURL: baseURL,
    timeout:5000,
    headers:{
        'Content-Type' :'application/json',
        'x-rapidapi-host':'mangaverse-api.p.rapidapi.com',
        'x-rapidapi-key':''
    }
})


export const getData=async(url)=> {
     const result = await instanceGet.get(url)
       .then(function (response) {
          return response.data;
       })
     .catch(function (error) {
         if (error.response) {
             console.log('Error', error.response.data.message);
            } else if (error.request) {
              console.log(error.request);
              console.log('Error', error.message);
            }
         console.log(error);
     });
     return result;
         
 };