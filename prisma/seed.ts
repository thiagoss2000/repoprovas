import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma;

const load = async () => {
    try {
        await prisma.$executeRaw`INSERT INTO term ("number") VALUES (1)`
        await prisma.$executeRaw`INSERT INTO term ("number") VALUES (2)`
        await prisma.$executeRaw`INSERT INTO term ("number") VALUES (3)`
        await prisma.$executeRaw`INSERT INTO term ("number") VALUES (4)`
        await prisma.$executeRaw`INSERT INTO term ("number") VALUES (5)`
        await prisma.$executeRaw`INSERT INTO term ("number") VALUES (6)`
            
        await prisma.$executeRaw`INSERT INTO categories ("name") VALUES ('Projeto')`
        await prisma.$executeRaw`INSERT INTO categories ("name") VALUES ('Prática')`
        await prisma.$executeRaw`INSERT INTO categories ("name") VALUES ('Recuperação')`
            
        await prisma.$executeRaw`INSERT INTO teacher ("name") VALUES ('Diego Pinho')`
        await prisma.$executeRaw`INSERT INTO teacher ("name") VALUES ('Bruna Hamori')`
            
        await prisma.$executeRaw`INSERT INTO discipline ("name", "termId") VALUES ('HTML e CSS', 1)`
        await prisma.$executeRaw`INSERT INTO discipline ("name", "termId") VALUES ('JavaScript', 2)`
        await prisma.$executeRaw`INSERT INTO discipline ("name", "termId") VALUES ('React', 3)`
        await prisma.$executeRaw`INSERT INTO discipline ("name", "termId") VALUES ('Humildade', 1)`
        await prisma.$executeRaw`INSERT INTO discipline ("name", "termId") VALUES ('Planejamento', 2)`
        await prisma.$executeRaw`INSERT INTO discipline ("name", "termId") VALUES ('Autoconfiança', 3)`
            
        await prisma.$executeRaw`INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 1)`
        await prisma.$executeRaw`INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 2)`
        await prisma.$executeRaw`INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 3)` 
        await prisma.$executeRaw`INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 4)`
        await prisma.$executeRaw`INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 5)`
        await prisma.$executeRaw`INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 6)`  
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    };
}
load();