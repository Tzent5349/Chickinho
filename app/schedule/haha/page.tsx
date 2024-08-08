import { getScheduleById } from "@/lib/database/actions/schedule.action";

type ScheduleTypeParams = {
  params: {
    id: string;
  };
};

const ScheduleById = async ({ params }: ScheduleTypeParams) => {
  const schedule = await getScheduleById(params.id);

  console.log(schedule);

  if (!schedule) {
    return (
      <section>
        <h1>Schedule Not Found</h1>
      </section>
    );
  }

  return (
    <section>
      <h1>Schedule Details</h1>
      <p><strong>Store:</strong> {schedule.storeName}</p>
      <p><strong>Department:</strong> {schedule.departmentName}</p>
      <p><strong>Week Number:</strong> {schedule.weekNumber}</p>
      {/* Display other schedule details here */}
    </section>
  );
};

export default ScheduleById;
