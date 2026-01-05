/* eslint-disable @typescript-eslint/no-explicit-any */
// ManagerCoachingLogs.tsx
import { useState, useMemo } from "react";
import { Search, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonTable, { type Column } from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import { StatCard } from "./_components/StatCard";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { SiAdguard } from "react-icons/si";
import { RiTimerLine } from "react-icons/ri";
import { MdOutlineDone, MdOutlineWatchLater } from "react-icons/md";
import { LiaInfoCircleSolid } from "react-icons/lia";

// Types matching the screenshot data
export type CoachingLog = {
  id: string;
  coachName: string;
  coachId: string;
  sessionType: string;
  duration: string;
  status: "Completedd" | "Pending" | "Darft";
  compliance: "Verified" | "Pending" | "Not Started";
  dateTime: string;
};

const ManagerCoachingLogs = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(3);
  const [pageSize, setPageSize] = useState(10);

  // Mock data representing the screenshot rows
  const [logs] = useState<CoachingLog[]>([
    { id: "1", coachName: "John Doe", coachId: "CL-2847", sessionType: "Leadership Caoching", duration: "60min", status: "Completedd", compliance: "Verified", dateTime: "April 14, 2020" },
    { id: "2", coachName: "William Clark", coachId: "CL-2847", sessionType: "Career Development", duration: "60min", status: "Completedd", compliance: "Verified", dateTime: "April 14, 2020" },
    { id: "3", coachName: "Sarah Dey", coachId: "CL-2847", sessionType: "Performance Caoching", duration: "60min", status: "Pending", compliance: "Pending", dateTime: "April 14, 2020" },
    { id: "4", coachName: "Perker Roy", coachId: "CL-2847", sessionType: "Team Caoching", duration: "60min", status: "Darft", compliance: "Not Started", dateTime: "April 14, 2020" },
  ]);

  const filteredData = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = log.coachName.toLowerCase().includes(search.toLowerCase()) || 
                           log.sessionType.toLowerCase().includes(search.toLowerCase());
      const matchesTab = activeTab === "All" || log.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [search, activeTab, logs]);

  const columns: Column<CoachingLog>[] = [
    {
      header: "Coach Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.coachName}`} className="w-10 h-10 rounded-full border border-slate-100" alt="avatar" />
          <div>
            <div className="font-bold text-slate-900">{item.coachName}</div>
            <div className="text-xs text-slate-400 uppercase tracking-tighter">ID: {item.coachId}</div>
          </div>
        </div>
      )
    },
    { header: "Session Type", key: "sessionType" },
    { header: "Duration", render: (item) => <span className="font-bold text-slate-900">{item.duration}</span> },
    {
      header: "Status",
      render: (item) => (
        <span className={`px-4 py-1 rounded-md text-xs font-medium border ${
          item.status === 'Completedd' ? 'bg-green-50 text-green-500 border-green-100' : 
          item.status === 'Pending' ? 'bg-amber-50 text-amber-500 border-amber-100' : 
          'bg-slate-50 text-slate-400 border-slate-100'
        }`}>
          {item.status}
        </span>
      )
    },
    {
      header: "Compliance",
      render: (item) => (
        <div className="flex items-center gap-2">
          {item.compliance === 'Verified' ? (
            <div className="flex items-center gap-1.5 text-green-500 font-medium">
              <span className="0 flex items-center justify-center text-[16px]"><MdOutlineDone  /></span>
              <span className="text-xs text-slate-600">Verified</span>
            </div>
          ) : item.compliance === 'Pending' ? (
            <div className="flex items-center gap-1.5 text-amber-500 font-medium">
               <span className=" flex items-center justify-center text-[16px]"><MdOutlineWatchLater /></span>
               <span className="text-xs text-slate-600">Pending</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-slate-500 font-medium">
               <span className=" flex items-center justify-center text-[16px]"><LiaInfoCircleSolid/></span>
               <span className="text-xs text-slate-600">Not Started</span>
            </div>
          )}
        </div>
      )
    },
    {
      header: "Date & Time",
      render: (item) => (
        <div className="text-sm">
          <div className="font-bold text-slate-900">{item.dateTime}</div>
          <div className="text-[10px] text-slate-400">5:20 PM</div>
        </div>
      )
    }
  ];

  return (
    <div className="p-8 space-y-8 min-h-screen">
      <h1 className="text-3xl font-extrabold text-slate-900">Coaching Logs</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Sessions" value="248" change="12% this month" icon={<IoCalendarClearOutline/>} />
        <StatCard title="Active Clients" value="42" change="+5 new this month" icon={<FiUsers />} />
        <StatCard title="Compliance Rate" value="98.5%" icon={<SiAdguard />} />
        <StatCard title="Avg. Session Time" value="52min" subText="(Per Session)" icon={<RiTimerLine />} />
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-slate-100">
        {["All", "Completedd", "Prending", "Draft", "Mine"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 text-sm font-bold transition-all relative cursor-pointer ${
              activeTab === tab ? "text-[#8C23CC]" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#8C23CC] rounded-t-full" />}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl p-8 border border-slate-50 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, session type" 
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#8C23CC]" 
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="px-6 flex gap-2 border-slate-200"><Filter size={16} /> Filter</Button>
            <Button variant="outline" className="px-6 flex gap-2 border-slate-200"><Download size={16} /> Export CSV</Button>
          </div>
        </div>

        <CommonTable columns={columns} data={filteredData} />
        
          
         <CommonPagination 
            totalItems={filteredData.length} pageSize={pageSize} currentPage={currentPage} 
            onPageChange={setCurrentPage} onPageSizeChange={setPageSize}
          />

      </div>
    </div>
  );
};



export default ManagerCoachingLogs;