import StoreList from "./schedule/page";
import Link from "next/link";

export default async function Home() {
  return (
    <main>
    <div className="flex my-10">
      <Link href= "/schedule/create" >Create a new schedule</Link>
    </div>
    <StoreList />
    </main>
  );
}
