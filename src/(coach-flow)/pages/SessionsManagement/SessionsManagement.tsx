import { useState, useMemo } from "react";
import { Search, Download, Plus, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommonTable, {
  type Column,
} from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateSessionForm, {
  type SessionFormData,
  type UploadedFile,
} from "./_components/CreateSessionForm";

interface SessionData {
  id: string;
  title: string;
  date: string;
  time: string;
  speaker: string;
  duration: string;
  sessionType: string;
  attendance: number;
  agenda: string;
  hasMaterials: boolean;
}

const CoachSessionsManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sessions Data - defined directly in component
  const sessionsData: SessionData[] = useMemo(
    () => [
      {
        id: "1",
        title: "Session Title",
        date: "April 14, 2020",
        time: "5:20 PM",
        speaker: "David",
        duration: "50min",
        sessionType: "Workshop",
        attendance: 12,
        agenda:
          "Build one tool that helps your clients cut customer complaints",
        hasMaterials: true,
      },
      {
        id: "2",
        title: "Session Title",
        date: "April 14, 2020",
        time: "5:20 PM",
        speaker: "David",
        duration: "50min",
        sessionType: "Workshop",
        attendance: 12,
        agenda:
          "Build one tool that helps your clients cut customer complaints",
        hasMaterials: true,
      },
      {
        id: "3",
        title: "Session Title",
        date: "April 14, 2020",
        time: "5:20 PM",
        speaker: "David",
        duration: "50min",
        sessionType: "Workshop",
        attendance: 12,
        agenda:
          "Build one tool that helps your clients cut customer complaints",
        hasMaterials: true,
      },
      {
        id: "4",
        title: "Session Title",
        date: "April 14, 2020",
        time: "5:20 PM",
        speaker: "David",
        duration: "50min",
        sessionType: "Workshop",
        attendance: 12,
        agenda:
          "Build one tool that helps your clients cut customer complaints",
        hasMaterials: true,
      },
    ],
    []
  );

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!search) return sessionsData;
    return sessionsData.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, sessionsData]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [currentPage, pageSize, filteredData]);

  const columns: Column<SessionData>[] = [
    {
      header: "Title",
      render: (item) => (
        <span className="font-semibold text-slate-900">{item.title}</span>
      ),
    },
    {
      header: "Date & Time",
      render: (item) => (
        <div>
          <div className="text-slate-900">{item.date}</div>
          <div className="text-xs text-slate-500">{item.time}</div>
        </div>
      ),
    },
    {
      header: "Speaker",
      render: (item) => <span className="text-slate-700">{item.speaker}</span>,
    },
    {
      header: "Duration",
      render: (item) => <span className="text-slate-700">{item.duration}</span>,
    },
    {
      header: "Session Type",
      render: (item) => (
        <span className="text-slate-700">{item.sessionType}</span>
      ),
    },
    {
      header: "Attendance",
      render: (item) => (
        <span className="text-slate-700">{item.attendance}</span>
      ),
    },
    {
      header: "Agenda",
      render: (item) => (
        <div className="text-slate-700 text-sm max-w-[200px] whitespace-normal">
          <p className="line-clamp-2 leading-5 wrap-break-word">
            {item.agenda}
          </p>
        </div>
      ),
    },
    {
      header: "Materials",
      render: (item) =>
        item.hasMaterials ? (
          <Button
            variant="link"
            className="text-[#8C23CC] hover:text-[#761eb0] p-0 h-auto"
          >
            View
          </Button>
        ) : (
          <span className="text-slate-400">-</span>
        ),
    },
    {
      header: "Action",
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const handleFormSubmit = (data: SessionFormData, files: UploadedFile[]) => {
    // Handle form submission here
    console.log("Form submitted:", data, files);
    // You can add API call here to save the session
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Sessions Management
        </h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#8C23CC] hover:bg-[#761eb0] text-white w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule Sessions
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 sm:p-6">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by title"
              className="pl-10 border-slate-200 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="border-slate-200 w-full sm:w-auto"
          >
            Export CSV
            <Download className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <CommonTable columns={columns} data={paginatedData} />

        {/* Pagination */}
        <CommonPagination
          totalItems={filteredData.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Create Sessions Modal */}
      <CreateSessionForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default CoachSessionsManagement;
