import Express from "express";
const router = Express.Router();
import { add_phone_Client, create_Client, delete_Client, get_Client, get_Client_all, update_Client, update_Client_location } from "../Controllers/Client_Controller.js"; 
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

router.post("/update/:ID", verifyUser, update_Client);
router.post("/update_phones/:ID", verifyUser, add_phone_Client);
router.post("/updateLocation/:ID", verifyUser, update_Client_location);
router.get("/get/:ID", verifyUser, get_Client);

// admin
router.post("/create", verifyAdmin, create_Client);
router.delete("/delete/:ID", verifyAdmin, delete_Client);
router.get("/getAll", verifyAdmin, get_Client_all);

export default router;