import {useState, useEffect} from "react"
import axios from "axios";
import { get_data } from "../requests/useFetch";
import { ToastContainer } from "react-toastify";
import { createError } from "../requests/createErrors";

const Driver = () => {
    const [notifications, setNotifications] = useState();
    const [show_noti, setShow_noti] = useState(false);

    const Driver_ID = 1;

    useEffect(() => {
        const fun = async() => {
            const res = await get_data(`/Driver/Notifications/${Driver_ID}`)
            if(res === undefined){
                return createError("Error in getting the data from the server")
            }
            return setNotifications(res);
        }
        fun()
    }, [])

    const accept_notification = (Driver_ID, notification_ID) => {
        // update the notification table to Accept = true
    }

    const decline_notification = () => {
        // update the notification to Decline = true

        
    }

    return(
        <>
        <button onClick={() => {
            console.log(notifications);
            setShow_noti(true)
        }}>Get Notifications</button>

        {show_noti ? <>
            <h1>Notifications</h1>
            {notifications.map((n) => {console.log(n)})}
        </> : <></>}
        <ToastContainer/>
        </>
    )
}

export default Driver;