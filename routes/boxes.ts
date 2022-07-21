import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { addBox, getBox } from "../controllers/boxes.ts";
import { bodyRequired } from "../middlewares/body-required.ts";
const router = new Router();

router.post("/", bodyRequired, addBox);
router.get("/:code", getBox);

export default router;
