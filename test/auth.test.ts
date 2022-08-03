import supertest from "supertest";
import app from "../src/app.js";
import dotenv from "dotenv";
import prisma from "../src/db.js";
dotenv.config();

const userData = {
    email: "teste@teste.com",
    password: "teste1234"
}

const testData = {
    name: "teste insert",
    pdfUrl: "http:testeteste",
    category: "Projeto",
    teacher: "Diego Pinho",
    discipline: "HTML e CSS"
}
const header = {
    auth: "Authorization",
    token: ""
}

describe("authentication test", () => {
    it("testing signup...", async () => {
        clearTest();
        const response = await supertest(app).post("/sign-up").send(userData);
        expect(response.statusCode).toBe(201);
    });
    
    it("testing signin...", async () => {
      const response = await supertest(app).post("/sign-in").send(userData);
      expect(response.statusCode).toBe(200);
      header.token = response.body.token;
    });
  
    it("testing signup...", async () => {
        const response = await supertest(app).post("/sign-up").send(userData);
        expect(response.statusCode).toBe(409);
    });
});

describe("crud test", () => {
    it("testing insert test...", async () => {
        const response = await supertest(app).post("/tests").send(testData).set(header.auth, header.token);
        expect(response.statusCode).toBe(201);
    });
    
    it("testing get categories...", async () => {
      const response = await supertest(app).get("/categories").set(header.auth, header.token);
      expect(response.statusCode).toBe(200);
    });
  
    it("testing get tests...", async () => {
        const responseT = await supertest(app).get("/tests").set(header.auth, header.token).query({groupBy: 'teachers'});
        expect(responseT.statusCode).toBe(200);
        const responseD = await supertest(app).get("/tests").set(header.auth, header.token).query({groupBy: 'disciplines'});
        expect(responseD.statusCode).toBe(200);
        clearTest();
    });
});

async function clearTest() {
    await prisma.sessions.deleteMany({});
    await prisma.users.deleteMany({});
    await prisma.tests.deleteMany({});
}