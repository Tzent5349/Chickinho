"use server";
import { getAllStoresWithDepartments } from "@/lib/database/actions/store.action";
import Link from "next/link";

const StoreList = async () => {
  const stores = await getAllStoresWithDepartments();
  return (
    <>
      <h1>Stores and Departments</h1>
      <div className="flex flex-col">
        {stores?.map((store: any) => (
          <div key={store._id} className="p-4 border-b border-gray-200">
            <h2 className="font-bold">{store.name}</h2>
            {store.workDepartments.map((department: any) => (
              <Link
                href={`/schedule/${store._id}/${department.name._id}`}
                key={department.name._id}
              >
                <p className="text-blue-500 hover:underline">
                  {department.name.name}
                </p>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default StoreList;
