import { Request, Response } from "express";
import * as authService from "../services/authService.js"

export async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;  
  
  await authService.signUp({ email, password});

  res.status(201).send({message: "User created successfully"});   
}

export async function signIn (req: Request, res: Response){
  const { email, password } = req.body;

  const user = await authService.signIn({ email, password })

  res.status(200).send({ message: "Login successful", user });    
}