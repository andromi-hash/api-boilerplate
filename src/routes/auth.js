import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const prisma = new PrismaClient();
const router = Router();

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post("/signup", validate(signupSchema), async (req, res, next) => {
  try {
    const { email, password, name } = req.validated;

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ error: "Email already in use" });

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, password: hashed, name },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    const token = generateToken({ id: user.id, email: user.email });
    res.status(201).json({ token, user });
  } catch (err) {
    next(err);
  }
});

router.post("/login", validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.validated;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken({ id: user.id, email: user.email });
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    next(err);
  }
});

export { router as authRouter };
