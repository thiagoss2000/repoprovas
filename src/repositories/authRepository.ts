import prisma from "../db.js";

export interface userData {
    email: string;
    password: string;
}

export async function searchUser(email: string) {
    return await prisma.users.findUnique({where:{email}});
}

export async function createUser(userData: userData) {
    await prisma.users.create({data:userData});
}

export async function insertToken(userId: number, token: string) {
    await prisma.sessions.updateMany({where:{userId}, data:{deleted_at: new Date()}});
    await prisma.sessions.create({data: {userId, token}});
}