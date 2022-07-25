import { Request, Response } from "express";
import { findTests } from "../services/testsService.js";
import { findCategories, insertTest } from "../repositories/testsRepository.js";

export async function findTest(req: Request, res: Response) {
  const { groupBy } = req.query;
  const data = await findTests(groupBy.toString());
  res.send(data);   
}

export async function findCategorie(req: Request, res: Response){
  const data = await findCategories();
  res.send(data);  
}

export async function newTest(req: Request, res: Response) {
  const newTestData = req.body;
  await insertTest(newTestData);
  res.status(201).send("test created successfully");
}