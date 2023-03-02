import axios from "axios"

export const getData = (url) => {
    console.log(url);
    async function get_data(){
        try{
            const res = await axios.get(`http://127.0.0.1:8000${url}`);
            console.log(res);
            return res;
        }
        catch(err){
            return "Error";
        }
    }

    get_data()
}