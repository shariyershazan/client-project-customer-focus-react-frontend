import { useState, useMemo } from "react";
import { FiSearch, FiMoreVertical,  FiFilter } from "react-icons/fi";
import { HiFire } from "react-icons/hi"; // For the streak icon
import { Button } from "@/components/ui/button";
import CommonTable, { type Column } from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatusBadge from "./_components/StatusBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TeamMember {
  id: string;
  name: string;
  habitName: string;
  habitDesc: string;
  habitsPercent: string;
  streak: number;
  totalHabits: number;
  score: string;
  assignedTrainer: string;
  status: "Great" | "Needs" | "Bad";
}

const ManagerTeamManagement = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const mockData: TeamMember[] = useMemo(() => [
    { id: "1", name: "John Doe", habitName: "Greet 3 customers by name", habitDesc: "Use customers' names when greeting them..", habitsPercent: "90%", streak: 14, totalHabits: 14, score: "4.5/5", assignedTrainer: "David", status: "Great" },
    { id: "2", name: "John Doe", habitName: "Greet 3 customers by name", habitDesc: "Use customers' names when greeting them..", habitsPercent: "90%", streak: 14, totalHabits: 14, score: "4.5/5", assignedTrainer: "David", status: "Needs" },
    { id: "3", name: "John Doe", habitName: "Greet 3 customers by name", habitDesc: "Use customers' names when greeting them..", habitsPercent: "90%", streak: 14, totalHabits: 14, score: "4.5/5", assignedTrainer: "David", status: "Bad" },
    // Add more for pagination testing...
  ], []);

  const filteredData = mockData.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const columns: Column<TeamMember>[] = [
    {
      header: "Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
            <img src={`https://randomuser.me/api/portraits/men/32.jpg`} alt="avatar" />
          </div>
          <span className="font-bold text-base text-slate-900">{item.name}</span>
        </div>
      ),
    },
    {
      header: "Habit Name",
      render: (item) => (
        <div className="max-w-[200px]">
          <div className="font-bold text-slate-900 text-base leading-tight">{item.habitName}</div>
          <div className="text-[13px] text-slate-400 font-medium">
            {item.habitDesc}<span className="text-[#8C23CC] cursor-pointer">View</span>
          </div>
        </div>
      ),
    },
    { header: "Habits", render: (item) => <span className="text-slate-400 text-base font-medium">{item.habitsPercent}</span> },
    { 
      header: "Streak", 
      render: (item) => (
        <div className="flex items-center gap-1 font-bold text-slate-900">
          <HiFire className="text-orange-500 text-lg" /> {item.streak}
        </div>
      ) 
    },
    { header: "Total Habits", render: (item) => <span className="font-bold text-base text-slate-900">{item.totalHabits}</span> },
    { header: "Score", render: (item) => <span className="font-bold text-base text-slate-900">{item.score}</span> },
    {
  header: "Assigned Trainer",
  render: (item) => (
    <Select defaultValue={item.assignedTrainer}>
      <SelectTrigger className="w-[130px] h-9 bg-white border-slate-200 rounded-lg text-sm font-medium focus:ring-1 focus:ring-[#8C23CC] focus:border-[#8C23CC] outline-none">
        <SelectValue placeholder="Select Trainer" />
      </SelectTrigger>
      <SelectContent className="bg-white rounded-xl shadow-xl border-slate-100">
        <SelectItem value="David" className="cursor-pointer font-medium focus:bg-slate-50">David</SelectItem>
        <SelectItem value="Sarah" className="cursor-pointer font-medium focus:bg-slate-50">Sarah</SelectItem>
        <SelectItem value="Michael" className="cursor-pointer font-medium focus:bg-slate-50">Michael</SelectItem>
      </SelectContent>
    </Select>
  ),
},
    { header: "Status", render: (item) => <StatusBadge status={item.status} /> },
    {
      header: "Action",
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <FiMoreVertical className="text-slate-600 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white rounded-xl shadow-xl border-slate-100">
            <DropdownMenuItem className="cursor-pointer text-base font-bold p-3">View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="p-8  min-h-screen space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900">Team Management</h1>

      <div className="bg-white rounded-2xl border border-slate-50 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-80">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-base outline-none focus:ring-1 focus:ring-[#8C23CC]"
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="px-6 border-slate-200 text-slate-600 font-bold h-10">
              <FiFilter className="mr-2" /> Filter
            </Button>
            <Button variant="outline" className="px-6 border-slate-200 text-slate-600 font-bold h-10">
              Export CSV
            </Button>
          </div>
        </div>

        <CommonTable columns={columns} data={paginatedData} />

        <div className="mt-8">
          <CommonPagination
            totalItems={filteredData.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      </div>
    </div>
  );
};

export default ManagerTeamManagement;