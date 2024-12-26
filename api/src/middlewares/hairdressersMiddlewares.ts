import { Request, Response, NextFunction } from "express";

export const registerHairdresserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, password, confirmPassword, price, name, img } = req.body;

  const missingFields = [];

  if (!username?.trim()) missingFields.push("username");
  if (!password?.trim()) missingFields.push("password");
  if (!confirmPassword?.trim()) missingFields.push("confirmPassword");
  if (!price) missingFields.push("price");
  if (!name?.trim()) missingFields.push("name");
  if (!img?.trim()) missingFields.push("img");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `The following fields are required: ${missingFields.join(", ")}`,
    });
  }

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "password and confirmPassword must be the same" });
  }

  if (username.length > 15) {
    return res
      .status(400)
      .json({ message: "Username cannot be more than 15 characters" });
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must contain letters and numbers, and be between 8 and 15 characters",
    });
  }

  if (username === password) {
    return res
      .status(400)
      .json({ message: "Username and password cannot be the same" });
  }

  next();
};
