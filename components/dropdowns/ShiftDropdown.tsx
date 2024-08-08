"use client";
import { useEffect, useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { FormControl, FormLabel } from "@/components/ui/form";

import { IShift } from "@/lib/database/models/shift.model";
import { createShift, getAllShift } from "@/lib/database/actions/shift.action";

type ShiftDropdownProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const ShiftDropdown = ({ value, onChange }: ShiftDropdownProps) => {
  const [shifts, setShifts] = useState<IShift[]>([]);
  const [newShiftName, setNewShiftName] = useState("");
  const [newShiftStartTime, setNewShiftStartTime] = useState("");
  const [newShiftEndTime, setNewShiftEndTime] = useState("");
  const [newShiftBreak, setNewShiftBreak] = useState<number | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const calculateTotalWorkingHours = (startTime: string, endTime: string, breakTime: number | undefined) => {
    const start = new Date(`1970-01-01T${startTime}:00Z`);
    const end = new Date(`1970-01-01T${endTime}:00Z`);
    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // Difference in hours
    const totalWorkingHours = diff - (breakTime ? breakTime / 60 : 0)/60
    ; // Subtract break time in hours
    return totalWorkingHours > 0 ? totalWorkingHours : 0; // Ensure non-negative
  };

  const handleAddShift = () => {
    const totalWorkingHours = calculateTotalWorkingHours(newShiftStartTime, newShiftEndTime, newShiftBreak);
    startTransition(() => {
      createShift({
        shift: {
          name: newShiftName.trim(),
          startTime: new Date(`1970-01-01T${newShiftStartTime}:00Z`),
          endTime: new Date(`1970-01-01T${newShiftEndTime}:00Z`),
          break: newShiftBreak,
          totalWorkingHours,
        },
      }).then((shift) => {
        setShifts((prevState) => [...prevState, shift]);
        if (onChange) {
          onChange(shift._id);
        }
      });
    });
  };

  useEffect(() => {
    const fetchShifts = async () => {
      const shiftList = await getAllShift();
      shiftList && setShifts(shiftList as IShift[]);
    };

    fetchShifts();
  }, []);

  return (
    <Select onValueChange={(id) => onChange && onChange(id)} defaultValue={value}>
      <SelectTrigger className="select-field h-fit">
        <SelectValue placeholder="Select Shift" />
      </SelectTrigger>
      <SelectContent>
        {shifts.length > 0 &&
          shifts.map((shift) => (
            <SelectItem key={shift._id} value={shift._id} className="select-item p-regular-14">
              {shift.name}
            </SelectItem>
          ))}
        <AlertDialog>
          <AlertDialogTrigger>
            <span className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
              Add new Shift
            </span>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Shift</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Shift name"
                  className="input-field mt-3"
                  onChange={(e) => setNewShiftName(e.target.value)}
                />
                <Input
                  type="time"
                  placeholder="Start Time"
                  className="input-field mt-3"
                  onChange={(e) => setNewShiftStartTime(e.target.value)}
                />
                <Input
                  type="time"
                  placeholder="End Time"
                  className="input-field mt-3"
                  onChange={(e) => setNewShiftEndTime(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Break Time (minutes)"
                  className="input-field mt-3"
                  onChange={(e) => setNewShiftBreak(Number(e.target.value))}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAddShift}>
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default ShiftDropdown;
