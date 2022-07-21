import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { login } from "./controllers/auth.ts";
import boxes from "./routes/boxes.ts";
import lists from "./routes/lists.ts";
import { bodyRequired } from "./middlewares/body-required.ts";
const router = new Router(); // Create router

router.use("/api/boxes", boxes.routes(), boxes.allowedMethods());
router.use("/api/lists", lists.routes(), lists.allowedMethods());
router.post("/api/auth", bodyRequired, login);

export default router;
