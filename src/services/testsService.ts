import { findDisciplineOrder, findTeacherOrder } from "../repositories/testsRepository.js";

export async function findTests(type: string) {
    if (type === 'disciplines'){
        return await findDisciplineOrder();
    } else if (type === 'teachers'){
        return await findTeacherOrder();
    } else {
        throw {status: 404, message: "undefined type"};
    }
}