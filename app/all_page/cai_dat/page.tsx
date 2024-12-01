import Header from "./Header";
import DevicesTable from "@/components/DevicesTable";
export default function ApSuatPage() {
  return (
    <div className="h-screen flex flex-col select-none">
      <Header />
      <div className="flex justify-center items-center h-screen">
        <DevicesTable />
      </div>
    </div>
  );
}
