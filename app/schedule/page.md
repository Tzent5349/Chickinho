"use server";
import { getDepartmentById } from "@/lib/database/actions/department.action";
import { getAllSchedule } from "@/lib/database/actions/schedule.action";
import { getStoreById } from "@/lib/database/actions/store.action";
import Link from "next/link";

const Schedule = async () => {
  const allSchedule = await getAllSchedule();

  const schedulesWithNames = await Promise.all(
    allSchedule.map(async (schedule: any) => {
      const store = await getStoreById(schedule.storeName);
      const department = await getDepartmentById(schedule.department);
      return {
        ...schedule,
        storeName: store?.name,
        departmentName: department?.name,
      };
    })
  );

  // Create a unique list of store-department combinations
  const uniqueStoreDepartmentLinks = schedulesWithNames.reduce((acc: any, schedule: any) => {
    const key = `${schedule.storeName}-${schedule.departmentName}`;
    if (!acc[key]) {
      acc[key] = {
        storeName: schedule.storeName,
        departmentName: schedule.departmentName,
        _id: schedule._id,
      };
    }
    return acc;
  }, {});

  return (
    <>
      <h1>Schedule</h1>
      <div className="flex flex-col">
        {Object.values(uniqueStoreDepartmentLinks).map((schedule: any) => (
          <Link href={`/schedule/${schedule._id}`} key={schedule._id}>
            <div className="p-4 border-b border-gray-200 hover:bg-gray-100">
              <h2>{schedule.storeName}</h2>
              <p>{schedule.departmentName}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Schedule;
