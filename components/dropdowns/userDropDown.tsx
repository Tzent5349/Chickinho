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

import { IUser } from "@/lib/database/models/user.model";
import { createUser, getAllUser } from "@/lib/database/actions/user.action";

type UserDropdownProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const UserDropdown = ({ value, onChange }: UserDropdownProps) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("employee");
  const [isPending, startTransition] = useTransition();

  const handleAddUser = () => {
    startTransition(() => {
      createUser({
        user: {
          name: newUserName.trim(),
          email: newUserEmail.trim(),
          role: newUserRole,
        },
      }).then((user) => {
        setUsers((prevState) => [...prevState, user]);
        if (onChange) {
          onChange(user._id);
        }
      });
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await getAllUser();
      userList && setUsers(userList as IUser[]);
    };

    fetchUsers();
  }, []);

  return (
    <Select
      onValueChange={(id) => onChange && onChange(id)}
      defaultValue={value}
    >
      <SelectTrigger className="select-field h-fit">
        <SelectValue placeholder="Select User" />
      </SelectTrigger>
      <SelectContent>
        {users.length > 0 &&
          users.map((user) => (
            <SelectItem
              key={user._id}
              value={user._id}
              className="select-item p-regular-14"
            >
              {user.name}
            </SelectItem>
          ))}
        <AlertDialog>
          <AlertDialogTrigger>
            <span className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
              Add new User
            </span>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New User</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="User name"
                  className="input-field mt-3"
                  onChange={(e) => setNewUserName(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="User email"
                  className="input-field mt-3"
                  onChange={(e) => setNewUserEmail(e.target.value)}
                />

                <Select
                  onValueChange={(value) => setNewUserRole(value || "employee")}
                  defaultValue={newUserRole}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role for the user" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="sub-manager">Sub-manager</SelectItem>
                  </SelectContent>
                </Select>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAddUser}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default UserDropdown;
