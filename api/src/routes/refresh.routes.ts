import { Router } from "express";
import { SessionsRefreshController } from "../controllers/SessionsRefreshController";

const refreshRoutes = Router();
const sessionsRefreshController = new SessionsRefreshController();
refreshRoutes.post("/", sessionsRefreshController.create);

export { refreshRoutes };
