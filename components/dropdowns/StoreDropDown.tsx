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

import { IStore } from "@/lib/database/models/store.model";
import { createStore, getAllStore } from "@/lib/database/actions/store.action";

type StoreDropdownProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const StoreDropdown = ({ value, onChange }: StoreDropdownProps) => {
  const [stores, setStores] = useState<IStore[]>([]);
  const [newStoreName, setNewStoreName] = useState("");
  const [newStoreAddress, setNewStoreAddress] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAddStore = () => {
    startTransition(() => {
      createStore({
        store: {
          name: newStoreName.trim(),
          address: newStoreAddress.trim(),
        },
      }).then((store) => {
        setStores((prevState) => [...prevState, store]);
        if (onChange) {
          onChange(store._id);
        }
      });
    });
  };

  useEffect(() => {
    const fetchStores = async () => {
      const storeList = await getAllStore();
      storeList && setStores(storeList as IStore[]);
    };

    fetchStores();
  }, []);

  return (
    <Select onValueChange={(id) => onChange && onChange(id)} defaultValue={value}>
      <SelectTrigger className="select-field h-fit">
        <SelectValue placeholder="Select Store" />
      </SelectTrigger>
      <SelectContent>
        {stores.length > 0 &&
          stores.map((store) => (
            <SelectItem key={store._id} value={store._id} className="select-item p-regular-14">
              {store.name}
            </SelectItem>
          ))}
        <AlertDialog>
          <AlertDialogTrigger>
            <span className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
              Add new Store
            </span>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Store</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Store name"
                  className="input-field mt-3"
                  onChange={(e) => setNewStoreName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Store address"
                  className="input-field mt-3"
                  onChange={(e) => setNewStoreAddress(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAddStore}>
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default StoreDropdown;
