import { useState, useMemo } from "react";
import {
  Search,
  Download,
  Filter,
  Calendar,
  Users,
  Shield,
  Clock,
  CheckCircle2,
  Clock as ClockIcon,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";
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
import CoachingMetricCard from "./_components/CoachingMetricCard";

interface SessionData {
  id: string;
  title: string;
  sessionType: string;
  duration: string;
  status: "Completed" | "Pending" | "Draft";
  compliance: "Verified" | "Pending" | "Not Started";
  date: string;
  time: string;
}

const CoachCoachingLogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Completed" | "Pending" | "Draft">("All");

  // Metric Cards Data - defined directly in component
  const metricsData = [
    {
      id: "total-sessions",
      title: "Total Sessions",
      value: 248,
      icon: Calendar,
      change: "12% this month",
    },
    {
      id: "active-clients",
      title: "Active Clients",
      value: 42,
      icon: Users,
      change: "+5 new this month",
    },
    {
      id: "compliance-rate",
      title: "Compliance Rate",
      value: "98.5%",
      icon: Shield,
    },
    {
      id: "avg-session-time",
      title: "Avg. Session Time",
      value: "52min",
      icon: Clock,
      subtitle: "(Per Session)",
    },
  ];

  // Sessions Data - defined directly in component
  const sessionsData: SessionData[] = useMemo(
    () => [
      {
        id: "1",
        title: "Session Title",
        sessionType: "Leadership Coaching",
        duration: "60min",
        status: "Completed",
        compliance: "Verified",
        date: "April 14, 2020",
        time: "5:20 PM",
      },
      {
        id: "2",
        title: "Session Title",
        sessionType: "Leadership Coaching",
        duration: "60min",
        status: "Completed",
        compliance: "Verified",
        date: "April 14, 2020",
        time: "5:20 PM",
      },
      {
        id: "3",
        title: "Session Title",
        sessionType: "Leadership Coaching",
        duration: "60min",
        status: "Pending",
        compliance: "Pending",
        date: "April 14, 2020",
        time: "5:20 PM",
      },
      {
        id: "4",
        title: "Session Title",
        sessionType: "Leadership Coaching",
        duration: "60min",
        status: "Draft",
        compliance: "Not Started",
        date: "April 14, 2020",
        time: "5:20 PM",
      },
    ],
    []
  );

  // Filter data based on search and active tab
  const filteredData = useMemo(() => {
    let filtered = sessionsData;

    // Filter by tab
    if (activeTab !== "All") {
      filtered = filtered.filter((item) => item.status === activeTab);
    }

    // Filter by search
    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.sessionType.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [search, activeTab, sessionsData]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [currentPage, pageSize, filteredData]);

  const columns: Column<SessionData>[] = [
    {
      header: "Session Title",
      render: (item) => (
        <span className="font-semibold text-slate-900">{item.title}</span>
      ),
    },
    {
      header: "Session Type",
      render: (item) => (
        <span className="text-slate-700">{item.sessionType}</span>
      ),
    },
    {
      header: "Duration",
      render: (item) => (
        <span className="text-slate-700">{item.duration}</span>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            item.status === "Completed"
              ? "bg-green-100 text-green-700"
              : item.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "Compliance",
      render: (item) => {
        const complianceConfig = {
          Verified: { icon: CheckCircle2, color: "text-green-600" },
          Pending: { icon: ClockIcon, color: "text-yellow-600" },
          "Not Started": { icon: AlertTriangle, color: "text-slate-600" },
        };

        const config = complianceConfig[item.compliance];
        const Icon = config.icon;

        return (
          <div className="flex items-center gap-2">
            <Icon className={`w-4 h-4 ${config.color}`} />
            <span className="text-slate-700">{item.compliance}</span>
          </div>
        );
      },
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
      header: "Action",
      render: (item) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-slate-200"
            >
              {item.status}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Complete</DropdownMenuItem>
            <DropdownMenuItem>Pending</DropdownMenuItem>
            <DropdownMenuItem>Draft</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50">
      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Coaching Logs</h1>

      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {metricsData.map((metric) => (
          <CoachingMetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            change={metric.change}
            subtitle={metric.subtitle}
          />
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-3 sm:gap-6 border-b border-slate-200 mb-4 sm:mb-6 overflow-x-auto">
        {(["All", "Completed", "Pending", "Draft"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab
                ? "text-[#8C23CC] border-b-2 border-[#8C23CC]"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 sm:p-6">
        {/* Search and Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by name, session type"
              className="pl-10 border-slate-200 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" className="border-slate-200 flex-1 sm:flex-initial">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="border-slate-200 flex-1 sm:flex-initial">
              Export CSV
              <Download className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Table */}
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
    </div>
  );
};

export default CoachCoachingLogs;
