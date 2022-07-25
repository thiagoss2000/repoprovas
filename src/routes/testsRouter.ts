import { Router } from "express";
import { findCategorie, findTest, newTest } from "../controllers/testsController.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";

const testRouter = Router();

testRouter.get("/tests", validateToken, findTest);
testRouter.get("/categories", validateToken, findCategorie);
testRouter.post("/tests", validateToken, newTest);

export default testRouter;