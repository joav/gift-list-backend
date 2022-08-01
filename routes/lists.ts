import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { addList, deleteAllLists, getList } from "../controllers/lists.ts";
import { admin } from "../middlewares/admin.ts";
import { bodyRequired } from "../middlewares/body-required.ts";
const router = new Router();

router.post("/", bodyRequired, addList);
router.delete("/all", admin, deleteAllLists);
router.get("/:code", getList);

export default router;
