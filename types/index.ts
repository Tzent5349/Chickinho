//// user parameters
export type createUserParams = {
    user: {
        name: string;
        email: string;
        role: string;
        branch?: string;
        department?: string;
/*         totalNumberOfHoursWorkedThisWeek:number;
        totalNumberOfHoursWorkedThisMonth:number
        totalNumberOfHoursWorkedThisYear:number
        workSchedule:[] */
    }
}

export type updateUserParams = {
    user: {
        _id: string
        name: string;
        email: string;
        role: string;
        branch: string;
        department: string;
/*         totalNumberOfHoursWorkedThisWeek:number;
        totalNumberOfHoursWorkedThisMonth:number
        totalNumberOfHoursWorkedThisYear:number
        workSchedule:[] */
    }
}

export type deleteUserParams = {
    userId: {
        _id: string;
    }
}


////store paramaters

export type createStoreParams = {
    store: {
        name: string;
        address: string;
/*         managers: {name:string; role:string;}[];
        workDepartments?:{name:string; schedule?:string[];}[] */
        
    }
}

export type updateStoreParams = {
    store: {
        _id: string;
        name: string;
        address: string;
        managers: {name:string; role:string;}[];
        workDepartments?:{name:string; schedule?:string[];}[]
    }
}

export type deleteStoreParams = {
    storeId: {
        _id: string;
    }
}


//// department paramaters


export type createDepartmentParams = {
    department: {
        name: string;
    }
}

export type updateDepartmentParams = {
    department: {
        _id: string;
        name: string;
    }
}

export type deleteDepartmentParams = {
    departmentId: {
        _id: string;
    }
}


////// shifts parameters

export type createShiftParams = {
    shift: {
        name:string;
        startTime: Date;
        endTime: Date;
        break?: number;
        totalWorkingHours?: number;
    }
}

export type updateShiftParams = {
    shift: {
        _id: string;
        name:string;
        startTime: Date;
        endTime: Date;
        break?: number;
        totalWorkingHours?: number;
    }
}

export type deleteShiftParams = {
    shiftId: {
        _id: string;
    }
}


//// Schedule parameters

//// Schedule parameters

export type createScheduleParams = {
    schedule: {
        storeName: string;
        weekNumber: number;
        department: string;
        work: {
            day: string;
            shifts: {
                userId: string;
                shiftId: string;
            }[];
        }[];
    }
};
