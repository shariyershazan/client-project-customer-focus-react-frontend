/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonTable, { type Column } from "@/components/shared/common/CommonTable";
import { MdOutlineDone, MdOutlineWatchLater } from "react-icons/md";
import { LiaInfoCircleSolid } from "react-icons/lia";

type CoachLog = {
  id: string;
  name: string;
  type: string;
  duration: string;
  status: "Completedd" | "Pending" | "Darft"; // Aligning types with main page
  compliance: "Verified" | "Pending" | "Not Started";
  date: string;
};

const RecentCoachingLogs = () => {
  const data: CoachLog[] = [
    {
      name: "John Doe",
      id: "CL-2847",
      type: "Leadership Caoching",
      duration: "60min",
      status: "Completedd",
      compliance: "Verified",
      date: "April 14, 2020",
    },
    {
      name: "William Clark",
      id: "CL-2847",
      type: "Career Development",
      duration: "60min",
      status: "Completedd",
      compliance: "Verified",
      date: "April 14, 2020",
    },
    {
      name: "Sarah Dey",
      id: "CL-2847",
      type: "Performance Caoching",
      duration: "60min",
      status: "Pending",
      compliance: "Pending",
      date: "April 14, 2020",
    },
  ];

  const columns: Column<CoachLog>[] = [
    {
      header: "Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-slate-100">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`}
              alt="avatar"
            />
          </div>
          <div>
            <p className="font-bold text-slate-900">{item.name}</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-tighter">
              ID: {item.id}
            </p>
          </div>
        </div>
      ),
    },
    { header: "Session Type", key: "type" },
    {
      header: "Duration",
      render: (item) => (
        <span className="font-bold text-slate-900">{item.duration}</span>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-md text-[11px] font-bold border ${
            item.status === "Completedd"
              ? "bg-green-50 text-green-500 border-green-100"
              : item.status === "Pending"
              ? "bg-amber-50 text-amber-500 border-amber-100"
              : "bg-slate-50 text-slate-400 border-slate-100"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "Compliance",
      render: (item) => (
        <div className="flex items-center gap-2 font-medium">
          {item.compliance === "Verified" ? (
            <>
              <MdOutlineDone className="text-green-500 text-lg" />
              <span className="text-xs text-slate-600">Verified</span>
            </>
          ) : item.compliance === "Pending" ? (
            <>
              <MdOutlineWatchLater className="text-amber-500 text-lg" />
              <span className="text-xs text-slate-600">Pending</span>
            </>
          ) : (
            <>
              <LiaInfoCircleSolid className="text-slate-500 text-lg" />
              <span className="text-xs text-slate-600">Not Started</span>
            </>
          )}
        </div>
      ),
    },
    {
      header: "Date & Time",
      render: (item) => (
        <div className="text-sm">
          <p className="font-bold text-slate-900">{item.date}</p>
          <p className="text-[10px] text-slate-400">5:20 PM</p>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-50 p-8 shadow-sm">
      <h3 className="text-xl font-extrabold text-slate-900 mb-6">
        Recent Coaching Logs
      </h3>
      <CommonTable columns={columns} data={data} />
    </div>
  );
};

export default RecentCoachingLogs;