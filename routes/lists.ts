import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { addList, getList } from "../controllers/lists.ts";
import { bodyRequired } from "../middlewares/body-required.ts";
const router = new Router();

router.post("/", bodyRequired, addList);
router.get("/:code", getList);

export default router;
