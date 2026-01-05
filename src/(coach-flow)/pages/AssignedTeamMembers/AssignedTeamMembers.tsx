import { useState, useMemo } from "react";
import { Search, Download, Filter, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommonTable, {
  type Column,
} from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import CreateScoreForm, {
  type ScoreFormData,
} from "./_components/CreateScoreForm";

interface TeamMemberData {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  habitName: string;
  habitDescription: string;
  habitsPercentage: number;
  streak: number;
  totalHabits: number;
  score: string;
  assignedTrainer: string;
  status: string;
}

const CoachAssignedTeamMembers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] =
    useState<TeamMemberData | null>(null);

  // Team Members Data - defined directly in component
  const teamMembersData: TeamMemberData[] = useMemo(
    () => [
      {
        id: "1",
        name: "Doe",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        email: "doe@example.com",
        phone: "+8801787939177",
        habitName: "Greet 3 customers by name",
        habitDescription: "Use customers' names when greeting them..",
        habitsPercentage: 90,
        streak: 14,
        totalHabits: 0,
        score: "4.5/5",
        assignedTrainer: "Manager (Kamrul)",
        status: "Great",
      },
      {
        id: "2",
        name: "John",
        avatar: "https://randomuser.me/api/portraits/men/44.jpg",
        email: "john@example.com",
        phone: "+8801787939178",
        habitName: "Greet 3 customers by name",
        habitDescription: "Use customers' names when greeting them..",
        habitsPercentage: 95,
        streak: 14,
        totalHabits: 10,
        score: "4.5/5",
        assignedTrainer: "Manager (Kamrul)",
        status: "Great",
      },
      {
        id: "3",
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/68.jpg",
        email: "alma.lawson@example.com",
        phone: "+8801787939179",
        habitName: "Greet 3 customers by name",
        habitDescription: "Use customers' names when greeting them..",
        habitsPercentage: 85,
        streak: 10,
        totalHabits: 10,
        score: "4.5/5",
        assignedTrainer: "Manager (Kamrul)",
        status: "Great",
      },
    ],
    []
  );

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!search) return teamMembersData;
    return teamMembersData.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.phone.toLowerCase().includes(search.toLowerCase()) ||
        item.assignedTrainer.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, teamMembersData]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [currentPage, pageSize, filteredData]);

  const columns: Column<TeamMemberData>[] = [
    {
      header: "Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <img
            src={item.avatar}
            alt={item.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-slate-200"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://randomuser.me/api/portraits/men/32.jpg`;
            }}
          />
          <span className="font-semibold text-slate-900">{item.name}</span>
        </div>
      ),
    },
    {
      header: "Habit Name",
      render: (item) => (
        <div>
          <p className="font-semibold text-slate-900 mb-1">{item.habitName}</p>
          <p className="text-sm text-slate-600">
            {item.habitDescription}
            <Button
              variant="link"
              className="text-[#8C23CC] hover:text-[#761eb0] p-0 h-auto ml-1"
            >
              View
            </Button>
          </p>
        </div>
      ),
    },
    {
      header: "Habits",
      render: (item) => (
        <span className="text-slate-700 font-semibold">{item.habitsPercentage}%</span>
      ),
    },
    {
      header: "Streak",
      render: (item) => (
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="text-slate-700">{item.streak}</span>
        </div>
      ),
    },
    {
      header: "Total Habits",
      render: (item) => (
        <span className="text-slate-700">{item.totalHabits}</span>
      ),
    },
    {
      header: "Score",
      render: (item) => (
        <span className="text-slate-700 font-semibold">{item.score}</span>
      ),
    },
    {
      header: "Assigned Trainer",
      render: (item) => (
        <span className="text-slate-700">{item.assignedTrainer}</span>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-slate-900 font-semibold">{item.status}</span>
        </div>
      ),
    },
    {
      header: "Action",
      render: (item) => (
        <Button
          size="sm"
          className="bg-[#8C23CC] hover:bg-[#761eb0] text-white"
          onClick={() => {
            setSelectedTeamMember(item);
            setIsModalOpen(true);
          }}
        >
          Create Score
        </Button>
      ),
    },
  ];

  // Handle form submission
  const handleScoreSubmit = (data: ScoreFormData) => {
    if (!selectedTeamMember) return;
    
    // Handle form submission here
    console.log("Form submitted:", data, selectedTeamMember);
    // You can add API call here to save the score and habits
    // Example: await createScore(selectedTeamMember.id, data);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50">
      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">
        Assigned Team Members
      </h1>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 sm:p-6">
        {/* Search and Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by name, email and phone"
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

      {/* Create Score Modal */}
      {selectedTeamMember && (
        <CreateScoreForm
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTeamMember(null);
          }}
          onSubmit={handleScoreSubmit}
          teamMember={{
            id: selectedTeamMember.id,
            name: selectedTeamMember.name,
            avatar: selectedTeamMember.avatar,
            email: selectedTeamMember.email,
            phone: selectedTeamMember.phone,
            habitsPercentage: selectedTeamMember.habitsPercentage,
          }}
        />
      )}
    </div>
  );
};

export default CoachAssignedTeamMembers;
