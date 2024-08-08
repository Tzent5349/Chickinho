"use client";

import { useState } from "react";
import ScheduleDisplay from "./components/ScheduleDisplay";


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

type ScheduleDisplayWrapperProps = {
  schedules: ScheduleData[];
};

const ScheduleDisplayWrapper = ({ schedules }: ScheduleDisplayWrapperProps) => {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

  const handleNextWeek = () => {
    if (currentWeekIndex < schedules.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1);
    }
  };

  const handlePreviousWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1);
    }
  };

  const currentSchedule = schedules[currentWeekIndex];

  return (
    <ScheduleDisplay
      schedule={currentSchedule}
      onNextWeek={handleNextWeek}
      onPreviousWeek={handlePreviousWeek}
      hasNextWeek={currentWeekIndex < schedules.length - 1}
      hasPreviousWeek={currentWeekIndex > 0}
    />
  );
};

export default ScheduleDisplayWrapper;
