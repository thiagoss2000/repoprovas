import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as authRepository from "../repositories/authRepository.js";
import dotenv from "dotenv";
dotenv.config();

export async function signUp(userData: authRepository.userData){
  const { email, password } = userData;

  const user = await authRepository.searchUser(email);
  if(user) throw {status: 409, message: "user exists"};
  
  const hashPassword = bcrypt.hashSync(password,10);
  await authRepository.createUser({ email, password: hashPassword })  
}

export async function signIn(userData: authRepository.userData){

  const verifyUser = await authRepository.searchUser(userData.email);

  if(!verifyUser || !bcrypt.compareSync(userData.password, verifyUser.password))
    throw {status: 401, message: "invalid data"};      
    
  const data = { id: verifyUser.id }
  const config = { expiresIn: "1h" };
  const token = jwt.sign(data ,process.env.ENCRYPTPASSWORD, config);

  await authRepository.insertToken(verifyUser.id, token);

  return {
    id: verifyUser.id,
    email: verifyUser.email,
    token: token
  }
}