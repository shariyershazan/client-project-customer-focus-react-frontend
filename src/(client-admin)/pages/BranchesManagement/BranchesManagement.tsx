import { useState, useMemo } from "react";
import { Search, Plus, MoreVertical, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonTable, { type Column } from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Swal from "sweetalert2";
import { BranchDialog } from "./_components/AddBranchDialogProps";

export type Branch = {
  id: number;
  name: string;
  subdomain: string;
  email: string;
  manager: string;
  region: string;
  staffCount: number;
  status: number;
  createdAt: string;
};

// --- ADD THIS TYPE ---
// This represents only the data coming from the form
export type BranchFormData = Omit<Branch, "id" | "status" | "createdAt">;

const ClientAdminBranchesManagement = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const [branches, setBranches] = useState<Branch[]>([
    { id: 1, name: 'Softvence Delta', subdomain: 'softvencea@e2e.com', region: 'Africa', email: 'softvence@gmail.com', manager: 'John Doe', staffCount: 50, status: 50, createdAt: 'April 14, 2020' },
    { id: 2, name: 'SparkTech Agecny', subdomain: 'sparktech@e2e.com', region: 'Africa', email: 'softvence@gmail.com', manager: 'John Doe', staffCount: 50, status: 50, createdAt: 'April 14, 2020' },
  ]);

  const handleOpenAdd = () => {
    setSelectedBranch(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (branch: Branch) => {
    setSelectedBranch(branch);
    setIsDialogOpen(true);
  };

  // --- UPDATED HANDLESAVE FUNCTION ---
  const handleSave = (formData: BranchFormData) => {
    if (selectedBranch) {
      // Editing existing branch: merge form data with existing ID/Status
      setBranches((prev) =>
        prev.map((b) =>
          b.id === selectedBranch.id ? { ...b, ...formData } : b
        )
      );
    } else {
      // Adding new branch: generate the missing fields (ID, Status, Date)
      const newBranch: Branch = {
        ...formData,
        id: Date.now(),
        status: 50,
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }),
      };
      setBranches((prev) => [newBranch, ...prev]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This branch record will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B91010",
      cancelButtonColor: "#8C23CC",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        setBranches(branches.filter(b => b.id !== id));
        Swal.fire("Deleted!", "Branch has been removed.", "success");
      }
    });
  };

  // ... (Keep filteredData, paginatedData, and columns as they were)
  const filteredData = useMemo(() => {
    return branches.filter(b => 
      b.name.toLowerCase().includes(search.toLowerCase()) || 
      b.subdomain.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, branches]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const columns: Column<Branch>[] = [
    {
      header: "Company Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 text-[#8C23CC] flex items-center justify-center font-bold">
            {item.name.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-slate-900">{item.name}</div>
            <div className="text-sm text-slate-400">{item.subdomain}</div>
          </div>
        </div>
      )
    },
    { header: "Region", key: "region" },
    { header: "Email", key: "email" },
    { header: "Manager", key: "manager" },
    { header: "Staff Count", render: (item) => <span className="font-bold">{item.staffCount}</span> },
    {
      header: "Status",
      render: (item) => (
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${item.id % 2 === 0 ? 'bg-green-500' : 'bg-amber-500'}`} />
          <span className="font-bold text-slate-700">{item.status}</span>
        </div>
      )
    },
    {
      header: "Created At",
      render: (item) => (
        <div className="text-base">
          <div className="font-bold text-slate-900">{item.createdAt}</div>
          <div className="text-[10px] text-slate-400 uppercase">5:20 PM</div>
        </div>
      )
    },
    {
      header: "Action",
      render: (item) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <MoreVertical size={18} className="text-slate-400" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-32 p-1" align="end">
            <button 
              onClick={() => handleOpenEdit(item)}
              className="w-full flex items-center gap-2 px-3 py-2 text-base hover:bg-slate-50 text-slate-700 rounded-md cursor-pointer"
            >
              <Edit size={14} /> Edit
            </button>
            <hr />
            <button 
              onClick={() => handleDelete(item.id)}
              className="w-full flex items-center gap-2 px-3 py-2 text-base hover:bg-red-50 text-red-600 rounded-md cursor-pointer"
            >
              <Trash size={14} /> Delete
            </button>
          </PopoverContent>
        </Popover>
      )
    }
  ];

  return (
    <div className="p-8 min-h-screen space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-slate-900">Branch Management</h1>
        <div className="flex gap-3">
          <Button onClick={handleOpenAdd} className="bg-[#8C23CC] hover:bg-[#761eb0] text-white px-6 font-bold cursor-pointer">
            <Plus size={18} className="mr-1" /> Add Branch
          </Button>
          <Button variant="outline" className="border-slate-200 cursor-pointer">Import CSV</Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, domain and plan" 
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-base outline-none focus:ring-1 focus:ring-[#8C23CC]" 
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="px-6 cursor-pointer">Filter</Button>
            <Button variant="outline" className="px-6 flex gap-2 cursor-pointer">Export CSV</Button>
          </div>
        </div>

        <CommonTable columns={columns} data={paginatedData} />
        
        <div className="">
         
          <CommonPagination 
            totalItems={filteredData.length} 
            pageSize={pageSize} 
            currentPage={currentPage} 
            onPageChange={setCurrentPage} 
            onPageSizeChange={setPageSize}
          />
        </div>
      </div>

      <BranchDialog
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        onSave={handleSave} 
        initialData={selectedBranch} 
      />
    </div>
  );
};

export default ClientAdminBranchesManagement;