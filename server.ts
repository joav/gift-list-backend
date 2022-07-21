import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import router from "./routes.ts"; // Import our router
import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import logger from "https://deno.land/x/oak_logger@1.0.0/mod.ts";

const PORT = +(Deno.env.get('PORT') || 3000);
const app = new Application();

app.use(logger.logger);
app.use(logger.responseTime);

app.use(router.routes()); // Implement our router
app.use(router.allowedMethods()); // Allow router HTTP methods

console.log(`Server listening on port ${PORT}`);
await app.listen({ port: PORT });
