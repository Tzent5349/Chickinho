"use server"
import connectToDatabase from "@/lib/database/index";
import Department from "@/lib/database/models/department.model";
import { createDepartmentParams } from "@/types";


export const createDepartment = async ({ department }: createDepartmentParams) => {
    try {
        await connectToDatabase();
        const newDepartment = await Department.create(department)
        return JSON.parse(JSON.stringify(newDepartment));

    } catch (error) {
        console.log(error);
    }
}

export const getAllDepartment = async () => {
    try {
        await connectToDatabase();
        const allDepartment = await Department.find();
        return JSON.parse(JSON.stringify(allDepartment));
    } catch (error) {
        console.log(error);
    }
}

export const getDepartmentById = async (departmentId: string) => {
    try {
        await connectToDatabase();
        if (!departmentId) throw new Error("No department found with id");
        const department = await Department.findById(departmentId);
        return JSON.parse(JSON.stringify(department));
    } catch (error) {
        console.log(error);
    }
}