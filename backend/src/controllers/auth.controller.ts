import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const register = async (req: Request,res: Response): Promise<void> => {
  try {
    const user = await authService.register(req.body);
    
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Internal Server Error",
    });
  }
};

export const login = async (req: Request,res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(
      email,
      password
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Internal Server Error",
    });
  }
};