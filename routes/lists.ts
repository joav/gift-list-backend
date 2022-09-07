import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import controller from "../controllers/lists.ts";
import { admin } from "../middlewares/admin.ts";
import { bodyRequired } from "../middlewares/body-required.ts";
const router = new Router();

router.post("/", bodyRequired, controller.addList);
router.delete("/all", admin, controller.deleteAllLists);
router.get("/:code", controller.getList);

export default router;
