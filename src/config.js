export const config = {
  port: parseInt(process.env.PORT || "4000", 10),
  jwtSecret: process.env.JWT_SECRET || "change-me-in-production",
  jwtExpiresIn: "7d",
  rateLimitWindow: 15 * 60 * 1000,
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || "100", 10),
};
