import { z } from "zod";

export const scheduleSchema = z.object({
  store: z.string().nonempty("Store is required"),
  department: z.string().nonempty("Department is required"),
  weekNumber: z.coerce.number().min(1, "Week number is required"),
  work: z.array(
    z.object({
      day: z.string(),
      shifts: z.array(
        z.object({
          userId: z.string().nonempty("User is required"),
          shiftId: z.string().nonempty("Shift is required"),
        })
      ),
    })
  ),
});
