import React from "react"
import axios from "axios"

export const useFetch = (url) => {
    const [data, setData] = React.useState();
    // const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState();

    React.useEffect(() => {
        async function get_data(){
            // setLoading(true);
            try{
                const res = await axios.get(`http://127.0.0.1:8000${url}`);
                setData(res.data);
                // setLoading(false);
            }
            catch(err){
                console.log(err);
                setError(err);
            }
        }

        get_data()
        
    }, [url])

    // return {data, loading, error}
    return {data, error}
}