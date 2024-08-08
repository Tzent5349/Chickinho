"use server"
import { getScheduleByStoreAndDepartment } from "@/lib/database/actions/store.action";

type ScheduleTypeParams = {
  params: {
    storeId: string;
    departmentId: string;
  };
};

/* const ScheduleByStoreAndDepartment = async ({ params }: ScheduleTypeParams) => {
  const { storeId, departmentId } = params;
  console.log(storeId, departmentId)
  const schedules = await getScheduleByStoreAndDepartment(storeId, departmentId);

  if (!schedules.length) {
    return (
      <section>
        <h1>No Schedules Found</h1>
      </section>
    );
  }

  return (
    <section>
      <h1>Schedule for Store {storeId} and Department {departmentId}</h1>
      {schedules.map((schedule: any) => (
        <div key={schedule._id} className="p-4 border-b border-gray-200">
          <p><strong>Week Number:</strong> {schedule.weekNumber}</p>
          <p><strong>Work:</strong></p>
          <ul>
            {schedule.work.map((work: any, index: number) => (
              <li key={index}>
                <strong>Day:</strong> {work.day}
                <ul>
                  {work.shifts.map((shift: any, idx: number) => (
                    <li key={idx}>
                      <strong>User ID:</strong> {shift.userId}, <strong>Shift ID:</strong> {shift.shiftId}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}; */

const ScheduleByStoreAndDepartment = ()=>{
  return(
    <>
      <h1>haha</h1>
    </>
  )
}

export default ScheduleByStoreAndDepartment;
