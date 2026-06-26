import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate } from "../middleware/auth.js";

const prisma = new PrismaClient();
const router = Router();

router.get("/me", authenticate, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, name: true, createdAt: true },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/", authenticate, async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, createdAt: true },
      take: 50,
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

export { router as usersRouter };
