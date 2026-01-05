import { useState, useMemo } from "react";

import { Switch } from "@/components/ui/switch";
import { MoreVertical, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RecentTenantsData, type Tenant } from "./RecentTenantsData";
import type { Column } from "@/components/shared/common/CommonTable";
import CommonTable from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Swal from "sweetalert2";
import SuperAdminTenantDialog from "./SuperAdminTenantDialog.tsx";

const RecentTenants = () => {
  const [tenants, setTenants] = useState<Tenant[]>(RecentTenantsData);
const [isDialogOpen, setIsDialogOpen] = useState(false);
const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and Paginate Data
  const filteredData = useMemo(() => {
    return tenants.filter(
      (t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tenants, searchQuery]); 

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);



const handleAdd = () => {
  setSelectedTenant(null); // Ensure form is empty
  setIsDialogOpen(true);
};

const handleEdit = (tenant: Tenant) => {
  setSelectedTenant(tenant); // Load tenant data into form
  setIsDialogOpen(true);
};

const onSubmitTenant = (data: Partial<Tenant>) => {
  if (selectedTenant) {
    // UPDATE LOGIC
    setTenants((prev) =>
      prev.map((t) => (t.id === selectedTenant.id ? { ...t, ...data } : t))
    );
    Swal.fire("Updated!", "Tenant information has been updated.", "success");
  } else {
    // ADD LOGIC
    const newTenant: Tenant = {
      ...(data as Tenant),
      id: Math.random().toString(),
      isActive: true,
      totalUsers: 0,
      createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      avatarColor: "bg-purple-100 text-purple-600",
    };
    setTenants([newTenant, ...tenants]);
    Swal.fire("Created!", "New tenant has been added successfully.", "success");
  }
  setIsDialogOpen(false);
};

const handleDelete = (tenant: Tenant) => {
  Swal.fire({
    title: "Are you sure?",
    text: `You are about to delete ${tenant.name}. This action cannot be undone!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#8A2BE2",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      setTenants((prev) => prev.filter((t) => t.id !== tenant.id));
      Swal.fire("Deleted!", "Tenant has been deleted.", "success");
    }
  });
};


  const columns: Column<Tenant>[] = [
    {
      header: "Company Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${item.avatarColor}`}
          >
            {item.name.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-gray-900 leading-tight">
              {item.name}
            </div>
            <div className="text-xs text-gray-400">{item.domain}</div>
          </div>
        </div>
      ),
    },
    { header: "Email", key: "email" },
    {
      header: "Plan Type",
      render: (item) => (
        <span className="font-bold text-gray-800">{item.planType}</span>
      ),
    },
    { header: "Total Users", key: "totalUsers" },
    {
      header: "Status",
      render: (item) => (
        <Switch 
          checked={item.isActive}
          onCheckedChange={(checked) => {
            setTenants((prev) =>
              prev.map((t) =>
                t.id === item.id ? { ...t, isActive: checked } : t
              )
            );
          }}
          className="data-[state=checked]:bg-[#8C23CC]  scale-115 cursor-pointer"
        />
      ),
    },
    {
      header: "Created At",
      render: (item) => (
        <div>
          <div className="text-gray-900 text-sm">{item.createdAt}</div>
          <div className="text-[10px] text-gray-400">5:20 PM</div>
        </div>
      ),
    },
    {
      header: "Action",
      render: (item) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem
              onClick={() => handleEdit(item)}
              className="cursor-pointer"
            >
              Edit
            </DropdownMenuItem>
            <hr />

            <DropdownMenuItem
              onClick={() => handleDelete(item)}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="p-8 bg-[#FDFDFF] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Recent Tenants</h1>
            <Button 
                onClick={handleAdd}
                className="bg-[#8C23CC] hover:bg-[#7A26C1] text-white rounded-lg py-5 cursor-pointer"
              >
                + Create New Tenant
          </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to page 1 on search
              }}
              placeholder="Search by name, email, domain and plan"
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm outline-none focus:border-[#8C23CC] transition-colors"
            />
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="text-slate-600 border-slate-200 cursor-pointer"
            >
              Filter
            </Button>
            <Button
              variant="outline"
              className="text-slate-600 border-slate-200 cursor-pointer"
            >
              Export
            </Button>
          </div>
        </div>

        <CommonTable columns={columns} data={paginatedData} />

        <CommonPagination
          totalItems={filteredData.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1); // Reset to page 1 when size changes
          }}
        />
      </div>
          <SuperAdminTenantDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onSubmit={onSubmitTenant}
            initialData={selectedTenant}
        />
    </div>
  );
};

export default RecentTenants;
