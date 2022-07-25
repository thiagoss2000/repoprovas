import prisma from "../db.js";

export async function findDisciplineOrder() {
    const tests = await prisma.term.findMany(
        {
            include: {
                discipline: {select: {
                    id: true,
                    name: true,
                    teachersDisciplines: {select: {
                        id: true,
                        discipline: {},
                        teacher: true,
                        tests: true
                    }},
                    term: {}
                }}
            },
            orderBy: {number: "asc"}
        }
    )
    return tests;
}

export async function findTeacherOrder() {
    const tests = await prisma.teachersDisciplines.findMany(
        {
            select: {
                    teacher: true,
                    discipline: {include: {
                        term: true
                    }},
                    tests: true
                },
            orderBy: {teacher: {name: 'asc'}} 
        }
    )
    return tests;
}

export async function findCategories() {
    return await prisma.categories.findMany();
}

export async function insertTest(testAdd) {
    await prisma.tests.create({
        data: {
            name: testAdd.name,
            pdfUrl: testAdd.pdfUrl,
            category: {connectOrCreate: {
                where: {name: testAdd.category},
                create: {name: testAdd.category}
            }},
            teachersDisciplines: {
                create: {
                    teacher: {
                        connect: {
                            name: testAdd.teacher
                        }
                    },
                    discipline: {
                        connect: {
                           name: testAdd.discipline 
                        }
                    }
                }}
        }
    })
}