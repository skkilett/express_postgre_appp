import Router from "express";
import AppController from "./controller.js";
import authMiddleware from "./middlewares/auth-middleware.js";

const router = new Router();

router.post("/registration", async (req, res) => {
  await AppController.registration(req, res);
});

router.post("/token", async (req, res) => {
  await AppController.login(req, res);
});

router.post("/deposit", authMiddleware, async (req, res) => {
  await AppController.refill(req, res);
});

router.post(`/rollback`, authMiddleware, async (req, res) => {
  await AppController.refund(req, res);
});

router.post(`/game/create`, authMiddleware, async (req, res) => {
  await AppController.createGame(req, res);
});

router.post(`/game/buy`, authMiddleware, async (req, res) => {
  await AppController.buyGame(req, res);
});

export default router;
