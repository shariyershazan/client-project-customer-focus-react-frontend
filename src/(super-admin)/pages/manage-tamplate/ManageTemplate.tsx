import { useState, useMemo } from "react";
import CommonTable, { type Column } from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Search, MoreVertical, Edit, Trash2 } from "lucide-react";
import { ManageTemplateData, type Template } from "./_components/ManageTemplateData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Swal from "sweetalert2";

const SuperAdminManageTemplate = () => {
  const [data, setData] = useState<Template[]>(ManageTemplateData);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Toggle Status Logic
  const handleStatusChange = (id: string, checked: boolean) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: checked } : item))
    );
  };

  // Delete Logic
  const handleDelete = (template: Template) => {
    Swal.fire({
      title: "Delete Template?",
      text: `Are you sure you want to delete "${template.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8A2BE2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) => prev.filter((t) => t.id !== template.id));
        Swal.fire("Deleted!", "Template has been removed.", "success");
      }
    });
  };

  // Filter Data
  const filteredData = useMemo(() => {
    return data.filter((t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);
// 
  const columns: Column<Template>[] = [
    {
      header: "Template Name",
      render: (item) => <span className="font-bold text-slate-900">{item.name}</span>,
    },
    { header: "Type", key: "type" },
    { header: "Total Users", key: "totalUsers" },
    {
      header: "Status",
      render: (item) => (
        <Switch 
          checked={item.status} 
          onCheckedChange={(checked) => handleStatusChange(item.id, checked)}
          className="data-[state=checked]:bg-[#8A2BE2] cursor-pointer scale-115"
        />
      ),
    },
    {
      header: "Created At",
      render: (item) => (
        <div>
          <div className="text-sm">{item.createdAt}</div>
          <div className="text-[10px] text-gray-400 font-medium">5:20 PM</div>
        </div>
      ),
    },
    {
      header: "Action",
      render: (item) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 outline-none">
              <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem className="cursor-pointer">
              <Edit className="mr-2 h-4 w-4 text-slate-500" />
              Edit
            </DropdownMenuItem>
            <hr />
            <DropdownMenuItem 
              className="cursor-pointer text-red-600 focus:text-red-600"
              onClick={() => handleDelete(item)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="p-6 bg-[#FDFDFF] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Global Templates</h1>
        <Button className="bg-[#8A2BE2] hover:bg-[#7A26C1] text-white py-5 px-6 rounded-lg cursor-pointer">
          + Create New Template
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex justify-between mb-6 gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, domain and plan"
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="text-slate-600 cursor-pointer">Filter</Button>
            <Button variant="outline" className="text-slate-600 cursor-pointer">Export</Button>
          </div>
        </div>

        <CommonTable columns={columns} data={filteredData} />
        
        <CommonPagination 
           totalItems={filteredData.length} 
           pageSize={pageSize} 
           currentPage={currentPage} 
           onPageChange={setCurrentPage} 
           onPageSizeChange={setPageSize} 
        />
      </div>
    </div>
  );
};

export default SuperAdminManageTemplate;