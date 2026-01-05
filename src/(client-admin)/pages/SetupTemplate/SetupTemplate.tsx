import { useState, useMemo } from "react";
import { Search, Filter, Download, MoreVertical, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonTable, { type Column } from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TemplateDetailModal from "./_components/TemplateDetailModal";

interface TemplateData {
  id: string;
  name: string;
  type: string;
  totalUsers: number;
  status?: string;
  createdAt: string;
  time: string;
  description: string;
}

const ClientAdminSetupTemplate = () => {
  const [activeTab, setActiveTab] = useState("Templates");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  
  // Modal States
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(null);

  // Large Functional Dataset
  const [allTemplates, setAllTemplates] = useState<TemplateData[]>([
    { id: "1", name: "90-Day Pilot Template", type: "Program", totalUsers: 50, status: "Completed", createdAt: "April 14, 2020", time: "5:20 PM", description: "Standard onboarding flow for pilots." },
    { id: "2", name: "Manager Toolkit", type: "Document", totalUsers: 35, status: "In Progress", createdAt: "May 10, 2021", time: "10:00 AM", description: "Middle management framework." },
    { id: "3", name: "Sales Mastery", type: "Workshop", totalUsers: 120, status: "Completed", createdAt: "June 15, 2022", time: "2:00 PM", description: "Sales closing techniques." },
    { id: "4", name: "Executive Coaching", type: "Program", totalUsers: 10, status: "In Progress", createdAt: "July 01, 2022", time: "09:15 AM", description: "Leadership for C-suite." },
    { id: "5", name: "Diversity & Inclusion", type: "Course", totalUsers: 200, status: "Completed", createdAt: "Aug 22, 2022", time: "11:30 AM", description: "Inclusion training." },
    { id: "6", name: "Tech Stack Audit", type: "Document", totalUsers: 15, status: "In Progress", createdAt: "Sept 05, 2023", time: "4:45 PM", description: "Infrastructure review." },
    { id: "7", name: "Customer Success 101", type: "Workshop", totalUsers: 85, status: "Completed", createdAt: "Oct 12, 2023", time: "1:00 PM", description: "Retention strategies." },
    { id: "8", name: "Growth Mindset", type: "Course", totalUsers: 300, status: "Completed", createdAt: "Dec 05, 2023", time: "3:10 PM", description: "Psychological growth." },
    { id: "9", name: "Product Roadmap", type: "Workshop", totalUsers: 25, status: "In Progress", createdAt: "Jan 12, 2024", time: "11:00 AM", description: "Prioritization methods." },
    { id: "10", name: "Marketing Basics", type: "Program", totalUsers: 60, status: "Completed", createdAt: "Feb 18, 2024", time: "12:00 PM", description: "SEO/SEM basics." },
    { id: "11", name: "Financial Planning", type: "Program", totalUsers: 40, status: "In Progress", createdAt: "Nov 30, 2023", time: "8:30 AM", description: "Corporate budgeting." },
  ]);

  // Logic: Search and Pagination
  const filteredData = useMemo(() => {
    return allTemplates.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, allTemplates]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handleMarkComplete = (id: string) => {
    setAllTemplates(prev => prev.map(t => t.id === id ? { ...t, status: "Completed" } : t));
  };

  const columns: Column<TemplateData>[] = [
    { header: "Template Name", render: (item) => <span className="font-bold text-slate-900">{item.name}</span> },
    { header: "Type", render: (item) => <span className="text-slate-700 font-medium">{item.type}</span> },
    { header: "Total Users", render: (item) => <span className="text-slate-700 font-medium">{item.totalUsers}</span> },
    ...(activeTab === "My Templates" ? [{
      header: "Status",
      render: (item: TemplateData) => (
        <span className={`px-3 py-1 rounded-md text-xs font-bold ${item.status === "Completed" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}>
          {item.status}
        </span>
      ),
    }] : []),
    { header: "Created At", render: (item) => (
      <div className="text-sm">
        <div className="font-bold text-slate-900">{item.createdAt}</div>
        <div className="text-[10px] text-slate-400 font-medium">{item.time}</div>
      </div>
    )},
    { header: "Action", render: (item) => activeTab === "Templates" ? (
      <Button 
        onClick={() => { setSelectedTemplate(item); setIsViewOpen(true); }} 
        className="bg-[#8C23CC] hover:bg-[#761eb0] text-white px-8 font-bold h-9 rounded-md cursor-pointer transition-all active:scale-95"
      >
        Select
      </Button>
    ) : (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer rounded-full outline-none">
            <MoreVertical className="h-4 w-4 text-slate-600" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 p-2 rounded-xl shadow-xl border-slate-100 bg-white">
          <DropdownMenuItem 
            onClick={() => handleMarkComplete(item.id)}
            className="cursor-pointer gap-2 py-2 font-medium text-slate-600 hover:bg-slate-50 rounded-lg"
          >
            <CheckCircle size={16} className="text-slate-400" /> Mark As Complete
          </DropdownMenuItem>
           <DropdownMenuItem 
            onClick={() => handleMarkComplete(item.id)}
            className="cursor-pointer gap-2 py-2 font-medium text-slate-600 hover:bg-slate-50 rounded-lg"
          >
            <CheckCircle size={16} className="text-red-500" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )},
  ];

  return (
    <div className="p-8 bg-[#FDFDFD] min-h-screen space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900">Setup Template</h1>

      <div className="flex gap-8 border-b border-slate-100">
        {["Templates", "My Templates"].map((tab) => (
          <button key={tab} onClick={() => { setActiveTab(tab); setCurrentPage(1); }} 
            className={`pb-4 text-sm font-bold transition-all relative cursor-pointer ${activeTab === tab ? "text-[#8C23CC]" : "text-slate-400"}`}>
            {tab} ({tab === "Templates" ? 100 : allTemplates.length})
            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8C23CC]" />}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-50 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} placeholder="Search templates..." 
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#8C23CC]" />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="px-6 border-slate-200 text-slate-600 font-bold h-11 cursor-pointer">
              <Filter size={16} className="mr-2 text-slate-400" /> Filter
            </Button>
            <Button variant="outline" className="px-6 border-slate-200 text-slate-600 font-bold h-11 cursor-pointer">
              <Download size={16} className="mr-2 text-slate-400" /> Export
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

      <TemplateDetailModal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} template={selectedTemplate} />
    </div>
  );
};

export default ClientAdminSetupTemplate;