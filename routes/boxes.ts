import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { addBox, deleteAllBoxes, getBox } from "../controllers/boxes.ts";
import { admin } from "../middlewares/admin.ts";
import { bodyRequired } from "../middlewares/body-required.ts";
const router = new Router();

router.post("/", bodyRequired, addBox);
router.delete("/all", admin, deleteAllBoxes);
router.get("/:code", getBox);

export default router;
