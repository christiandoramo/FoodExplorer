import { Router } from "express";
import { SessionsController } from "../controllers/SessionsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const sessionsRoutes = Router();
const sessionsController = new SessionsController();
sessionsRoutes.post("/", sessionsController.create);
sessionsRoutes.get("/", ensureAuthenticated, sessionsController.exit);

export { sessionsRoutes };
