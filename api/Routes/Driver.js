import Express from "express";
const router = Express.Router();
import { add_phone_Driver, create_Driver, delete_Driver, get_Driver, get_Driver_all, update_Driver, update_Driver_location } from "../Controllers/Driver_Controller.js"; 
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";


router.get("/update/:DriverID", verifyUser, update_Driver);
router.post("/update_phones/:DriverID", verifyUser, add_phone_Driver);
router.get("/updateLocation/:DriverID", verifyUser, update_Driver_location);

router.post("/create", verifyAdmin, create_Driver);
router.delete("/delete/:DriverID", verifyAdmin, delete_Driver);
router.get("/getAll", verifyAdmin, get_Driver_all);
router.delete("/get/:DriverID", verifyAdmin, get_Driver);

export default router;