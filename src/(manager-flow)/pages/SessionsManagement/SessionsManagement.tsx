/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { Search, Download, Plus, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommonTable, { type Column } from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateSessionForm } from "./_components/CreateSessionForm";
import ViewSessionDialog from "./_components/ViewSessionDialog";
import type { SessionFormData, UploadedFile } from "@/(coach-flow)/pages/SessionsManagement/_components/CreateSessionForm";



// Interface remains the same
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

const ManagerSessionsManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(null);

  const [sessionsData, setSessionsData] = useState<SessionData[]>([
    { id: "1", title: "Quarterly Workshop", date: "April 14, 2024", time: "5:20 PM", speaker: "David", duration: "50min", sessionType: "Workshop", attendance: 12, agenda: "Build one tool that helps your clients cut customer complaints", hasMaterials: true },
    { id: "2", title: "Product Sync", date: "April 15, 2024", time: "10:00 AM", speaker: "Sarah", duration: "30min", sessionType: "Meeting", attendance: 8, agenda: "Roadmap discussion for Q3", hasMaterials: false },
  ]);

  const handleEdit = (session: SessionData) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const handleView = (session: SessionData) => {
    setSelectedSession(session);
    setIsViewModalOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedSession(null); // Clear selection for fresh form
    setIsModalOpen(true);
  };

  const handleFormSubmit = (data: SessionFormData, files: UploadedFile[]) => {
    if (selectedSession) {
      // Logic for Update
      setSessionsData(prev => prev.map(s => s.id === selectedSession.id ? { ...s, title: data.title, agenda: data.agenda, duration: data.duration } : s));
    } else {
      // Logic for Create
      const newSession: SessionData = {
        id: Math.random().toString(),
        title: data.title,
        date: data.dateTime.split('T')[0],
        time: data.dateTime.split('T')[1] || "12:00 PM",
        speaker: "Current User",
        duration: data.duration,
        sessionType: "Workshop",
        attendance: 0,
        agenda: data.agenda,
        hasMaterials: files.length > 0
      };
      setSessionsData(prev => [newSession, ...prev]);
    }
    setIsModalOpen(false);
  };

  const columns: Column<SessionData>[] = [
    { header: "Title", render: (item) => <span className="font-semibold text-slate-900">{item.title}</span> },
    { header: "Date & Time", render: (item) => (
        <div>
          <div className="text-slate-900 font-medium">{item.date}</div>
          <div className="text-xs text-slate-500">{item.time}</div>
        </div>
      )
    },
    { header: "Speaker", render: (item) => <span className="text-slate-700">{item.speaker}</span> },
    { header: "Duration", render: (item) => <span className="text-slate-700">{item.duration}</span> },
    { header: "Session Type", render: (item) => <span className="text-slate-700">{item.sessionType}</span> },
    { header: "Agenda", render: (item) => (
        <div className="text-slate-600 text-sm max-w-[200px] line-clamp-2 leading-tight">{item.agenda}</div>
      )
    },
      {
      header: "Materials",
      render: (item) =>
        item.hasMaterials ? (
          <Button
            variant="link"
            className="text-[#8C23CC] hover:text-[#761eb0] p-0 h-auto cursor-pointer"
          >
            View
          </Button>
        ) : (
          <span className="text-slate-400">-</span>
        ),
    },
    {
      header: "Action",
      render: (item) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => handleView(item)} className="cursor-pointer">
              <Eye className="w-4 h-4 mr-2 text-slate-500" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(item)} className="cursor-pointer">
              <Edit className="w-4 h-4 mr-2 text-blue-500" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  // Filtering Logic
  const filteredData = useMemo(() => {
    return sessionsData.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
  }, [search, sessionsData]);

  return (
    <div className="p-8 min-h-screen bg-slate-50/50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sessions Management</h1>
        <Button onClick={handleCreateNew} className="bg-[#8C23CC] hover:bg-[#761eb0] text-white font-bold px-6 shadow-md shadow-purple-100 cursor-pointer">
          <Plus className="w-5 h-5 mr-2" /> Schedule Session
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6  flex justify-between items-center bg-white">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search sessions..."
              className="pl-10 border-slate-200 focus:ring-[#8C23CC]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" className="border-slate-200 font-semibold text-slate-600 cursor-pointer hover:bg-slate-50">
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
        </div>

        <div className="px-5">
          <CommonTable columns={columns} data={filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)} />
        </div>

        <div className="p-4">
          <CommonPagination
            totalItems={filteredData.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      </div>

      {/* Forms & Dialogs */}
      <CreateSessionForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedSession ? {
          title: selectedSession.title,
          dateTime: selectedSession.date, // In real app, format to datetime-local
          duration: selectedSession.duration,
          agenda: selectedSession.agenda
        } : undefined}
      />

      <ViewSessionDialog
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        session={selectedSession}
      />
    </div>
  );
};

export default ManagerSessionsManagement;