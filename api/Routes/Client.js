import Express from "express";
const router = Express.Router();
import { add_phone_Client, create_Client, delete_Client, get_Client, get_Client_all, update_Client, update_Client_location } from "../Controllers/Client_Controller.js"; 
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

router.get("/update/:ClientID", verifyUser, update_Client);
router.post("/update_phones/:ClientID", verifyUser, add_phone_Client);
router.get("/updateLocation/:ClientID", verifyUser, update_Client_location);


router.post("/create", verifyAdmin, create_Client);
router.delete("/delete/:ClientID", verifyAdmin, delete_Client);
router.get("/getAll", verifyAdmin, get_Client_all);
router.delete("/get/:ClientID", verifyAdmin, get_Client);

export default router;