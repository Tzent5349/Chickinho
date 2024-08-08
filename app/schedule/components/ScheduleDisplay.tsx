"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getDatesFromWeekNumber, formatDate } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ScheduleData = {
  _id: string;
  storeName: { name: string };
  weekNumber: number;
  department: { name: string };
  work: {
    day: string;
    shifts: {
      userId: { name: string };
      shiftId: {
        startTime: string;
        endTime: string;
        break: number;
        totalWorkingHours: number;
      };
    }[];
  }[];
};

type ScheduleDisplayProps = {
  schedule: ScheduleData;
  onNextWeek: () => void;
  onPreviousWeek: () => void;
  hasNextWeek: boolean;
  hasPreviousWeek: boolean;
};

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const formatTime = (time: string) => {
  const date = new Date(time);
  return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
};

const ScheduleDisplay = ({ schedule, onNextWeek, onPreviousWeek, hasNextWeek, hasPreviousWeek }: ScheduleDisplayProps) => {
  const [weekDates, setWeekDates] = useState<string[]>([]);

  useEffect(() => {
    const dates = getDatesFromWeekNumber(schedule.weekNumber, new Date().getFullYear());
    setWeekDates(dates.map(date => formatDate(date)));
  }, [schedule.weekNumber]);

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Schedule Display for {schedule.storeName.name} - {schedule.department.name}
      </h1>
      <div className="flex justify-between mb-4">
        <button onClick={onPreviousWeek} disabled={!hasPreviousWeek} className="flex items-center">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span>Week {schedule.weekNumber}</span>
        <button onClick={onNextWeek} disabled={!hasNextWeek} className="flex items-center">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <Table className="w-full border-collapse border">
        <thead>
          <TableRow>
            {daysOfWeek.map((day, index) => (
              <th key={index} className="border">
                <div className="flex flex-col items-center">
                  <span>{day}</span>
                  <span>{weekDates[index]}</span>
                </div>
              </th>
            ))}
          </TableRow>
        </thead>
        <TableBody>
          <TableRow>
            {daysOfWeek.map((day, dayIndex) => (
              <TableCell key={dayIndex} className="border">
                {schedule.work
                  .filter((workDay) => workDay.day === day)
                  .flatMap((workDay) =>
                    workDay.shifts.map((shift, shiftIndex) => (
                      <div key={shiftIndex} className="shift-row flex  flex-col items-center bg-slate-100 py-2">
                        <span className="font-semibold">{shift.userId.name}</span>
                        <span>{`${formatTime(shift.shiftId.startTime)} - ${formatTime(shift.shiftId.endTime)} `}</span>
                        <span>{` break ${ shift.shiftId.break} min`}</span>
                      </div>
                    ))
                  )}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
};

export default ScheduleDisplay;
