import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import router from "./routes.ts"; // Import our router
import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import logger from "https://deno.land/x/oak_logger@1.0.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { eventBus } from "./event-bus/index.ts";
import { Logger } from "./utils/logger.ts";

const appLogger = new Logger('AppLogger');
const PORT = +(Deno.env.get('PORT') || 3000);
const app = new Application();

app.use(oakCors());
app.use(logger.logger);
app.use(logger.responseTime);

app.use(router.routes()); // Implement our router
app.use(router.allowedMethods()); // Allow router HTTP methods

eventBus.initListeners();

appLogger.info(`Server listening on port ${PORT}`);
await app.listen({ port: PORT });
