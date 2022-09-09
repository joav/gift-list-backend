import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import controller from "../controllers/boxes.ts";
import { admin } from "../middlewares/admin.ts";
import { auth } from "../middlewares/auth.ts";
import { bodyRequired } from "../middlewares/body-required.ts";
import { isBox } from "../middlewares/is-box.ts";
const router = new Router();

router.post("/", bodyRequired, controller.addBox);
router.delete("/all", admin, controller.deleteAllBoxes);
router.get("/:code/last-lists", controller.getLastListsBox);
router.get("/:code/lists", auth, isBox, controller.getListsBox);
router.get("/:code", controller.getBox);
router.put("/:code", auth, isBox, bodyRequired, controller.editBox);
router.post("/:code/lists", bodyRequired, controller.addList);

export default router;
