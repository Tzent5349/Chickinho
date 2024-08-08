"use server";
import { getScheduleByStoreAndDepartment } from "@/lib/database/actions/store.action";
import ScheduleDisplayWrapper from "../../ScheduleDisplayWrapper";


type ScheduleTypeParams = {
  params: {
    storeId: string;
    departmentId: string;
  };
};

const ScheduleByStoreAndDepartment = async ({ params }: ScheduleTypeParams) => {
  const { storeId, departmentId } = params;
  const schedules = await getScheduleByStoreAndDepartment(storeId, departmentId);

  if (!schedules || !Array.isArray(schedules) || schedules.length === 0) {
    return (
      <section>
        <h1>No Schedules Found</h1>
      </section>
    );
  }

  return (
    <section>
      <ScheduleDisplayWrapper schedules={schedules} />
    </section>
  );
};

export default ScheduleByStoreAndDepartment;
