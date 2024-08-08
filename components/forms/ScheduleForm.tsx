// components/ScheduleForm.tsx
"use client";
import React, { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserDropdown from "../dropdowns/userDropDown";
import DepartmentDropdown from "../dropdowns/departmentDropDown";
import StoreDropdown from "../dropdowns/StoreDropDown";
import ShiftDropdown from "../dropdowns/ShiftDropdown";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { scheduleSchema } from "@/constants/validation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn, getWeek, getNextWeek, getPreviousWeek, formatDate } from "@/lib/utils";
import { createSchedule } from "@/lib/database/actions/schedule.action";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ScheduleForm = () => {
  const [currentWeek, setCurrentWeek] = useState(getWeek(new Date()));
  const initialWeekDates = currentWeek.days.map((date) => formatDate(date));

  const methods = useForm({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      store: "",
      department: "",
      weekNumber: currentWeek.weekNumber,
      weekDates: initialWeekDates,
      work: daysOfWeek.map((day) => ({
        day,
        shifts: [],
      })),
    },
  });

  const { control, handleSubmit, watch, setValue, getValues } = methods;

  const handleAddShift = (dayIndex: number) => {
    const work = getValues("work");
    if (work[dayIndex] && work[dayIndex].shifts) {
      work[dayIndex].shifts.push({ userId: "", shiftId: "" });
    }
    setValue("work", work);
  };

  const onSubmit = async (data: any) => {
    const scheduleData = {
      storeName: data.store,
      department: data.department,
      weekNumber: data.weekNumber,
      work: data.work,
    };

    try {
      const newSchedule = await createSchedule({ schedule: scheduleData });
      console.log("Schedule saved successfully:", newSchedule);
    } catch (error) {
      console.error("Error saving schedule:", error);
      alert(error.message);
    }
  };

  const handleDateChange = (index: number, date: string) => {
    const weekDates = getValues("weekDates");
    weekDates[index] = date;
    setValue("weekDates", weekDates);
    if (index === 0) {
      const weekNumber = getWeek(new Date(date)).weekNumber;
      setValue("weekNumber", weekNumber);
    }
  };

  const handleNextWeek = () => {
    const newWeek = getNextWeek(currentWeek.start);
    setCurrentWeek(newWeek);
    const newWeekDates = newWeek.days.map((date) => formatDate(date));
    setValue("weekDates", newWeekDates);
    setValue("weekNumber", newWeek.weekNumber);
  };

  const handlePreviousWeek = () => {
    const newWeek = getPreviousWeek(currentWeek.start);
    setCurrentWeek(newWeek);
    const newWeekDates = newWeek.days.map((date) => formatDate(date));
    setValue("weekDates", newWeekDates);
    setValue("weekNumber", newWeek.weekNumber);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="mb-4">
          <FormField
            control={control}
            name="store"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store</FormLabel>
                <FormControl>
                  <StoreDropdown value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          <FormField
            control={control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <DepartmentDropdown value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          <FormField
            control={control}
            name="weekNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Week Number</FormLabel>
                <FormControl>
                  <input type="number" {...field} className="input-field" readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between mb-4">
          <button type="button" onClick={handlePreviousWeek} className="flex items-center">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <FormLabel className="text-lg font-semibold">
            {`Week Dates: ${initialWeekDates[0]} - ${initialWeekDates[6]}`}
          </FormLabel>
          <button type="button" onClick={handleNextWeek} className="flex items-center">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow>
              {daysOfWeek.map((day, index) => (
                <TableHead key={index} className="border">
                  <span className="flex flex-col h-full items-center">
                    <h1>{day}</h1>
                    <h1>{initialWeekDates[index]}</h1>
                  </span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {daysOfWeek.map((day, dayIndex) => (
                <TableCell key={dayIndex} className="border h-full">
                  {watch(`work[${dayIndex}].shifts`, []).map(
                    (shift: any, shiftIndex: number) => (
                      <div key={shiftIndex} className="shift-row">
                        <Controller
                          control={control}
                          name={`work[${dayIndex}].shifts[${shiftIndex}].userId`}
                          render={({ field }) => (
                            <FormField
                              control={control}
                              name={`work[${dayIndex}].shifts[${shiftIndex}].userId`}
                              render={() => (
                                <FormItem className="w-full">
                                  <FormLabel>User</FormLabel>
                                  <FormControl>
                                    <UserDropdown
                                      value={field.value}
                                      onChange={field.onChange}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        />
                        <Controller
                          control={control}
                          name={`work[${dayIndex}].shifts[${shiftIndex}].shiftId`}
                          render={({ field }) => (
                            <FormField
                              control={control}
                              name={`work[${dayIndex}].shifts[${shiftIndex}].shiftId`}
                              render={() => (
                                <FormItem className="w-full">
                                  <FormLabel>Shift</FormLabel>
                                  <FormControl>
                                    <ShiftDropdown
                                      value={field.value}
                                      onChange={field.onChange}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        />
                      </div>
                    )
                  )}
                  <button
                    type="button"
                    onClick={() => handleAddShift(dayIndex)}
                    className="mt-2 p-1 text-sm text-blue-500 border border-blue-500 rounded"
                  >
                    Add Shift
                  </button>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Save Schedule
        </button>
      </form>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </FormProvider>
  );
};

export default ScheduleForm;
