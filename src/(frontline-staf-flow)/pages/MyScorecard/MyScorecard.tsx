import { useState, useMemo } from 'react';
import { Search, Download, Filter, CheckCircle2, Flame, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MetricCard from '../Dashboard/_components/MetricCard';
import CommonTable, { type Column } from '@/components/shared/common/CommonTable';
import CommonPagination from '@/components/shared/common/CommonPagination';

interface ScorecardData {
  id: string;
  coachName: string;
  coachAvatar: string;
  feedback: string;
  improvementTips: string;
  habitComplete: string;
  habitPercentage: number;
  score: string;
}

const FrontLineMyScorecard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');

  // Metric Cards Data - defined directly in component
  const metricsData = [
    {
      id: 'total-habits',
      title: 'Total Habits',
      value: 15,
      icon: CheckCircle2
    },
    {
      id: 'best-streak',
      title: 'Best Streak',
      value: 15,
      icon: Flame
    },
    {
      id: 'avg-score',
      title: 'Avg Score',
      value: '4.2/5',
      icon: Gauge
    }
  ];

  // Scorecard Data - defined directly in component
  const scorecardData: ScorecardData[] = useMemo(
    () => [
      {
        id: '1',
        coachName: 'John Doe',
        coachAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        feedback: 'asdfasdfasdfasdfsadf',
        improvementTips: 'asdfadsfasdfadsfsadf',
        habitComplete: '3 of 3',
        habitPercentage: 90,
        score: '4.5/5'
      },
      {
        id: '2',
        coachName: 'John Doe',
        coachAvatar: 'https://randomuser.me/api/portraits/men/44.jpg',
        feedback: 'asdfasdfasdfasdfsadf',
        improvementTips: 'asdfadsfasdfadsfsadf',
        habitComplete: '3 of 3',
        habitPercentage: 90,
        score: '4.5/5'
      },
      {
        id: '3',
        coachName: 'John Doe',
        coachAvatar: 'https://randomuser.me/api/portraits/men/68.jpg',
        feedback: 'asdfasdfasdfasdfsadf',
        improvementTips: 'asdfadsfasdfadsfsadf',
        habitComplete: '3 of 3',
        habitPercentage: 90,
        score: '4.5/5'
      }
    ],
    []
  );

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!search) return scorecardData;
    return scorecardData.filter((item) =>
      item.coachName.toLowerCase().includes(search.toLowerCase()) ||
      item.feedback.toLowerCase().includes(search.toLowerCase()) ||
      item.improvementTips.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, scorecardData]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [currentPage, pageSize, filteredData]);

  const columns: Column<ScorecardData>[] = [
    {
      header: 'Coach Name',
      render: (item) => (
        <div className="flex items-center gap-3">
          <img
            src={item.coachAvatar}
            alt={item.coachName}
            className="w-10 h-10 rounded-full object-cover border-2 border-slate-200"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://randomuser.me/api/portraits/men/32.jpg`;
            }}
          />
          <span className="font-semibold text-slate-900">{item.coachName}</span>
        </div>
      ),
    },
    {
      header: 'Feedback',
      render: (item) => (
        <span className="text-slate-700">{item.feedback}</span>
      ),
    },
    {
      header: 'Improvement Tips',
      render: (item) => (
        <span className="text-slate-700">{item.improvementTips}</span>
      ),
    },
    {
      header: 'Habit Complete',
      render: (item) => (
        <span className="text-slate-700">{item.habitComplete}</span>
      ),
    },
    {
      header: 'Habit (%)',
      render: (item) => (
        <span className="text-slate-700">{item.habitPercentage}%</span>
      ),
    },
    {
      header: 'Score',
      render: (item) => (
        <span className="text-slate-700 font-semibold">{item.score}</span>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50">
      {/* Top Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {metricsData.map((metric) => (
          <MetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
          />
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
              placeholder="Search by name, email, domain and plan"
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

export default FrontLineMyScorecard;
