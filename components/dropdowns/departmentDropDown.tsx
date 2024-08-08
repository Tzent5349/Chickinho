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

import { IDepartment } from "@/lib/database/models/department.model";
import { createDepartment, getAllDepartment } from "@/lib/database/actions/department.action";

type DepartmentDropdownProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const DepartmentDropdown = ({ value, onChange }: DepartmentDropdownProps) => {
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAddDepartment = () => {
    startTransition(() => {
      createDepartment({
        department: {
          name: newDepartmentName.trim(),
        },
      }).then((department) => {
        setDepartments((prevState) => [...prevState, department]);
        if (onChange) {
          onChange(department._id);
        }
      });
    });
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      const departmentList = await getAllDepartment();
      departmentList && setDepartments(departmentList as IDepartment[]);
    };

    fetchDepartments();
  }, []);

  return (
    <Select onValueChange={(id) => onChange && onChange(id)} defaultValue={value}>
      <SelectTrigger className="select-field h-fit">
        <SelectValue placeholder="Select Department" />
      </SelectTrigger>
      <SelectContent>
        {departments.length > 0 &&
          departments.map((department) => (
            <SelectItem key={department._id} value={department._id} className="select-item p-regular-14">
              {department.name}
            </SelectItem>
          ))}
        <AlertDialog>
          <AlertDialogTrigger>
            <span className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
              Add new Department
            </span>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Department</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Department name"
                  className="input-field mt-3"
                  onChange={(e) => setNewDepartmentName(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAddDepartment}>
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default DepartmentDropdown;
